# 🧠 CodeShere — Modern Web-Based Code Editor

CodeShere is a full-stack web-based code editor built with **React**, **Express**, **Prisma**, and **CodeMirror**.  
It enables developers to write and manage code through a fast, minimal, and responsive interface — right in the browser.

---

## 🚀 Features

- ⚡ **Real-time Code Editing** — Syntax highlighting with CodeMirror 6.  
- 🔐 **Authentication System** — Signup, login, and cookie-based JWT verification.  
- 🗄️ **Database Integration** — Prisma ORM connected with PostgreSQL.  
- 💾 **Project Save System** — Store and retrieve your code easily.  
- 🖥️ **Modern UI** — Built using React + TailwindCSS for a clean, modern feel.  
- 🔄 **Protected Routes** — Access control for authenticated users only.  

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router DOM
- CodeMirror 6

### Backend
- Node.js + Express
- Prisma ORM
- JSON Web Tokens (JWT)
- Cookie Parser
- PostgreSQL (Render-hosted)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

-git clone https://github.com/<your-username>/CodeShere.git
-cd CodeShere

2️⃣ **Backend Setup**
-cd backend
-npm install

-Create a .env file inside /backend:

-DATABASE_URL="your_postgres_connection_url"
-JWT_SECRET="your_secret_key"

-Run Prisma migrations:
-npx prisma migrate dev

-Start the backend:
-npm run start

3️⃣ **Frontend Setup**

-cd ../frontend
-npm install
-npm run dev

-The frontend will start at http://localhost:5173
-The backend will run at http://localhost:4444

🌐 **Deployment**

-Frontend: Netlify
-Backend: Render
-Live Demo: https://codesphere-mayank.netlify.app/

🧪 **Testing Locally**

-Start the backend first

-Then start the frontend

-Sign up, log in, and start coding inside the editor

-📸 Preview
-🛠️ Future Enhancements
-🌈 Multi-language syntax support
-☁️ Cloud-based file saving
-📤 Shareable project links

👨‍💻 **Author**

-Mayank Aggarwal
-Full Stack Web Developer
-📍 Haryana, India

🔗 Portfolio Website

📧 aggarwalmayank184@gmail.com
