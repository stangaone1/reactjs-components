import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import InputField from 'views/components/inputfield';
import WidgetHeader from '../widget-header.jsx';
import WidgetContent from '../widget-content.jsx';

import '../content-widget.scss';

export default class QuoteWidget extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    value: PropTypes.shape({
      authorName: PropTypes.string,
      authorDescription: PropTypes.string,
      text: PropTypes.string,
    }),
    defaultValue: PropTypes.shape({
      authorName: PropTypes.string,
      authorDescription: PropTypes.string,
      text: PropTypes.string,
    }),
  };

  static defaultProps = {
    value: {
      authorName: '',
      authorDescription: '',
      text: '',
    },
  };

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    this.state = {
      value: value,
      open: false,
    };

    this.handleTextChange = this.onChange.bind(this, 'text');
    this.handleAuthorNameChange = this.onChange.bind(this, 'authorName');
    this.handleAuthorDescriptionChange = this.onChange.bind(this, 'authorDescription');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onChange(field, value) {
    this.setState({
      value: {
        ...this.state.value,
        [field]: value.target ? value.target.value : value,
      },
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  render() {
    const {
      className,
      children,
      onChange,
      onRemove,
      defaultValue,
      ...props,
      } = this.props;
    const componentClasses = cx('PublishingPlatformWidget-quote', className);

    return (
      <div {...props} className={componentClasses}>
        <WidgetHeader onRemove={onRemove}>
          <label>
            Quote
          </label>
        </WidgetHeader>
        <WidgetContent>
          <div
            className="PublishingPlatformWidget-quoteAuthor"
          >
            <InputField
              placeholder="Author’s Name"
              value={this.state.value.authorDescription}
              onChange={this.handleAuthorDescriptionChange}
            />
            <InputField
              placeholder="Author’s Description"
              value={this.state.value.authorName}
              onChange={this.handleAuthorNameChange}
            />
          </div>
          <InputField
            multiline
            className="PublishingPlatformWidget-quoteText"
            value={this.state.value.text}
            onChange={this.handleTextChange}
          />
        </WidgetContent>
      </div>
    );
  }
}

