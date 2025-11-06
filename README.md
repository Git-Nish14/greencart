# 🛒 Green Cart

A full-stack grocery delivery application built with a modern React-based frontend and a robust Node.js backend. Designed to provide a seamless and efficient shopping experience for users to browse, order, and get groceries delivered to their doorstep.

![Next JS](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)

---

## ✨ Features

* **Modern UI:** Browse grocery items with smooth animations (Framer Motion) and a fully responsive UI (Tailwind CSS).
* **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens) and Bcrypt for password hashing.
* **Shopping Cart:** A complete shopping cart and checkout experience.
* **Payment Integration:** Seamless payments powered by Stripe.
* **Order Management:** Robust order management system with status tracking for users.
* **Admin Panel:** A dedicated dashboard for admins to manage products, view orders, and update statuses.
* **PDF Invoices:** Automatic generation of PDF invoices (jsPDF & html2canvas) upon successful order.
* **Email Notifications:** Automated email notifications for order confirmation using Nodemailer.
* **Image Uploads:** Product image uploads handled via Multer and hosted on Cloudinary.
* **Real-time Notifications:** User-friendly toast notifications for a better UX using React Hot Toast.

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js
* **Library:** React
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Notifications:** React Hot Toast
* **PDF Generation:** jsPDF & html2canvas

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt
* **File Uploads:** Multer & Cloudinary
* **Payments:** Stripe
* **Email Service:** Nodemailer
* **Environment:** dotenv
* **Middleware:** CORS

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You must have [Node.js](https://nodejs.org/) (which includes npm) installed on your computer.

### 1. Clone the Repository

```bash
git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/grocery-delivery-app.git
cd grocery-delivery-app
```
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install


# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Nodemailer (e.g., using Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Server Port
PORT=8000


# The URL of your running backend server
NEXT_PUBLIC_SERVER_URL=http://localhost:8000

# Your Stripe *Publishable* Key (this is different from the Secret Key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# In your first terminal (from the /server directory):
npm run dev

# In your second terminal (from the /client directory):
npm run dev

👤 Author
Nish Patel

Website: https://nishpatel.dev

LinkedIn: [https://www.linkedin.com/in/nishpatel14/]

GitHub: [https://github.com/Git-Nish14]

📄 License
This project is licensed under the MIT License. See the LICENSE.md file for details.
