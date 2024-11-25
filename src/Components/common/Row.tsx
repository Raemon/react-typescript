import React from 'react';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

const Row = ({
  direction = "row",
  align = "center",
  justify = "space-between",
  children
}: {
  direction?: "row" | "column" | "row-reverse" | "column-reverse",
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline",
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly",
  children: React.ReactNode
}): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
};

export default Row;
