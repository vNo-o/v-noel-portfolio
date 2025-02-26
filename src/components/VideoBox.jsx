import React from 'react';

function VideoBox({ style, onMouseDown, onTouchStart, src }) {
  return (
    <div
      className="video-box"
      style={style}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
        <div className="w-full h-full">
            <iframe
                src={src}
                frameBorder="0"
                allowFullScreen
                className='w-full h-full'
            ></iframe>
        </div>
    </div>
  );
}

export default VideoBox;
