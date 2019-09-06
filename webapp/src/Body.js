import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';

import Video from './Video';


const useStyles = makeStyles(theme => ({
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
    },
  },
  comments: {flex: 1},
}));

const MyPaper = styled(Paper)({
  margin: 15,
  padding: 20,
});


const Body = ({ match }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.body}>
      <Video videoID={match.params.videoID} />
      <div className={classes.comments}>
        <MyPaper>Testing A</MyPaper>            
        <MyPaper>Testing B</MyPaper>
        <MyPaper>Testing C</MyPaper>
        <MyPaper>Testing D</MyPaper>
      </div>
    </div>
  );
};


export default Body;
