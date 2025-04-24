// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import AdminView from './components/AdminView';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography } from '@mui/material';

const drawerWidth = 240;

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        {/* Top AppBar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Feedback Collector
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Feedback Form" />
              </ListItem>
              <ListItem button component={Link} to="/admin">
                <ListItemText primary="Admin View" />
              </ListItem>
            </List>
          </Drawer>

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar /> {/* Push content below AppBar */}
            <Routes>
              <Route path="/" element={<FeedbackForm />} />
              <Route path="/admin" element={<AdminView />} />
            </Routes>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            textAlign: 'center',
            p: 2,
            bgcolor: '#f5f5f5',
            borderTop: '1px solid #ddd',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Kondampudi Mahesh Babu — All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
