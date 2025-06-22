# 🐄 Gaushala Management Web Portal

A web-based solution to streamline cow shelter (Gaushala) operations – from donations to team management, legal support, and awareness. Built with ❤️ using Node.js, Express.js, EJS, HTML, CSS, and JavaScript.

---

## 📌 Features

- 🧾 **Donation System** – Accept donations with receipt generation.
- 👥 **Team Section** – Showcase your volunteers and administrators.
- 📷 **Gallery** – Display photos of cows, shelters, and events.
- 📜 **Legal Awareness** – Inform users about cow protection rights.
- 📩 **Contact Form** – Secure messaging with email notifications.
- 📁 **Dynamic Pages** – Manage content using EJS templates.
- 🔐 **Error Handling** – Custom error pages with graceful fallbacks.

---

## 🔧 Tech Stack

| Technology     | Description                    |
|----------------|--------------------------------|
| Node.js        | Backend runtime (JavaScript)   |
| Express.js     | Backend framework              |
| EJS            | Templating engine              |
| HTML/CSS/JS    | Frontend                       |
| Nodemailer     | For sending contact form emails |
| Render.com     | For deployment                 |

---

## 📂 Folder Structure

gaushala-project/
├── public/ # Static assets (CSS, images)
├── routes/ # Route handlers
├── views/ # EJS templates
│ ├── pages/ # Individual page templates
│ └── partials/ # Navbar, footer, etc.
├── .env # Environment variables
├── server.js # Main server file
├── package.json # Dependencies & scripts
└── README.md # Project overview