import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: 'teal',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Train Reservation
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Book your train tickets with ease and comfort. Experience the best in train travel.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                component="a"
                href="#"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                component="a"
                href="#"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                component="a"
                href="#"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                component="a"
                href="#"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/book-seats" color="inherit" underline="hover">
                Book Tickets
              </Link>
              <Link href="/my-bookings" color="inherit" underline="hover">
                My Bookings
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: support@trainreservation.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +91 1234567890
            </Typography>
            <Typography variant="body2">
              Address: 123 Railway Station Road, Mumbai, India
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Train Reservation. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;