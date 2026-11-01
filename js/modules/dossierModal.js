/**
 * Archival Dossier Modal: Full-bleed museum biographical dossier
 */

import { WARRIORS_DATA } from '../data/warriorsData.js';
import { audioSynth } from './audioSynthesizer.js';
import { checkFirstDiscoveryTrigger, toggleSaveWarrior, isWarriorSaved } from './signatureExperience.js';

export function openWarriorDossier(warriorId) {
  const warrior = WARRIORS_DATA.find(w => w.id === warriorId);
  if (!warrior) return;

  // Trigger signature emotional first discovery interaction
  checkFirstDiscoveryTrigger(warrior);

  const modalOverlay = document.getElementById('dossier-modal-overlay');
  const modalContainer = document.getElementById('dossier-modal-content');
  if (!modalOverlay || !modalContainer) return;

  const isSaved = isWarriorSaved(warrior.id);
  const initials = warrior.name.split(' ').map(n => n[0]).slice(0, 2).join('');

  modalContainer.innerHTML = `
    <!-- Top Bar with Archive Reference & Close Button -->
    <div class="sticky top-0 z-20 bg-zinc-900/95 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between backdrop-blur-md">
      <div class="flex items-center gap-3">
        <div class="wax-seal w-8 h-8 text-xs">SW</div>
        <div>
          <div class="text-[10px] font-mono uppercase tracking-widest text-amber-400">National Archival Dossier · NAI Ref #SW-${warrior.birthYear || '1857'}</div>
          <div class="text-xs font-cinzel text-zinc-300">Classified Historical Heritage Record</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="modal-voice-btn" class="px-3 py-1.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono flex items-center gap-1.5 transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          Listen Audio
        </button>
        <button id="modal-save-btn" class="px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 hover:border-amber-400 text-xs flex items-center gap-1.5 transition-colors ${isSaved ? 'text-amber-400' : 'text-zinc-300'}">
          <span class="star-icon">${isSaved ? '★' : '☆'}</span> Remember
        </button>
        <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center text-lg">
          ✕
        </button>
      </div>
    </div>

    <!-- Header Section -->
    <div class="p-8 border-b border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
      <div class="flex flex-col md:flex-row gap-6 items-start">
        <div class="w-24 h-24 rounded-full border-2 border-amber-400/80 bg-gradient-to-br ${warrior.avatarBg || 'from-amber-900 to-stone-900'} flex items-center justify-center shadow-xl flex-shrink-0">
          <span class="font-cinzel text-3xl font-bold text-amber-100">${initials}</span>
        </div>
        <div class="flex-grow">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">${warrior.region}</span>
            <span class="text-zinc-600">·</span>
            <span class="text-xs text-zinc-400">${warrior.state} (${warrior.district})</span>
            <span class="text-zinc-600">·</span>
            <span class="text-xs text-amber-400 font-mono">${warrior.years}</span>
          </div>

          <h2 class="font-cinzel text-2xl md:text-3xl font-bold text-amber-100 mb-1">${warrior.name}</h2>
          <p class="text-sm font-medium text-amber-400 italic mb-4">${warrior.title || warrior.role}</p>

          <!-- Quote Banner -->
          <div class="p-4 rounded-lg bg-amber-950/20 border-l-4 border-amber-500 text-amber-200 font-cormorant text-lg italic leading-relaxed">
            “${warrior.quote}”
          </div>
        </div>
      </div>
    </div>

    <!-- Dossier Main Content -->
    <div class="p-8 space-y-8">
      <!-- Historical Biography -->
      <div>
        <h4 class="font-cinzel text-xs uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span> Verified Historical Chronicle
        </h4>
        <div class="text-zinc-300 font-cormorant text-base md:text-lg leading-relaxed whitespace-pre-line bg-zinc-900/30 p-6 rounded-lg border border-zinc-800/80">
          ${warrior.detailedStory}
        </div>
      </div>

      <!-- Historical Significance -->
      <div>
        <h4 class="font-cinzel text-xs uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Swaraj Significance & Legacy
        </h4>
        <p class="text-zinc-300 text-sm leading-relaxed p-4 rounded bg-emerald-950/20 border border-emerald-500/20">
          ${warrior.significance}
        </p>
      </div>

      <!-- Archival Provenance & Citations -->
      <div>
        <h4 class="font-cinzel text-xs uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-zinc-400"></span> Archival Sources & Repository References
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${warrior.sources.map(src => `
            <div class="p-3 rounded bg-zinc-900/60 border border-zinc-800 text-xs">
              <div class="text-zinc-300 font-medium mb-1">${src.title}</div>
              <div class="text-amber-400 font-mono text-[10px]">${src.linkText}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Action Footer -->
      <div class="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs text-zinc-400">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Verified against State Gazetteers and National Archives</span>
        </div>
        <button id="modal-share-btn" class="btn-swaraj-secondary text-xs">
          Share Story ↗
        </button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Event Listeners for modal controls
  const closeBtn = document.getElementById('modal-close-btn');
  const voiceBtn = document.getElementById('modal-voice-btn');
  const saveBtn = document.getElementById('modal-save-btn');
  const shareBtn = document.getElementById('modal-share-btn');

  if (closeBtn) {
    closeBtn.onclick = () => closeWarriorDossier();
  }

  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeWarriorDossier();
  };

  if (voiceBtn) {
    let speaking = false;
    voiceBtn.onclick = () => {
      if (speaking) {
        audioSynth.stopSpeech();
        speaking = false;
        voiceBtn.innerHTML = `Listen Audio`;
      } else {
        const textToRead = `${warrior.name}. ${warrior.title}. ${warrior.summary}. Quote: ${warrior.quote}.`;
        audioSynth.speakText(textToRead);
        speaking = true;
        voiceBtn.innerHTML = `■ Stop Audio`;
      }
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const saved = toggleSaveWarrior(warrior.id);
      saveBtn.classList.toggle('text-amber-400', saved);
      saveBtn.querySelector('.star-icon').innerText = saved ? '★' : '☆';
    };
  }

  if (shareBtn) {
    shareBtn.onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: `${warrior.name} - Unsung Warrior of Swaraj`,
          text: `Discover the story of ${warrior.name} (${warrior.years}) on Unsung Warriors of Swaraj.`,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(`${warrior.name}: ${warrior.summary} - Unsung Warriors of Swaraj`);
        alert('Historical story snippet copied to clipboard!');
      }
    };
  }
}

export function closeWarriorDossier() {
  const modalOverlay = document.getElementById('dossier-modal-overlay');
  if (modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  audioSynth.stopSpeech();
}
