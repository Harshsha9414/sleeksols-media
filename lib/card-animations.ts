// card-animations.ts - Final Working Version
type CardPosition = { x: number; y: number };

export function setupCardAnimations() {
  if (typeof window === 'undefined') return () => {};

  const positions = new WeakMap<HTMLElement, CardPosition>();
  let lastFrame = 0;

  // Properly typed card selector
  const getCards = () => document.querySelectorAll<HTMLElement>('.card');

  const handleMove = (card: HTMLElement, clientX: number, clientY: number) => {
    const now = performance.now();
    if (now - lastFrame < 16) return;
    lastFrame = now;

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    const maxTranslate = 20;

    const prev = positions.get(card) || { x: 0, y: 0 };
    const easing = 0.15;
    const newX = prev.x + (percentX * maxTranslate - prev.x) * easing;
    const newY = prev.y + (percentY * maxTranslate - prev.y) * easing;

    positions.set(card, { x: newX, y: newY });

    requestAnimationFrame(() => {
      card.style.setProperty('--translate-x', `${newX}px`);
      card.style.setProperty('--translate-y', `${newY}px`);
      card.style.setProperty('--scale', 
        card.closest('.testimonial-card') ? '1.04' : '1.08'
      );
      card.classList.add('shadow-active');
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    handleMove(card, e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const card = e.currentTarget as HTMLElement;
    handleMove(card, e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--translate-x', '0px');
    card.style.setProperty('--translate-y', '0px');
    card.style.setProperty('--scale', '1');
    card.classList.remove('shadow-active');
  };

  const attachListeners = () => {
    const isMobile = window.innerWidth < 768;
    
    getCards().forEach(card => {
      // Clear existing listeners
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('mouseleave', handleMouseLeave);

      if (!isMobile) {
        // Set default shadow color
        if (!card.style.getPropertyValue('--card-shadow-color')) {
          const isTestimonial = card.closest('.testimonial-card') !== null;
          card.style.setProperty(
            '--card-shadow-color',
            isTestimonial ? '160, 120, 255' : '120, 80, 255'
          );
        }

        // Add new listeners
        card.addEventListener('mousemove', handleMouseMove, { passive: true });
        card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      } else {
        card.addEventListener('touchmove', handleTouchMove, { passive: true });
      }
    });
  };

  // Initial setup
  attachListeners();
  const resizeListener = () => attachListeners();
  window.addEventListener('resize', resizeListener);

  // Cleanup
  return () => {
    window.removeEventListener('resize', resizeListener);
    getCards().forEach(card => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    });
  };
}