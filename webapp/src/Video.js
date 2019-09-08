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


const Video = ({ videoID }) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    getYoutubeTitle(videoID, (_, title) => setName(title));
  }, [videoID]);

  const playHandler = event => {
    setTimeout(() => {
      let interval = setInterval(() => {
        if (event.target.getCurrentTime() >= 17000)
          clearInterval(interval);
          console.log("Does this work at ", event.target.getCurrentTime());
      }, 700);
    }, 17000);
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
