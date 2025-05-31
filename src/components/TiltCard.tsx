
import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

interface TiltCardProps {
  className?: string;
  children: React.ReactNode;
  tiltFactor?: number; // Higher = more pronounced tilt
  perspective?: number; // Higher = more depth
  scale?: number; // Amount to scale on hover (1.0 = no scale)
  resetOnLeave?: boolean; // Reset tilt on mouse leave
}

const TiltCard: React.FC<TiltCardProps> = ({
  className = '',
  children,
  tiltFactor = 10,
  perspective = 1000,
  scale = 1.03,
  resetOnLeave = true
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Set up the spring animation
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 350, friction: 40 }
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate the tilt
    const tiltX = ((x - centerX) / centerX) * tiltFactor;
    const tiltY = ((y - centerY) / centerY) * -tiltFactor;
    
    api.start({ 
      xys: [tiltX, tiltY, scale],
      immediate: false
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (resetOnLeave) {
      api.start({ 
        xys: [0, 0, 1],
        immediate: false
      });
    }
  };

  // Create a transform style from the spring animation
  const transformStyle = props.xys.to(
    (x, y, s) => `perspective(${perspective}px) rotateX(${y}deg) rotateY(${x}deg) scale(${s})`
  );

  return (
    <animated.div
      className={`${className} ${isHovering ? 'z-10' : ''} transition-shadow duration-300`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transform: transformStyle }}
    >
      {children}
    </animated.div>
  );
};

export default TiltCard;
