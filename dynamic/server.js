const express = require('express');
const path = require('path');
const problems = require('./problems');

const app = express();
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store. Resets on restart/redeploy and is per-instance
// (great talking point: why you need a database in production).
const submissions = [];
const norm = s => String(s).trim().replace(/\s+/g, ' ');
const pub = ({ answer, input, ...p }) => p;

app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.get('/api/problems', (_req, res) => res.json(problems.map(pub)));
app.get('/api/problems/:id', (req, res) => {
  const p = problems.find(p => p.id === req.params.id.toUpperCase());
  p ? res.json(pub(p)) : res.status(404).json({ error: 'Not found' });
});
app.get('/api/problems/:id/input', (req, res) => {
  const p = problems.find(p => p.id === req.params.id.toUpperCase());
  p ? res.type('text/plain').send(p.input) : res.status(404).end();
});

app.post('/api/submit', (req, res) => {
  const { user, problemId, answer } = req.body || {};
  const p = problems.find(p => p.id === String(problemId).toUpperCase());
  if (!p || !user || typeof answer !== 'string') return res.status(400).json({ error: 'user, problemId and answer are required' });
  const verdict = norm(answer) === norm(p.answer) ? 'Accepted' : 'Wrong answer';
  const s = { id: submissions.length + 1, user: String(user).slice(0, 20), problemId: p.id, verdict, at: new Date().toISOString() };
  submissions.push(s);
  res.json(s);
});

app.get('/api/submissions', (_req, res) => res.json(submissions.slice(-20).reverse()));

app.get('/api/leaderboard', (_req, res) => {
  const board = {};
  for (const s of submissions) {
    const u = board[s.user] ||= { user: s.user, solved: new Set(), attempts: 0 };
    u.attempts++;
    if (s.verdict === 'Accepted') u.solved.add(s.problemId);
  }
  res.json(Object.values(board)
    .map(u => ({ user: u.user, solved: u.solved.size, attempts: u.attempts }))
    .sort((a, b) => b.solved - a.solved || a.attempts - b.attempts));
});

module.exports = app; // Vercel uses this export
if (require.main === module) {
  const port = process.env.PORT || 3000; // Render / DO inject PORT
  app.listen(port, '0.0.0.0', () => console.log(`Mini Codeforces on :${port}`));
}
