/**
 * Audio Synthesizer: Ambient Heritage Soundscape & Voice Narrator
 * Built 100% on Web Audio API (Zero external audio file dependencies).
 */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.speechSynth = window.speechSynthesis || null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  toggleAmbience() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  startAmbience() {
    this.stopAmbience(); // clean up any existing
    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Harmonic Tanpura-style Indian drone frequencies (Root D: ~146.83 Hz, Pa: 220 Hz, High Sa: 293.66 Hz)
    const freqs = [146.83, 220.0, 293.66, 73.41];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle LFO for gentle acoustic shimmer
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc.frequency);
      lfo.start();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 100, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(idx === 3 ? 0.03 : 0.02, now + 3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push({ osc, gain, lfo });
    });

    this.updateVisualizers(true);
  }

  stopAmbience() {
    this.isPlaying = false;
    if (this.ctx && this.oscillators.length) {
      const now = this.ctx.currentTime;
      this.oscillators.forEach(({ osc, gain, lfo }) => {
        try {
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
          setTimeout(() => {
            try {
              osc.stop();
              if (lfo) lfo.stop();
            } catch (e) {}
          }, 1000);
        } catch (e) {}
      });
      this.oscillators = [];
    }
    this.updateVisualizers(false);
  }

  playTempleChime() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5 Bell note
    osc.frequency.exponentialRampToValueAtTime(440, now + 1.5);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2);
  }

  updateVisualizers(active) {
    const bars = document.querySelectorAll('.audio-bar');
    bars.forEach((bar) => {
      if (active) bar.classList.add('playing');
      else bar.classList.remove('playing');
    });

    const audioBtn = document.getElementById('audio-toggle-btn');
    if (audioBtn) {
      if (active) {
        audioBtn.classList.add('active');
        audioBtn.setAttribute('title', 'Mute Ambient Soundscape');
      } else {
        audioBtn.classList.remove('active');
        audioBtn.setAttribute('title', 'Play Ambient Soundscape');
      }
    }
  }

  speakText(text) {
    if (!this.speechSynth) return;
    this.speechSynth.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Prefer Indian English voice if available in browser
    const voices = this.speechSynth.getVoices();
    const indianVoice = voices.find((v) => v.lang.includes('en-IN') || v.name.includes('India'));
    if (indianVoice) utterance.voice = indianVoice;

    this.speechSynth.speak(utterance);
  }

  stopSpeech() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
  }
}

export const audioSynth = new AudioSynthesizer();
