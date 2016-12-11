import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Checkbox from 'views/components/checkbox';

class EditSectionForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
  };

  render() {
    const { fields } = this.props;
    return (
      <div>
        {Object.keys(fields).map(name => {
          const field = fields[name];
          return (
            <Checkbox
              key={name}
              className="EditSection-checkbox"
              {...field}
              label={name}
              onBlur={0}
            />
          );
        })}
      </div>
    );
  }
}

export default reduxForm({
  form: 'editRestaurantSection',
  destroyOnUnmount: false,
})(EditSectionForm);
