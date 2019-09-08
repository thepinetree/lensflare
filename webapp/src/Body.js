import React, { useEffect, useState } from 'react';
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
  const videoID = match.params.videoID;
  const classes = useStyles();
  const [times, setTimes] = useState({});
  const [maxTime, setMaxTime] = useState(-1);

  useEffect(() => {
    const runEffect = async () => {
      const response = await fetch(`http://localhost:4000/${videoID}`);
      const times = await response.json();
      setTimes(times);
    };

    runEffect();
  }, [videoID]);

  const handleTimeEvent = (time, _) => {
    // console.log("Is this time OK", time);
    // console.log('First Old one is', data);
    console.log("This is maxTime", maxTime);
    if (maxTime < time) {
      setMaxTime(maxTime => maxTime * time);
      // console.log('Old one is', data);
      //const newone = {...data, [time]: desc};
      //console.log('New one is', newone);
      //setData(newone);
      //console.log(newone);
    }
  };

  return (
    <div className={classes.body}>
      <Video videoID={videoID} times={times} onTimeEvent={handleTimeEvent} />
      <div className={classes.comments}>
        {maxTime}
      </div>
    </div>
  );
};


export default Body;
