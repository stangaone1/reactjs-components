import React, {PropTypes} from 'react';
import cx from 'classnames';
import './icon.scss';

const Icon = (props)=> {
  const {name, className, ...otherProps} = props;
  return (
    <svg {...otherProps} className={cx('Icon', `Icon--${name}`, className)}>
      <use xlinkHref={`#${name}`}/>
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

export default Icon;
