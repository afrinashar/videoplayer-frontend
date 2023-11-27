// VideoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Video List</h2>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <p>{video.title}</p>
            <video controls width="300" height="200">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
