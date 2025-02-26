import React, { useState, useEffect } from 'react';
import FloatingBox from './FloatingBox.jsx'; // Correct: Default import
import VideoBox from './VideoBox.jsx';     // Correct: Default import
import BackgroundText from './BackgroundText.jsx'; // Correct: Default import

const initialBoxes = [
  { type: 'content', id: 'content-1', top: 60, left: 60, zIndex: 10, content: { title: 'V Noel', body: ['Multidisciplinary Creator', '1994<br/>JameshedPur, IN → Bengaluru, IN ↔ Maastricht, NL'] } },
  { type: 'content', id: 'content-2', top: 80, left: 450, zIndex: 11, content: { title: 'About', body: ['V Noel is a multidisciplinary creator.'] } },
  { type: 'content', id: 'content-3', top: 300, left: 150, zIndex: 12, content: { body: ['His post-colonial sound identity explores universal expressions of urban phenomenon.'] } },
  { type: 'content', id: 'content-4', top: 380, left: 550, zIndex: 13, content: { body: ['His primary expression lies in presenting the anthropological authenticity in socio-political contradictions.'] } },
  { type: 'content', id: 'content-5', top: 180, left: 830, zIndex: 14, content: { body: ['He focuses on the tension between tradition and familiarity.'] } },
  { type: 'content', id: 'content-6', top: 550, left: 280, zIndex: 15, content: { body: ['Coming from a diverse background, he has studied physics, computation, and music therapy & education.'] } },
  { type: 'content', id: 'content-7', top: 480, left: 680, zIndex: 16, content: { body: ['He is currently studying composition with Vykintas Baltakas at the Conservatorium Maastricht.'] } },
  { type: 'content', id: 'content-8', top: 80, left: 800, zIndex: 17, content: { title: 'Contact', body: ['For collaborations or inquiries, reach out at <a href="mailto:noel@arscul.us">noel@arscul.us</a>.'] } },
  { type: 'video', id: 'video-1', top: 190, left: 280, width: 380, height: 215, zIndex: 5, src: 'https://www.youtube.com/embed/wbQ0z_7YfFc' },
  { type: 'video', id: 'video-2', top: 420, left: 60, width: 380, height: 215, zIndex: 6, src: 'https://www.youtube.com/embed/aTSHp2jDX40' },
  { type: 'video', id: 'video-3', top: 220, left: 700, width: 380, height: 215, src: 'https://www.youtube.com/embed/wIxh1KUAoGM' },
  { type: 'video', id: 'video-4', top: 650, left: 100, width: 380, height: 215, zIndex: 8, src: 'https://www.youtube.com/embed/aZ8ExAYxsjg' },
  { type: 'video', id: 'video-5', top: 650, left: 550, width: 380, height: 215, zIndex: 9, src: 'https://www.youtube.com/embed/LqsRwxWiBYI' },
];

function PortfolioLayout() {
  const [boxes, setBoxes] = useState(initialBoxes);
  const [isDragging, setIsDragging] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Drag Functions
  const startDrag = (box, e) => {
    setIsDragging(true);
    setCurrentBox(box);
    const maxZ = Math.max(...boxes.map(b => b.zIndex));
    setBoxes(prevBoxes => prevBoxes.map(b => b.id === box.id ? { ...b, zIndex: maxZ + 1 } : b));
    setOffset({
      x: e.clientX - box.left,
      y: e.clientY - box.top,
    });
  };

  const startDragTouch = (box, e) => {
    e.preventDefault();
    setIsDragging(true);
    setCurrentBox(box);
    const maxZ = Math.max(...boxes.map(b => b.zIndex));
    setBoxes(prevBoxes => prevBoxes.map(b => b.id === box.id ? { ...b, zIndex: maxZ + 1 } : b));
    const touch = e.touches[0];
    setOffset({
        x: touch.clientX - box.left,
        y: touch.clientY - box.top,
      });
  };

  const drag = e => {
    if (!isDragging || !currentBox) return;
    e.preventDefault();
    setBoxes(prevBoxes => prevBoxes.map(box => box.id === currentBox.id ? { ...box, left: e.clientX - offset.x, top: e.clientY - offset.y } : box));
  };
  
  const dragTouch = e => {
    if (!isDragging || !currentBox) return;
    e.preventDefault();
    const touch = e.touches[0];
    setBoxes(prevBoxes => prevBoxes.map(box => box.id === currentBox.id ? { ...box, left: touch.clientX - offset.x, top: touch.clientY - offset.y } : box));
  };

  const stopDrag = () => {
    setIsDragging(false);
    setCurrentBox(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    return () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('touchmove', dragTouch);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, currentBox, offset]);

  return (
    <div className="portfolio-container">
      <BackgroundText />
      {boxes.map((box) => {
        const boxStyle = {
          position: 'absolute',
          top: `${box.top}px`,
          left: `${box.left}px`,
          zIndex: box.zIndex,
        };
        return (box.type === 'content') ? (
          <FloatingBox
            key={box.id}
            style={boxStyle}
            onMouseDown={e => startDrag(box, e)}
            onTouchStart={e => startDragTouch(box, e)}
            content={box.content}
          />
        ) : (
          <VideoBox
            key={box.id}
            style={{ ...boxStyle, width: `${box.width}px`, height: `${box.height}px` }}
            onMouseDown={e => startDrag(box, e)}
            onTouchStart={e => startDragTouch(box, e)}
            src={box.src}
          />
        );
      })}
    </div>
  );
}

export default PortfolioLayout;
