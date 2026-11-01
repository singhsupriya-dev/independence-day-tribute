/**
 * Signature Experience: "YOU JUST DISCOVERED A STORY"
 * & Personal Saved Archive ("My Discoveries") + Certificate Generator
 */

import { WARRIORS_DATA } from '../data/warriorsData.js';
import { audioSynth } from './audioSynthesizer.js';

const STORAGE_KEY = 'swaraj_saved_warriors';
const DISCOVERY_FLAG_KEY = 'swaraj_has_discovered_before';

export function getSavedWarriorIds() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function isWarriorSaved(warriorId) {
  return getSavedWarriorIds().includes(warriorId);
}

export function toggleSaveWarrior(warriorId) {
  let saved = getSavedWarriorIds();
  let isNowSaved = false;

  if (saved.includes(warriorId)) {
    saved = saved.filter(id => id !== warriorId);
  } else {
    saved.push(warriorId);
    isNowSaved = true;
    audioSynth.playTempleChime();
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch (e) {}

  updateSavedCountBadge();
  renderMyDiscoveriesDrawer();
  return isNowSaved;
}

export function updateSavedCountBadge() {
  const count = getSavedWarriorIds().length;
  const badge = document.getElementById('saved-count-badge');
  if (badge) {
    badge.innerText = count;
    badge.classList.toggle('hidden', count === 0);
  }
}

export function checkFirstDiscoveryTrigger(warrior) {
  const hasDiscoveredBefore = localStorage.getItem(DISCOVERY_FLAG_KEY);
  if (!hasDiscoveredBefore) {
    localStorage.setItem(DISCOVERY_FLAG_KEY, 'true');
    showSignatureDiscoveryModal(warrior);
  }
}

export function showSignatureDiscoveryModal(warrior) {
  const popup = document.getElementById('signature-discovery-modal');
  if (!popup) return;

  const nameElem = document.getElementById('signature-warrior-name');
  if (nameElem) nameElem.innerText = warrior.name;

  popup.classList.add('active');
  audioSynth.playTempleChime();

  const rememberBtn = document.getElementById('signature-remember-btn');
  const closeBtn = document.getElementById('signature-close-btn');

  if (rememberBtn) {
    rememberBtn.onclick = () => {
      toggleSaveWarrior(warrior.id);
      popup.classList.remove('active');
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => {
      popup.classList.remove('active');
    };
  }
}

export function initMyDiscoveriesDrawer() {
  const drawer = document.getElementById('my-discoveries-drawer');
  const openBtn = document.getElementById('open-discoveries-btn');
  const closeBtn = document.getElementById('close-discoveries-btn');
  const overlay = document.getElementById('drawer-overlay');

  if (openBtn && drawer) {
    openBtn.onclick = () => {
      renderMyDiscoveriesDrawer();
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('active');
    };
  }

  if (closeBtn && drawer) {
    closeBtn.onclick = () => {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    };
  }

  if (overlay) {
    overlay.onclick = () => {
      if (drawer) drawer.classList.remove('open');
      overlay.classList.remove('active');
    };
  }

  // Certificate Generator
  const certBtn = document.getElementById('generate-certificate-btn');
  if (certBtn) {
    certBtn.onclick = () => openCertificateModal();
  }

  updateSavedCountBadge();
}

export function renderMyDiscoveriesDrawer() {
  const listContainer = document.getElementById('my-discoveries-list');
  if (!listContainer) return;

  const savedIds = getSavedWarriorIds();
  const savedWarriors = WARRIORS_DATA.filter(w => savedIds.includes(w.id));

  if (savedWarriors.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center py-16 px-4">
        <div class="wax-seal w-12 h-12 mx-auto mb-4 text-sm">✦</div>
        <h4 class="font-cinzel text-amber-200 text-base mb-2">No Stories Saved Yet</h4>
        <p class="text-zinc-400 font-cormorant text-sm">Explore the Discovery Engine or Timeline and click the ★ Remember button to curate your personal archive of freedom fighters.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = savedWarriors.map(w => `
    <div class="p-4 rounded-lg bg-zinc-900/80 border border-amber-500/20 flex items-center justify-between gap-3 group hover:border-amber-500/50 transition-colors">
      <div>
        <div class="text-xs text-amber-400 font-mono">${w.region} · ${w.years}</div>
        <div class="font-cinzel font-bold text-sm text-zinc-100">${w.name}</div>
        <div class="text-xs text-zinc-400 italic">${w.title || w.role}</div>
      </div>
      <button class="remove-saved-btn text-zinc-500 hover:text-red-400 text-sm p-1.5" data-id="${w.id}" title="Remove from archive">
        ✕
      </button>
    </div>
  `).join('');

  listContainer.querySelectorAll('.remove-saved-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleSaveWarrior(id);
    };
  });
}

export function openCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (!modal) return;

  const savedIds = getSavedWarriorIds();
  const savedWarriors = WARRIORS_DATA.filter(w => savedIds.includes(w.id));
  const warriorNames = savedWarriors.length > 0 
    ? savedWarriors.map(w => w.name).join(', ') 
    : 'Kanaklata Barua, Matangini Hazra, Birsa Munda, Kuyili';

  const certContainer = document.getElementById('certificate-render-box');
  if (certContainer) {
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    certContainer.innerHTML = `
      <div class="swaraj-certificate text-center max-w-xl mx-auto rounded">
        <div class="wax-seal w-12 h-12 mx-auto mb-3 text-sm">79th</div>
        <h2 class="font-cinzel text-2xl font-bold tracking-widest text-[#8C6D37] mb-1">CERTIFICATE OF REMEMBRANCE</h2>
        <div class="text-[11px] font-mono tracking-widest uppercase text-[#4A4036] mb-6">Unsung Warriors of Swaraj · National Heritage Archive</div>

        <p class="font-cormorant text-base text-[#221F1C] italic mb-4">
          This document certifies that on this solemn day of Indian Independence, the memory, courage, and supreme sacrifices of India's forgotten freedom fighters:
        </p>

        <div class="p-4 bg-amber-100/50 border border-[#8C6D37]/40 rounded font-cinzel font-bold text-base text-[#684C12] my-4 leading-relaxed">
          ${warriorNames}
        </div>

        <p class="font-cormorant text-sm text-[#4A4036] mb-6">
          were actively discovered, preserved in memory, and pledged to be passed on to future generations of a free India.
        </p>

        <div class="border-t border-[#8C6D37]/30 pt-4 flex justify-between items-end text-xs font-mono text-[#5A5046]">
          <div>
            <div>DATE: ${today}</div>
            <div>STATUS: ARCHIVED</div>
          </div>
          <div class="text-right">
            <div class="font-cinzel font-bold text-[#8C6D37]">SWARAJ ARCHIVE</div>
            <div class="text-[10px]">VERIFIED RECORD</div>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');

  const closeBtn = document.getElementById('close-cert-btn');
  const printBtn = document.getElementById('print-cert-btn');

  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }
}
