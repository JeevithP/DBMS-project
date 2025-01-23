import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  height: '100%',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Typography variant="h2" component="h1" gutterBottom>
                    Activity Points Management System
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Typography variant="body1" color="textSecondary" mb={4}>
                    A platform to track and manage student activities and their corresponding points.
                  </Typography>
                </motion.div>
                <Stack spacing={2}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Link to="/api/v1/student/login">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#1976d2', // Professional blue
                          '&:hover': {
                            backgroundColor: '#1565c0', // Darker shade on hover
                          },
                        }}
                        fullWidth
                      >
                        Student Login
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Link to="/api/v1/club/login">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#616161', // Deep gray for professionalism
                          '&:hover': {
                            backgroundColor: '#424242', // Slightly darker gray
                          },
                        }}
                        fullWidth
                      >
                        Club Login
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <Link to="/api/v1/counsellor/login">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#388e3c', // Neutral green
                          '&:hover': {
                            backgroundColor: '#2c6e31', // Darker green on hover
                          },
                        }}
                        fullWidth
                      >
                        Counsellor Login
                      </Button>
                    </Link>
                  </motion.div>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src="image.png" alt="Hero Image" style={{ maxWidth: '80%' }} />
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
