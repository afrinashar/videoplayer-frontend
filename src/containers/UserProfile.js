// UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoList from '../components/videoList';

const UserProfile = () => {
  const { userId } = useParams();
  const [userVideos, setUserVideos] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${userId}`); // Adjust the API endpoint based on your backend
        setUserData(userResponse.data);

        const videosResponse = await axios.get(`/api/users/${userId}/videos`); // Adjust the API endpoint based on your backend
        setUserVideos(videosResponse.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {userData && (
        <div>
          <h2>{userData.username}'s Profile</h2>
          <p>Email: {userData.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}

      <h2>{userData ? 'Uploaded Videos' : 'Loading...'}</h2>
      <VideoList videos={userVideos} />
      {/* Add more sections or components as needed */}
    </div>
  );
};

export default UserProfile;
