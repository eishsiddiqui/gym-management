# Gym Management System 🏋️‍♂️

A full-stack web application designed to streamline the operations of a modern fitness center. This system provides a comprehensive dashboard for administrators to efficiently manage members, trainers, employees, equipment, expenses, and membership plans.

## 🚀 Features

- **Authentication & Authorization**: Secure login for administrators.
- **Member Management**: Add, update, and view member profiles, assessments, and attendance records.
- **Trainer Management**: Keep track of trainers, their certifications, schedules, and assigned members.
- **Employee Management**: Manage staff details, salary records, and employee attendance.
- **Membership Plans**: Create and assign different membership types (e.g., Monthly, Yearly, VIP).
- **Equipment Tracking**: Maintain an inventory of gym equipment and monitor maintenance status.
- **Expense Tracking**: Log and track gym expenses for better financial management.
- **Admin Dashboard**: A centralized, modern UI built with Ant Design to oversee all gym operations.

## 💻 Tech Stack

### Frontend
- **React.js** (Vite for fast builds)
- **Ant Design (antd)** - Comprehensive UI component library
- **React Router** - For seamless client-side navigation
- **Axios** - For making API requests
- **CSS Modules** - For scoped, modular styling

### Backend
- **Node.js & Express.js** - Robust RESTful API server
- **Knex.js** - SQL query builder for flexible database interactions
- **MySQL / OracleDB** - Relational database support
- **dotenv** - For managing environment variables
- **CORS** - For secure cross-origin requests

## 🛠️ Installation & Setup

To run this project locally, you will need [Node.js](https://nodejs.org/) and a SQL Database (MySQL/Oracle) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/gym-management-main.git
cd gym-management-main
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` directory and configure your database credentials:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=gym_management
  PORT=3000
  ```
- Start the backend server:
  ```bash
  npm start
  ```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
- Start the Vite development server:
  ```bash
  npm run dev
  ```
- The frontend will be accessible at `http://localhost:5173`.

## 📂 Project Structure

```
gym-management-main/
├── backend/                  # Node.js + Express API
│   ├── index.js              # Entry point
│   ├── package.json
│   └── ...                   # Routes, Controllers, Database config
└── frontend/                 # React frontend (Vite)
    ├── package.json
    └── src/
        ├── components/       # Reusable UI components & layouts
        ├── pages/            # View components (Members, Employees, etc.)
        └── App.jsx           # Main React component
```

