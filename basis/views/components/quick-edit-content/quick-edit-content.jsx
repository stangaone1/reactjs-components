import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import {reduxForm} from 'redux-form';

import { ModalFooter } from 'views/components/modal';
import {Button} from 'views/components/buttons';
import EditContentAvailability from 'views/components/edit-content-availability';
import EditContentExtraOptions from 'views/components/edit-content-extra-options';

import './quick-edit-content.scss';


import preventEvent, {preventAllEvents} from 'lib/utils/prevent-events';

class QuickEditContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    fields: PropTypes.object,
    submitting: PropTypes.bool,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    // other propTypes here
  };

  static defaultProps = {
    // default propTypes here
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleCancel(event) {
    preventEvent(event);
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    const {
      fields: {startDate, endDate, authors, comments, social},
      className,
      handleSubmit,
      children,
      onSave,
      onCancel,
      submitting,
      ...props,
      } = this.props;

    const componentClasses = cx('QuickEdit', {
      // modifiers here
    }, className);

    return (
      <form {...props} {...preventAllEvents} className={componentClasses}>
        <div className="QuickEdit-content">
          <EditContentAvailability
            className="QuickEdit-section"
            startDate={startDate}
            endDate={endDate}
            disabled={submitting}
          >
            {children}
          </EditContentAvailability>
          <EditContentExtraOptions
            className="QuickEdit-section"
            disableUserComments
            disableSharing
            authors={authors}
            comments={comments}
            social={social}
            disabled={submitting}
          />

        </div>
        <ModalFooter className="QuickEdit-footer">
          <Button
            type="primary"
            buttonType="submit"
            onClick={handleSubmit(onSave)}
            disabled={submitting}
          >
            Apply changes
          </Button>
          <Button
            {...preventAllEvents}
            onClick={this.handleCancel.bind(this)}
            disabled={submitting}
          >
            cancel
          </Button>
        </ModalFooter>
      </form>
    );
  }
}
export {QuickEditContent};
export default reduxForm(
  {
    form: 'QuickEditContent',
    fields: ['startDate', 'endDate', 'authors', 'comments', 'social'],
  }
)(QuickEditContent);
