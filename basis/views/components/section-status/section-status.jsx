import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import {Link} from 'react-router';

import Icon from 'views/components/icon';
import {Status} from 'views/components/status';
import {Button} from 'views/components/buttons';

import './section-status.scss';

export default class SectionStatus extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    iconName: PropTypes.string,
    link: PropTypes.string,
    id: PropTypes.number,
    label: PropTypes.string,
    completionStatus: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    completionStatus: true,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onEditClick() {
    const {onClick} = this.props;
    if (onClick) {
      onClick();
    }
  }

  renderIcon() {
    const {iconName} = this.props;
    if (iconName) {
      return (<Icon className="Icon--sectionStatus" name={iconName}/>);
    }
  }

  renderText() {
    const {label} = this.props;
    if (label) {
      return (<div className="SectionStatus-text">{label}</div>);
    }
  }

  render() {
    const {className, children, id, completionStatus, link, ...props} = this.props;
    const componentClasses = cx('SectionStatus', className);
    return (
      <div className={componentClasses} {...props}>
        {this.renderIcon()}
        {this.renderText()}
        <Link to={`/hq/setup/${id}${link}`}>
          <Button className="Button--sectionStatus">Edit</Button>
        </Link>
        <Status complete={completionStatus} name="" className="Status--sectionStatus" onClick={this.onEditClick}/>
        {children}
      </div>
    );
  }
}

