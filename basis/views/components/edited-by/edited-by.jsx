import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import UserName from 'views/components/user-name';
import DropDownTooltip from 'views/components/dropdown-tooltip';

import {uniqWith} from 'lodash';

import './edited-by.scss';

export default class EditedBy extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    editedBy: PropTypes.arrayOf(PropTypes.object),
    display: PropTypes.oneOf(['one', 'all']),
    // other propTypes here
  };

  static defaultProps = {
    display: 'one',
    editedBy: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {className, children, display, editedBy, ...props} = this.props;
    const editedByUnique = uniqWith(editedBy, (a, b) => a.user.id === b.user.id);

    const componentClasses = cx(
      'EditedBy',
      'EditedBy--display' + display,
      'EditedBy--length' + editedByUnique.length,
      className
    );

    if (!editedByUnique.length) {
      return (
        <div className={componentClasses} {...props}>
          none
        </div>
      );
    }

    if (editedByUnique.length === 1) {
      return (
        <div className={componentClasses} {...props}>
          <UserName user={editedByUnique[0].user}/>
        </div>
      );
    }

    if (display === 'all') {
      return (
        <div className={componentClasses} {...props}>
          <span className="EditedBy-counter">{editedByUnique.length} users&nbsp;</span>
          ({editedByUnique.map((edited, index) => {
            return (<UserName key={index} user={edited.user}/>);
          })})
        </div>
      );
    }

    if (display === 'one') {
      return (
        <div className={componentClasses} {...props}>
          <UserName user={editedByUnique[0].user}/> and&nbsp;
          <DropDownTooltip
            className="EditedBy-othersTooltip"
            label={(editedByUnique.length - 1) + ' others'}
          >
            <ul className="EditedBy-othersLists">
            {editedByUnique.slice(1).map((editor, index) => {
              return (
                <li key={index} className="EditedBy-othersUser">
                  <UserName user={editor.user}/>
                </li>
              );
            })}
          </ul>
          </DropDownTooltip>
        </div>
      );
    }
  }
}
