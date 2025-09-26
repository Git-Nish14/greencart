Green Cart
A full-stack grocery delivery application built with a modern React-based frontend and a robust Node.js backend. Designed to provide a seamless and efficient shopping experience for users to browse, order, and get groceries delivered to their doorstep.

Features
Browse grocery items with smooth animations and responsive UI

User authentication and authorization

Shopping cart and checkout with Stripe payment integration

Order management and status tracking

Admin panel for managing products and orders

PDF invoice generation and email notifications

Image uploads with Cloudinary support

Real-time notifications using React Hot Toast

Tech Stack
Frontend
Next.js

React

Tailwind CSS

TypeScript

Axios

Framer Motion

React Router DOM

React Hot Toast

jsPDF & html2canvas

Nodemailer

Backend
Node.js

Express.js

TypeScript

MongoDB & Mongoose

JWT Authentication

Bcrypt

Multer

Cloudinary

Stripe

Nodemailer

dotenv

CORS

Author
Nish Patel
https://nishpatel.dev

Installation
Clone the repository

bash
Copy
Edit
git clone <your-repo-url>
cd grocery-delivery-app
Install frontend dependencies

bash
Copy
Edit
cd client
npm install
Install backend dependencies

bash
Copy
Edit
cd ../server
npm install
Setup environment variables

Create .env files in both client and server directories with the necessary environment variables such as:

MONGODB_URI

JWT_SECRET

STRIPE_SECRET_KEY

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

Other config variables

Running the app locally
Start backend server (from /server)

bash
Copy
Edit
npm run dev
Start frontend (from /client)

bash
Copy
Edit
npm run dev
Open http://localhost:3000 to view the app in your browser.

Author
Nish Patel
[Website](https://nishpatel.dev) | [LinkedIn](http://linkedin.com/in/nishpatel14) | [GitHub](https://github.com/Git-Nish14) | 

License
This project is licensed under the MIT License.
