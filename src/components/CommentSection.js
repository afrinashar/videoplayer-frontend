// CommentSection.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const socket = io('http://localhost:3000'); // Update the URL based on your server

  useEffect(() => {
    // Connect to the socket and listen for comments
    socket.emit('join', videoId);

    socket.on('comment', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    return () => {
      socket.disconnect();
    };
  }, [videoId, socket]);

  const handleCommentSubmit = () => {
    // Emit a comment event to the server
    socket.emit('comment', { videoId, text: newComment });

    // Add the comment locally for immediate display
    setComments((prevComments) => [...prevComments, { text: newComment }]);
    setNewComment('');
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment.text}</p>
        ))}
      </div>
      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default CommentSection;
