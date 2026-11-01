/**
 * 'The Revolts Before The Revolution': Early Tribal, Peasant & Regional Resistance (1750-1857)
 */

import { MOVEMENTS_DATA } from '../data/movementsData.js';

export function initEarlyRevolts() {
  const container = document.getElementById('early-revolts-grid');
  if (!container) return;

  container.innerHTML = MOVEMENTS_DATA.map(m => `
    <div class="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-xl group space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-amber-400 px-2.5 py-0.5 rounded bg-amber-950/60 border border-amber-600/30">${m.period}</span>
        <span class="text-xs text-emerald-400 font-mono">${m.badge}</span>
      </div>

      <div>
        <h3 class="font-cinzel text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-1">${m.name}</h3>
        <p class="text-xs text-zinc-400 font-mono">${m.region}</p>
      </div>

      <div class="p-3 bg-zinc-900/60 rounded border border-zinc-800 text-xs font-mono space-y-1">
        <div><span class="text-zinc-500">LEADERS:</span> <span class="text-amber-300 font-semibold">${m.leaders}</span></div>
        <div><span class="text-zinc-500">WEAPONRY:</span> <span class="text-zinc-300">${m.weaponry}</span></div>
      </div>

      <p class="font-cormorant text-zinc-300 text-base leading-relaxed">
        ${m.narrative}
      </p>

      <div class="pt-3 border-t border-zinc-800/80 text-xs font-mono text-emerald-400/90">
        Legacy: ${m.legacy}
      </div>
    </div>
  `).join('');
}
