import React, { PropTypes } from 'react';
import './modal-body.scss';

const ModalBody = ({children}) => {
  return (
    <div className="Modal-body">
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  children: PropTypes.node,
};

export default ModalBody;
