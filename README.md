Eco Read Loop

<img src="Screenshot (271).png" alt="Screenshot1" width="600"> <img src="Screenshot (272).png" alt="Screenshot2" width="600"> <img src="Screenshot (273).png" alt="Screenshot3" width="600"> <img src="Screenshot (274).png" alt="Screenshot4" width="600"> <img src="Screenshot (275).png" alt="Screenshot5" width="600"> <img src="Screenshot (276).png" alt="Screenshot6" width="600">

Eco Read Loop is a modern, responsive platform dedicated to secondhand books. It allows users to discover, buy, exchange, and organize secondhand books across multiple categories. With Eco Read Loop, you can track your personal library of secondhand books, add favorites to your wishlist, and manage your collection efficiently.

The app encourages sustainable reading by giving secondhand books a second life, making it easy for readers to enjoy pre-loved books while reducing waste. Whether you’re browsing for your next read or managing your own secondhand books for sale or exchange, Eco Read Loop is your go-to hub for all things related to secondhand books.

Features

Secondhand Book Marketplace

Browse, wishlist, and track secondhand books.

Responsive Layout

Desktop: Fixed sidebar

Mobile: Toggleable drawer

Background Video

Full-screen video with dark overlay

Authentication

Conditional navbar links for signed-in users

Sign in / Sign up for new users

User Dashboard

Profile page

Wishlist

My Books

Dynamic Categories

Fetches categories from backend

Links formatted for URL

Eco-Friendly Concept

Encourages reusing and exchanging secondhand books

Dark Mode Friendly

Tailwind CSS styling with dark background

Screenshots




Installation

Clone the repository:

git clone https://github.com/yourusername/ecoreadloop.git
cd ecoreadloop


Install dependencies:

npm install


Set up .env files:

Frontend (.env in src folder):

REACT_APP_API_URL=http://localhost:5000


Backend (.env in backend folder):

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Run the backend server:

cd backend
npm install
node server.js


Run the frontend:

cd frontend
npm start


Open http://localhost:3000
 in your browser.

Project Structure
ecoreadloop/
│
├─ frontend/
│   ├─ src/
│   │   ├─ components/
│   │   │   ├─ Navbar.jsx
│   │   │   ├─ BackgroundVideo.jsx
│   │   │   └─ AppLayout.jsx
│   │   ├─ pages/
│   │   ├─ App.jsx
│   │   └─ index.js
│   └─ package.json
│
├─ backend/
│   ├─ models/
│   ├─ routes/
│   ├─ server.js
│   └─ package.json
│
└─ README.md

Technologies Used

React 18

React Router v6

Tailwind CSS

Lucide-react Icons

Node.js & Express (backend)

MongoDB & Mongoose

Usage

Sign In / Sign Up to access authenticated features.

Desktop: Sidebar is always visible.

Mobile: Toggle menu via hamburger icon.

Browse Categories: Find secondhand books by category.

Wishlist & My Books: Available for authenticated users.

Eco-Friendly Reading: Contribute to reusing and exchanging secondhand books.

Backend Repository

The backend of Eco Read Loop powers all core functionalities such as authentication, book management, categories, and wishlists.
You can explore the backend source code and setup guide here:

👉 Eco Read Loop Backend Repository
https://github.com/VshnviJ07/EcoReadloop-backend
