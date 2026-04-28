// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

document.addEventListener('DOMContentLoaded', () => {

  // Custom Cursor
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out'
    });
  });

  const hoverElements = document.querySelectorAll('a, button, .hover-target');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // Hero Parallax Effect
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Text Reveal Animations (Split text manually for simplicity or just use simple fade up)
  const revealTexts = document.querySelectorAll('.reveal-text');
  revealTexts.forEach(text => {
    // Simple word splitting logic
    const content = text.innerHTML;
    text.innerHTML = '';
    const words = content.split(' ');
    words.forEach(word => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';
      span.style.verticalAlign = 'top';
      const innerSpan = document.createElement('span');
      innerSpan.classList.add('line');
      innerSpan.style.display = 'inline-block';
      innerSpan.innerHTML = word + '&nbsp;';
      span.appendChild(innerSpan);
      text.appendChild(span);
    });

    gsap.to(text.querySelectorAll('.line'), {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
      }
    });
  });

  // Image Parallax Effect
  const parallaxImages = document.querySelectorAll('.parallax-img');
  parallaxImages.forEach(img => {
    gsap.to(img, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  
  // Banner Parallax Effect
  const parallaxBanners = document.querySelectorAll('.parallax-banner .bg');
  parallaxBanners.forEach(bg => {
    gsap.to(bg, {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
});
