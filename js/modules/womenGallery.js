/**
 * 'The Women Who Resisted' (Veeranganas of Swaraj) Gallery
 */

import { WARRIORS_DATA } from '../data/warriorsData.js';
import { openWarriorDossier } from './dossierModal.js';

export function initWomenGallery() {
  const container = document.getElementById('women-warriors-grid');
  if (!container) return;

  const womenWarriors = WARRIORS_DATA.filter(w => w.role === "Woman Revolutionary");

  container.innerHTML = womenWarriors.map(w => {
    const initials = w.name.split(' ').map(n => n[0]).slice(0, 2).join('');
    return `
      <div class="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-xl group cursor-pointer flex flex-col justify-between" data-warrior-id="${w.id}">
        <div>
          <!-- Top Row -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider uppercase">${w.region}</span>
            <span class="text-xs text-amber-400 font-mono">${w.years}</span>
          </div>

          <!-- Avatar & Title -->
          <div class="flex items-center gap-4 mb-4">
            <div class="w-14 h-14 rounded-full border border-amber-400/60 bg-gradient-to-br ${w.avatarBg || 'from-rose-950 to-amber-950'} flex items-center justify-center font-cinzel font-bold text-amber-100 flex-shrink-0">
              ${initials}
            </div>
            <div>
              <h3 class="font-cinzel text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug">${w.name}</h3>
              <p class="text-xs text-amber-400/80 italic">${w.title || w.role}</p>
            </div>
          </div>

          <!-- Quote / Summary -->
          <p class="font-cormorant text-zinc-300 text-sm leading-relaxed mb-4 line-clamp-3">
            “${w.quote}”
          </p>
        </div>

        <div class="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
          <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">${w.movement}</span>
          <span class="font-cinzel text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
            Discover Her Story →
          </span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('[data-warrior-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-warrior-id');
      openWarriorDossier(id);
    });
  });
}
