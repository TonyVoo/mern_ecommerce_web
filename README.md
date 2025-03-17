🛒 MERN E-commerce Website
A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with user authentication, product management, and order handling.

🚀 Features
User Authentication: Register, login, and JWT-based authentication
Admin Panel: Manage products, categories, and orders
Product Management: Add, update, delete products with images
Shopping Cart: Add/remove items, adjust quantity
Order Processing: Place and track orders

🛠 Tech Stack
Frontend: React.js, Redux (for state management), CSS
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JWT (JSON Web Token)

📦 Installation
1️⃣ Clone the repository
bash
Copy code
git clone https://github.com/your-username/your-repo.git
cd your-repo
2️⃣ Install dependencies
bash
Copy code
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
3️⃣ Setup environment variables
Create a .env file in both frontend and backend folders and add required environment variables:

Backend (backend/.env)
env
Copy code
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

4️⃣ Run the app
Start the backend server
bash
Copy code
cd backend
npm run dev
Start the frontend
bash
Copy code
cd frontend
npm start
