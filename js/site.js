
// --- Helpers ---
function fmtPct(v, dec) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  dec = dec === undefined ? 1 : dec;
  const sign = v > 0 ? '+' : '';
  return sign + (v * 100).toFixed(dec) + '%';
}
function fmtNum(v, dec) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  dec = dec === undefined ? 0 : dec;
  return Number(v).toFixed(dec);
}
function fmtInr(v) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  if (v >= 1e7) return '₹' + (v/1e7).toFixed(1) + 'Cr';
  if (v >= 1e5) return '₹' + (v/1e5).toFixed(1) + 'L';
  return '₹' + Math.round(v).toLocaleString('en-IN');
}
function fmtPrice(v) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  return '₹' + Number(v).toFixed(2);
}
function clsForDelta(v) {
  if (v === null || v === undefined || isNaN(v)) return 'dim';
  if (v > 0) return 'up';
  if (v < 0) return 'down';
  return 'dim';
}
function tickerLink(t) {
  return '<a class="ticker-link" href="stock.html?t=' + encodeURIComponent(t) + '">' + t + '</a>';
}
function volTag(b) {
  if (!b) return '';
  return '<span class="tag ' + b + '">' + b + '</span>';
}
function capTag(c) {
  if (!c) return '';
  return '<span class="tag cap-' + c + '">' + c + '</span>';
}

// --- Sortable tables ---
function makeSortable(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const ths = table.querySelectorAll('thead th[data-sort]');
  ths.forEach((th, idx) => {
    th.addEventListener('click', () => {
      const sortKey = th.dataset.sort;
      const dataType = th.dataset.type || 'string';
      const tbody = table.tBodies[0];
      const rows = Array.from(tbody.rows);
      const ascending = th.classList.contains('sorted-asc') ? false : true;

      // Clear other sort indicators
      ths.forEach(t => t.classList.remove('sorted-asc', 'sorted-desc'));
      th.classList.add(ascending ? 'sorted-asc' : 'sorted-desc');

      rows.sort((a, b) => {
        const av = a.cells[idx].dataset.sortvalue || a.cells[idx].textContent.trim();
        const bv = b.cells[idx].dataset.sortvalue || b.cells[idx].textContent.trim();
        if (dataType === 'number') {
          const an = parseFloat(av);
          const bn = parseFloat(bv);
          const ax = isNaN(an) ? -Infinity : an;
          const bx = isNaN(bn) ? -Infinity : bn;
          return ascending ? ax - bx : bx - ax;
        }
        return ascending ? av.localeCompare(bv) : bv.localeCompare(av);
      });
      rows.forEach(r => tbody.appendChild(r));
    });
  });
}

// --- Search with live autocomplete ---
function initSearch() {
  const input    = document.getElementById('global-search');
  const dropdown = document.getElementById('search-dropdown');
  if (!input || !dropdown) return;
  const stocks = DATA.stocks || [];

  // Pre-sort by Combined JADE so the best matches surface first
  const sorted = stocks
    .filter(s => s.ticker)
    .sort((a, b) => (b.elo_combined || 0) - (a.elo_combined || 0));

  let selIdx = -1;
  let currentResults = [];

  function fmtJade(v) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return Math.round(v).toLocaleString();
  }
  function fmtRupee(v) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return '₹' + Number(v).toFixed(0);
  }

  function search(q) {
    if (!q) return [];
    q = q.toUpperCase().trim();
    // Score-based: exact > startsWith > contains
    const exact = [], starts = [], contains = [];
    for (const s of sorted) {
      const t = (s.ticker || '').toUpperCase();
      if (t === q) exact.push(s);
      else if (t.startsWith(q)) starts.push(s);
      else if (t.includes(q)) contains.push(s);
      if (exact.length + starts.length + contains.length >= 12) break;
    }
    return [...exact, ...starts, ...contains].slice(0, 10);
  }

  function render(results) {
    currentResults = results;
    if (!results.length) {
      if (input.value.trim()) {
        dropdown.innerHTML = '<div class="sr-empty">No matching ticker.</div>';
        dropdown.classList.add('visible');
      } else {
        dropdown.classList.remove('visible');
      }
      return;
    }
    const html = results.map((s, i) => {
      const sector = s.llm_sector || s.nse_sector || '—';
      const elo = fmtJade(s.elo_combined);
      const price = fmtRupee(s.last_price);
      const cap = s.cap_bucket ? `<span class="tag cap-${s.cap_bucket}">${s.cap_bucket}</span>` : '';
      return `<a href="stock.html?t=${encodeURIComponent(s.ticker)}" class="sr-item" data-idx="${i}">
        <div class="sr-left">
          <div class="sr-ticker">${s.ticker} ${cap}</div>
          <div class="sr-meta">${sector}</div>
        </div>
        <div class="sr-right">
          <div><span class="jade">${elo}</span> JADE</div>
          <div>${price}</div>
        </div>
      </a>`;
    }).join('');
    dropdown.innerHTML = html;
    dropdown.classList.add('visible');
    selIdx = -1;
  }

  function setSelected(i) {
    const items = dropdown.querySelectorAll('.sr-item');
    items.forEach((it, k) => it.classList.toggle('selected', k === i));
    if (i >= 0 && items[i]) {
      // Scroll into view if needed
      const itemRect = items[i].getBoundingClientRect();
      const ddRect = dropdown.getBoundingClientRect();
      if (itemRect.bottom > ddRect.bottom) {
        dropdown.scrollTop += itemRect.bottom - ddRect.bottom;
      } else if (itemRect.top < ddRect.top) {
        dropdown.scrollTop -= ddRect.top - itemRect.top;
      }
    }
    selIdx = i;
  }

  input.addEventListener('input', () => render(search(input.value)));
  input.addEventListener('focus', () => {
    if (input.value.trim()) render(search(input.value));
  });
  // Use mousedown rather than blur so clicking a result fires before close
  document.addEventListener('mousedown', (e) => {
    if (!dropdown.contains(e.target) && e.target !== input) {
      dropdown.classList.remove('visible');
    }
  });

  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.sr-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!items.length) return;
      setSelected(Math.min(selIdx + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(Math.max(selIdx - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selIdx >= 0 && items[selIdx]) {
        window.location.href = items[selIdx].href;
      } else if (items[0]) {
        window.location.href = items[0].href;
      }
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('visible');
      input.blur();
    }
  });

  // Global hotkey: '/' focuses the search box (common fintech UX pattern)
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input
        && !['INPUT','TEXTAREA'].includes((document.activeElement || {}).tagName)) {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });
}

// Init on load
window.addEventListener('DOMContentLoaded', () => {
  initSearch();
});
