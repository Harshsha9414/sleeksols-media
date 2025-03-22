// Make sure these variants don't set opacity to 0
export const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
  },
  show: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    }
  },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.1, // Faster transition
      ease: "easeOut" // Changed to easeOut for faster response
    }
  }
};

export const cardContainerVariants = {
  hidden: { 
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};