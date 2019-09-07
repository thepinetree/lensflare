import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';

import Header from './Header';
import Video from './Video';


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 25,
    [theme.breakpoints.down('md')]: {
      padding: 0,
      zIndex: 1200,
      flexDirection: 'column',
    }
  },
  comments: {flex: 1},
}));

const MyPaper = styled(Paper)({
  margin: 15,
  padding: 20,
});


const App = () => {
  const classes = useStyles();

  // <TextField variant='filled' placeholder='Enter a YouTube Link ...' className={classes.field} />

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.body}>
        <Video videoID='L9hRsCaKC3s' />
        <div className={classes.comments}>
          <MyPaper>Testing A</MyPaper>            
          <MyPaper>Testing B</MyPaper>
          <MyPaper>Testing C</MyPaper>
          <MyPaper>Testing D</MyPaper>
        </div>
      </div>
    </div>
  ); 
};

export default App;
