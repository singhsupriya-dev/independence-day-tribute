/**
 * The Road to Swaraj: Interactive Timeline Engine (1757 - 1947)
 */

import { TIMELINE_DATA } from '../data/timelineData.js';
import { openWarriorDossier } from './dossierModal.js';
import { WARRIORS_DATA } from '../data/warriorsData.js';

export function initTimeline() {
  const container = document.getElementById('timeline-milestones-container');
  const eraFiltersContainer = document.getElementById('timeline-era-filters');
  if (!container) return;

  const eras = ["All Eras", "1750–1800", "1800–1850", "1850–1900", "1900–1919", "1920–1930", "1930–1942", "1942–1947"];

  if (eraFiltersContainer) {
    eraFiltersContainer.innerHTML = eras.map((era, idx) => `
      <button class="timeline-era-btn px-3.5 py-1 rounded-full text-xs font-semibold border transition-all ${idx === 0 ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'}" data-era="${era}">
        ${era}
      </button>
    `).join('');

    eraFiltersContainer.querySelectorAll('.timeline-era-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        eraFiltersContainer.querySelectorAll('.timeline-era-btn').forEach(b => {
          b.className = 'timeline-era-btn px-3.5 py-1 rounded-full text-xs font-semibold border bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all';
        });
        btn.className = 'timeline-era-btn px-3.5 py-1 rounded-full text-xs font-semibold border bg-amber-500/20 border-amber-400 text-amber-300 transition-all';

        const selectedEra = btn.getAttribute('data-era');
        renderTimelineNodes(selectedEra === "All Eras" ? TIMELINE_DATA : TIMELINE_DATA.filter(t => t.era === selectedEra));
      });
    });
  }

  renderTimelineNodes(TIMELINE_DATA);
}

function renderTimelineNodes(events) {
  const container = document.getElementById('timeline-milestones-container');
  if (!container) return;

  container.innerHTML = events.map((item, index) => {
    const isEven = index % 2 === 0;
    return `
      <div class="timeline-node flex flex-col md:flex-row items-center w-full">
        <!-- Left Side or Empty Spacer -->
        <div class="w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12 md:text-left'} pl-12 md:pl-0">
          <div class="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-xl group">
            <div class="flex items-center gap-2 mb-1 ${isEven ? 'md:justify-end' : 'md:justify-start'}">
              <span class="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/30">${item.year}</span>
              <span class="text-xs text-zinc-500 font-mono">· ${item.location}</span>
            </div>
            
            <h3 class="font-cinzel text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-1">
              ${item.title}
            </h3>

            <div class="text-xs font-semibold text-emerald-400 mb-3">${item.hero}</div>

            <p class="text-zinc-300 font-cormorant text-base leading-relaxed mb-3">
              ${item.description}
            </p>

            <div class="text-xs text-zinc-400 italic border-t border-zinc-800/80 pt-2 font-mono">
              Impact: ${item.impact}
            </div>
          </div>
        </div>

        <!-- Center Marker Dot on Spine -->
        <div class="absolute left-6 md:left-1/2 -translate-x-1/2 timeline-marker">
          ${item.year.slice(2)}
        </div>

        <!-- Right Side Spacer (for opposite column on desktop) -->
        <div class="hidden md:block md:w-1/2 ${isEven ? 'md:order-2' : ''}"></div>
      </div>
    `;
  }).join('');
}
