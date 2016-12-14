import React, {PropTypes} from 'react';

import './section-card-footer.scss';

const SectionCardFooter = (props)=> {
  const {buttonTitle, content, onCardAction, children} = props;
  let buttonElement;
  let contentElement;
  if (buttonTitle && buttonTitle.length) {
    const Button = require('views/components/buttons/button');
    buttonElement = null ;
    if(Button) {
      buttonElement = (<Button onClick={onCardAction} className="SectionCardFooter-button">{buttonTitle}</Button>);
    }
  }
  if (content && content.length) {
    contentElement = (<div className="SectionCardFooter-content">{content}</div>);
  }

  return (
    <div className="SectionCardFooter">
      {buttonElement}
      {contentElement}
      {children}
    </div>
  );
};

SectionCardFooter.displayName = 'SectionCardFooter';
SectionCardFooter.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
  onCardAction: PropTypes.func,
  buttonTitle: PropTypes.string,
};
SectionCardFooter.defaultProps = {};

export default SectionCardFooter;
