import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import MultipleAuthors from 'views/components/input-multiple-authors';
import PermissionComments from 'views/components/permission-comments';
import Checkbox from 'views/components/checkbox';

import './edit-content-extra-options.scss';

export default class EditContentExtraOptions extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    /**
     * Redux form field
     */
    authors: PropTypes.object,
    /**
     * Redux form field
     */
    comments: PropTypes.object,
    /**
     * Redux form field
     */
    social: PropTypes.object,
    disabled: PropTypes.bool,
    disableSharing: PropTypes.bool,
    disableUserComments: PropTypes.bool,
  };

  static defaultProps = {
    disableSharing: false,
    disableUserComments: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      className,
      authors,
      comments,
      social,
      disabled,
      children,
      disableUserComments,
      disableSharing,
      ...props,
    } = this.props;

    const componentClasses = cx('EditContentExtraOptions', className);

    return (
      <div {...props} className={componentClasses}>
        <MultipleAuthors
          disabled={disabled}
          className="EditContentExtraOptions-section EditContentExtraOptions-authors"
          {...authors}
          onBlur={0}
        />
        <PermissionComments
          disabled={disableUserComments}
          className="EditContentExtraOptions-section EditContentExtraOptions-permissions"
          {...comments}
          onBlur={0}
        />
        <Checkbox
          disabled={disableSharing}
          className="EditContentExtraOptions-section EditContentExtraOptions-sharing"
          {...social}
          label="Enable article sharing"
          onBlur={0}
        />
        {children}
      </div>
    );
  }
}

