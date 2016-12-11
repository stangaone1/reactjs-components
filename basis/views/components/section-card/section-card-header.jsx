import React, {PropTypes} from 'react';
import Icon from 'views/components/icon';

import './section-card-header.scss';

const SectionCardHeader = (props) => {
  let icon = null;

  if (props.iconName) {
    icon = <Icon className="Icon--card" name={props.iconName}/>;
  }

  return (
    <div className="SectionCardHeader">
      <div className="SectionCardHeader-icon">{icon}</div>
      <div className="SectionCardHeader-title">{props.title}</div>
      <div className="SectionCardHeader-content">{props.content}</div>
      {props.children}
    </div>
  );
};

SectionCardHeader.displayName = 'SectionCardHeader';
SectionCardHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.string,
  iconName: PropTypes.string,
};

export default SectionCardHeader;
