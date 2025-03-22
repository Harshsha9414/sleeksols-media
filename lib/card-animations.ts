export function setupCardAnimations() {
  if (typeof window === 'undefined') {
    return () => {};
  }

  // Use a reliable way to get cards
  const getCards = () => document.querySelectorAll('.card');
  
  // Track previous positions for smoother transitions
  const positions = new WeakMap();
  
  const handleMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const isTestimonial = card.closest('.testimonial-card') !== null;
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      
      // Same movement amount for all cards
      const maxTranslate = 20;
      
      // Get previous position or use default
      const prev = positions.get(card) || { x: 0, y: 0 };
      
      // Calculate new position with easing
      const easing = 0.15;
      const newX = prev.x + (percentX * maxTranslate - prev.x) * easing;
      const newY = prev.y + (percentY * maxTranslate - prev.y) * easing;
      
      // Store new position
      positions.set(card, { x: newX, y: newY });
      
      // Apply the smoothed values
      card.style.setProperty('--translate-x', `${newX}px`);
      card.style.setProperty('--translate-y', `${newY}px`);
      card.style.setProperty('--scale', isTestimonial ? '1.04' : '1.08');
      
      // Ensure shadow is visible
      card.classList.add('shadow-active');
    });
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--translate-x', '0px');
    card.style.setProperty('--translate-y', '0px');
    card.style.setProperty('--scale', '1');
    card.classList.remove('shadow-active');
  };

  // Initial setup
  const attachListeners = () => {
    const isMobile = window.innerWidth < 768;
    const cards = getCards();
    
    cards.forEach(card => {
      if (!isMobile) {
        // First remove any existing listeners
        card.removeEventListener('mousemove', handleMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
        
        // Set default shadow color if not already set
        if (!card.style.getPropertyValue('--card-shadow-color')) {
          const isTestimonial = card.closest('.testimonial-card') !== null;
          card.style.setProperty('--card-shadow-color', isTestimonial ? '160, 120, 255' : '120, 80, 255');
        }
        
        // Then add fresh listeners
        card.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
        card.addEventListener('mouseleave', handleMouseLeave as EventListener, { passive: true });
      }
    });
  };

  // Attach listeners immediately
  attachListeners();
  
  // Also attach after a short delay to catch any dynamically added cards
  setTimeout(attachListeners, 100);
  
  // Re-attach on window resize
  window.addEventListener('resize', attachListeners);

  return () => {
    const cards = getCards();
    cards.forEach(card => {
      card.removeEventListener('mousemove', handleMouseMove as EventListener);
      card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    });
    window.removeEventListener('resize', attachListeners);
  };
}