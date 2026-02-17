# 🍽️ Food Order App

A full‑stack **Food Ordering Application** built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.  
Users can browse meals, manage their cart, and place orders — with clean UI components, custom hooks, and global state management.

---

## 🚀 Features

### **Frontend**
- React + Vite for fast development
- Global state with **Context API**
- Reusable UI components (Modal, Button, Input, etc.)
- Custom HTTP hook (`useHttp`) for API communication
- Cart functionality with quantity controls
- Checkout form with validation
- Error & loading handling

### **Backend**
- Node.js + Express server
- Serves static meal data from `/data`
- Accepts and stores user orders
- Designed to be minimal and extendable

## 📁 Project Structure

FOOD-ORDER-APP/
├── backend/
│   ├── data/
│   ├── public/
│   ├── app.js
│   └── package.json
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── UI/
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── Checkout.jsx
│   │   ├── Error.jsx
│   │   ├── Header.jsx
│   │   ├── MealItem.jsx
│   │   └── Meals.jsx
│   │
│   ├── hooks/
│   │   └── useHttp.jsx
│   │
│   ├── store/
│   │   ├── CartContext.jsx
│   │   └── UserProgress.jsx
│   │
│   ├── utils/
│   │   └── formatting.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── vite.config.js
└── README.md

## For Running

### **Frontend**
npm install
npm run dev

### **Backend**
cd backend
npm install
node app.js