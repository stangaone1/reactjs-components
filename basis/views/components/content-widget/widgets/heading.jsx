import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import InputField from 'views/components/inputfield';
import WidgetHeader from '../widget-header.jsx';
import WidgetContent from '../widget-content.jsx';

import '../content-widget.scss';

export default class TextWidget extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    value: PropTypes.shape({
      headingType: PropTypes.string,
      text: PropTypes.string,
    }),
    defaultValue: PropTypes.shape({
      headingType: PropTypes.string,
      text: PropTypes.string,
    }),
    headingTypeList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    headingTypeList: ['H1', 'H2', 'H3'],
    value: {
      headingType: 'H2',
      text: '',
    },
    // default propTypes here
  };

  constructor(props) {
    super(props);
    this.state = props.value || {
      headingType: 'H2',
      text: '',
    };

    this.handleTextChange = this.onTextChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onTextChange(text) {
    this.setState({text});
    if (this.props.onChange) {
      this.props.onChange({
        headingType: 'H2',
        text,
      });
    }
  }

  render() {
    const {
      className,
      children,
      onChange,
      onRemove,
      headingTypeList,
      defaultValue,
      value,
      ...props,
      } = this.props;

    const componentClasses = cx('PublishingPlatformWidget-heading', className);

    return (
      <div {...props} className={componentClasses}>
        <WidgetHeader onRemove={onRemove}>
          <label>
            Heading
          </label>
        </WidgetHeader>
        <WidgetContent>
          <InputField
            defaultValue={defaultValue && defaultValue.text}
            value={this.state.text}
            onChange={this.handleTextChange}
          />
        </WidgetContent>
      </div>
    );
  }
}

