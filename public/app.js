const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let current = null;
$('#user').value = localStorage.getItem('handle') || '';
$('#user').addEventListener('input', e => localStorage.setItem('handle', e.target.value));

async function loadProblems() {
  const ps = await (await fetch('/api/problems')).json();
  $('#problems tbody').innerHTML = ps.map(p =>
    `<tr data-id="${p.id}"><td>${p.id}</td><td>${esc(p.title)}</td><td>${p.rating}</td></tr>`).join('');
  document.querySelectorAll('tr[data-id]').forEach(tr => tr.onclick = () => show(ps.find(p => p.id === tr.dataset.id)));
}
function show(p) {
  current = p; $('#detail').hidden = false; $('#verdict').textContent = '';
  $('#ptitle').textContent = `${p.id}. ${p.title}`;
  $('#pstatement').textContent = p.statement;
  $('#psample').textContent = `Sample input:\n${p.sample.input}\n\nSample output:\n${p.sample.output}`;
  $('#pinput').href = `/api/problems/${p.id}/input`;
}
async function refresh() {
  const [board, subs] = await Promise.all([fetch('/api/leaderboard').then(r => r.json()), fetch('/api/submissions').then(r => r.json())]);
  $('#board tbody').innerHTML = board.map(u => `<tr><td>${esc(u.user)}</td><td>${u.solved}</td><td>${u.attempts}</td></tr>`).join('');
  $('#subs tbody').innerHTML = subs.map(s => `<tr><td>${esc(s.user)}</td><td>${s.problemId}</td><td class="${s.verdict.split(' ')[0]}">${s.verdict}</td></tr>`).join('');
}
$('#form').onsubmit = async e => {
  e.preventDefault();
  const user = $('#user').value.trim();
  if (!user) return alert('Enter a handle first');
  const r = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, problemId: current.id, answer: $('#answer').value }) });
  const s = await r.json();
  $('#verdict').innerHTML = `Verdict: <span class="${s.verdict.split(' ')[0]}">${s.verdict}</span>`;
  refresh();
};
loadProblems(); refresh(); setInterval(refresh, 5000);
