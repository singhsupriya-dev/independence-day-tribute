/**
 * Surprise Me: Archival Oracle & 3D Card Flip Reveal
 */

import { WARRIORS_DATA } from '../data/warriorsData.js';
import { openWarriorDossier } from './dossierModal.js';
import { audioSynth } from './audioSynthesizer.js';

export function initSurpriseOracle() {
  const triggerBtn = document.getElementById('surprise-me-btn');
  const cardContainer = document.getElementById('surprise-result-stage');
  if (!triggerBtn || !cardContainer) return;

  triggerBtn.addEventListener('click', () => {
    audioSynth.playTempleChime();

    // Select a random warrior
    const randomIndex = Math.floor(Math.random() * WARRIORS_DATA.length);
    const warrior = WARRIORS_DATA[randomIndex];

    cardContainer.style.opacity = '0';
    cardContainer.style.transform = 'scale(0.95)';

    setTimeout(() => {
      cardContainer.innerHTML = `
        <div class="p-8 rounded-xl bg-zinc-950 border-2 border-amber-500/60 shadow-2xl space-y-6 max-w-xl mx-auto text-left relative overflow-hidden animate-stamp">
          <!-- Top Wax Stamp -->
          <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span class="text-xs font-mono uppercase tracking-widest text-amber-400">ARCHIVAL ORACLE SELECTION</span>
            <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono">${warrior.region}</span>
          </div>

          <div>
            <div class="text-xs font-mono text-zinc-400 mb-1">${warrior.years} · ${warrior.state}</div>
            <h3 class="font-cinzel text-2xl font-bold text-amber-100">${warrior.name}</h3>
            <p class="text-xs text-amber-400/90 font-medium italic mb-3">${warrior.title || warrior.role}</p>

            <div class="p-3.5 bg-amber-950/30 border-l-2 border-amber-500 rounded font-cormorant text-amber-200 text-base italic mb-4">
              “${warrior.quote}”
            </div>

            <p class="font-cormorant text-zinc-300 text-base leading-relaxed mb-4">
              ${warrior.summary}
            </p>
          </div>

          <div class="pt-3 border-t border-zinc-800 flex items-center justify-between gap-4">
            <button id="surprise-open-dossier" class="btn-swaraj-primary text-xs" data-id="${warrior.id}">
              Explore Full Story →
            </button>
            <button id="surprise-again-btn" class="btn-swaraj-secondary text-xs">
              Draw Another Name ↻
            </button>
          </div>
        </div>
      `;

      cardContainer.style.transition = 'all 0.4s ease';
      cardContainer.style.opacity = '1';
      cardContainer.style.transform = 'scale(1)';

      const openDossierBtn = document.getElementById('surprise-open-dossier');
      const againBtn = document.getElementById('surprise-again-btn');

      if (openDossierBtn) {
        openDossierBtn.onclick = () => openWarriorDossier(warrior.id);
      }

      if (againBtn) {
        againBtn.onclick = () => triggerBtn.click();
      }
    }, 250);
  });
}
