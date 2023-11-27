// VideoPlayer.js
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const VideoPlayer = ({ videoUrl, videoId }) => {
  const videoRef = useRef();
  const socket = io('http://localhost:3000'); // Update the URL based on your server

  useEffect(() => {
    // Connect to the socket and listen for video sync events
    socket.emit('join', videoId);

    socket.on('syncVideo', (currentTime) => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [videoId, socket]);

  const handleTimeUpdate = () => {
    // Emit a syncVideo event to the server
    socket.emit('syncVideo', { videoId, currentTime: videoRef.current.currentTime });
  };

  return (
    <div>
      <h2>Video Player</h2>
      <video ref={videoRef} controls width="600" height="400" onTimeUpdate={handleTimeUpdate}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
