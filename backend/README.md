# Next Blog Starter

A simple **Blog Application Starter Pack** built with **TypeScript** and **Express.js**.  
Designed for the **Next Level Web Development Bootcamp** to help learners practice Prisma hands-on by building a blog platform.

---

## 🚀 Features

- TypeScript + Express.js setup
- Modular project structure
- Easy environment configuration with `dotenv`
- Ready for blog modules (Posts, Users, etc.)

---

## 📦 Installation

**Clone the repository:**
```bash
git clone https://github.com/Apollo-Level2-Web-Dev/next-blog-starter.git
cd next-blog-starter
```

**Install dependencies:**
```bash
# npm
npm install
# yarn
yarn install
# pnpm
pnpm install
```

**Setup environment variables:**
```bash
cp .env.example .env
```

**Run the development server:**
```bash
# npm
npm run dev
# yarn
yarn dev
# pnpm
pnpm dev
```

---

## 🗂️ Folder Structure

```
Prisma-Blog/
│── node_modules/          # Dependencies
│── src/
│   ├── app.ts             # Express app configuration
│   ├── server.ts          # Server entry point
│   ├── config/            # Environment & config files
│   └── modules/           # App modules (posts, users, etc.)
│── package.json           # Project metadata & scripts
│── pnpm-lock.yaml         # pnpm lockfile
│── tsconfig.json          # TypeScript config
│── README.md              # Documentation
```

---

## 📜 Scripts

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```

---

## 🎯 Learning Objectives

This starter pack is part of the **Next Level Web Development Bootcamp** curriculum.

You will learn how to:
- Connect a Node.js app with Prisma ORM
- Build modular APIs
- Manage environment variables
- Structure scalable backend projects

---

> Happy Coding & Learning!
