# Student Registration Form - React + TailwindCSS + Node.js + MongoDB

A full-stack application for registering students, built with:
- **Frontend**: React (Vite) + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB

## 📂 Project Structure
├── backend/ # Node.js + Express backend
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── server.js # Entry point for backend
│ └── package.json
│
├── frontend/ # React + TailwindCSS frontend
│ ├── public/ # Static assets
│ ├── src/ # Components, pages, etc.
│ ├── package.json
│ └── vite.config.js
│
└── README.md

## 🚀 Getting Started
### 1️⃣ Clone the repository
git clone https://github.com/sanchi2024/Student_Registration_Form_REACT-TailwindCSS.git
cd Student_Registration_Form_REACT-TailwindCSS
### 2️⃣ Install dependencies
## Backend
cd backend
npm install
## Frontend
cd frontend
npm install
## ⚙️ Running the project
## Start the backend
cd backend
npm start
The backend will run on http://localhost:5000 (or as configured in your server).
## Start the frontend
cd frontend
npm run dev
The frontend will run on http://localhost:5173 (default Vite port).

## 🌐 API Endpoints
| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/api/register` | Register a new student |
| GET    | `/api/students` | Get all students       |

## 🛠 Technologies Used
React (Vite)
TailwindCSS
Node.js
Express
MongoDB (Mongoose)
Vite Proxy for API calls

📌Notes
Ensure MongoDB is running locally or provide a cloud connection string in your .env file.
Update vite.config.js in frontend to match your backend port if changed.
<img width="1919" height="1011" alt="Screenshot 2025-08-09 092900" src="https://github.com/user-attachments/assets/2e7caba7-e140-42a4-8a00-ee803406cf85" />


