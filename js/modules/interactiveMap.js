/**
 * Interactive Map of Resistance: Regional Hotspots & Epicenter Drawer
 */

import { MAP_REGIONS } from '../data/mapData.js';
import { WARRIORS_DATA } from '../data/warriorsData.js';
import { openWarriorDossier } from './dossierModal.js';
import { audioSynth } from './audioSynthesizer.js';

export function initInteractiveMap() {
  const mapContainer = document.getElementById('map-svg-container');
  const drawerContainer = document.getElementById('map-region-drawer');
  if (!mapContainer) return;

  renderMapPins();
  selectRegion(MAP_REGIONS[0]); // Select Northeast by default
}

function renderMapPins() {
  const pinsContainer = document.getElementById('map-pins-overlay');
  if (!pinsContainer) return;

  pinsContainer.innerHTML = MAP_REGIONS.map((region, idx) => `
    <div class="absolute map-radar-pin group cursor-pointer" style="left: ${region.cx}%; top: ${region.cy}%; transform: translate(-50%, -50%);" data-region-id="${region.id}">
      <!-- Pulsing Radar Halo -->
      <div class="w-8 h-8 rounded-full bg-amber-500/20 absolute -inset-2 rounded-full animate-ping opacity-75"></div>
      
      <!-- Core Pin -->
      <div class="relative w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-200 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
        <span class="w-1.5 h-1.5 rounded-full bg-black"></span>
      </div>

      <!-- Hover Tooltip -->
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-900/95 border border-amber-500/40 rounded text-xs font-cinzel text-amber-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
        ${region.shortName} (${region.warriorsCount} Heroes)
      </div>
    </div>
  `).join('');

  pinsContainer.querySelectorAll('.map-radar-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const regionId = pin.getAttribute('data-region-id');
      const region = MAP_REGIONS.find(r => r.id === regionId);
      if (region) {
        audioSynth.playTempleChime();
        selectRegion(region);
      }
    });
  });

  // Region Selector Buttons
  const selectorContainer = document.getElementById('map-region-buttons');
  if (selectorContainer) {
    selectorContainer.innerHTML = MAP_REGIONS.map((r, idx) => `
      <button class="map-region-tab px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${idx === 0 ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'}" data-region-id="${r.id}">
        ${r.shortName}
      </button>
    `).join('');

    selectorContainer.querySelectorAll('.map-region-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        selectorContainer.querySelectorAll('.map-region-tab').forEach(b => {
          b.className = 'map-region-tab px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all';
        });
        btn.className = 'map-region-tab px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-amber-500/20 border-amber-400 text-amber-300 transition-all';

        const regionId = btn.getAttribute('data-region-id');
        const region = MAP_REGIONS.find(r => r.id === regionId);
        if (region) selectRegion(region);
      });
    });
  }
}

function selectRegion(region) {
  const display = document.getElementById('selected-region-details');
  if (!display) return;

  const heroes = WARRIORS_DATA.filter(w => region.featuredHeroes.includes(w.id));

  display.innerHTML = `
    <div class="p-6 rounded-xl bg-zinc-950/80 border border-amber-500/30 shadow-2xl space-y-5">
      <!-- Title & Coordinates -->
      <div class="border-b border-zinc-800 pb-4">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="text-xs font-mono uppercase tracking-widest text-emerald-400">Archival Region Code: ${region.shortName.toUpperCase()}</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 font-mono">${region.rebellionsCount} Major Rebellions</span>
        </div>
        <h3 class="font-cinzel text-xl md:text-2xl font-bold text-amber-100">${region.name}</h3>
      </div>

      <!-- Regional Narrative Summary -->
      <p class="font-cormorant text-zinc-300 text-base md:text-lg italic leading-relaxed">
        “${region.summary}”
      </p>

      <!-- Key Epicenters & Movement -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-xs">
        <div>
          <span class="text-zinc-500 block font-mono">REBELLION EPICENTERS</span>
          <span class="text-amber-300 font-medium">${region.keyEpicenters.join(', ')}</span>
        </div>
        <div>
          <span class="text-zinc-500 block font-mono">PRIMARY MOVEMENTS</span>
          <span class="text-zinc-200 font-medium">${region.keyMovement}</span>
        </div>
      </div>

      <!-- Freedom Fighters List -->
      <div>
        <h4 class="font-cinzel text-xs uppercase tracking-widest text-amber-400 mb-3">
          Stories from This Land (${heroes.length})
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${heroes.map(w => `
            <div class="map-hero-card p-3 rounded bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/60 cursor-pointer flex items-center justify-between transition-all group" data-hero-id="${w.id}">
              <div>
                <div class="font-cinzel font-semibold text-sm text-zinc-200 group-hover:text-amber-300">${w.name}</div>
                <div class="text-[11px] text-zinc-400">${w.state} · ${w.years}</div>
              </div>
              <span class="text-amber-400 text-xs group-hover:translate-x-1 transition-transform">→</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  display.querySelectorAll('.map-hero-card').forEach(card => {
    card.addEventListener('click', () => {
      const heroId = card.getAttribute('data-hero-id');
      openWarriorDossier(heroId);
    });
  });
}
