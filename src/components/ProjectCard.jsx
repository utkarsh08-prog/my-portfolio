// src/components/ProjectCard.jsx
import React, { useState } from 'react';

// Card data ko props se lenge
const ProjectCard = ({ title, tech, description, image, liveLink }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Mouse move hone par rotation calculate karo
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Mouse position ko card ke center ke relative calculate karo
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Rotation ki value set karo (small value for subtle effect)
    setRotation({
      x: -y * 8, // Negative rotation for X-axis (up/down movement)
      y: x * 8,  // Positive rotation for Y-axis (left/right movement)
    });
  };

  // Mouse leave hone par rotation reset karo
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative p-6 bg-[#1A1A2E]/80 border-2 border-neon-pink/50 rounded-lg shadow-xl 
                 transition-shadow duration-500 overflow-hidden group 
                 transform-style-preserve-3d perspective-1000" // CSS illusion properties
      
      // Real-time transform applied here
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out', // Smooth movement
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Neon border glow on hover */}
      <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 
                      shadow-[0_0_20px_#FF00FF] transition-opacity duration-500 z-0"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-display text-neon-pink mb-2 uppercase">{title}</h3>
        <p className="text-sm font-mono-glitch text-neon-green mb-4">{tech.join(' // ')}</p>
        <p className="text-gray-300 mb-6">{description}</p>
        
        {/* CTA Button */}
        <a 
          href={liveLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 text-sm uppercase font-display bg-neon-pink 
                     text-bg-primary font-bold rounded hover:bg-white transition-colors"
        >
          Access Log
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
