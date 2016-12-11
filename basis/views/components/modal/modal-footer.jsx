import React, { PropTypes } from 'react';
import cx from 'classnames';
import './modal-footer.scss';

const ModalFooter = (props) => {
  const classes = cx(
    'Modal-footer',
    {'Modal-footer--rightButtons': props.rightButtons},
    {'Modal-footer--centerButtons': props.centerButtons},
    props.className,
  );

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  rightButtons: PropTypes.bool,
  centerButtons: PropTypes.bool,
};

ModalFooter.defaultProps = {
  rightButtons: false,
  centerButtons: false,
};

export default ModalFooter;
