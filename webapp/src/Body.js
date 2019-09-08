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
  const [data, setData] = useState(() => ({}));

  useEffect(() => {
    const runEffect = async () => {
      const response = await fetch(`http://localhost:4000/${videoID}`);
      const times = await response.json();
      setTimes(times);
    };

    runEffect();
  }, [videoID]);

  const handleTimeEvent = (time, desc) => {
    if (!(time in data)) {
      const newone = {...data, [time]: desc};
      setData(newone);
    }
  };

  const collectedData = Object.keys(times).map(time => {
    const [name, data] = times[time];

    if (name === 'kensho') {
      const fetcher = async () => {
        const response = await fetch(`https://www.kensho.com/external/v1/search_entities?class_name=Equity&search_string=${data}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Token 7c66ebc3338c0f5e8d8c02f08f86ec21840d7446",
          },
        });
        const basic = await response.json();
        return basic.data[0];
      };
      return {
        type: 'stock',
        ans: fetcher(),
      };
    }

    return {};
  });

  return (
    <div className={classes.body}>
      <Video videoID={videoID} times={times} onTimeEvent={handleTimeEvent} />
      <div className={classes.comments}>
        {collectedData.map(item => {
          if (item.type === 'stock') return <MyPaper>{item.ans.name} ({item.ans.ticker})</MyPaper>;
        })}
      </div>
    </div>
  );
};


export default Body;
