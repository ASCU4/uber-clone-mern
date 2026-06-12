# 🚖 Uber Clone - MERN Stack Ride Booking Platform

> Built a **MERN-based Uber Clone** with a **mobile-first responsive UI (375×667 viewport)** featuring ride booking, live tracking, captain matching, OTP verification, and real-time ride status updates.

---

## 📱 Project Overview

This project replicates the core workflow of Uber's ride-hailing platform. Users can register, search for locations, book rides, select vehicle types, and track their rides in real time.

Captains (drivers) can go online, receive ride requests, verify OTPs, navigate to destinations, and complete rides.

The application is built using the **MERN Stack** and follows a **mobile-first design approach** optimized for smartphone screens.

---

## ✨ Features

### 👤 User Features

* User Registration & Login
* JWT Authentication
* Protected Routes
* Search Pickup & Destination
* Ride Fare Calculation
* Vehicle Selection
* Ride Confirmation
* Real-Time Captain Matching
* Live Ride Tracking
* Ride Status Updates
* Ride Completion Screen
* Local Storage Ride Persistence

### 🚕 Captain Features

* Captain Registration & Login
* Vehicle Information Management
* Go Online / Offline
* Receive Ride Requests
* Accept / Reject Rides
* OTP Verification Before Ride Start
* Live Navigation
* Finish Ride Workflow
* Earnings Dashboard

### ⚡ Real-Time Features

* Real-Time Ride Requests
* Captain Matching
* OTP Verification
* Ride Status Synchronization
* Live Tracking
* Automatic Ride Completion Detection

### 🗺️ Maps & Location Features

* Interactive Maps with Leaflet
* Pickup & Destination Visualization
* Live Route Display
* Driver Tracking
* Distance Monitoring

### 🎨 UI/UX Features

* Mobile-First Design
* Responsive Layout (375×667 Viewport)
* Smooth GSAP Animations
* Uber-Inspired Interface
* Bottom Sheet Panels
* Modern Clean Design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* GSAP
* Remix Icons
* Leaflet
* React Leaflet

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* Bcrypt
* Express Validator
* Dotenv
* CORS

---

## 🔐 Authentication & Security

* JWT Authentication
* Password Hashing using Bcrypt
* Protected Routes
* User & Captain Role Separation
* Secure Cookie Storage

---

## 📂 Project Structure

```bash
UBER-Clone/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

## 📸 Screenshots

### 1️⃣ Landing Page

![Landing Page](https://github.com/ASCU4/uber-clone-mern/blob/a14c0d490242c9e11cdc37b9d1115f5bd90158f8/screenshots/Screenshot%20(368).png)

### 2️⃣ User Registration

![User Registration](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(369).png?raw=true)

### 3️⃣ Captain Registration

![Captain Registration](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(371).png?raw=true)

### 4️⃣ Find a Trip

![Find a Trip](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(372).png?raw=true)

### 5️⃣ Location Search Panel

![Location Search](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(373).png?raw=true)

### 6️⃣ Vehicle Selection

![Vehicle Selection](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(374).png?raw=true)

### 7️⃣ Ride Confirmation

![Ride Confirmation](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(375).png?raw=true)

### 8️⃣ Waiting For Rider

![Waiting For Rider](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(376).png?raw=true)

### 9️⃣ Captain Assigned

![Captain Assigned](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(377).png?raw=true)

### 🔟 Captain Dashboard

![Captain Dashboard](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(378).png?raw=true)

### 1️⃣1️⃣ New Ride Request

![New Ride Request](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(379).png?raw=true)

### 1️⃣2️⃣ OTP Verification

![OTP Verification](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(380).png?raw=true)

### 1️⃣3️⃣ Live Tracking

![Live Tracking](image_url)

### 1️⃣4️⃣ Finish Ride

![Finish Ride](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(381).png?raw=true)

### 1️⃣5️⃣ Ride Completion Success

![Ride Completion Success](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(382).png?raw=true)

### 1️⃣6️⃣ Ride Completed Screen

![Ride Completed](https://github.com/ASCU4/uber-clone-mern/blob/main/screenshots/Screenshot%20(384).png?raw=true)

---

## 🔄 Ride Flow

```text
User Login
     ↓
Select Pickup & Destination
     ↓
Choose Vehicle
     ↓
Confirm Ride
     ↓
Captain Receives Request
     ↓
Captain Accepts Ride
     ↓
OTP Verification
     ↓
Ride Starts
     ↓
Live Tracking
     ↓
Finish Ride
     ↓
Ride Completed
```

---

## 🌟 Highlights

* Full MERN Stack Architecture
* Mobile-First Responsive Design
* OTP-Based Ride Verification
* Captain Matching System
* Live Tracking with Leaflet Maps
* JWT Authentication
* MongoDB Integration
* GSAP Animations
* Local Storage Persistence
* Scalable Folder Structure

---

## 🔮 Future Improvements

* Socket.IO Real-Time Communication
* Google Maps Integration
* Payment Gateway Integration
* Ride History
* Ratings & Reviews
* Push Notifications
* Dark Mode
* Driver Earnings Analytics
* Ride Cancellation Workflow
* Multi-language Support

---

## 👨‍💻 Author

**Shivansh Thakur**

B.Tech Computer Science Engineering

Passionate about Full-Stack Development, MERN Stack, and building real-world applications.

⭐ If you like this project, don't forget to star the repository.

