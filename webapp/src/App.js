import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Body from './Body';


const useStyles = makeStyles({
  root: {
    minHeight: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
    display: 'flex',
    flexDirection: 'column',
  },
});


const Index = () => (
  <div>This is a test page. What should I include on this page?</div>
);

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/:videoID" component={Body} />
      </Switch>
    </div>
  ); 
};


export default App;
