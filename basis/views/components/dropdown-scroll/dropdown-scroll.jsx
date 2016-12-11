import React, { PropTypes } from 'react';
import ScrollArea from 'views/components/scroll-area';

import './dropdown-scroll.scss';

const DropdownScroll = (props) => {
  return (
      <ScrollArea style={{ height: '220px'}}>
        <div className="DropdownScroll">
          {props.children}
        </div>
      </ScrollArea>
  );
};

DropdownScroll.displayName = 'DropdownScroll';

DropdownScroll.propTypes = {
  children: PropTypes.node,
};

export default DropdownScroll;
