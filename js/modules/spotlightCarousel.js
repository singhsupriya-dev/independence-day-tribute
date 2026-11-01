/**
 * 'One Name. One Life. One Sacrifice.' Cinematic Emotional Spotlight
 */

import { WARRIORS_DATA } from '../data/warriorsData.js';
import { openWarriorDossier } from './dossierModal.js';
import { audioSynth } from './audioSynthesizer.js';

export const SPOTLIGHT_STORIES = [
  {
    id: "kanaklata-barua",
    name: "Kanaklata Barua",
    place: "Gohpur Police Station, Assam",
    moment: "20 September 1942",
    sacrifice: "A 17-year-old girl took a bullet through the chest while clutching the Tricolour, refusing to let the flag touch the dust even as her life slipped away.",
    context: "Leading the unarmed youth Mrityu Bahini (Death Squad) during the Quit India Movement."
  },
  {
    id: "matangini-hazra",
    name: "Matangini Hazra",
    place: "Tamluk, Midnapore, Bengal",
    moment: "29 September 1942",
    sacrifice: "At age 72, shot in both arms and forehead, she continued marching forward singing 'Vande Mataram' until she collapsed on the soil.",
    context: "Leading 6,000 peasant women to establish the independent Tamralipta National Government."
  },
  {
    id: "kuyili",
    name: "Kuyili",
    place: "Sivaganga Fortress, Tamil Nadu",
    moment: "Vijayadashami 1780",
    sacrifice: "Drenched herself in sacred temple lamp oil, set her body on fire, and leaped into the British ammunition arsenal, destroying their entire regional firepower.",
    context: "Commander-in-Chief of Queen Velu Nachiyar's women's army (Udaiyal Padai)."
  },
  {
    id: "birsa-munda",
    name: "Birsa Munda",
    place: "Dombari Hill / Ranchi Jail",
    moment: "9 June 1900",
    sacrifice: "Died under mysterious circumstances in British solitary confinement at age 25 after fighting to protect ancestral indigenous land sovereignty.",
    context: "Dharti Aaba (Father of the Earth) who led the Munda Ulgulan against colonial land dispossession."
  },
  {
    id: "peer-ali-khan",
    name: "Peer Ali Khan",
    place: "Patna, Bihar",
    moment: "7 July 1857",
    sacrifice: "Hanged publicly in Patna by Commissioner William Tayler; warned from the gallows that thousands of rebels would rise from every drop of his blood.",
    context: "Modest bookseller who operated the central underground intelligence network for the 1857 uprising."
  },
  {
    id: "u-tirot-sing",
    name: "U Tirot Sing",
    place: "Nongkhlaw, Meghalaya / Dhaka Jail",
    moment: "17 July 1835",
    sacrifice: "Refused British royal pardon in exchange for subservience, declaring: 'Better to die a common free man than live as a puppet king under the British flag.'",
    context: "Syiem of the Khasi Hills who waged a 4-year mountain guerrilla war against the East India Company."
  }
];

export function initSpotlightCarousel() {
  let currentIndex = 0;

  function renderSpotlight(index) {
    const item = SPOTLIGHT_STORIES[index];
    const stage = document.getElementById('spotlight-render-stage');
    if (!stage) return;

    stage.style.opacity = '0';
    stage.style.transform = 'translateY(8px)';

    setTimeout(() => {
      stage.innerHTML = `
        <div class="space-y-8 text-center max-w-2xl mx-auto">
          <!-- One Name -->
          <div>
            <div class="text-xs font-mono tracking-widest text-amber-500 uppercase mb-1">ONE NAME</div>
            <h2 class="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 tracking-wide">${item.name}</h2>
          </div>

          <!-- One Place & One Moment -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-amber-500/20 py-4 max-w-lg mx-auto">
            <div>
              <div class="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-0.5">ONE PLACE</div>
              <div class="font-cinzel text-sm sm:text-base text-zinc-200">${item.place}</div>
            </div>
            <div>
              <div class="text-[11px] font-mono tracking-widest text-amber-400 uppercase mb-0.5">ONE MOMENT</div>
              <div class="font-mono text-sm sm:text-base text-amber-300 font-bold">${item.moment}</div>
            </div>
          </div>

          <!-- One Sacrifice -->
          <div class="space-y-2">
            <div class="text-xs font-mono tracking-widest text-rose-400 uppercase">ONE SACRIFICE</div>
            <p class="font-cormorant text-xl sm:text-2xl text-zinc-100 italic leading-relaxed">
              “${item.sacrifice}”
            </p>
            <p class="text-xs text-zinc-400 font-mono tracking-wide pt-1">
              Context: ${item.context}
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button id="spotlight-dossier-btn" class="btn-swaraj-primary text-xs" data-warrior-id="${item.id}">
              Open Full Dossier →
            </button>
            <button id="spotlight-next-btn" class="btn-swaraj-secondary text-xs">
              Discover Another Warrior ↻
            </button>
          </div>
        </div>
      `;

      stage.style.transition = 'all 0.4s ease';
      stage.style.opacity = '1';
      stage.style.transform = 'translateY(0)';

      const dossierBtn = document.getElementById('spotlight-dossier-btn');
      const nextBtn = document.getElementById('spotlight-next-btn');

      if (dossierBtn) {
        dossierBtn.onclick = () => openWarriorDossier(item.id);
      }

      if (nextBtn) {
        nextBtn.onclick = () => {
          audioSynth.playTempleChime();
          currentIndex = (currentIndex + 1) % SPOTLIGHT_STORIES.length;
          renderSpotlight(currentIndex);
        };
      }
    }, 200);
  }

  renderSpotlight(currentIndex);
}
