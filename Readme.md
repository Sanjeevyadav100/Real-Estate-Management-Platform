# 🏠 PropManage – Real Estate Management Platform  

## 📖 Overview  
**PropManage** is a full-stack real estate management platform where users can browse and explore property listings, while administrators can manage listings through a secure dashboard.  

The project showcases **modern web development practices**, including a **React + Express** architecture, **PostgreSQL** for persistent data storage, and **type-safe development** throughout the stack.  

---

## ⚙️ Tech Stack  

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React 18, TypeScript, Vite, Wouter, TanStack Query, Tailwind CSS, shadcn/ui |
| **Backend** | Express.js, Passport.js, Drizzle ORM |
| **Database** | PostgreSQL (via Neon) |
| **Auth & Security** | bcryptjs, express-session, connect-pg-simple |
| **Build Tools** | esbuild, Drizzle Kit |
| **Validation** | Zod, React Hook Form |

---

## 🧠 Architecture Overview  

### 🖥️ Frontend  
- **React + Vite** for fast builds and HMR  
- **shadcn/ui + Tailwind CSS** for a clean, responsive design  
- **React Query** for automatic data caching and refetching  
- **React Context** for managing auth, theme, and session states  
- **Role-based UI** for admin and user dashboards  
- **Form validation** using React Hook Form + Zod  

### ⚙️ Backend  
- **Express.js** REST API with structured route handling  
- **Passport.js + Sessions** for user authentication  
- **Role-based access control** (`requireAdmin`, `requireAuth`)  
- **Drizzle ORM** for type-safe queries  
- **Error handling middleware** for consistent API responses  

### 🗃️ Database  
- **PostgreSQL (Neon)** for reliable data storage  
- **connect-pg-simple** for storing user sessions  
- **Schema design** with UUID primary keys and foreign keys  
- **Drizzle ORM + Zod** for unified schema validation  

---

## 📁 Project Folder Structure  

```text
PropManage/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom hooks (useAuth, useTheme, etc.)
│   │   ├── pages/            # Application pages (public & dashboard)
│   │   └── App.tsx           # Root component
│   └── vite.config.ts        # Vite configuration
├── server/                  # Express backend
│   ├── routes/               # API routes
│   ├── storage/              # Data access / storage layer
│   ├── middleware/           # Auth & error handling
│   └── index.ts              # Server entrypoint
├── shared/                  # Shared types between client and server
├── drizzle/                 # Database schema & migrations
├── package.json
├── tsconfig.json
└── .env.example



```
---
## 🚀 Development Setup 
```bash
# 1. Clone repository
git clone https://github.com/<your-username>/PropManage.git
cd PropManage

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env

# 4. Run database migrations
npx drizzle-kit push

# 5. Start development servers
npm run dev

```
