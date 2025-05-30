// No need for React hooks here, just a utility function
export const setupCardAnimations = () => {
    // Select service and testimonial cards
    const serviceCards = document.querySelectorAll<HTMLElement>(".service-card");
    const testimonialCards = document.querySelectorAll<HTMLElement>(".testimonial-card");
  
    // Add hover effect
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => card.classList.add("hovered"));
      card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
    });
  
    testimonialCards.forEach((card) => {
      card.addEventListener("mouseenter", () => card.classList.add("hovered"));
      card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
    });
  
    // Cleanup function to remove event listeners when unmounted
    return () => {
      serviceCards.forEach((card) => {
        card.removeEventListener("mouseenter", () => card.classList.add("hovered"));
        card.removeEventListener("mouseleave", () => card.classList.remove("hovered"));
      });
  
      testimonialCards.forEach((card) => {
        card.removeEventListener("mouseenter", () => card.classList.add("hovered"));
        card.removeEventListener("mouseleave", () => card.classList.remove("hovered"));
      });
    };
  };
  