import { Placement } from '@popperjs/core';
import React, { useState } from 'react';
import { createUseStyles } from "react-jss";
import { usePopper } from 'react-popper';

const useStyles = createUseStyles({
  root: {
    display: 'contents',
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    color: 'rgba(255,255,255,0.8)',
    padding: '10px 10px',
    borderRadius: '4px',
    zIndex: 1000,
    fontSize: 13,
    '& h3': {
      fontSize: 13,
      fontWeight: 400,
      margin: '.5em 0',
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
      color: '#fff',
    },
    '& p': {
      margin: '.5em 0',
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
    }
  }
});

const Tooltip = ({
  children,
  content,
  placement = "top-start"
}: {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: Placement
}): JSX.Element => {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });

  // Clone the child element to attach ref and event handlers
  const child = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      setReferenceElement(node);
      // Call the original ref, if any
      const { ref } = children as any;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
  });

  return (
    <>
      {child}
      {visible && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className={classes.tooltip}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
