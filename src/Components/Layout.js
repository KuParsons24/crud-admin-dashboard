import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { Storage } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    }
  },
  box: {
    flexGrow: 1,
    height: '100vh', 
    bgcolor: 'background.default', 
    p: 3
  },
  root: {
    display: 'flex',
  },
  active: {
    backgroundColor: "#f4f4f4"
  }
});

export default function Layout(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Contact DB',
      icon: <Storage />,
      path: '/'
    }
  ]

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Contact Database
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        className={classes.box}
        component="main"
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}