# Mini Codeforces (dynamic demo)

Node + Express API serving a static frontend. Answer-only judge (never executes user code).

Run: `npm install && npm start` → http://localhost:3000

Endpoints: `GET /api/health`, `/api/problems`, `/api/problems/:id/input`, `POST /api/submit`, `GET /api/leaderboard`, `/api/submissions`

## Deploy
- **Render**: New → Web Service, Root Directory `dynamic`, Build `npm install`, Start `npm start`.
- **DigitalOcean App Platform**: Web Service, source dir `/dynamic`, run command `npm start`, HTTP port 8080 (it injects `PORT`).
- **Vercel**: Root Directory `dynamic`; `vercel.json` routes everything to `server.js` as a serverless function.

## Teaching notes
Data lives in memory: it resets on restart, and on Vercel (serverless) each instance has its own copy, so the leaderboard can look inconsistent. Great demo of why you need a database (e.g. Postgres on Render/DO).
