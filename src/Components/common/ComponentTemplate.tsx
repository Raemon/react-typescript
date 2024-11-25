import React from 'react';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {

  }
});

const ComponentTemplate = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

    </div>
  );
};

export default ComponentTemplate
