import React, { useState } from 'react';

const FeedbackButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSendFeedback = () => {
    window.location.href = `mailto:g49capstone@gmail.com?subject=Feedback&body=${encodeURIComponent(feedback)}`;
    setFeedback('');
    setShowForm(false);
  };

  return (
    <div className='FeedbackButton'>
      <button
        style={{
          position: 'fixed',
          fontWeight:'bold',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px',
          borderRadius: '10px',
          background: '#007bff',
          color: '#fff',
          cursor: 'pointer'
        }}
        onClick={() => setShowForm(!showForm)}
      >
        Feedback
      </button>

      {showForm && (
        <div
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            zIndex: 1000,
            background: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          <textarea
            rows="8"
            cols="50"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button onClick={handleSendFeedback} style={{ padding: '10px', background: '#007bff', color: '#fff',borderRadius:'25px', border: 'none', cursor: 'pointer' }}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackButton;