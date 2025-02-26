import React, { useEffect, useState } from 'react';

const backgroundTexts = [
  "post-colonial", "urban", "contradiction", "tradition",
  "familiarity", "anthropological", "authenticity",
  "sound identity", "multidisciplinary", "phenomenon"
];

function BackgroundText() {
  const [textElements, setTextElements] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const newTextElements = [];
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const textCount = 150 + Math.floor(scrollY / 50); // Reduced base text count and rate of increase
    const maxOpacity = 0.10;
    const minOpacity = 0.01;
    const opacityRange = maxOpacity - minOpacity;

    for (let i = 0; i < textCount; i++) {
      const randomText = backgroundTexts[Math.floor(Math.random() * backgroundTexts.length)];
      const opacity = minOpacity + Math.random() * opacityRange; // Random opacity for each text
      newTextElements.push({
        id: i,
        text: randomText,
        style: {
          position: "absolute",
          left: `${Math.random() * screenWidth}px`,
          top: `${Math.random() * screenHeight}px`,
          transform: `rotate(${Math.random() * 5 + scrollY / 100}deg)`, // Reduced rotation intensity
          opacity: opacity, // Use the new opacity,
          transition: 'all 0.3s ease-in-out',
        }
      });
    }

    setTextElements(newTextElements);
  }, [scrollY]);

  return (
    <div className='background-text'>
        {textElements.map(textElement => (
            <div
                key={textElement.id}
                style={textElement.style}
            >
                {textElement.text}
            </div>
        ))}
    </div>
  );
}

export default BackgroundText;
