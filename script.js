// Global Configuration for Deployment
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3001' 
    : ''; // For production, leave blank or set to your backend URL

// Dummy Data for Doctors
const doctors = [
    // ==========================================
    // HYDERABAD - 30 Doctors (3 per Spec)
    // ==========================================
    // HYDERABAD
    { id: 1, name: "Dr. K. S. Reddy", specialization: "Cardiologist", experience: "23 Years", fee: 1500, rating: 4.9, city: "Hyderabad", hospital: "Apollo Hospitals", image: "assets/doctors/dr-ks-reddy.jpg", about: "Interventional Cardiologist.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 2, name: "Dr. Anil Krishna", specialization: "Cardiologist", experience: "22 Years", fee: 1000, rating: 4.8, city: "Hyderabad", hospital: "Medicover Hospitals", image: "assets/doctors/dr-anil-krishna.jpg", about: "Adult Cardiology expert.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 3, name: "Dr. B. Bhaskar Rao", specialization: "Cardiologist", experience: "38 Years", fee: 500, rating: 5.0, city: "Hyderabad", hospital: "KIMS Hospitals", image: "assets/doctors/dr-bhaskar-rao.jpg", about: "Renowned CT Surgeon.", slots: ["09:00 AM", "06:00 PM"] },
    { id: 4, name: "Dr. Mohandas Surath", specialization: "Neurologist", experience: "52 Years", fee: 1500, rating: 4.9, city: "Hyderabad", hospital: "NIMS", image: "assets/doctors/dr-mohandas-surath.jpg", about: "Neuro-muscular specialist.", slots: ["10:00 AM", "01:00 PM"] },
    { id: 5, name: "Dr. Sita Jayalakshmi", specialization: "Neurologist", experience: "26 Years", fee: 500, rating: 4.7, city: "Hyderabad", hospital: "KIMS Hospitals", image: "assets/doctors/dr-sita-jayalakshmi.jpg", about: "Epilepsy specialist.", slots: ["11:30 AM", "03:30 PM"] },
    { id: 6, name: "Dr. Manoj Kumar Singh", specialization: "Neurologist", experience: "26 Years", fee: 800, rating: 4.8, city: "Hyderabad", hospital: "Continental", image: "assets/doctors/dr-manoj-kumar-singh.jpg", about: "Clinical neurology.", slots: ["09:00 AM", "05:00 PM"] },
    { id: 7, name: "Dr. Lakshmi Shanti", specialization: "Dermatologist", experience: "10 Years", fee: 800, rating: 4.8, city: "Hyderabad", hospital: "Care Hospitals", image: "assets/doctors/dr-lakshmi-shanti.jpg", about: "Aesthetic Dermatology.", slots: ["10:00 AM", "12:00 PM"] },
    { id: 8, name: "Dr. P L Chandravathi", specialization: "Dermatologist", experience: "33 Years", fee: 100, rating: 4.9, city: "Hyderabad", hospital: "Care Banjara", image: "assets/doctors/dr-pl-chandravathi.jpg", about: "HOD Dermatology.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 9, name: "Dr. Swapna Kunduru", specialization: "Dermatologist", experience: "23 Years", fee: 1200, rating: 4.7, city: "Hyderabad", hospital: "Continental", image: "assets/doctors/dr-swapna-kunduru.jpg", about: "Skincare expert.", slots: ["02:00 PM", "05:00 PM"] },
    { id: 10, name: "Dr. Hari Prasad", specialization: "General Physician", experience: "20 Years", fee: 1000, rating: 4.7, city: "Hyderabad", hospital: "Apollo Hospitals", image: "assets/doctors/dr-hari-prasad.jpg", about: "Internal Medicine.", slots: ["09:00 AM", "12:00 PM"] },
    { id: 11, name: "Dr. Vamsi Krishna", specialization: "General Physician", experience: "12 Years", fee: 600, rating: 4.5, city: "Hyderabad", hospital: "Continental", image: "assets/doctors/dr-vamsi-krishna.jpg", about: "Preventative care.", slots: ["10:30 AM", "01:30 PM"] },
    { id: 12, name: "Dr. Swapna", specialization: "General Physician", experience: "15 Years", fee: 800, rating: 4.6, city: "Hyderabad", hospital: "Virinchi", image: "assets/doctors/dr-swapna-gp.jpg", about: "Lifestyle disease.", slots: ["03:00 PM", "06:00 PM"] },
    { id: 13, name: "Dr. Gurava Reddy", specialization: "Orthopedic", experience: "40 Years", fee: 1500, rating: 5.0, city: "Hyderabad", hospital: "Sunshine Hospitals", image: "assets/doctors/dr-gurava-reddy.jpg", about: "Joint replacement.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 14, name: "Dr. M. Sukumar", specialization: "Orthopedic", experience: "15 Years", fee: 1200, rating: 4.7, city: "Hyderabad", hospital: "Yashoda", image: "assets/doctors/dr-m-sukumar.jpg", about: "Robotic surgery.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 15, name: "Dr. Krishna Subramaniyan", specialization: "Orthopedic", experience: "18 Years", fee: 1500, rating: 4.8, city: "Hyderabad", hospital: "Medicover", image: "assets/doctors/dr-krishna-subramaniyan.png", about: "Sports injury.", slots: ["09:00 AM", "05:00 PM"] },
    { id: 16, name: "Dr. Ramesh Kancharla", specialization: "Pediatrician", experience: "35 Years", fee: 2000, rating: 4.9, city: "Hyderabad", hospital: "Rainbow Hospitals", image: "assets/doctors/dr-ramesh-kancharla.jpg", about: "Critical care.", slots: ["10:00 AM", "01:00 PM"] },
    { id: 17, name: "Dr. Akheel Syed Rizwan", specialization: "Pediatrician", experience: "25 Years", fee: 1500, rating: 4.8, city: "Hyderabad", hospital: "Rainbow", image: "assets/doctors/dr-akheel-syed-rizwan.jpg", about: "Neonatology master.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 18, name: "Dr. Madhavi Adla", specialization: "Pediatrician", experience: "31 Years", fee: 1800, rating: 4.9, city: "Hyderabad", hospital: "Continental", image: "assets/doctors/dr-madhavi-adla.jpg", about: "General pediatrics.", slots: ["09:00 AM", "12:00 PM"] },
    { id: 19, name: "Dr. Evita Fernandez", specialization: "Gynecologist", experience: "48 Years", fee: 1000, rating: 5.0, city: "Hyderabad", hospital: "Fernandez Stork", image: "assets/doctors/dr-evita-fernandez.jpg", about: "Natural birth.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 20, name: "Dr. Lakshmi Ratna", specialization: "Gynecologist", experience: "20 Years", fee: 1500, rating: 4.8, city: "Hyderabad", hospital: "Apollo Cradle", image: "assets/doctors/dr-lakshmi-ratna.jpg", about: "High-risk pregnancy.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 21, name: "Dr. Swapna Samdrula", specialization: "Gynecologist", experience: "18 Years", fee: 1200, rating: 4.7, city: "Hyderabad", hospital: "Rainbow", image: "assets/doctors/dr-swapna-samdrula.jpg", about: "Infertility specialist.", slots: ["09:00 AM", "01:00 PM"] },
    { id: 22, name: "Dr. Viranchi", specialization: "Psychiatrist", experience: "15 Years", fee: 1500, rating: 4.6, city: "Hyderabad", hospital: "Asha Hospital", image: "assets/doctors/dr-viranchi.jpg", about: "Adult psychiatry.", slots: ["10:00 AM", "03:00 PM"] },
    { id: 23, name: "Dr. G. Prasad Rao", specialization: "Psychiatrist", experience: "43 Years", fee: 2100, rating: 4.8, city: "Hyderabad", hospital: "SCARF", image: "assets/doctors/dr-g-prasad-rao.jpg", about: "Mood specialist.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 24, name: "Dr. Radhika", specialization: "Psychiatrist", experience: "10 Years", fee: 1200, rating: 4.5, city: "Hyderabad", hospital: "Hope Trust", image: "assets/doctors/dr-radhika.jpg", about: "Child mental health.", slots: ["09:00 AM", "12:00 PM"] },
    { id: 25, name: "Dr. Sampath Rao", specialization: "ENT Specialist", experience: "25 Years", fee: 1500, rating: 4.9, city: "Hyderabad", hospital: "Microcare ENT", image: "assets/doctors/dr-sampath-rao.jpg", about: "Cochlear implants.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 26, name: "Dr. Janardhan Rao", specialization: "ENT Specialist", experience: "20 Years", fee: 1200, rating: 4.7, city: "Hyderabad", hospital: "MAA ENT", image: "assets/doctors/dr-janardhan-rao.jpg", about: "Robotic sinus surgery.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 27, name: "Dr. Shanti", specialization: "ENT Specialist", experience: "15 Years", fee: 1000, rating: 4.6, city: "Hyderabad", hospital: "Care Hospitals", image: "assets/doctors/dr-shanti-ent.jpg", about: "Pediatric ENT.", slots: ["09:00 AM", "01:00 PM"] },
    { id: 28, name: "Dr. P. G. Reddy", specialization: "Dentist", experience: "20 Years", fee: 800, rating: 4.8, city: "Hyderabad", hospital: "Partha Dental", image: "assets/doctors/dr-pg-reddy.jpg", about: "Implantology.", slots: ["10:00 AM", "06:00 PM"] },
    { id: 29, name: "Dr. Sujatha", specialization: "Dentist", experience: "12 Years", fee: 600, rating: 4.6, city: "Hyderabad", hospital: "FMS Dental", image: "assets/doctors/dr-sujatha-dentist.jpg", about: "Orthodontics.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 30, name: "Dr. Varun", specialization: "Dentist", experience: "8 Years", fee: 500, rating: 4.4, city: "Hyderabad", hospital: "Apollo White", image: "assets/doctors/dr-varun.jpg", about: "Restorative.", slots: ["09:00 AM", "12:00 PM"] },

    // ==========================================
    // DELHI - 30 Doctors (IDs 31-60)
    // ==========================================
    { id: 31, name: "Dr. Ashok Seth", specialization: "Cardiologist", experience: "42 Years", fee: 3000, rating: 5.0, city: "Delhi", hospital: "Fortis Escorts", image: "assets/doctors/dr-ashok-seth.jpg", about: "Padma Bhushan awardee.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 32, name: "Dr. Naresh Trehan", specialization: "Cardiologist", experience: "53 Years", fee: 1500, rating: 5.0, city: "Delhi", hospital: "Medanta", image: "assets/doctors/dr-naresh-trehan.jpg", about: "Eminent CV Surgeon.", slots: ["09:00 AM", "05:00 PM"] },
    { id: 33, name: "Dr. S. K. Gupta", specialization: "Cardiologist", experience: "38 Years", fee: 1700, rating: 4.7, city: "Delhi", hospital: "Indraprastha Apollo", image: "assets/doctors/dr-sk-gupta.jpg", about: "Congenital heart expert.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 34, name: "Dr. Padma Srivastava", specialization: "Neurologist", experience: "40 Years", fee: 2000, rating: 5.0, city: "Delhi", hospital: "AIIMS", image: "assets/doctors/dr-padma-srivastava.jpg", about: "Stroke management.", slots: ["10:00 AM", "01:00 PM"] },
    { id: 35, name: "Dr. Sandeep Vaishya", specialization: "Neurologist", experience: "32 Years", fee: 1500, rating: 4.8, city: "Delhi", hospital: "Max Super Speciality", image: "assets/doctors/dr-sandeep-vaishya.jpg", about: "Gamma Knife surgeon.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 36, name: "Dr. Arun Garg", specialization: "Neurologist", experience: "22 Years", fee: 1800, rating: 4.7, city: "Delhi", hospital: "Medanta", image: "assets/doctors/dr-arun-garg.jpg", about: "Geriatric neurology.", slots: ["09:00 AM", "12:00 PM"] },
    { id: 37, name: "Dr. Niti Khunger", specialization: "Dermatologist", experience: "25 Years", fee: 500, rating: 4.9, city: "Delhi", hospital: "Safdarjung", image: "assets/doctors/dr-niti-khunger.jpg", about: "Dermatosurgery expert.", slots: ["10:00 AM", "01:00 PM"] },
    { id: 38, name: "Dr. Deepali Bhardwaj", specialization: "Dermatologist", experience: "15 Years", fee: 2000, rating: 4.8, city: "Delhi", hospital: "Skin Clinic", image: "assets/doctors/dr-deepali-bhardwaj.jpg", about: "Celebrity dermatologist.", slots: ["11:30 AM", "05:00 PM"] },
    { id: 39, name: "Dr. Rohit Batra", specialization: "Dermatologist", experience: "18 Years", fee: 1800, rating: 4.7, city: "Delhi", hospital: "Sir Ganga Ram", image: "assets/doctors/dr-rohit-batra.jpg", about: "Chemical peels expert.", slots: ["09:00 AM", "02:00 PM"] },
    { id: 40, name: "Dr. Randeep Guleria", specialization: "General Physician", experience: "40 Years", fee: 1000, rating: 5.0, city: "Delhi", hospital: "AIIMS", image: "assets/doctors/dr-randeep-guleria.jpg", about: "Internal Medicine.", slots: ["10:00 AM", "12:00 PM"] },
    { id: 41, name: "Dr. Mukesh Gupta", specialization: "General Physician", experience: "20 Years", fee: 1200, rating: 4.7, city: "Delhi", hospital: "Max", image: "assets/doctors/dr-mukesh-gupta.jpg", about: "Diabetes management.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 42, name: "Dr. Anupama", specialization: "General Physician", experience: "12 Years", fee: 1000, rating: 4.6, city: "Delhi", hospital: "Fortis", image: "assets/doctors/dr-anupama.jpg", about: "Women health expert.", slots: ["09:00 AM", "01:00 PM"] },
    { id: 43, name: "Dr. Ashok Rajgopal", specialization: "Orthopedic", experience: "40 Years", fee: 1500, rating: 5.0, city: "Delhi", hospital: "Medanta", image: "assets/doctors/dr-ashok-rajgopal.jpg", about: "Knee replacement.", slots: ["09:00 AM", "02:00 PM"] },
    { id: 44, name: "Dr. S. K. S. Marya", specialization: "Orthopedic", experience: "35 Years", fee: 3000, rating: 4.9, city: "Delhi", hospital: "Max Saket", image: "assets/doctors/dr-sks-marya.jpg", about: "Joint replacement.", slots: ["10:30 AM", "04:30 PM"] },
    { id: 45, name: "Dr. IPS Oberoi", specialization: "Orthopedic", experience: "25 Years", fee: 2500, rating: 4.8, city: "Delhi", hospital: "Artemis", image: "assets/doctors/dr-ips-oberoi.jpg", about: "Robotic surgeries.", slots: ["11:00 AM", "05:00 PM"] },
    { id: 46, name: "Dr. Arvind Taneja", specialization: "Pediatrician", experience: "45 Years", fee: 3000, rating: 5.0, city: "Delhi", hospital: "Max Smart", image: "assets/doctors/dr-arvind-taneja.jpg", about: "Elite child care.", slots: ["10:00 AM", "12:30 PM"] },
    { id: 47, name: "Dr. V. K. Paul", specialization: "Pediatrician", experience: "38 Years", fee: 2500, rating: 4.9, city: "Delhi", hospital: "AIIMS", image: "assets/doctors/dr-vk-paul.jpg", about: "Neonatology master.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 48, name: "Dr. Arvind", specialization: "Pediatrician", experience: "20 Years", fee: 1500, rating: 4.7, city: "Delhi", hospital: "Apollo", image: "assets/doctors/dr-arvind-pediatrician.jpg", about: "Pediatrics expert.", slots: ["09:00 AM", "01:00 PM"] },
    { id: 49, name: "Dr. Urvashi Jha", specialization: "Gynecologist", experience: "25 Years", fee: 2000, rating: 4.8, city: "Delhi", hospital: "Fortis", image: "assets/doctors/dr-urvashi-jha.jpg", about: "Gynae-oncologist.", slots: ["10:00 AM", "01:00 PM"] },
    { id: 50, name: "Dr. Malvika Sabharwal", specialization: "Gynecologist", experience: "30 Years", fee: 2500, rating: 4.9, city: "Delhi", hospital: "Apollo", image: "assets/doctors/dr-malvika-sabharwal.jpg", about: "Laparoscopic expert.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 51, name: "Dr. Anita", specialization: "Gynecologist", experience: "15 Years", fee: 1200, rating: 4.6, city: "Delhi", hospital: "Max", image: "assets/doctors/dr-anita.jpg", about: "Women specialist.", slots: ["02:00 PM", "05:00 PM"] },
    { id: 52, name: "Dr. Samir Parikh", specialization: "Psychiatrist", experience: "25 Years", fee: 1500, rating: 4.9, city: "Delhi", hospital: "Fortis", image: "assets/doctors/dr-samir-parikh.jpg", about: "Mental health Guru.", slots: ["10:00 AM", "03:00 PM"] },
    { id: 53, name: "Dr. Jitendra Nagpal", specialization: "Psychiatrist", experience: "25 Years", fee: 2200, rating: 4.8, city: "Delhi", hospital: "Moolchand", image: "assets/doctors/dr-jitendra-nagpal.jpg", about: "Stress management.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 54, name: "Dr. Anjali Nagpal", specialization: "Psychiatrist", experience: "30 Years", fee: 2500, rating: 4.7, city: "Delhi", hospital: "Apollo", image: "assets/doctors/dr-anjali-nagpal.jpg", about: "Clinical psychiatry.", slots: ["09:00 AM", "12:00 PM"] },
    { id: 55, name: "Dr. Ameet Kishore", specialization: "ENT Specialist", experience: "30 Years", fee: 2500, rating: 4.9, city: "Delhi", hospital: "Apollo", image: "assets/doctors/dr-ameet-kishore.jpg", about: "Cochlear specialist.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 56, name: "Dr. Shishir Rastogi", specialization: "ENT Specialist", experience: "22 Years", fee: 1800, rating: 4.7, city: "Delhi", hospital: "Sir Ganga Ram", image: "assets/doctors/dr-shishir-rastogi.jpg", about: "ENT Surgeon.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 57, name: "Dr. Rastogi", specialization: "ENT Specialist", experience: "18 Years", fee: 1500, rating: 4.6, city: "Delhi", hospital: "Max", image: "assets/doctors/dr-rastogi-female.jpg", about: "Throat specialist.", slots: ["02:00 PM", "05:00 PM"] },
    { id: 58, name: "Dr. Anil Kohli", specialization: "Dentist", experience: "40 Years", fee: 500, rating: 5.0, city: "Delhi", hospital: "DR Kohli", image: "assets/doctors/dr-anil-kohli.jpg", about: "Elite dental surgeon.", slots: ["10:00 AM", "06:00 PM"] },
    { id: 59, name: "Dr. Smriti Bouri", specialization: "Dentist", experience: "15 Years", fee: 1500, rating: 4.8, city: "Delhi", hospital: "Apollo White", image: "assets/doctors/dr-smriti-bouri.jpg", about: "Cosmetic dentistry.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 60, name: "Dr. Dhir", specialization: "Dentist", experience: "20 Years", fee: 2000, rating: 4.7, city: "Delhi", hospital: "Max Dental", image: "assets/doctors/dr-dhir-dentist.jpg", about: "Endodontist.", slots: ["09:00 AM", "01:00 PM"] },

    // ==========================================
    // MUMBAI - 30 Doctors (IDs 61-90)
    // ==========================================
    { id: 61, name: "Dr. Jamshed Dalal", specialization: "Cardiologist", experience: "53 Years", fee: 3000, rating: 5.0, city: "Mumbai", hospital: "Kokilaben", image: "assets/doctors/dr-jamshed-dalal.jpg", about: "Cardiology legend.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 62, name: "Dr. Ashwin B. Mehta", specialization: "Cardiologist", experience: "56 Years", fee: 4000, rating: 5.0, city: "Mumbai", hospital: "Breach Candy", image: "assets/doctors/dr-ashwin-mehta.jpg", about: "Senior cardiologist.", slots: ["09:00 AM", "01:00 PM"] },
    { id: 63, name: "Dr. Samuel Mathew", specialization: "Cardiologist", experience: "42 Years", fee: 3500, rating: 4.9, city: "Mumbai", hospital: "Lilavati", image: "assets/doctors/dr-samuel-mathew.jpg", about: "Cardiology expert.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 64, name: "Dr. Mohit Bhatt", specialization: "Neurologist", experience: "38 Years", fee: 4000, rating: 5.0, city: "Mumbai", hospital: "Kokilaben", image: "assets/doctors/dr-mohit-bhatt.jpg", about: "Movement disorders.", slots: ["10:00 AM", "01:00 PM"] },
    { id: 65, name: "Dr. Jimmy Lalkaka", specialization: "Neurologist", experience: "25 Years", fee: 2500, rating: 4.8, city: "Mumbai", hospital: "Jaslok", image: "assets/doctors/dr-jimmy-lalkaka.jpg", about: "Clinical neurology.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 66, name: "Dr. Pravina Shah", specialization: "Neurologist", experience: "40 Years", fee: 3000, rating: 4.9, city: "Mumbai", hospital: "Fortis", image: "assets/doctors/dr-pravina-shah.jpg", about: "Epilepsy expert.", slots: ["02:00 PM", "05:00 PM"] },
    { id: 67, name: "Dr. D. G. Saple", specialization: "Dermatologist", experience: "52 Years", fee: 2000, rating: 4.9, city: "Mumbai", hospital: "Breach Candy", image: "assets/doctors/dr-dg-saple.jpg", about: "Senior Dermatologist.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 68, name: "Dr. Shrichand Parasramani", specialization: "Dermatologist", experience: "37 Years", fee: 1800, rating: 4.8, city: "Mumbai", hospital: "Lilavati", image: "assets/doctors/dr-shrichand-parasramani.jpg", about: "Laser specialist.", slots: ["02:00 PM", "05:00 PM"] },
    { id: 69, name: "Dr. Satish Udare", specialization: "Dermatologist", experience: "35 Years", fee: 1500, rating: 4.7, city: "Mumbai", hospital: "Udare Clinic", image: "assets/doctors/dr-satish-udare.jpg", about: "Dermatosurgery expert.", slots: ["10:30 AM", "06:30 PM"] },
    { id: 70, name: "Dr. Farokh Udwadia", specialization: "General Physician", experience: "63 Years", fee: 1000, rating: 5.0, city: "Mumbai", hospital: "Breach Candy", image: "assets/doctors/dr-farokh-udwadia.jpg", about: "Elite physician.", slots: ["10:00 AM", "12:00 PM"] },
    { id: 71, name: "Dr. Nasir Fulara", specialization: "General Physician", experience: "30 Years", fee: 2000, rating: 4.8, city: "Mumbai", hospital: "Jaslok", image: "assets/doctors/dr-nasir-fulara.jpg", about: "Medicine expert.", slots: ["09:00 AM", "12:00 PM"] },
    { id: 72, name: "Dr. Davinder Tulpule", specialization: "General Physician", experience: "34 Years", fee: 2000, rating: 4.7, city: "Mumbai", hospital: "Breach Candy", image: "assets/doctors/dr-davinder-tulpule.jpg", about: "Internal medicine.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 73, name: "Dr. Dinshaw Pardiwala", specialization: "Orthopedic", experience: "27 Years", fee: 2000, rating: 5.0, city: "Mumbai", hospital: "Kokilaben", image: "assets/doctors/dr-dinshaw-pardiwala.jpg", about: "Sports surgery.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 74, name: "Dr. Niraj Vora", specialization: "Orthopedic", experience: "35 Years", fee: 3000, rating: 4.9, city: "Mumbai", hospital: "Nanavati", image: "assets/doctors/dr-niraj-vora.jpg", about: "Replacement surgeon.", slots: ["09:00 AM", "04:30 PM"] },
    { id: 75, name: "Dr. Sanjeev Jain", specialization: "Orthopedic", experience: "28 Years", fee: 2500, rating: 4.8, city: "Mumbai", hospital: "L H Hiranandani", image: "assets/doctors/dr-sanjeev-jain.jpg", about: "Joint replacement.", slots: ["11:00 AM", "05:00 PM"] },
    { id: 76, name: "Dr. Bhupendra Avasthi", specialization: "Pediatrician", experience: "30 Years", fee: 2500, rating: 4.9, city: "Mumbai", hospital: "Surya Hospitals", image: "assets/doctors/dr-bhupendra-avasthi.jpg", about: "Child master.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 77, name: "Dr. Yuvaraja Shetty", specialization: "Pediatrician", experience: "19 Years", fee: 1500, rating: 4.8, city: "Mumbai", hospital: "Surya", image: "assets/doctors/dr-yuvaraja-shetty.jpg", about: "Pediatrics expert.", slots: ["09:00 AM", "01:00 PM"] },
    { id: 78, name: "Dr. Fazal Nabi", specialization: "Pediatrician", experience: "22 Years", fee: 1800, rating: 4.7, city: "Mumbai", hospital: "Jaslok", image: "assets/doctors/dr-fazal-nabi.jpg", about: "Child health expert.", slots: ["02:00 PM", "05:00 PM"] },
    { id: 79, name: "Dr. Indira Hinduja", specialization: "Gynecologist", experience: "50 Years", fee: 2000, rating: 5.0, city: "Mumbai", hospital: "Hinduja", image: "assets/doctors/dr-indira-hinduja.jpg", about: "IVF Guru.", slots: ["10:00 AM", "01:00 PM"] },
    { id: 80, name: "Dr. Nandita Palshetkar", specialization: "Gynecologist", experience: "30 Years", fee: 3500, rating: 4.9, city: "Mumbai", hospital: "Bloom IVF", image: "assets/doctors/dr-nandita-palshetkar.jpg", about: "ART expert.", slots: ["11:00 AM", "03:00 PM"] },
    { id: 81, name: "Dr. Gayatri Deshpande", specialization: "Gynecologist", experience: "32 Years", fee: 3000, rating: 4.8, city: "Mumbai", hospital: "Nanavati", image: "assets/doctors/dr-gayatri-deshpande.jpg", about: "Obstetrics HOD.", slots: ["09:00 AM", "12:00 PM"] },
    { id: 82, name: "Dr. Rajesh Parikh", specialization: "Psychiatrist", experience: "40 Years", fee: 4000, rating: 4.9, city: "Mumbai", hospital: "Jaslok", image: "assets/doctors/dr-rajesh-parikh.jpg", about: "Psychiatry head.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 83, name: "Dr. Shaunak Ajinkya", specialization: "Psychiatrist", experience: "23 Years", fee: 2000, rating: 4.8, city: "Mumbai", hospital: "Kokilaben", image: "assets/doctors/dr-shaunak-ajinkya.jpg", about: "Consultant psych.", slots: ["11:00 AM", "04:00 PM"] },
    { id: 84, name: "Dr. Kersi Chavda", specialization: "Psychiatrist", experience: "35 Years", fee: 3500, rating: 4.9, city: "Mumbai", hospital: "P.D. Hinduja", image: "assets/doctors/dr-kersi-chavda.jpg", about: "Adult psychiatrist.", slots: ["09:00 AM", "01:00 PM"] },
    { id: 85, name: "Dr. Manohar Shaan", specialization: "ENT Specialist", experience: "35 Years", fee: 2500, rating: 5.0, city: "Mumbai", hospital: "Nanavati", image: "assets/doctors/dr-manohar-shaan.jpg", about: "ENT legend.", slots: ["09:00 AM", "12:30 PM"] },
    { id: 86, name: "Dr. Milind Kirtane", specialization: "ENT Specialist", experience: "50 Years", fee: 1500, rating: 5.0, city: "Mumbai", hospital: "Jaslok", image: "assets/doctors/dr-milind-kirtane.jpg", about: "Cochlear surgery.", slots: ["10:00 AM", "02:00 PM"] },
    { id: 87, name: "Dr. Narayan Jayashankar", specialization: "ENT Specialist", experience: "28 Years", fee: 2200, rating: 4.9, city: "Mumbai", hospital: "Nanavati", image: "assets/doctors/dr-narayan-jayashankar.jpg", about: "ENT master.", slots: ["10:30 AM", "04:30 PM"] },
    { id: 88, name: "Dr. Vipin Dehane", specialization: "Dentist", experience: "16 Years", fee: 800, rating: 4.8, city: "Mumbai", hospital: "SL Raheja", image: "assets/doctors/dr-vipin-dehane.jpg", about: "Implant specialist.", slots: ["11:00 AM", "05:00 PM"] },
    { id: 89, name: "Dr. Rinal Sanghavi", specialization: "Dentist", experience: "15 Years", fee: 1200, rating: 4.7, city: "Mumbai", hospital: "Apollo", image: "assets/doctors/dr-rinal-sanghavi.jpg", about: "Orthodontics.", slots: ["09:00 AM", "03:00 PM"] },
    { id: 90, name: "Dr. Mehmood", specialization: "Dentist", experience: "25 Years", fee: 2000, rating: 4.9, city: "Mumbai", hospital: "Dentzz", image: "assets/doctors/dr-mehmood.jpg", about: "Smile specialist.", slots: ["03:00 PM", "06:00 PM"] }
];

// Utility: Save Appointment
function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function clearData() {
    console.log("clearData function initiated");
    if (confirm("Are you sure you want to clear all appointments and logout?")) {
        localStorage.removeItem('appointments');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('pendingBooking');
        alert("Data cleared successfully! System reset.");
        window.location.href = window.location.pathname.includes('pages') ? '../index.html' : 'index.html';
    }
}
window.clearData = clearData;

// Utility: Get Appointments
function getAppointments() {
    return JSON.parse(localStorage.getItem('appointments')) || [];
}

// Utility: Get Doctor by ID
function getDoctorById(id) {
    const docId = parseInt(id);
    return doctors.find(doc => doc.id === docId);
}

// Utility: Get Doctors by City
function getDoctorsByCity(city) {
    return doctors.filter(doc => doc.city.toLowerCase() === city.toLowerCase());
}

// Utility: Get Top Doctors
function getTopDoctors(limit = 3) {
    return [...doctors].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

// --- Init Logic ---
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});

// Authentication logic
function login(name, role, id = null) {
    const user = { name, role, id };
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = role === 'doctor' ? 'doctor-dashboard.html' : 'doctors.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = window.location.pathname.includes('pages') ? '../index.html' : 'index.html';
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function updateNavbar() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const isPagesDir = window.location.pathname.includes('pages');
    const loginPath = isPagesDir ? 'login.html' : 'pages/login.html';
    const apptPath = isPagesDir ? 'appointments.html' : 'pages/appointments.html';
    const dashPath = isPagesDir ? 'doctor-dashboard.html' : 'pages/doctor-dashboard.html';

    const myApptLink = Array.from(navLinks.children).find(li => li.innerText.includes('Appointments'));

    if (user) {
        if (user.role === 'doctor') {
            if (myApptLink) myApptLink.style.display = 'none';
            const dashLi = document.createElement('li');
            dashLi.innerHTML = `<a href="${dashPath}">Dashboard</a>`;
            navLinks.appendChild(dashLi);
        } else {
            if (myApptLink) myApptLink.style.display = 'block';
        }
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" onclick="logout()">Logout (${user.name})</a>`;
        navLinks.appendChild(logoutLi);
    } else {
        if (myApptLink) myApptLink.style.display = 'none';
        const loginLi = document.createElement('li');
        loginLi.innerHTML = `<a href="${loginPath}">Login</a>`;
        navLinks.appendChild(loginLi);
    }
}

// Authentication Check
function requireAuth(role) {
    const user = getCurrentUser();
    if (!user) {
        alert("Please login to continue.");
        const isPagesDir = window.location.pathname.includes('pages');
        window.location.href = isPagesDir ? 'login.html' : 'pages/login.html';
        return;
    }
    if (role && user.role !== role) {
        alert("Access Denied.");
        window.location.href = window.location.pathname.includes('pages') ? '../index.html' : 'index.html';
    }
}

window.login = login;
window.logout = logout;
window.requireAuth = requireAuth;
window.getDoctorById = getDoctorById;
window.getDoctorsByCity = getDoctorsByCity;
window.saveAppointment = saveAppointment;
window.getAppointments = getAppointments;
window.getCurrentUser = getCurrentUser;
// window.clearData moved up
console.log("Doctors list loaded, count:", doctors.length);
