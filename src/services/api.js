// services/api.js
const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

export const fetchVideo = async (videoId) => {
  const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch video');
  }
  return response.json();
};
