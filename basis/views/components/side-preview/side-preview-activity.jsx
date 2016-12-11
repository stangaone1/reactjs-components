import React, {Component, PropTypes} from 'react';
import cssClassBuilder from 'classnames';

import TimePassed from 'views/components/time-passed';
import UserName from 'views/components/user-name';

import {SidePreviewSection} from './index';

import './side-preview.scss';

const PropTypeUserTime = PropTypes.shape({
  time: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
});

export default class SidePreviewActivity extends Component {
  static propTypes = {
    activated: PropTypeUserTime,
    lastModified: PropTypeUserTime,
    editedBy: PropTypes.arrayOf(PropTypeUserTime),
    children: PropTypes.node,
    className: PropTypes.string,
  };

  renderKeyValue(label, activity) {
    if (!activity) {
      return void 0;
    }

    return (
      <li>
        <div className="SidePreviewActivity-key">
          {label}:
        </div>
        <div className="SidePreviewActivity-value">
          <TimePassed time={activity.time}/> by <UserName user={activity.user}/>
        </div>
      </li>
    );
  }

  renderEditedBy() {
    const editedBy = this.props.editedBy;

    if (!editedBy || !editedBy.length) {
      return void 0;
    }

    return (
      <li>
        <div className="SidePreviewActivity-key">
          Edited by:
        </div>
        <div className="SidePreviewActivity-value">
          {editedBy.length} users
          ({editedBy.map((edited, index) =>{
            return [<UserName user={edited.user}/>, index < editedBy.length - 1 ? ', ' : ''];
          })})
        </div>
      </li>
    );
  }

  render() {
    return (
      <SidePreviewSection>
        <ul className={cssClassBuilder(this.props.className, 'SidePreviewActivity')}>
          {this.renderKeyValue('Activated', this.props.activated)}
          {this.renderKeyValue('Last Modified', this.props.lastModified)}
          {this.renderEditedBy()}
        </ul>
        {this.props.children}
      </SidePreviewSection>
    );
  }
}
