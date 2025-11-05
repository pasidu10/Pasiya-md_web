
eduai-pasiya-md/
├── client/           # React Frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
├── server/           # Node.js Backend (Express + MongoDB + OpenAI)
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
├── .env.example      # sample environment file
└── README.md





# PASIYA-MD - Full Base ZIP
This package contains the MVP base for PASIYA-MD:
- AI Engine (Python) -> ai_service/md_adaptive_core.py
- Backend (Node.js + MongoDB) -> server/
- Admin Panel (React) -> admin-panel/
- Mobile (Flutter skeleton) -> mobile/
- Local DB (Hive) -> mobile/lib/utils/local_db.dart
- Sync Service -> mobile/lib/services/sync_service.dart

## Quick start (Termux / Android)
1. Install Termux and update packages:
   pkg update && pkg upgrade
2. Install Node.js, npm, Python, and unzip:
   pkg install nodejs python git unzip
3. Unzip the package:
   unzip pasiya-md-base.zip -d pasiya-md
4. Server:
   cd pasiya-md/server
   npm install
   export MONGODB_URI='your-mongodb-uri'
   export JWT_SECRET='a_strong_secret'
   node server.js
5. Admin Panel (local dev):
   cd pasiya-md/admin-panel
   # on Termux you may not run full CRA; prefer to use a laptop for frontend.
   npm install
   npm start
6. Mobile:
   Open the mobile folder in your Flutter environment (recommend laptop for Flutter builds).
   flutter pub get

## Notes
- This is a starter skeleton. For production, add proper authentication, validation, HTTPS, CORS, and environment configuration.
- Replace placeholder URIs and secrets before deploying.
