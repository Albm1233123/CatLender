import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import {ArrowLeftOutlined, ArrowRightOutlined,Event, Dashboard, CalendarToday, Pets, } from '@mui/icons-material';
import catsPage from '../pages/catsPage';
import LandingPage from '../pages/landingPage';
import EventsPage from '../pages/eventsPage';

function SideBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true); 

  const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/LandingPage'},
  { text: 'Calender', icon: <CalendarToday /> },
  { text: 'Events', icon: <Event />, path: '/eventsPage' },
  { text: 'Cats', icon: <Pets />, path: '/catsPage' },
];

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const drawerWidth = open ? 240 : 60;

  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
          top: '48px',
          height: 'calc(100% - 48px)',
          position: 'fixed',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
        <Button onClick={toggleDrawer}>
          {open ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
        </Button>
      </Box>

      <Divider />

      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => path && navigate(path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              {open && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
