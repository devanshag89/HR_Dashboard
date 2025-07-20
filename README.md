# HR_Dashboard

# 💼 HR Performance Dashboard (React + Tailwind)

A modern, responsive HR dashboard built with **React.js** and **Tailwind CSS** that allows HR managers to view, manage, and analyze employee performance data.

🔗 **Live Demo**: [View Dashboard](https://hr-dashboard-s0r9.onrender.com/)

---

## 🚀 Features

### 🏠 Dashboard
- Fetches real user data from [dummyjson.com](https://dummyjson.com/users)
- Displays employee cards with:
  - Full Name
  - Email
  - Age
  - Department
  - Randomized Performance Rating (1–5 stars)
- Actions:
  - View Details
  - Bookmark

### 🔍 Search & Filter *(planned enhancement)*
- Search by name/email/department
- Filter by department or rating

### 👤 Employee Details Page
- Full profile with:
  - Address
  - Contact Info
  - Company & Department
  - Rating & Badge
  - Tab based Overview, Projects and Feedback sections
- Dynamic Routing using `react-router-dom`

### 📌 Bookmark Manager
- View and manage all bookmarked employees
- Remove bookmarks

### 📊 Analytics Page
- Chart.js integration
- Shows department-wise average ratings

---

## 🛠️ Tech Stack

- **React.js** (via Vite)
- **Tailwind CSS**
- **React Router DOM**
- **Chart.js** (via `react-chartjs-2`)
- **Context API** for state management

## 📁 Project Structure

src/
├── components/ # Reusable UI components
├── context/ # Global state (Bookmarks, Employees)
├── hooks/ # Contains custom hooks
├── pages/ # Routed views
├── App.jsx # Main layout and routes
└── main.jsx # Entry point


---

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/devanshag89/HR_Dashboard.git
cd HR_Dashboard
cd client
npm install
npm run dev


