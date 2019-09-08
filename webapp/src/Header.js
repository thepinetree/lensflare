import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@material-ui/core';
import { fade } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
  sideButton: {marginRight: 15},
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    flex: 1,
    marginLeft: 25,
    display: 'flex',
    height: 40,
    paddingLeft: 10,
    borderRadius: 25,
    maxWidth: 650,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  searchIcon: {
    flex: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    flex: 1,
  },
  inputInput: {
    width: '100%',
    marginLeft: 10,
  },
}));


const Header = () => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [redirect, setRedirect] = useState(false);

  const redirectPage = event => {
    if(event.key === 'Enter') setRedirect(true);
  };

  return (
    <AppBar position='static'>
      <Toolbar style={{justifyContent: 'space-between'}}>
        <div className={classes.title}>
          <IconButton edge="start" className={classes.sideButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>LensFlare</Typography>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search YouTube by URL"
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyPress={redirectPage}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
