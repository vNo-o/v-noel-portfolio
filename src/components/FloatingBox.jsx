import React from 'react';

function FloatingBox({ style, onMouseDown, onTouchStart, content }) {
  return (
    <div
      className="floating-box"
      style={style}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {content.title && <h1>{content.title}</h1>}
      {content.body &&
        content.body.map((line, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: line }}></p>
        ))}
    </div>
  );
}

export default FloatingBox;
