// Shared stateless helpers for the cutter tools (mask-cutter, bezier-cutter).
// Pure functions only — no tool state. Loaded before each page's main script.

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function fmtNum(n) { return Math.round(n).toLocaleString('en-US'); }

function formatBytes(b) {
  if (b < 1024) return b + ' B';
  if (b < 1024*1024) return (b / 1024).toFixed(1) + ' kB';
  return (b / (1024*1024)).toFixed(2) + ' MB';
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16)];
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function sanitizeFileName(s) {
  // strip combining diacritical marks (U+0300..U+036F) then non-ASCII-safe chars
  const stripped = s.normalize('NFKD').replace(/[̀-ͯ]/g, '');
  return stripped.replace(/[^a-zA-Z0-9-_]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase() || 'untitled';
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function updateSliderVisual(el, val, min, max) {
  const pct = (val - min) / (max - min) * 100;
  el.querySelector('.fill').style.width = pct + '%';
  el.querySelector('.knob').style.left = pct + '%';
}

function downloadIcon() { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`; }

function eyeOn() { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>`; }

function eyeOff() { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`; }

function trash() { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`; }
