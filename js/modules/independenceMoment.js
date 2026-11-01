/**
 * 15 August Independence Day Moment: Live Tribute & Swaraj Remembrance Pledge
 */

import { openCertificateModal } from './signatureExperience.js';
import { audioSynth } from './audioSynthesizer.js';

export function initIndependenceMoment() {
  const pledgeBtn = document.getElementById('take-pledge-btn');
  const pledgeCountElem = document.getElementById('pledge-counter');
  const certBtn = document.getElementById('moment-cert-btn');

  let pledgeCount = 147820; // Starting baseline counter

  if (pledgeBtn && pledgeCountElem) {
    pledgeBtn.addEventListener('click', () => {
      audioSynth.playTempleChime();
      pledgeCount += 1;
      pledgeCountElem.innerText = pledgeCount.toLocaleString('en-IN');
      pledgeBtn.innerText = "✓ PLEDGE RECORDED IN SWARAJ VAULT";
      pledgeBtn.classList.add('bg-emerald-700', 'border-emerald-400');
      pledgeBtn.disabled = true;
    });
  }

  if (certBtn) {
    certBtn.addEventListener('click', () => {
      openCertificateModal();
    });
  }
}
