// src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Container, Typography, Slide } from '@mui/material';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.feedback) newErrors.feedback = 'Feedback is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://feedback-backend-9z5d.onrender.com/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', feedback: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Feedback Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          error={!!errors.feedback}
          helperText={errors.feedback}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
      <Slide direction="up" in={submitted} mountOnEnter unmountOnExit>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Thank you for your feedback!
        </Typography>
      </Slide>
    </Container>
  );
};

export default FeedbackForm;
