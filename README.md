# Notification Microservices System (Node.js, Redis, MongoDB)

This project is a scalable microservices-based notification system built with Node.js, Redis, MongoDB, and Docker. It handles email and SMS/OTP notifications using job queues and background workers.

---

## 🚀 Features

- RESTful API to trigger email and SMS/OTp notifications
- Bull-based message queues (emailQueue, smsQueue)
- Background workers to send emails (Nodemailer) and SMS (Twilio)
- MongoDB logging for success and failure
---

## 📦 Tech Stack

- Framework: Expressjs
- Library: Bull, Nodemailer, Twilio
- Database: MongoDB, Redis
---

## 🧱 Microservices Architecture

```bash
.
├── api                # API server to receive notification requests
├── email-serivice             # Background email worker.js
├── sms-service                # Background sms worker.js
|--- Logger                    # Mongodb Logger collection
└── README.md
