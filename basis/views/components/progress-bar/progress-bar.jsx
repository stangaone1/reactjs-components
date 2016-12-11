import React, {PropTypes } from 'react';
import invariant from 'invariant';

import './progress-bar.scss';

const ProgressBar = ({completed, children}) => {
  invariant(completed >= 0 && completed <= 100, 'Allowed values are between 0 - 100');
  const style = {
    width: completed + '%',
  };

  return (
    <div className="Progress">
      <div className="Progress-Bar" style={style}>{children}</div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

ProgressBar.defaultProps = {
  completed: 0,
};

ProgressBar.propTypes = {
  completed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
export default ProgressBar;
