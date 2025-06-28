# 📨 Notification Microservices System (Node.js, Redis, MongoDB)

This project is a scalable microservices-based notification system built with Node.js, Redis, MongoDB, and Docker. It handles email and SMS/OTP notifications using job queues and background workers.

---

## 🚀 Features

- RESTful API to trigger email and SMS/OTP notifications
- Bull-based message queues (emailQueue, smsQueue)
- Background workers to send emails (Nodemailer) and SMS (Twilio)
- Job retry logic (up to 3 attempts)
- MongoDB logging for success and failure
- Dockerized setup with Docker Compose

---

## 📦 Tech Stack

- Node.js (Express)
- Bull (with Redis)
- MongoDB (Mongoose)
- Nodemailer (Email)
- Twilio (SMS OTP)
- Docker & Docker Compose

---

## 🧱 Microservices Architecture

```bash
.
├── api                # API server to receive notification requests
├── worker             # Background workers (emailWorker.js, smsWorker.js)
├── queues             # Bull queues for email & SMS
├── models             # Mongoose schemas (Log, etc.)
├── docker-compose.yml
└── README.md
