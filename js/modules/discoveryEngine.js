/**
 * AI Discovery Engine: Natural Language Query Interpreter & Multi-Axis Filter Matrix
 */

import { WARRIORS_DATA, REGIONS_LIST, ERAS_LIST, ROLES_LIST, MOVEMENTS_LIST } from '../data/warriorsData.js';
import { openWarriorDossier } from './dossierModal.js';
import { toggleSaveWarrior, isWarriorSaved } from './signatureExperience.js';

export class DiscoveryEngine {
  constructor() {
    this.warriors = [...WARRIORS_DATA];
    this.currentQuery = "";
    this.selectedRegion = "All Regions";
    this.selectedEra = "All Eras";
    this.selectedRole = "All Roles";
    this.selectedMovement = "All Movements";
    this.aiReasoning = null;
  }

  init() {
    this.renderFilterPills();
    this.setupEventListeners();
    this.executeFilter();
  }

  renderFilterPills() {
    this.renderPillGroup('filter-region-group', REGIONS_LIST, (val) => {
      this.selectedRegion = val;
      this.executeFilter();
    });

    this.renderPillGroup('filter-era-group', ERAS_LIST, (val) => {
      this.selectedEra = val;
      this.executeFilter();
    });

    this.renderPillGroup('filter-role-group', ROLES_LIST, (val) => {
      this.selectedRole = val;
      this.executeFilter();
    });

    this.renderPillGroup('filter-movement-group', MOVEMENTS_LIST, (val) => {
      this.selectedMovement = val;
      this.executeFilter();
    });
  }

