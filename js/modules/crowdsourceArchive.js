/**
 * 'Write Their Name into History' (Community Archival Submission)
 * Interactive form generating live archival stamp card preview.
 */

import { audioSynth } from './audioSynthesizer.js';

export function initCrowdsourceArchive() {
  const form = document.getElementById('crowdsource-form');
  const previewContainer = document.getElementById('crowdsource-stamp-preview');
  if (!form || !previewContainer) return;

  const nameInput = document.getElementById('cs-name');
  const regionInput = document.getElementById('cs-region');
  const yearsInput = document.getElementById('cs-years');
  const storyInput = document.getElementById('cs-story');
  const sourceInput = document.getElementById('cs-source');

  function updatePreview() {
    const name = nameInput.value.trim() || "Warrior Name";
    const region = regionInput.value.trim() || "Region / District";
    const years = yearsInput.value.trim() || "1857 – 1947";
    const story = storyInput.value.trim() || "Enter their sacrifice and contribution here to preview how it will appear in the national digital heritage archive...";
    const source = sourceInput.value.trim() || "Family oral history / Local gazetteer reference";

    previewContainer.innerHTML = `
      <div class="stamp-edge p-6 rounded-lg text-left space-y-4 max-w-sm mx-auto shadow-2xl relative">
        <div class="flex items-center justify-between border-b border-amber-500/30 pb-2">
          <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400">COMMUNITY HERITAGE SUBMISSION</span>
          <span class="text-[10px] font-mono text-zinc-400">STATUS: VERIFYING</span>
        </div>

        <div>
          <div class="text-[11px] font-mono text-emerald-400">${region} · ${years}</div>
          <h4 class="font-cinzel text-lg font-bold text-amber-100">${name}</h4>
        </div>

        <p class="font-cormorant text-zinc-300 text-sm leading-relaxed italic">
          “${story}”
        </p>

        <div class="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          Source Citation: ${source}
        </div>
      </div>
    `;
  }

  [nameInput, regionInput, yearsInput, storyInput, sourceInput].forEach(input => {
    if (input) input.addEventListener('input', updatePreview);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    audioSynth.playTempleChime();

    const successBox = document.getElementById('cs-success-message');
    if (successBox) {
      successBox.classList.remove('hidden');
      form.reset();
      updatePreview();
      setTimeout(() => {
        successBox.classList.add('hidden');
      }, 6000);
    }
  });

  updatePreview();
}
