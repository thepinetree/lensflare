import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
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
  marginLeft: 0,
  padding: 35,
  borderRadius: 15,
});


const Body = ({ match }) => {
  const videoID = match.params.videoID;
  const classes = useStyles();
  const [times, setTimes] = useState({});

  useEffect(() => {
    const runEffect = async () => {
      const response = await fetch(`http://localhost:4000/${videoID}`);
      const times = await response.json();
      setTimes(times);
    };

    runEffect();
  }, [videoID]);

  return (
    <div className={classes.body}>
      <Video videoID={videoID} times={times} />
      <div className={classes.comments}>
        <MyPaper>
          <img src='one.png' height="600" />
        </MyPaper>
      </div>
    </div>
  );
};


export default Body;
