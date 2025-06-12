import React from 'react';
import { Box, TextField, Typography, Button, Divider, useTheme } from '@mui/material';

function LoginPage() {
  // const email password stats

  // handle submit check cloud serverd send data to backend use funtion to match.
  // try if login submit true then route to landing page
  // catch login failed.

  const theme = useTheme(); 

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} height="100vh">
      
      {/* Left Side */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor={theme.palette.background.paper}
        p={4}
      >
        <Typography variant="h2" mb={2} color="primary">
          CatLender
        </Typography>
        <Typography variant="h6" color="text.secondary">
           Keep Your Cat’s Life Purrfectly Planned.
        </Typography>
      </Box>
      
      {/* Right Side */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        bgcolor={theme.palette.primary.main}
      >
        {/* Login Card */}
        <Box
          width="100%"
          maxWidth="400px"
          height="80%"
          bgcolor="background.paper"
          p={4}
          boxShadow={3}
          borderRadius={2}
        >
          <Typography variant="h4" mt={18} mb={3} textAlign="center" color="text.primary">
            Login
          </Typography>
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <Button fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign In
          </Button>

          <Divider sx={{ mt: 2 }}>Or</Divider>
          <Button fullWidth variant="text" sx={{ textAlign: "center", mt: 2 }}>
            Google Placeholder
          </Button>
          <Button fullWidth variant="text" sx={{ textAlign: "center", mt: 2 }}>
            Facebook Placeholder
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
