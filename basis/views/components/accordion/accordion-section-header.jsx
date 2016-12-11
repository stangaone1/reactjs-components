import React from 'react';

const AccordionSectionHeader = ({children, ...props}) => {
  return (
    <div className="AccordionSectionHeader" {...props}>
      <div className="AccordionSectionHeader-title">
        {children}
      </div>
    </div>
  );
};

AccordionSectionHeader.displayName = 'AccordionSectionHeader';

export default AccordionSectionHeader;
