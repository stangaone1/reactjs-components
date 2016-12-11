import React, { PropTypes } from 'react';
import './dropdown-footer.scss';

const DropdownFooter = (props) => {
  return (
    <div className="DropdownFooter">
      {props.children}
    </div>
  );
};

DropdownFooter.displayName = 'DropdownFooter';

DropdownFooter.propTypes = {
  children: PropTypes.node,
};

export default DropdownFooter;
