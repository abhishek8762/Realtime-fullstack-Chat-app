# 💬 Unity Chat

A full-stack, real-time group chat web app with emoji support, theming, online presence, leaderboard, and more — built using the MERN stack with Zustand and Socket.IO.

---

## 🚀 Features

- 🔐 **Secure Auth**: JWT-based login/signup with cookies and protected routes
- 🌙 **Theme Toggle**: Light/dark mode switch using Zustand state
- 💬 **Single Chat Head**: All users chat in one room with live updates
- 🧑‍💻 **Online Users**: Real-time online status with green dot indicators
- ⏱️ **Date Separators**: Intelligent timestamp display (Today, Yesterday, etc.)
- 🔁 **Reply to Messages**: View referenced message and sender info
- 😀 **Emoji Support**: Use emoji picker to send emojis in chat
- 🧑‍🎓 **Random Avatar on Signup**: Users get one of six random profile pictures
- 🏆 **Leaderboard**: Ranks users by total messages using MongoDB aggregation
- 👤 **User Profile Page**: Displays avatar, email, join date, and logout button

---

## 🛠️ Tech Stack

### 🌐 Frontend

- **React 19**
- **Zustand** for global state
- **Tailwind CSS + DaisyUI**
- **React Router DOM v7**
- **Socket.IO Client**
- **Emoji Picker React**
- **Moment.js**
- **React Icons & Lucide**

### 🧠 Backend

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Socket.IO**
- **Mongo Aggregation Pipeline**
- **Cookie-Parser, BcryptJS, CORS, Dotenv**

---

## 📸 Screenshots

> *(Add images here if available: chat interface, leaderboard, profile page, etc.)*

---

## 🧑‍💻 How to Run Locally

### 🔧 Backend Setup

```bash
git clone https://github.com/your-username/unity-chat.git
cd unity-chat/server
npm install
touch .env