  renderPillGroup(containerId, list, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = list.map((item, idx) => `
      <button class="filter-pill ${idx === 0 ? 'active' : ''}" data-val="${item}">
        ${item}
      </button>
    `).join('');

    container.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        callback(btn.getAttribute('data-val'));
      });
    });
  }

  setupEventListeners() {
    const searchInput = document.getElementById('discovery-search-input');
    const aiDiscoverBtn = document.getElementById('ai-discover-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentQuery = e.target.value.trim();
        this.executeFilter();
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.executeFilter();
        }
      });
    }

    if (aiDiscoverBtn) {
      aiDiscoverBtn.addEventListener('click', () => {
        if (searchInput && !this.currentQuery) {
          const sampleQueries = [
            "A woman revolutionary from Bengal",
            "A tribal freedom fighter",
            "Someone who fought in 1857",
            "Freedom fighters from the Northeast",
            "Youth martyrs under 20",
            "South Indian resistance fighters"
          ];
          const randomQ = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
          searchInput.value = randomQ;
          this.currentQuery = randomQ;
        }
        this.executeFilter();
      });
    }

    // Quick suggestion prompt pills
    document.querySelectorAll('.prompt-suggestion-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const query = pill.getAttribute('data-query');
        if (searchInput) {
          searchInput.value = query;
          this.currentQuery = query;
          this.executeFilter();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  interpretNaturalQuery(query) {
    if (!query) return { filtered: this.warriors, reasoning: null, matchedTags: [] };

    const q = query.toLowerCase();
    const matchedTags = [];
    let reasoning = "";

    const results = this.warriors.filter(w => {
      let score = 0;

      // Check explicit keywords in query
      if (q.includes("woman") || q.includes("female") || q.includes("girl") || q.includes("rani") || q.includes("women")) {
        if (w.role === "Woman Revolutionary") {
          score += 5;
          if (!matchedTags.includes("Women Revolutionaries")) matchedTags.push("Women Revolutionaries");
        }
      }

      if (q.includes("tribal") || q.includes("adivasi") || q.includes("indigenous") || q.includes("forest") || q.includes("santha") || q.includes("munda") || q.includes("naga") || q.includes("khasi") || q.includes("bhil") || q.includes("gond")) {
        if (w.role === "Tribal Leader" || w.tags.some(t => t.toLowerCase().includes("tribal") || t.toLowerCase().includes("indigenous"))) {
          score += 5;
          if (!matchedTags.includes("Tribal & Indigenous Resistance")) matchedTags.push("Tribal & Indigenous Resistance");
        }
      }

      if (q.includes("1857") || q.includes("mutiny") || q.includes("sepoy") || q.includes("first war")) {
        if (w.movement === "1857" || w.era === "1850–1900") {
          score += 5;
          if (!matchedTags.includes("1857 War of Independence")) matchedTags.push("1857 War of Independence");
        }
      }

      if (q.includes("northeast") || q.includes("assam") || q.includes("meghalaya") || q.includes("manipur") || q.includes("nagaland") || q.includes("mizoram")) {
        if (w.region === "Northeast India") {
          score += 5;
          if (!matchedTags.includes("Northeast India")) matchedTags.push("Northeast India");
        }
      }

      if (q.includes("bengal") || q.includes("chittagong") || q.includes("kolkata") || q.includes("tamluk") || q.includes("calcutta")) {
        if (w.state.toLowerCase().includes("bengal") || w.region === "East India") {
          score += 4;
          if (!matchedTags.includes("Bengal & East India")) matchedTags.push("Bengal & East India");
        }
      }

      if (q.includes("south") || q.includes("tamil") || q.includes("kerala") || q.includes("karnataka") || q.includes("andhra") || q.includes("telangana")) {
        if (w.region === "South India") {
          score += 4;
          if (!matchedTags.includes("South India")) matchedTags.push("South India");
        }
      }

      if (q.includes("quit india") || q.includes("1942")) {
        if (w.movement === "Quit India" || w.era === "1942–1947" || w.era === "1930–1942") {
          score += 4;
          if (!matchedTags.includes("Quit India Movement")) matchedTags.push("Quit India Movement");
        }
      }

      if (q.includes("young") || q.includes("teen") || q.includes("student") || q.includes("20") || q.includes("under 20")) {
        if (w.ageAtSacrifice && w.ageAtSacrifice <= 25) {
          score += 4;
          if (!matchedTags.includes("Youth Martyrs")) matchedTags.push("Youth Martyrs");
        }
      }

      if (q.includes("jail") || q.includes("cellular") || q.includes("kala pani") || q.includes("prison")) {
        if (w.detailedStory.toLowerCase().includes("jail") || w.detailedStory.toLowerCase().includes("prison") || w.detailedStory.toLowerCase().includes("cellular")) {
          score += 4;
          if (!matchedTags.includes("Imprisoned in Colonial Jails")) matchedTags.push("Imprisoned in Colonial Jails");
        }
      }

      if (q.includes("before 1900") || q.includes("1800") || q.includes("1700") || q.includes("early")) {
        if (w.birthYear < 1900 || w.era === "1750–1800" || w.era === "1800–1850" || w.era === "1850–1900") {
          score += 4;
          if (!matchedTags.includes("Early Resistance (Pre-1900)")) matchedTags.push("Early Resistance (Pre-1900)");
        }
      }

      // General text matching
      if (w.name.toLowerCase().includes(q)) score += 8;
      if (w.summary.toLowerCase().includes(q)) score += 3;
      if (w.state.toLowerCase().includes(q)) score += 3;
      if (w.whyMatchKeywords && w.whyMatchKeywords.some(k => q.includes(k))) score += 3;

      w._score = score;
      return score > 0;
    });

    results.sort((a, b) => b._score - a._score);

    if (matchedTags.length > 0) {
      reasoning = `Interpreted query intent: Identified thematic convergence with ${matchedTags.join(" + ")}. Displaying historical profiles ranked by relevance.`;
    } else {
      reasoning = `Found ${results.length} historical records matching '${query}'.`;
    }

    return { filtered: results, reasoning, matchedTags };
  }

  executeFilter() {
    let list = this.warriors;
    let reasoning = null;

    if (this.currentQuery) {
      const naturalResult = this.interpretNaturalQuery(this.currentQuery);
      list = naturalResult.filtered;
      reasoning = naturalResult.reasoning;
    }

    // Apply categorical filters
    if (this.selectedRegion !== "All Regions") {
      list = list.filter(w => w.region === this.selectedRegion);
    }
    if (this.selectedEra !== "All Eras") {
      list = list.filter(w => w.era === this.selectedEra);
    }
    if (this.selectedRole !== "All Roles") {
      list = list.filter(w => w.role === this.selectedRole);
    }
    if (this.selectedMovement !== "All Movements") {
      list = list.filter(w => w.movement === this.selectedMovement);
    }

    this.aiReasoning = reasoning;
    this.renderResults(list);
  }

  renderResults(list) {
    const grid = document.getElementById('discovery-results-grid');
    const countDisplay = document.getElementById('discovery-results-count');
    const aiReasoningContainer = document.getElementById('ai-reasoning-container');

    if (countDisplay) {
      countDisplay.innerText = `${list.length} Stories Documented`;
    }

    if (aiReasoningContainer) {
      if (this.aiReasoning) {
        aiReasoningContainer.innerHTML = `
          <div class="flex items-center gap-3 p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-lg text-amber-200 text-sm">
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">✦</span>
            <div>
              <span class="font-semibold text-amber-300">WHY THIS STORY?</span> — ${this.aiReasoning}
            </div>
          </div>
        `;
        aiReasoningContainer.classList.remove('hidden');
      } else {
        aiReasoningContainer.classList.add('hidden');
      }
    }

    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 px-4 bg-zinc-900/40 border border-zinc-800 rounded-xl">
          <div class="text-amber-400 font-cinzel text-xl mb-2">No Archived Records Match This Specific Query</div>
          <p class="text-zinc-400 max-w-md mx-auto text-sm mb-6">Try broadening your search term or exploring one of the suggested query pills above.</p>
          <button id="reset-filter-btn" class="btn-swaraj-secondary text-xs">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetFilters();
        });
      }
      return;
    }

    grid.innerHTML = list.map(w => this.generateCardHTML(w)).join('');

    // Attach card event listeners
    grid.querySelectorAll('.warrior-card-clickable').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.bookmark-btn')) return;
        const id = card.getAttribute('data-id');
        openWarriorDossier(id);
      });
    });

    grid.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const saved = toggleSaveWarrior(id);
        btn.innerHTML = saved ? '★' : '☆';
        btn.classList.toggle('text-amber-400', saved);
        btn.classList.toggle('text-zinc-400', !saved);
      });
    });
  }

  generateCardHTML(w) {
    const isSaved = isWarriorSaved(w.id);
    const initials = w.name.split(' ').map(n => n[0]).slice(0, 2).join('');

    return `
      <div class="warrior-card warrior-card-clickable group cursor-pointer" data-id="${w.id}">
        <!-- Top Stamp Seal -->
        <div class="warrior-stamp-seal flex items-center gap-2">
          <button class="bookmark-btn w-8 h-8 rounded-full bg-black/60 border border-amber-500/30 flex items-center justify-center text-sm transition-transform hover:scale-110 ${isSaved ? 'text-amber-400' : 'text-zinc-400'}" data-id="${w.id}" title="Save to My Discoveries">
            ${isSaved ? '★' : '☆'}
          </button>
          <div class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-700 text-amber-300">
            ${w.era}
          </div>
        </div>

        <!-- Portrait / Archival Emblem -->
        <div class="warrior-portrait-wrapper">
          <div class="warrior-avatar-symbol bg-gradient-to-br ${w.avatarBg || 'from-amber-950 to-stone-900'}">
            <span class="font-cinzel text-2xl font-bold text-amber-100 tracking-wider">${initials}</span>
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-5 flex flex-col flex-grow justify-between bg-zinc-950/90 border-t border-zinc-800">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[11px] font-semibold text-emerald-400 tracking-wide uppercase">${w.region}</span>
              <span class="text-zinc-600 text-xs">·</span>
              <span class="text-[11px] text-zinc-400">${w.years}</span>
            </div>

            <h3 class="font-cinzel text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors leading-snug">
              ${w.name}
            </h3>
            
            <p class="text-xs text-amber-400/90 font-medium italic mb-2.5">${w.title || w.role}</p>

            <p class="text-zinc-300 font-cormorant text-sm leading-relaxed mb-4 line-clamp-3">
              “${w.summary}”
            </p>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span class="text-[10px] px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/40 text-amber-300 font-medium">
                ${w.movement}
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                ${w.role}
              </span>
            </div>

            <div class="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span class="text-[11px] text-emerald-400/90 flex items-center gap-1 font-mono">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                Archival Record
              </span>
              <span class="font-cinzel font-semibold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Discover Story →
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  resetFilters() {
    this.currentQuery = "";
    this.selectedRegion = "All Regions";
    this.selectedEra = "All Eras";
    this.selectedRole = "All Roles";
    this.selectedMovement = "All Movements";

    const searchInput = document.getElementById('discovery-search-input');
    if (searchInput) searchInput.value = "";

    document.querySelectorAll('.filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-val').startsWith('All'));
    });

    this.executeFilter();
  }
}

export const discoveryEngine = new DiscoveryEngine();
