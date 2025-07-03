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

function SideBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true); 

  const menuItems = [
  { text: 'Dashboard', icon: <Dashboard /> },
  { text: 'Calender', icon: <CalendarToday /> },
  { text: 'Events', icon: <Event /> },
  { text: 'Cats', icon: <Pets /> },
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
        {menuItems.map(({ text, icon }) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
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
