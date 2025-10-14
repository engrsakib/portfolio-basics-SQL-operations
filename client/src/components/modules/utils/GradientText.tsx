// components/AnimatedGradientText.tsx
import { useEffect, useState } from 'react';

const words = ['😎', '🚀', '🔥', '💡', '👨‍💻'];

export const AnimatedGradientText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 1500); // Change emoji every 1.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mt-10 font-poppins">
      <h1 className="text-4xl md:text-6xl font-bold">
        <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent transition-all duration-500">
          Hello I AM <span className="ml-2">{words[index]}</span>
        </span>
      </h1>
    </div>
  );
};
