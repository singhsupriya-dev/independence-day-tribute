/**
 * Unsung Warriors of Swaraj - Main Application Coordinator
 */

import { initHeroCanvas } from './modules/heroCanvas.js';
import { audioSynth } from './modules/audioSynthesizer.js';
import { discoveryEngine } from './modules/discoveryEngine.js';
import { initInteractiveMap } from './modules/interactiveMap.js';
import { initTimeline } from './modules/timelineEngine.js';
import { initSpotlightCarousel } from './modules/spotlightCarousel.js';
import { initArchivalVault } from './modules/archivalVault.js';
import { initSurpriseOracle } from './modules/surpriseOracle.js';
import { initWomenGallery } from './modules/womenGallery.js';
import { initEarlyRevolts } from './modules/earlyRevolts.js';
import { initMyDiscoveriesDrawer } from './modules/signatureExperience.js';
import { initCrowdsourceArchive } from './modules/crowdsourceArchive.js';
import { initIndependenceMoment } from './modules/independenceMoment.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive components
  initHeroCanvas();
  discoveryEngine.init();
  initInteractiveMap();
  initTimeline();
  initSpotlightCarousel();
  initArchivalVault();
  initSurpriseOracle();
  initWomenGallery();
  initEarlyRevolts();
  initMyDiscoveriesDrawer();
  initCrowdsourceArchive();
  initIndependenceMoment();

  // Audio Toggle Controller
  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      audioSynth.toggleAmbience();
    });
  }

  // Hero CTA smooth scroll
  const enterDiscoveryBtn = document.getElementById('enter-discovery-cta');
  if (enterDiscoveryBtn) {
    enterDiscoveryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('discovery-engine-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const exploreTimelineBtn = document.getElementById('explore-timeline-cta');
  if (exploreTimelineBtn) {
    exploreTimelineBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('timeline-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Mobile navigation hamburger toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-menu');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // Scrollspy for active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  console.log("Unsung Warriors of Swaraj initialized successfully.");
});
