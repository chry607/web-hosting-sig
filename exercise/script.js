const expr = document.getElementById('expr');
const out = document.getElementById('out');
let cur = '0', prev = null, op = null, fresh = false;
const sym = { '/': '÷', '*': '×', '-': '−', '+': '+' };

function calc(a, b, o) {
  a = parseFloat(a); b = parseFloat(b);
  if (o === '/' && b === 0) return 'Error';
  const r = { '+': a + b, '-': a - b, '*': a * b, '/': a / b }[o];
  return String(parseFloat(r.toPrecision(12)));
}
function render() {
  out.textContent = cur;
  expr.textContent = prev !== null ? `${prev} ${sym[op]}` : '';
}
function press(k) {
  if (cur === 'Error' && k !== 'C') return;
  if (/\d/.test(k)) {
    cur = (cur === '0' || fresh) ? k : cur + k; fresh = false;
  } else if (k === '.') {
    if (fresh) { cur = '0.'; fresh = false; } else if (!cur.includes('.')) cur += '.';
  } else if (k === 'C') {
    cur = '0'; prev = op = null; fresh = false;
  } else if (k === '⌫') {
    cur = cur.length > 1 && !fresh ? cur.slice(0, -1) : '0';
    if (cur === '-') cur = '0';
  } else if (k === '%') {
    cur = String(parseFloat(cur) / 100);
  } else if (k in sym) {
    if (op && !fresh) cur = calc(prev, cur, op);
    prev = cur; op = k; fresh = true;
  } else if (k === '=' && op) {
    cur = calc(prev, cur, op); prev = op = null; fresh = true;
  }
  render();
}
document.getElementById('keys').addEventListener('click', e => {
  if (e.target.dataset.k) press(e.target.dataset.k);
});
addEventListener('keydown', e => {
  const k = e.key === 'Enter' ? '=' : e.key === 'Backspace' ? '⌫' : e.key === 'Escape' ? 'C' : e.key;
  if (/^[\d.+\-*/%=]$|^⌫$|^C$/.test(k)) { e.preventDefault(); press(k); }
});
const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch {}
document.getElementById('theme').onclick = () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
};
