import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import WidgetHeader from '../widget-header.jsx';
import WidgetContent from '../widget-content.jsx';
import PhotoSelector from 'views/components/photo-selector';
import Checkbox from 'views/components/checkbox';
import InputField from 'views/components/inputfield';

import '../content-widget.scss';

export default class PictureWidget extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    toolbar: PropTypes.array,
  };

  static defaultProps = {
    value: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: props.value || props.defaultValue || {},
    };

    this.handlePictureAdd = this.onPictureAdd.bind(this);
    this.handleModalOpen = this.onModalOpen.bind(this);
    this.handleModalClose = this.onModalClose.bind(this);
    this.handleShowCaption = this.toggleShowCaption.bind(this);
    this.handleCaptionChange = this.onCaptionChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onCaptionChange(value) {
    this.setState({
      value: {
        ...this.state.value,
        caption: value,
      },
    }, () => this.doChange());
  }

  onModalClose() {
    this.setState({open: false});
  }

  onModalOpen() {
    this.setState({open: true});
  }

  onPictureAdd(file) {
    this.setState({
      value: {
        ...this.state.value,
        gallery: file,
      },
    }, () => this.doChange());
  }

  doChange() {
    this.onModalClose();
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  toggleShowCaption() {
    this.setState({
      value: {
        ...this.state.value,
        showCaption: !this.state.value.showCaption,
      },
    }, () => this.doChange());
  }

  hasFile() {
    return this.state.value && this.state.value.gallery && this.state.value.gallery.path;
  }

  renderPreview() {
    if (this.state.value && this.state.value.gallery && this.state.value.gallery.path) {
      return (<img src={this.state.value.gallery.path} className="PublishingPlatformWidget-picturePreview"/>);
    }
  }

  renderCaption() {
    if (this.state.value.showCaption) {
      return (
        <InputField
          value={this.state.value.caption}
          onChange={this.handleCaptionChange}
        />
      );
    }
  }

  render() {
    const {
      className,
      children,
      onChange,
      onRemove,
      defaultValue,
      value,
      ...props,
      } = this.props;

    const componentClasses = cx('PublishingPlatformWidget-picture', {
      'PublishingPlatformWidget-picture--hasValue': this.state.value.gallery && this.state.value.gallery.path,
      'PublishingPlatformWidget-picture--noValue': !(this.state.value.gallery && this.state.value.gallery.path),
    }, className);

    return (
      <div {...props} className={componentClasses}>
        <WidgetHeader onRemove={onRemove}>
          <label>Picture</label>
          <PhotoSelector
            {...props}
            className={'ChoosePhoto--custom'}
            isModalOpen={this.state.open}
            onButtonClick={this.handleModalOpen}
            onButtonClick={this.handleModalOpen}
            onModalClose={this.handleModalClose}
            title="Choose photo"
            onSelect={this.handlePictureAdd}
            buttonProps={{
              size: 'small',
            }}
            section="publishing"
            hideUploadFileWhenOk
          />
          <Checkbox
            label="Show caption"
            checked={this.state.value.showCaption}
            onClick={this.handleShowCaption}
          />
        </WidgetHeader>

        <WidgetContent>
          {this.renderPreview()}
          {this.renderCaption()}
        </WidgetContent>
      </div>
    );
  }
}
