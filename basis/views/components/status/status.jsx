import React from 'react';
import cx from 'classnames';

import './status.scss';

const Status = ({name, complete, className})=> {
  const statusClasses = {
    'Status': true,
    'Status--complete': complete,
    'Status--incomplete': !complete,
  };

  return (
    <div className={cx(statusClasses, className)}>
      <span className="Status-title">{name}</span>
    </div>
  );
};

export default Status;
