"use client"
import React, { useRef, useEffect, useState, CSSProperties, useCallback } from 'react';
import { gsap } from 'gsap';

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
  isHovered?: boolean; // ✅ new prop
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  className = '',
  style = {},
  aspectRatio = '100%',
  isHovered, // ✅ new prop
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pixelGridEl = pixelGridRef.current;
      if (!pixelGridEl) return;

      pixelGridEl.innerHTML = '';

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const pixel = document.createElement('div');
          pixel.classList.add('pixelated-image-card__pixel', 'absolute', 'hidden');
          pixel.style.backgroundColor = pixelColor;

          const size = 100 / gridSize;
          pixel.style.width = `${size}%`;
          pixel.style.height = `${size}%`;
          pixel.style.left = `${col * size}%`;
          pixel.style.top = `${row * size}%`;

          pixelGridEl.appendChild(pixel);
        }
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = useCallback((activate: boolean): void => {
    setIsActive(activate);
    console.log(isActive)
    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'none' : '';
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  }, [isActive, animationStepDuration]);

  // ✅ watch hover state changes
  useEffect(() => {
    if (isHovered === undefined) return;
    animatePixels(isHovered);
  }, [isHovered,animatePixels]);

  return (
    <div
      ref={containerRef}
      className={`${className} bg-[#222] text-white w-[300px] max-w-full relative overflow-hidden`}
      style={style}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="absolute inset-0 w-full h-full">{firstContent}</div>
      <div ref={activeRef} className="absolute inset-0 w-full h-full z-[2]" style={{ display: 'none' }}>
        {secondContent}
      </div>
      <div ref={pixelGridRef} className="absolute inset-0 w-full h-full pointer-events-none z-[3]" />
    </div>
  );
};

export default PixelTransition;
