import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Train as TrainIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      trainNumber: '12345',
      from: 'Mumbai Central',
      to: 'Delhi Junction',
      date: '2024-03-15',
      departureTime: '08:00 AM',
      arrivalTime: '02:00 PM',
      seats: ['A1', 'A2'],
      status: 'confirmed',
      price: 1000,
    },
    {
      id: 2,
      trainNumber: '67890',
      from: 'Chennai Central',
      to: 'Bangalore City',
      date: '2024-03-20',
      departureTime: '10:00 AM',
      arrivalTime: '03:00 PM',
      seats: ['B3'],
      status: 'cancelled',
      price: 500,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
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
          My Bookings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          View and manage your train reservations
        </Typography>

        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Upcoming" />
            <Tab label="Past" />
            <Tab label="Cancelled" />
          </Tabs>
        </Paper>

        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Train #{booking.trainNumber}
                      </Typography>
                      <Chip
                        label={booking.status.toUpperCase()}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="h6" color="primary">
                      ₹{booking.price}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography>
                          {booking.from} → {booking.to}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography>{booking.date}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TrainIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography>
                          {booking.departureTime} - {booking.arrivalTime}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography>
                          Seats: {booking.seats.join(', ')}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 2 }}>
                  <Button
                    startIcon={<ReceiptIcon />}
                    variant="outlined"
                    size="small"
                  >
                    View Ticket
                  </Button>
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      Cancel Booking
                    </Button>
                  )}
                </CardActions>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionBox>
    </Container>
  );
};

export default MyBookings;