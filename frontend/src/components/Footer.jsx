import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/Train';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrainIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h6" component="div">
                Train Reservation
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted partner for hassle-free train seat bookings. Travel with comfort and convenience.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/book-seats" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Book Seats
            </Link>
            <Link component={RouterLink} to="/my-bookings" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              My Bookings
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2">+1 (123) 456-7890</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2">support@trainreservation.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2">123 Station Road, City, Country</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {currentYear} Train Reservation System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;