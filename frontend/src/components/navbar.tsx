import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';

interface NavBarProps {
  isLoggedIn: boolean;
  firstName: string;
  onLogout: () => void;
}

function NavBar({ isLoggedIn, firstName, onLogout }: NavBarProps) {
  const navigate = useNavigate();
  
   const theme = useTheme(); 

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1201,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        width="100%"
        boxSizing="border-box"
        mx="auto"
      >
        <Typography sx={{ color: theme.palette.common.white}}>CatLender</Typography>
        {isLoggedIn ? (
          <Button
            variant="outlined"
            sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
            onClick={onLogout}
          >
            Log out
          </Button>
        ) : (
          <Button onClick={() => navigate('/')}>Log in</Button>
        )}
      </Box>
    </Box>
  );
}


export default NavBar;