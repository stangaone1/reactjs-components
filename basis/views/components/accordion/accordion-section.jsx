import React, {PropTypes, cloneElement} from 'react';
import cx from 'classnames';
import invariant from 'invariant';

import './accordion-section.scss';

const propTypes = {
  children: function validateChildren(props) {
    // check if the section has a header and a body
    invariant((props.children[0].type.displayName === 'AccordionSectionHeader' // children[0] should be the HEADER
      || props.children[1].type.displayName === 'AccordionSectionBody'), // children[1] should be BODY
      'AccordionSection children validation error');
  },
  opened: PropTypes.bool,
  onToggleOpenedState: PropTypes.func,
  className: PropTypes.string,
};
const defaultProps = {
  opened: true,
  onToggleOpenedState: () => {},
};

const AccordionSection = ({opened, onToggleOpenedState, children, className}) => {
  const header = children[0];
  const body = children[1];
  return (
    <div className={cx('AccordionSection', {'AccordionSection--open': opened}, className)}>
      {cloneElement(header, {onClick: onToggleOpenedState})}
      {body}
    </div>
  );
};

AccordionSection.displayName = 'AccordionSection';
AccordionSection.propTypes = propTypes;
AccordionSection.defaultProps = defaultProps;

export default AccordionSection;
