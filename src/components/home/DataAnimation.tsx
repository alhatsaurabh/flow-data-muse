
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DataAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Set up data points
    const dataPoints: {x: number, y: number, radius: number, speed: number, color: string}[] = [];
    const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];
    
    for (let i = 0; i < 100; i++) {
      dataPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Draw connections between points
    const drawConnections = () => {
      for (let i = 0; i < dataPoints.length; i++) {
        for (let j = i + 1; j < dataPoints.length; j++) {
          const dx = dataPoints[i].x - dataPoints[j].x;
          const dy = dataPoints[i].y - dataPoints[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${(120 - distance) / 120 * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dataPoints[i].x, dataPoints[i].y);
            ctx.lineTo(dataPoints[j].x, dataPoints[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update positions
      dataPoints.forEach(point => {
        point.x += point.speed;
        if (point.x > canvas.width) {
          point.x = 0;
        }
        
        // Draw the points
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
      });
      
      drawConnections();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </div>
  );
};

export default DataAnimation;
