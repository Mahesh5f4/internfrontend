// src/components/AdminView.jsx
import React, { useState } from 'react';
import { Button, Container, Typography, List, ListItem, ListItemText, Slide } from '@mui/material';

const AdminView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('https://feedback-backend-9z5d.onrender.com/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleToggleFeedbacks = () => {
    if (!showFeedbacks) {
      fetchFeedbacks();
    }
    setShowFeedbacks(!showFeedbacks);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Admin View
      </Typography>
      <Button variant="contained" color="primary" onClick={handleToggleFeedbacks}>
        {showFeedbacks ? 'Hide Submitted Feedback' : 'View Submitted Feedback'}
      </Button>
      <Slide direction="down" in={showFeedbacks} mountOnEnter unmountOnExit>
        <List>
          {feedbacks.map((feedback, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={feedback.name}
                secondary={`Email: ${feedback.email}\nFeedback: ${feedback.feedback}\nSubmitted on: ${new Date(feedback.timestamp).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Slide>
    </Container>
  );
};

export default AdminView;
