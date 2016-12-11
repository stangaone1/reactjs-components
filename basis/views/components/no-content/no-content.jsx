import React, {PropTypes} from 'react';
import Icon from 'views/components/icon';
import cx from 'classnames';
import './no-content.scss';

const NoContent = (props) => {
  return (
    <div className={cx(props.className, 'NoContent')}>
      <Icon name={props.icon} />
      <div className="NoContent-title">
        {props.title}
      </div>
      <div className="NoContent-text">
        {props.text}
      </div>
    </div>
  );
};

NoContent.displayName = 'NoContent';

NoContent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default NoContent;
