/**
 * Archival Vault: Interactive Physical Artifacts & Magnification Viewer
 */

import { ARTIFACTS_DATA } from '../data/artifactsData.js';
import { audioSynth } from './audioSynthesizer.js';

export function initArchivalVault() {
  const grid = document.getElementById('vault-artifacts-grid');
  if (!grid) return;

  grid.innerHTML = ARTIFACTS_DATA.map(art => `
    <div class="artifact-card group cursor-pointer" data-artifact-id="${art.id}">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-300 font-mono text-xs">
          ${art.year}
        </div>
        <div>
          <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">${art.category}</span>
          <span class="text-xs text-zinc-400 font-mono">${art.date}</span>
        </div>
      </div>

      <h3 class="font-cinzel text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-2 leading-snug">
        ${art.title}
      </h3>

      <div class="p-3 rounded bg-zinc-950/70 border border-zinc-800 text-xs font-cormorant text-zinc-300 italic mb-4 line-clamp-3">
        “${art.snippetText}”
      </div>

      <div class="flex items-center justify-between text-xs pt-2 border-t border-zinc-800/80">
        <span class="text-[11px] text-zinc-400 font-mono">${art.dimensions}</span>
        <span class="font-cinzel text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Inspect Artifact 🔍
        </span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.artifact-card').forEach(card => {
    card.addEventListener('click', () => {
      const artId = card.getAttribute('data-artifact-id');
      const artifact = ARTIFACTS_DATA.find(a => a.id === artId);
      if (artifact) openArtifactViewer(artifact);
    });
  });
}

function openArtifactViewer(artifact) {
  const modal = document.getElementById('artifact-inspector-modal');
  const content = document.getElementById('artifact-inspector-content');
  if (!modal || !content) return;

  audioSynth.playTempleChime();

  content.innerHTML = `
    <!-- Top Bar -->
    <div class="bg-zinc-900/90 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
      <div>
        <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">HISTORICAL ARTIFACT DOSSIER</span>
        <h3 class="font-cinzel text-lg font-bold text-amber-100">${artifact.title}</h3>
      </div>
      <button id="close-inspector-btn" class="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center">
        ✕
      </button>
    </div>

    <!-- Inspector Body -->
    <div class="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
      <!-- Simulated High-Res Parchment Display -->
      <div class="p-6 rounded-lg bg-[#1D1B18] border-2 border-[#8C6D37]/50 shadow-inner font-cormorant text-amber-100/90 relative overflow-hidden">
        <div class="text-[11px] font-mono uppercase tracking-widest text-amber-500 mb-2 border-b border-amber-500/30 pb-1">
          Archival Transcription · ${artifact.dimensions}
        </div>
        <p class="text-lg md:text-xl italic leading-relaxed py-2 text-[#F6EFE9]">
          ${artifact.snippetText}
        </p>
        <div class="text-right text-xs font-mono text-amber-400/80 mt-2">
          [Provenance Seal: ${artifact.provenance}]
        </div>
      </div>

      <!-- Metadata Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div class="p-3 rounded bg-zinc-900 border border-zinc-800">
          <span class="text-zinc-500 block mb-0.5">ARCHIVE REPOSITORY REFERENCE</span>
          <span class="text-amber-300 font-semibold">${artifact.archiveReference}</span>
        </div>
        <div class="p-3 rounded bg-zinc-900 border border-zinc-800">
          <span class="text-zinc-500 block mb-0.5">PHYSICAL MEDIUM</span>
          <span class="text-zinc-300">${artifact.material}</span>
        </div>
      </div>

      <!-- Context & Significance -->
      <div>
        <h4 class="font-cinzel text-xs uppercase tracking-widest text-emerald-400 mb-2">Historical Context & Verification</h4>
        <p class="text-zinc-300 font-cormorant text-base leading-relaxed p-4 rounded bg-zinc-900/60 border border-zinc-800">
          ${artifact.historicalContext}
        </p>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const closeBtn = document.getElementById('close-inspector-btn');
  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }

  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };
}
