// VideoUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('video', file);

      await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Optionally, you can refresh the video list after successful upload
      // For simplicity, you might want to use a global state management solution
      // to manage the video list across components.

      console.log('Video uploaded successfully');
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <h2>Video Upload</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUpload;
