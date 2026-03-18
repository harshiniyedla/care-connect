/**
 * ============================================================
 *  CareConnect - Razorpay Backend Server
 *  ADDED: Razorpay order creation + payment verification
 * ============================================================
 *
 *  HOW TO USE:
 *  1. Replace RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET below
 *     with your actual keys from https://dashboard.razorpay.com/
 *  2. Run this server: node server.js  (or: npm run server)
 *  3. Keep this running alongside `npm run dev`
 *
 *  TEST KEYS (use these for testing, no real money deducted):
 *  Key ID:     rzp_test_XXXXXXXXXXXXXXXX
 *  Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
 *  Get them at: https://dashboard.razorpay.com/app/keys
 * ============================================================
 */
require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
//  RAZORPAY CREDENTIALS — LOADED FROM .ENV FOR SECURITY
// ============================================================
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_SP6vLKpDoDgdT8';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'HexJZtYgwNCrQ3DapjPlwq45';
// ============================================================

const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

// ============================================================
//  ENDPOINT 1: Create Razorpay Order
//  POST /api/create-order
//  Body: { amount: <number in INR>, currency: "INR", receipt: "..." }
//  Returns: Razorpay order object (contains order_id)
// ============================================================
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;

        // Amount must be in paise (1 INR = 100 paise)
        const options = {
            amount: Math.round(amount * 100),  // convert INR → paise
            currency: currency,
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log('[Razorpay] Order created:', order.id, '| Amount:', order.amount / 100, 'INR');

        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: RAZORPAY_KEY_ID,   // sent to frontend to initialise checkout
        });
    } catch (err) {
        // Detailed logging: Razorpay errors often contain specific details in the 'error' property
        const errorMessage = (err.error && err.error.description) || err.message || 'Unknown Razorpay Error';
        console.error('[Razorpay] Order creation failed:', errorMessage);
        if (err.error) console.error('[Razorpay] Full Error Details:', JSON.stringify(err.error));

        res.status(500).json({
            success: false,
            error: errorMessage,
            code: err.code || 'RAZORPAY_ERROR'
        });
    }
});

// ============================================================
//  ENDPOINT 2: Verify Payment Signature
//  POST /api/verify-payment
//  Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
//  Returns: { success: true } if signature is valid
// ============================================================
app.post('/api/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Razorpay signature verification: HMAC-SHA256 of "order_id|payment_id"
    const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        console.log('[Razorpay] Payment verified successfully. Payment ID:', razorpay_payment_id);
        res.json({ success: true, payment_id: razorpay_payment_id });
    } else {
        console.error('[Razorpay] Payment verification FAILED. Possible tamper detected.');
        res.status(400).json({ success: false, error: 'Payment verification failed. Invalid signature.' });
    }
});

// ============================================================
//  DOCTOR AVAILABILITY SYSTEM (Persistence: slots.json, schedules.json)
// ============================================================
const fs = require('fs');
const path = require('path');
const SLOTS_FILE = path.join(__dirname, 'slots.json');
const SCHEDULES_FILE = path.join(__dirname, 'schedules.json');

// Helper to read slots
function readSlots() {
    try {
        if (!fs.existsSync(SLOTS_FILE)) return [];
        return JSON.parse(fs.readFileSync(SLOTS_FILE, 'utf8'));
    } catch (err) { return []; }
}

// Helper to write slots
function writeSlots(slots) {
    fs.writeFileSync(SLOTS_FILE, JSON.stringify(slots, null, 2));
}

// Helper to read schedules
function readSchedules() {
    try {
        if (!fs.existsSync(SCHEDULES_FILE)) return [];
        return JSON.parse(fs.readFileSync(SCHEDULES_FILE, 'utf8'));
    } catch (err) { return []; }
}

// Helper to write schedules
function writeSchedules(schedules) {
    fs.writeFileSync(SCHEDULES_FILE, JSON.stringify(schedules, null, 2));
}

// Helper: Generate slots from schedule
function generateSlotsFromSchedule(startTime, endTime, durationMinutes) {
    const slots = [];
    let current = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);

    while (current < end) {
        const timeStr = current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        slots.push(timeStr);
        current.setMinutes(current.getMinutes() + durationMinutes);
    }
    return slots;
}

