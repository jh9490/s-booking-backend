# 📦 s-booking-backend — Directus CMS Setup

This repository contains the backend implementation for the **ANC FM Service Booking App**, powered by [Directus](https://directus.io). It provides content management, REST API endpoints, and file storage to support the mobile app used by technicians, supervisors, and customers.

---

## 🚀 Features

* 🔐 **Custom Login** with mobile number & password
* 📂 **File Uploads** (images attached to requests)
* 🧠 **Relational Data Models**

  * Many-to-many between `requests` and `files`
* 🧾 **Request Status Tracking** (scheduled, pending, done, canceled)
* 📡 **REST API & Webhooks Ready**

---

## 📁 Project Structure

```bash
.
├── directus/                 # Directus core
├── extensions/              # Custom endpoints and hooks
│   ├── endpoints/
│   │   └── custom-login/
│   └── interfaces/
├── database/                # PostgreSQL (external)
├── uploads/                 # File storage (local or S3-ready)
├── .env                     # Config variables
├── directus.config.js       # Project config
└── README.md
```

---

## 🧪 Development

### 1. Clone and install dependencies

```bash
git clone https://github.com/jh9490/s-booking-backend.git
cd s-booking-backend
npm install
```

### 2. Configure environment

Create a `.env` file:

```ini
PORT=8055
PUBLIC_URL=http://localhost:8055
SECRET=your_secret_key
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=directus
```

### 3. Start Directus locally

```bash
npx directus start
```

> ✅ Make sure PostgreSQL is running and the `directus` database is created.

---

## 🛠️ Custom Endpoint: `/custom-login`

Allows user login via mobile number instead of email.
Used by mobile app to retrieve access/refresh tokens.

---

## 🔄 Deployment

You can run this backend with Docker:

```bash
docker-compose up -d
```

Or host it via platforms like:

* Render
* Railway
* Fly.io

---

## 📜 License

MIT License

---
