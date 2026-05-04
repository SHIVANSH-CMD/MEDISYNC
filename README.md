# 🏥 MEDISYNC — Doctor-Patient Appointment App

> A seamless platform connecting patients with doctors for easy appointment scheduling and management.

---

## 📌 Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

**MEDISYNC** is a full-stack Doctor-Patient Appointment web application that allows patients to book appointments with doctors, and doctors to manage their schedules — all in one place. It also includes an admin panel for managing users and appointments across the platform.

---

## ✨ Features

### 👤 Patient
- Register & login securely
- Search for doctors by name or specialty
- Book, reschedule, or cancel appointments
- View appointment history

### 🩺 Doctor
- Manage availability and schedule
- View upcoming patient appointments
- Update profile and specialization

### 🛠️ Admin
- Manage all doctors and patients
- View and control all appointments
- Dashboard with platform statistics

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | CSS / Tailwind |

---

## 📁 Project Structure

```
MEDISYNC/
├── admin/          # Admin panel (React)
├── frontend/       # Patient & Doctor UI (React)
├── backend/        # REST API (Node.js + Express)
│   ├── models/     # MongoDB schemas
│   ├── routes/     # API routes
│   ├── controllers/# Business logic
│   └── middleware/ # Auth & error handling
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/SHIVANSH-CMD/MEDISYNC.git
cd MEDISYNC
```

### 2. Setup Backend
```bash
cd backend
npm install
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Setup Admin Panel
```bash
cd admin
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the `/backend` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Made with ❤️ by <a href="https://github.com/SHIVANSH-CMD">SHIVANSH-CMD</a></p>
