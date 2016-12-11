import React, { PropTypes } from 'react';
import Icon from 'views/components/icon';


const NavigationItemExternal = (props) => {
  const {link, name} = props;

  return (
    <a
      className="MainNav-item"
      href={link}
      target="_blank"
    >
      {/* TODO: add external icon when UI is updated */}
      {name}
      <Icon name="external" className="MainNav-externalIcon"/>
    </a>
  );
};

NavigationItemExternal.displayName = 'NavigationItemExternal';
NavigationItemExternal.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavigationItemExternal;
