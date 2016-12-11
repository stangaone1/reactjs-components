import React, { PropTypes } from 'react';
import './modal-header.scss';

const ModalHeader = ({children}) => {
  return (
    <div className="Modal-header">
      <div className="Modal-title">{children}</div>
    </div>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalHeader;
