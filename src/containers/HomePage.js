// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from '../components/videoList';

const HomePage = () => {
  const [featuredVideos, setFeaturedVideos] = useState([]);

  useEffect(() => {
    const fetchFeaturedVideos = async () => {
      try {
        const response = await axios.get('/api/videos'); // Adjust the API endpoint based on your backend
        setFeaturedVideos(response.data);
      } catch (error) {
        console.error('Error fetching featured videos:', error);
      }
    };

    fetchFeaturedVideos();
  }, []);

  return (
    <div>
      <h2>Featured Videos</h2>
      <VideoList videos={featuredVideos} />
      {/* Add more sections or components as needed */}
    </div>
  );
};

export default HomePage;
