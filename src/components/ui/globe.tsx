'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const Earth = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensions = { width: 400, height: 400 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2.5;

    let rotation = 0;
    let animationFrameId: number;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, width, height);

      // Outer atmospheric glow
      const atmosphereGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius,
        centerX,
        centerY,
        radius * 1.3
      );
      atmosphereGradient.addColorStop(0, 'rgba(88, 117, 214, 0.15)');
      atmosphereGradient.addColorStop(0.5, 'rgba(88, 117, 214, 0.08)');
      atmosphereGradient.addColorStop(1, 'rgba(88, 117, 214, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = atmosphereGradient;
      ctx.fill();

      // Main globe sphere with lighting
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.4,
        centerY - radius * 0.4,
        radius * 0.2,
        centerX,
        centerY,
        radius * 1.2
      );
      sphereGradient.addColorStop(0, 'rgba(88, 117, 214, 0.9)');
      sphereGradient.addColorStop(0.4, 'rgba(37, 99, 235, 0.7)');
      sphereGradient.addColorStop(0.7, 'rgba(11, 61, 145, 0.6)');
      sphereGradient.addColorStop(1, 'rgba(6, 21, 46, 0.9)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Latitude lines
      ctx.strokeStyle = 'rgba(237, 239, 253, 0.12)';
      ctx.lineWidth = 1.5;
      for (let i = -4; i <= 4; i++) {
        if (i === 0) continue;
        const latY = centerY + (radius * i) / 5;
        const latRadius = Math.sqrt(Math.max(0, radius * radius - ((radius * i) / 5) ** 2));
        
        ctx.beginPath();
        ctx.ellipse(centerX, latY, latRadius, latRadius * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Equator - brighter
      ctx.strokeStyle = 'rgba(237, 239, 253, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 0.25, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Longitude lines (rotating)
      ctx.strokeStyle = 'rgba(237, 239, 253, 0.1)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 + rotation;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 0.28, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }

      // Glowing dots representing network/data points
      const dots = [
        { lat: 0.3, lon: 0, size: 3 },
        { lat: -0.5, lon: 1.2, size: 2.5 },
        { lat: 0.7, lon: 2.1, size: 2 },
        { lat: -0.2, lon: 3.5, size: 3 },
        { lat: 0.5, lon: 4.2, size: 2.5 },
        { lat: -0.6, lon: 5.5, size: 2 },
      ];

      dots.forEach((dot) => {
        const angle = dot.lon + rotation;
        const x = centerX + Math.cos(angle) * radius * 0.85 * Math.cos(dot.lat);
        const y = centerY + Math.sin(angle) * radius * 0.85 * Math.cos(dot.lat) * 0.3 + radius * Math.sin(dot.lat);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, dot.size * 3);
        gradient.addColorStop(0, 'rgba(88, 117, 214, 0.9)');
        gradient.addColorStop(0.5, 'rgba(88, 117, 214, 0.4)');
        gradient.addColorStop(1, 'rgba(88, 117, 214, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, dot.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = '#edeffd';
        ctx.fill();
      });

      // Globe outline/rim
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(88, 117, 214, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      rotation += 0.003;
      animationFrameId = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(88, 117, 214, 0.4))',
            maxWidth: '400px',
            maxHeight: '400px',
          }}
        />
      </div>
    </motion.div>
  );
};

export default Earth;
