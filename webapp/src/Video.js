import React, { useState, useEffect, useRef } from 'react';
import getYoutubeTitle from 'get-youtube-title';
import { makeStyles } from '@material-ui/styles';
import YouTube from 'react-youtube';


const useStyles = makeStyles(theme => ({
  video: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 10,
    [theme.breakpoints.down('md')]: {
      padding: 0,
      '& p': {
        paddingLeft: 15,
      },
    },
  },
  inner: {
    width: '95%',
    height: 600,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 450,
    },
  },
}));


const Video = ({ videoID, times, onTimeEvent }) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [done, setDone] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    getYoutubeTitle(videoID, (_, title) => setName(title));
  }, [videoID]);

  const playHandler = event => {
    Object.keys(times).forEach(key => {
      if (key in done) return;

      let interval = setInterval(() => {
        //console.log(key, " | ", event.target.getCurrentTime());
        if (event.target.getCurrentTime() >= key) {
          clearInterval(interval);
          setDone([...done, key]);
          onTimeEvent(key, times[key]);
        } 
      }, 500);
    });
  };

  return (
    <div className={classes.video}>
      <YouTube id="youtube-vid" ref={ref}
        videoId={videoID}
        className={classes.inner}
        opts={{
          playerVars: {
            autoplay: 1,
            origin: 'http://172.17.107.103:3000/'
          }
        }}
        onPlay={playHandler}
      />
      <p style={{fontWeight: 400}}>{name}</p>
    </div>
  );
};

export default Video;
