import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import FormBuilder from 'views/components/form-builder/form-builder';

class SlideForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    formBuilder: PropTypes.instanceOf(FormBuilder),
  };

  render() {
    const {className, formBuilder} = this.props;

    const SlideFormClassNames = {
      'SlideForm': true,
    };

    return (
      <div className={cx(SlideFormClassNames, className)}>
        {formBuilder.render()}
      </div>
    );
  }
}

export default SlideForm;
