import React, {Children, cloneElement, PropTypes} from 'react';
import cx from 'classnames';

import './accordion.scss';

const propTypes = {
  openedSections: PropTypes.array, // section(s) currently opened in accordion
  onSectionClick: PropTypes.func, // when a section oppened state is toggled (the header is clicked)
  className: PropTypes.string,
};
const defaultProps = {
  openedSections: 0,
  onSectionClick: () => {},
};

const Accordion = ({openedSections, onSectionClick, className, children}) => {
  const classes = cx(
    'Accordion',
    className);
  return (
    <div className={cx(classes)}>
      {Children.map(children, (accordionSection, index) => { // iterate through accordion sections and attach props
        return cloneElement(accordionSection, {
          opened: openedSections.indexOf(index) !== -1,
          onToggleOpenedState: onSectionClick.bind(this, index),
        });
      })}
    </div>
  );
};

Accordion.displayName = 'Accordion';
Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
