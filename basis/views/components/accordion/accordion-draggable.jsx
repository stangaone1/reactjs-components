import React, {PropTypes} from 'react';
import Accordion from './accordion';
import cx from 'classnames';

import './accordion-draggable.scss';

const propTypes = {
  className: PropTypes.string,
};

const AccordionDraggable = ({className, children, ...props}) => {
  const classes = cx(
    'AccordionDraggable',
    className);
  return (
    <Accordion
      className={classes}
      {...props}
    >
      {children}
    </Accordion>
  );
};

AccordionDraggable.propTypes = propTypes;

export default AccordionDraggable;