// 1. GET availability for a doctor (With Priority Logic)
app.get('/api/availability/:doctor_id', (req, res) => {
    const doctorId = parseInt(req.params.doctor_id);
    const date = req.query.date; // YYYY-MM-DD

    if (!date) return res.status(400).json({ success: false, error: 'Date is required' });

    const allSlots = readSlots();
    const customSlots = allSlots.filter(s => s.doctor_id === doctorId && s.date === date);

    // PRIORITY LOGIC:
    // If there is ANY custom override (available, booked, blocked) for this date, use the custom list.
    // If ANY slot has status 'blocked' AND time_slot is 'FULL_DAY', return empty (blocked day).
    const isFullDayBlocked = customSlots.some(s => s.status === 'blocked' && s.time_slot === 'FULL_DAY');
    if (isFullDayBlocked) {
        return res.json({ success: true, slots: [], source: 'override', message: 'This day is blocked.' });
    }

    const hasOverrides = customSlots.some(s => s.status === 'available' || s.status === 'blocked');

    if (hasOverrides) {
        // Filter out 'blocked' slots from the final patient view for clarity
        const visibleSlots = customSlots.filter(s => s.status !== 'blocked');
        return res.json({ success: true, slots: visibleSlots, source: 'override' });
    }

    // Otherwise, fallback to Default Weekly Schedule
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const schedules = readSchedules();
    const docSchedule = schedules.find(s => s.doctor_id === doctorId);
    const daySchedule = docSchedule?.schedules?.find(s => s.day === dayOfWeek);

    if (daySchedule) {
        const generatedTimes = generateSlotsFromSchedule(daySchedule.start_time, daySchedule.end_time, daySchedule.slot_duration || 30);

        // Map generated times to slot objects and merge with 'booked' status from slots.json
        const generatedSlots = generatedTimes.map(time => {
            const existingBooked = customSlots.find(s => s.time_slot === time && s.status === 'booked');
            return {
                slot_id: existingBooked ? existingBooked.slot_id : `gen_${doctorId}_${date}_${time}`,
                doctor_id: doctorId,
                date: date,
                time_slot: time,
                status: existingBooked ? 'booked' : 'available'
            };
        });

        return res.json({ success: true, slots: generatedSlots, source: 'default' });
    }

    // No override AND no default schedule
    // NEW REQUIREMENT: Fallback static slots if nothing else exists
    const fallbackTimes = ['11:00 AM', '04:00 PM'];
    const finalFallbackSlots = fallbackTimes.map(time => {
        const existingBooked = customSlots.find(s => s.time_slot === time && s.status === 'booked');
        return {
            slot_id: existingBooked ? existingBooked.slot_id : `fallback_${doctorId}_${date}_${time.replace(':', '')}`,
            doctor_id: doctorId,
            date: date,
            time_slot: time,
            status: existingBooked ? 'booked' : 'available'
        };
    });

    res.json({ success: true, slots: finalFallbackSlots, source: 'fallback' });
});

// 2. GET/SAVE Weekly Schedule
app.get('/api/schedule/:doctor_id', (req, res) => {
    const doctorId = parseInt(req.params.doctor_id);
    const schedules = readSchedules();
    const docSchedule = schedules.find(s => s.doctor_id === doctorId) || { doctor_id: doctorId, schedules: [] };
    res.json({ success: true, schedule: docSchedule });
});

app.post('/api/schedule/manage', (req, res) => {
    const { doctor_id, schedules: newSchedules } = req.body;
    if (!doctor_id || !Array.isArray(newSchedules)) {
        return res.status(400).json({ success: false, error: 'Invalid data' });
    }

    let allSchedules = readSchedules();
    const index = allSchedules.findIndex(s => s.doctor_id === doctor_id);

    if (index !== -1) {
        allSchedules[index].schedules = newSchedules;
    } else {
        allSchedules.push({ doctor_id, schedules: newSchedules });
    }

    writeSchedules(allSchedules);
    res.json({ success: true, message: 'Schedule updated' });
});

// 3. ADD/MANAGE custom override (Doctor Side)
app.post('/api/availability/manage', (req, res) => {
    const { doctor_id, date, time_slot, status } = req.body;
    if (!doctor_id || !date || !time_slot) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    let slots = readSlots();

    // Check if slot already exists
    const exists = slots.find(s => s.doctor_id === doctor_id && s.date === date && s.time_slot === time_slot);
    if (exists) {
        return res.status(400).json({ success: false, error: 'Slot already exists' });
    }

    const newSlot = {
        slot_id: `slot_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        doctor_id,
        date,
        time_slot,
        status: status || 'available'
    };

    slots.push(newSlot);
    writeSlots(slots);
    res.json({ success: true, slot: newSlot });
});

// 3. DELETE availability (Doctor Side)
app.delete('/api/availability/:slot_id', (req, res) => {
    const slotId = req.params.slot_id;
    let slots = readSlots();
    const initialLen = slots.length;
    slots = slots.filter(s => s.slot_id !== slotId);

    if (slots.length === initialLen) {
        return res.status(404).json({ success: false, error: 'Slot not found' });
    }

    writeSlots(slots);
    res.json({ success: true, message: 'Slot deleted successfully' });
});

// 4. BOOK a slot (Post-Payment)
app.post('/api/book-slot', (req, res) => {
    const { doctor_id, date, time_slot } = req.body;
    let slots = readSlots();

    const slotIndex = slots.findIndex(s =>
        s.doctor_id === doctor_id &&
        s.date === date &&
        s.time_slot === time_slot
    );

    if (slotIndex === -1) {
        // If slot doesn't exist in our custom system, we can either error out
        // or allow it (some slots might be legacy).
        // Let's create it as booked if it was a valid selection.
        const newSlot = {
            slot_id: `booked_${Date.now()}`,
            doctor_id,
            date,
            time_slot,
            status: 'booked'
        };
        slots.push(newSlot);
        writeSlots(slots);
        return res.json({ success: true, message: 'Legacy slot booked' });
    }

    if (slots[slotIndex].status === 'booked') {
        return res.status(400).json({ success: false, error: 'Slot already booked' });
    }

    slots[slotIndex].status = 'booked';
    writeSlots(slots);
    res.json({ success: true, message: 'Slot marked as booked' });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Friendly root route
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #27ae60;">✅ CareConnect Payment Server is Running</h1>
            <p>This is the <b>API Backend</b>. You don't need to use this page.</p>
            <p>Go to your website here: <a href="http://localhost:5173" style="color: #2980b9; font-weight: bold;">http://localhost:5173</a></p>
            <hr style="width: 200px; margin: 30px auto; opacity: 0.3;">
            <p style="font-size: 0.9rem; color: #666;">Endpoints active: /api/create-order, /api/verify-payment</p>
        </div>
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`\n✅ CareConnect Payment Server running at http://localhost:${PORT}`);
    console.log(`   Create Order  → POST http://localhost:${PORT}/api/create-order`);
    console.log(`   Verify Payment → POST http://localhost:${PORT}/api/verify-payment\n`);
});
