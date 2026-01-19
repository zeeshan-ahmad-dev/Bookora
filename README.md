# Bookora

Bookora is a full‑stack **e‑commerce bookstore** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.
It provides a complete online book shopping experience including authentication, cart management, checkout flow, and an admin‑friendly backend architecture.

Users can add and remove books from the cart, place orders, and view order summaries.
Admins can add new books to the platform.

## Tech Stack

### Frontend

* **React.js**
* **Tailwind CSS**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **Cloudinary** for image uploads
* **Passport.js** for Google OAuth
* **Stripe API** (test mode payments)

---

## Project Structure

```
Bookora/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── services/
│   ├── config/
│   ├── db/
│   ├── utils/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
│   └── .env
│
├── README.md
```

---

## Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

```
PORT=8000
SESSION_SECRET=YOUR_SECRET
DB_URI=YOUR_MONGODB_URL
JWT_SECRET=YOUR_JWT_SECRET

CLOUDINARY_CLOUD_NAME=CLOUDINARY_NAME
CLOUDINARY_API_KEY=KEY
CLOUDINARY_API_SECRET=SECRET

SMTP_EMAIL=YOUR_SMTP_EMAIL
SMTP_PASS=PASS_KEY
SMTP_PORT=465
SMTP_HOST=smtp.gmail.com

GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=SECRET

STRIPE_SECRET=YOUR_STRIPE_SECRET
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET
```

---

## Running the Project Locally

### 1. Clone the Repository

```
git clone https://github.com/your-username/bookora.git
cd bookora
```

### 2. Backend Setup

```
cd server
npm install
npm run dev
```

> **Note:** Make sure all required environment variables are correctly configured in the `.env` file before starting the backend server.

### 3. Frontend Setup

```
cd client
npm install
npm run dev
```

---

## API Status Codes

* `200` – Success
* `400` – Bad request
* `401` – Unauthorized
* `404` – Resource not found
* `500` – Server error

---

## Author

**Zeeshan Ahmad**
BS Software Engineering
Full‑Stack Web Developer (MERN/MEVN)

---
