import React, {PropTypes} from 'react';
import Accordion from './accordion';
import cx from 'classnames';

import './accordion-dropdown.scss';

const propTypes = {
  hidden: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  hidden: false,
};

const AccordionDropdown = ({className, children, hidden, ...props}) => {
  const classes = cx(
    'AccordionDropdown',
    {'AccordionDropdown--hidden': hidden},
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

AccordionDropdown.propTypes = propTypes;
AccordionDropdown.defaultProps = defaultProps;

export default AccordionDropdown;
