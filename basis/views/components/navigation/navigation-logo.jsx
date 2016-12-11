import React from 'react';
import {Link} from 'react-router';
import Icon from 'views/components/icon/icon';
import './navigation-logo.scss';

const MainNavLogo = ()=> {
  return (
    <Link to="/" className="MainNav-logo">
      <Icon name="logo"/>
    </Link>
  );
};

MainNavLogo.displayName = 'MainNavLogo';

export default MainNavLogo;
