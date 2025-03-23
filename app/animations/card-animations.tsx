"use client"

export const setupCardAnimations = () => {
  const serviceCards = document.querySelectorAll('.service-card');
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  // Service card hover effect
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.1;
      const y = (e.clientY - top - height / 2) * -0.1;
      
      card.style.setProperty('--translate-x', `${x}px`);
      card.style.setProperty('--translate-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--translate-x', '0px');
      card.style.setProperty('--translate-y', '0px');
    });
  });

  // Testimonial card hover effect
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });
};