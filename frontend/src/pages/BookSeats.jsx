import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Chair as ChairIcon,
  ChairOutlined as ChairOutlinedIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const BookSeats = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Mock data for seat layout
  const rows = 10;
  const seatsPerRow = 6;
  const totalSeats = rows * seatsPerRow;

  useEffect(() => {
    // Simulate fetching booked seats from API
    const fetchBookedSeats = () => {
      // Randomly mark some seats as booked for demo
      const booked = [];
      for (let i = 0; i < totalSeats; i++) {
        if (Math.random() < 0.2) {
          booked.push(i);
        }
      }
      setBookedSeats(booked);
    };

    fetchBookedSeats();
  }, [totalSeats]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handleConfirmBooking = () => {
    // Here you would typically make an API call to book the seats
    navigate('/my-bookings');
  };

  const renderSeat = (seatNumber) => {
    const isBooked = bookedSeats.includes(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);

    return (
      <Tooltip
        key={seatNumber}
        title={isBooked ? 'Booked' : `Seat ${seatNumber + 1}`}
        placement="top"
      >
        <IconButton
          onClick={() => handleSeatClick(seatNumber)}
          disabled={isBooked}
          sx={{
            p: 1,
            m: 0.5,
            color: isBooked
              ? 'error.main'
              : isSelected
              ? 'primary.main'
              : 'text.secondary',
          }}
        >
          {isBooked ? (
            <ChairIcon />
          ) : isSelected ? (
            <ChairIcon />
          ) : (
            <ChairOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Container maxWidth="lg">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            Select Your Seats
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Train Layout
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Typography>Driver's Cabin</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${seatsPerRow}, 1fr)`,
                  gap: 1,
                  mb: 4,
                }}
              >
                {Array.from({ length: totalSeats }).map((_, index) =>
                  renderSeat(index)
                )}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChairOutlinedIcon sx={{ mr: 1 }} />
                  <Typography>Available</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChairIcon color="primary" sx={{ mr: 1 }} />
                  <Typography>Selected</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChairIcon color="error" sx={{ mr: 1 }} />
                  <Typography>Booked</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <MotionPaper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                position: 'sticky',
                top: 20,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Booking Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  From: {location.state?.from || 'Not selected'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To: {location.state?.to || 'Not selected'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {location.state?.date || 'Not selected'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Passengers: {location.state?.passengers || 1}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" gutterBottom>
                  Selected Seats: {selectedSeats.length}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total Price: ₹{selectedSeats.length * 500}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0}
              >
                Confirm Booking
              </Button>
            </MotionPaper>
          </Grid>
        </Grid>
      </MotionBox>
    </Container>
  );
};

export default BookSeats; 