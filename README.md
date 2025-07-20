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

<pre>src/
├── components/ # Reusable UI components
├── context/ # Global state (Bookmarks, Employees)
├── hooks/ # Contains custom hooks
├── pages/ # Routed views
├── App.jsx # Main layout and routes
└── main.jsx # Entry point </pre>




## 🧑‍💻 Getting Started

### 1. Clone the Repo

<pre>bash
git clone https://github.com/devanshag89/HR_Dashboard.git
cd HR_Dashboard
cd client
npm install
npm run dev</pre>

## Screeshots

### 1. Dashboard
<img width="1902" height="870" alt="Screenshot 2025-07-20 214705" src="https://github.com/user-attachments/assets/70958acc-cd0b-42e3-91b5-2e5360311c27" />

### 2. Employee Details
<img width="1898" height="866" alt="Screenshot 2025-07-20 214934" src="https://github.com/user-attachments/assets/888c52c6-a906-48bb-8768-31b0bd99226c" />
<img width="1898" height="867" alt="Screenshot 2025-07-20 214951" src="https://github.com/user-attachments/assets/e06fcada-3abd-4d6f-af09-827d0a056a97" />

### 3. Bookmarks
<img width="1901" height="909" alt="Screenshot 2025-07-20 222752" src="https://github.com/user-attachments/assets/7ebd18a0-fc38-43e4-8afe-6792556570bc" />

### 4. Analytics
<img width="1900" height="867" alt="Screenshot 2025-07-20 214831" src="https://github.com/user-attachments/assets/bb76c02a-80ad-43a7-bf72-48e9a6a30f52" />
<img width="1896" height="866" alt="Screenshot 2025-07-20 214853" src="https://github.com/user-attachments/assets/42ae9807-ba23-47dd-990f-c04fb07901a7" />








