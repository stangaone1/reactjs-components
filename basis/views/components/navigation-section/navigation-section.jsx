import React, { Component } from 'react';
import { Link } from 'react-router';
import Icon from 'views/components/icon';
import { NavigationBlock } from 'views/components/navigation';


// Actions
// import * as NavigationSectionActions from 'actions/navigation.actions';

// Style
import './navigation-section.scss';


class NavigationSection extends Component {
  static displayName = 'MainNavigationSection';

  static propTypes = {
    section: React.PropTypes.array.isRequired,
    backLink: React.PropTypes.string.isRequired,
    backQuery: React.PropTypes.object,
    backLinkText: React.PropTypes.string.isRequired,
    basePath: React.PropTypes.string,
    completion: React.PropTypes.object,
  };

  static defaultProps = {
    backLink: '/restaurants',
    backLinkText: 'Go back',
    basePath: '',
  };

  renderSectionNavigation() {
    return this.props.section.map((item, index) => {
      return (
        <NavigationBlock
          className="MainNav-block--section"
          key={'MainNav-block' + index}
          basePath={this.props.basePath}
          completion={this.props.completion}
          { ...item } />
      );
    });
  }

  render() {
    return (
      <div className="MainNav MainNav--section">
        <Link
          className="MainNav-backlink"
          to={this.props.backLink}
          query={this.props.backQuery}
        >
          <Icon name="chevron" />
          {this.props.backLinkText}
        </Link>

        {this.renderSectionNavigation()}
      </div>
    );
  }
}

export default NavigationSection;
