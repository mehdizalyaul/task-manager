# 🗂️ Task Manager

A simple and modern **task management application** built with **React.js** on the frontend and **Node.js (Express)** on the backend, using **MySQL** for data persistence.  
This project focuses on clean architecture, REST API communication, and an intuitive user experience.
---

## ✨ Features

- Create, edit, and delete projects (boards)
- Create, update, and delete tasks
- Organize tasks into columns (To Do, In Progress, Review, Done)
- Drag and drop tasks between columns
- Search tasks with debounce
- Responsive UI
- Dark mode support

---

## 🛠️ Technologies Used

### Frontend: React.js, JavaScript (ES6+), CSS, dnd-kit, Fetch API

### Backend: Node.js, Express.js, RESTful API

### Database: MySQL

---

### Setup

Clone the repository:

```bash
git clone git@github.com:mehdizalyaul/task-manager.git
```

### Setup Frontend

Navigate to the project directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and go to `http://localhost:5173` to see the application in action.

### Setup Backend

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env
```

Start the server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:5000/api
```



