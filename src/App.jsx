// src/App.jsx
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import AdminView from './components/AdminView';
import {
  Box, Drawer, List, ListItem, ListItemText, Toolbar,
  AppBar, Typography, IconButton, CssBaseline, useTheme, Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const drawerWidth = 240;

const App = () => {
  const [mode, setMode] = useState('light');

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02) rotateX(1deg) rotateY(1deg)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          {/* Top AppBar */}
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" noWrap component="div">
                Feedback Collector
              </Typography>
              <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box sx={{ display: 'flex', flex: 1 }}>
            {/* Sidebar with 3D effects */}
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  background: mode === 'dark' ? '#1e1e2f' : '#f9f9f9',
                  boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
                  transform: 'perspective(1000px)',
                },
              }}
            >
              <Toolbar />
              <List>
                <ListItem
                  button
                  component={Link}
                  to="/"
                  sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                >
                  <ListItemText primary="Feedback Form" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin"
                  sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                >
                  <ListItemText primary="Admin View" />
                </ListItem>
              </List>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
                <Routes>
                  <Route path="/" element={<FeedbackForm />} />
                  <Route path="/admin" element={<AdminView />} />
                </Routes>
              </Paper>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              textAlign: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderTop: '1px solid',
              borderColor: 'divider',
              transform: 'perspective(1000px)',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} Kondampudi Mahesh Babu — All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
