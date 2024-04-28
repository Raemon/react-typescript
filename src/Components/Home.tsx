import React from 'react';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }
});

const Home = ({}:{}): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Home</h1>
    </div>
  );
};

export default Home
