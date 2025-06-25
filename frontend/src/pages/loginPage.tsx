import React, { useState} from 'react';
import { Box, TextField, Typography, Button, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  // UseStates
  const[firstName, setFirstName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[isLogin, setIsLogin] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  // Login func
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(''); 

    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if(response.ok) {
        console.log('Succussful login', result);
        setStatusMessage('Logged in successfully!');
        localStorage.setItem('token', result.token || '');
        localStorage.setItem('firstName', result.firstName || '');
        navigate('/landingPage');
      } else {
        console.error('Login failed:', result.error);
        setStatusMessage('Logged in failed');
    }

    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  // Register func
  const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(''); 
      
    try{
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ firstName, email, password }),
      });
        
      const result = await response.json();
          
      if(response.ok) {
          console.log('Succussful Registration', result);
          setStatusMessage('Succussful account creation');
        } else {
          console.error('Registration failed:', result.error);
          setStatusMessage('Registration failed');
        }
      } catch (error) {
        console.error('Error during Registration:', error);
    }
  }

  const theme = useTheme(); 

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} height="100vh">
      
      {/* Left Side */}
    <Box
        sx={{
          flex: 1,
          bgcolor: isLogin ? theme.palette.primary.main : theme.palette.primary.main,
          color: isLogin ? theme.palette.common.white : theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.5s ease',
          transform: isLogin ? 'translateX(0)' : 'translateX(100%)',
          position: 'relative',
          p: 4,
        }}
      >
      {isLogin ? (
          <>
            <Typography variant="h2" mb={2} color="white">
              CatLender
            </Typography>
            <Typography variant="h6" color="grey.500">
              Keep Your Cat’s Life Purrfectly Planned.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h2" mb={2} color="white">
              Join CatLender
            </Typography>
            <Typography variant="h6" color="grey.500">
              Create your account to start planning your cat’s life!
            </Typography>
          </>
        )}
      </Box>
      
      {/* Right Side */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        sx={{
          bgcolor: isLogin ? theme.palette.background.paper : theme.palette.primary.main,
          color: isLogin ? theme.palette.text.primary : theme.palette.common.white,
          transition: 'all 0.5s ease',
        }}
      >
        {/* Login Card */}
        <Box
          component="form"
          onSubmit={isLogin ? handleLogin : handleRegister}
          sx={{
            width: "100%",
            maxWidth: "400px",
            height: "80%",
            bgcolor: "background.paper",
            transition: "transform 0.5s ease",
            transform: isLogin ? "translateX(0)" : "translateX(-200%)",
            position: "relative",
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >

        {isLogin ? (
          <>
            <Typography variant="h4" mt={18} mb={3} textAlign="center" color="text.primary">
              Login
            </Typography>
            <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Login
            </Button>

            {statusMessage && (
              <Typography variant="body2" mt={2} color={'red'}>
                {statusMessage}
              </Typography>
            )}

            <Button fullWidth variant="outlined" sx={{ mt: 2 }} type="submit" onClick={() => {setIsLogin(false); setStatusMessage('')}}>Register</Button>
            <Divider sx={{ mt: 2, color: 'grey.500' }}>Or</Divider>
            <Button fullWidth variant="text" sx={{ textAlign: "center", mt: 2 }}>
              Google Placeholder
            </Button>
            <Button fullWidth variant="text" sx={{ textAlign: "center", mt: 2 }}>
              Facebook Placeholder
            </Button>
          </>
        ) : 
        <>
            <Typography variant="h4" mt={12} mb={3} textAlign="center" color="text.primary">
              Register
            </Typography>
            <TextField fullWidth label="First Name" margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Create Account
            </Button>

            {statusMessage && (
              <Typography variant="body2" mt={2} color={statusMessage.includes('✅') ? 'green' : 'red'}>
                {statusMessage}
              </Typography>
            )}

            <Button fullWidth variant="outlined" sx={{ mt: 2 }} type="submit" onClick={() => {setIsLogin(true); setStatusMessage('')}}>Login</Button>
            <Divider sx={{ mt: 2, color: 'grey.500' }}>Or</Divider>
            <Button fullWidth variant="text" sx={{ textAlign: "center", mt: 2 }}>
              Google Placeholder
            </Button>
            <Button fullWidth variant="text" sx={{ textAlign: "center", mt: 2 }}>
              Facebook Placeholder
            </Button>
        </>}
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
