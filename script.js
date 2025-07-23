/*
 * Simple JavaScript to animate elements on scroll and
 * highlight active navigation items as the user scrolls.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection observer to reveal sections as they enter the viewport
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.15,
  };
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Highlight active nav link based on scroll position
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

  const setActiveLink = () => {
    let index = sections.length - 1;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.3) {
        index = i;
      }
    }
    navLinks.forEach((link, i) => {
      if (i === index) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});