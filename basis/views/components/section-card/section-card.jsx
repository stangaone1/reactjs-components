import React, {PropTypes} from 'react';
import cx from 'classnames';
import './section-card.scss';

const SectionCard = (props)=> {
  const sectionCardClasses = {
    'SectionCard': true,
  };
  return (
    <div className={cx(sectionCardClasses, props.className)}>
      {props.children}
    </div>
  );
};

SectionCard.displayName = 'SectionCard';
SectionCard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
};

export default SectionCard;
