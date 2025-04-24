import React, { useState } from 'react';
import { Button, Container, Typography, Card, CardContent, CardActions, Slide, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

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

  // Styled Card with 3D effect
  const FeedbackCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
    },
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  }));

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Admin View
      </Typography>
      <Button variant="contained" color="primary" onClick={handleToggleFeedbacks}>
        {showFeedbacks ? 'Hide Submitted Feedback' : 'View Submitted Feedback'}
      </Button>
      <Slide direction="down" in={showFeedbacks} mountOnEnter unmountOnExit>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {feedbacks.map((feedback, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeedbackCard>
                  <CardContent>
                    <Typography variant="h6">{feedback.name}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {`Email: ${feedback.email}`}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Feedback: {feedback.feedback}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Submitted on: {new Date(feedback.timestamp).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* Optional actions like "Delete" or "Reply" could go here */}
                  </CardActions>
                </FeedbackCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Slide>
    </Container>
  );
};

export default AdminView;
