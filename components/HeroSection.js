import React from 'react';
import HeroAnimation from './HeroAnimation';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <HeroAnimation />
      <div className="hero-content">
        <h1 className="hero-title">Sleeksols Media</h1>
        <p className="hero-subtitle">Transforming Digital Experiences</p>
      </div>
    </section>
  );
};

export default HeroSection;