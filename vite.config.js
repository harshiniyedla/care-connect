import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        doctors: resolve(__dirname, 'pages/doctors.html'),
        appointments: resolve(__dirname, 'pages/appointments.html'),
        booking: resolve(__dirname, 'pages/booking.html'),
        doctorDetails: resolve(__dirname, 'pages/doctor-details.html'),
        payment: resolve(__dirname, 'pages/payment.html'),
        doctorDashboard: resolve(__dirname, 'pages/doctor-dashboard.html'),
        login: resolve(__dirname, 'pages/login.html'),
        confirmation: resolve(__dirname, 'pages/confirmation.html'),
      },
    },
  },
});
