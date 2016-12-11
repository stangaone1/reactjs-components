import React from 'react';

const AccordionSectionBody = ({children, ...props}) => {
  return (
    <div className="AccordionSectionBody" {...props}>
      <div className="AccordionSectionBody-content">
        {children}
      </div>
    </div>
  );
};

AccordionSectionBody.displayName = 'AccordionSectionBody';

export default AccordionSectionBody;
