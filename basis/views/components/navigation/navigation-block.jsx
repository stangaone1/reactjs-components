import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

// components
import Dropdown from 'views/components/dropdown';
import {Link} from 'react-router';
import DropdownMenu from 'views/components/dropdown-menu';
import NavigationItem from './navigation-item';
import NavigationItemExternal from './navigation-item-external';
import * as urlUtils from 'lib/utils/url';

import './navigation-block.scss';

@connect(({auth: {token}, router}) => ({token, router}))
export default class NavigationBlock extends Component {
  static propTypes = {
    activeSection: PropTypes.number,
    className: PropTypes.string,
    isDropdownOpen: PropTypes.bool,
    link: PropTypes.string,
    menu: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    basePath: PropTypes.string,
    notifications: PropTypes.object,
    onDropdownClick: PropTypes.func,
    onSectionChange: PropTypes.func,
    sections: PropTypes.array,
    title: PropTypes.string,
    completion: PropTypes.object,
    router: PropTypes.object,
    children: PropTypes.node,
    token: PropTypes.string,
  };

  static defaultProps = {
    basePath: '',
  };

  renderNavList(list, isSubmenu) {
    const items = list.map((item) => {
      return this.renderNavListItem(item);
    });
    const wrapperClass = {
      'MainNav-list': true,
      'MainNav-submenu': isSubmenu,
    };

    return (
      <ul className={cx(wrapperClass)}>
        {items}
      </ul>
    );
  }

  renderNavListTitle() {
    const {title, link, basePath, sections, activeSection, isDropdownOpen} = this.props;

    if (!title) return null;

    if (sections) {
      return (
        <Dropdown
          className="Dropdown--nav"
          label={sections[activeSection].label}
          open={isDropdownOpen}
          onClick={this.props.onDropdownClick}
          theme="dark"
          padding
          theme="dark"
        >
          <DropdownMenu
            items={sections}
            onItemClick={this.props.onSectionChange}
          />
        </Dropdown>
      );
    }

    if (link) {
      return (
        <Link
          className="MainNav-blockTitle"
          to={basePath + link}
        >
          {title}
        </Link>
      );
    }
    return (
      <div className="MainNav-blockTitle">
        {title}
      </div>
    );
  }

  renderNavListItem(item) {
    const {name, link, isExternal, submenu, key, requiresToken} = item;
    const {completion, basePath, token, router} = this.props;
    const itemClass = {
      'MainNav-itemWrap': true,
      'MainNav-itemWrap--landing': !!submenu,
    };

    let itemProps = {};
    let itemRender = NavigationItem;

    // External link, not declared in route
    if (isExternal) {
      itemProps = {
        name,
        link: requiresToken
          ? urlUtils.appendParam(link, CONFIG.API_KEY_NAME, token)
          : link,
      };
      itemRender = NavigationItemExternal;
    } else {
      // Internal link
      itemProps = {
        name,
        router,
        link: basePath + link,
        notifications: this.props.notifications,
      };
    }

    // Check if it's an item with completion bullet
    if (key && completion && completion.status === 'complete') {
      itemProps.complete = completion.completion[key];
    }

    const itemTag = React.createElement(itemRender, itemProps);

    return (
      <li key={'MainNav-itemWrap' + name.replace(/ /g, '_')} className={cx(itemClass)}>
        {itemTag}
        {this.renderNavListSubmenu(submenu)}
      </li>
    );
  }

  renderNavListSubmenu(submenuList) {
    if (!submenuList) return null;

    return this.renderNavList(submenuList, true);
  }

  render() {
    const navList = this.props.menu;
    const wrapperClass = {
      'MainNav-block': this.props.title,
    };

    return (
      <div
        className={cx(wrapperClass, this.props.className)}
      >
        {this.renderNavListTitle()}
        {this.renderNavList(navList)}
        {this.props.children}
      </div>
    );
  }
}
