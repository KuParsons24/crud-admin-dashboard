import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { Inbox, Mail } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

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
    bgcolor: 'background.default', 
    p: 3
  },
  root: {
    display: 'flex'
  }
});

export default function Layout(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        elevation={false}
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
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