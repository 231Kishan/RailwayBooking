import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Train as TrainIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const steps = ['Select Journey', 'Choose Seats', 'Confirm Booking'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
  });

  const stations = [
    'Mumbai Central',
    'Delhi Junction',
    'Chennai Central',
    'Kolkata Howrah',
    'Bangalore City',
    'Hyderabad Deccan',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate('/book-seats', { state: formData });
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container maxWidth="lg">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Book Your Journey
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Plan your trip with ease and comfort
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="From"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                >
                  {stations.map((station) => (
                    <MenuItem key={station} value={station}>
                      {station}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="To"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                >
                  {stations.map((station) => (
                    <MenuItem key={station} value={station}>
                      {station}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Journey Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />,
                    inputProps: { min: 1, max: 10 },
                  }}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                Available Trains
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {[1, 2, 3].map((train) => (
                  <Grid item xs={12} md={4} key={train}>
                    <MotionCard
                      whileHover={{ scale: 1.02 }}
                      sx={{ height: '100%' }}
                    >
                      <CardContent>
                        <TrainIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Train {train}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Departure: 08:00 AM
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Arrival: 02:00 PM
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Available Seats: 45
                        </Typography>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                Confirm Your Booking
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mt: 3,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                }}
              >
                <Typography variant="body1" gutterBottom>
                  From: {formData.from}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  To: {formData.to}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Date: {formData.date}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Passengers: {formData.passengers}
                </Typography>
              </Paper>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!formData.from || !formData.to || !formData.date}
            >
              {activeStep === steps.length - 1 ? 'Book Now' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </MotionBox>
    </Container>
  );
};

export default Dashboard; 