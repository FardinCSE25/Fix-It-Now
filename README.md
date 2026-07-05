# 🔧 FixItNow

> **Your Trusted Home Service Platform**

FixItNow is a backend REST API for a home service marketplace where customers can find skilled technicians, book home services, make online payments, and leave reviews. Technicians can manage their services, availability, and bookings, while administrators can manage users and service categories.

---

## 🚀 Features

### 👤 Authentication
- User Registration (Customer / Technician)
- User Login with JWT Authentication
- Get Current Logged-in User
- Role-based Authorization

### 🧑‍🔧 Technician
- Create & Update Technician Profile
- Manage Service Availability
- Create & Manage Services
- View Incoming Bookings
- Accept / Decline Bookings
- Update Booking Status

### 👨‍💼 Customer
- Browse Available Services
- View Technician Profiles
- Book Services
- Make Online Payments
- View Booking History
- Leave Reviews After Job Completion

### 🛡️ Admin
- View All Users
- Ban / Unban Users
- Manage Categories
- View All Bookings

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **Bcrypt**
- **Cookie Parser**
- **CORS**
- **Stripe (Payment)**

---

## 📁 Project Structure

```
src
│
├── app
│   ├── modules
│   ├── middlewares
│   ├── routes
│   ├── utils
│   ├── interfaces
│   └── errors
│
├── config
├── lib
├── app.ts
└── server.ts
```

---

## 📦 Installation

Clone the repository

```bash
git clone (https://github.com/FardinCSE25/Fix-It-Now)
```

Go to project directory

```bash
cd fixitnow
```

Install dependencies

```bash
npm install
```

---

## ▶️ Running the Project

Development

```bash
npm run dev

---

## 🗄️ Database Schema

The project contains the following models:

- User
- TechnicianProfile
- Category
- Service
- Availability
- Booking
- Payment
- Review

---

## 🔄 Booking Workflow

```text
Customer
    │
    ▼
Browse Services
    │
    ▼
Book Technician
    │
    ▼
REQUESTED
    │
    ▼
Technician Accepts
    │
    ▼
Payment
    │
    ▼
PAID
    │
    ▼
IN_PROGRESS
    │
    ▼
COMPLETED
    │
    ▼
Leave Review
```

---

## 👥 User Roles

### Customer

- Browse Services
- Book Technician
- Make Payment
- View Booking History
- Leave Reviews

### Technician

- Manage Profile
- Manage Availability
- Create Services
- Manage Bookings

### Admin

- Manage Users
- Manage Categories
- View All Bookings

---

## 🔐 Authentication

Authentication is implemented using:

- JWT Access Token
- JWT Refresh Token
- HTTP Only Cookies
- Password Hashing with Bcrypt

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/me` |

---

### Services

| Method | Endpoint |
|---------|----------|
| GET | `/api/services` |
| GET | `/api/categories` |
| GET | `/api/technicians` |
| GET | `/api/technicians/:id` |

---

### Bookings

| Method | Endpoint |
|---------|----------|
| POST | `/api/bookings` |
| GET | `/api/bookings` |
| GET | `/api/bookings/:id` |

---

### Payments

| Method | Endpoint |
|---------|----------|
| POST | `/api/payments/create` |
| POST | `/api/payments/confirm` |
| GET | `/api/payments` |
| GET | `/api/payments/:id` |

---

### Technician

| Method | Endpoint |
|---------|----------|
| PUT | `/api/technician/profile` |
| PUT | `/api/technician/availability` |
| GET | `/api/technician/bookings` |
| PATCH | `/api/technician/bookings/:id` |

---

### Reviews

| Method | Endpoint |
|---------|----------|
| POST | `/api/reviews` |

---

### Admin

| Method | Endpoint |
|---------|----------|
| GET | `/api/admin/users` |
| PATCH | `/api/admin/users/:id` |
| GET | `/api/admin/bookings` |
| GET | `/api/admin/categories` |
| POST | `/api/admin/categories` |

---

## 👨‍💻 Author

**Fardin Ahmed**

---
