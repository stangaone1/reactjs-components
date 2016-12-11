// deps
import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import cx from 'classnames';

// components
import Icon from 'views/components/icon/icon';

// style
import './bannercard.scss';

class BannerCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    publishButtonLabel: PropTypes.string,
    index: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
    sizes: PropTypes.object,
    availability: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }).isRequired,
    onButtonClick: PropTypes.func,
    onPreviewClick: PropTypes.func,
  }

  onButtonClick(index, category, ev) {
    ev.preventDefault();
    const { onButtonClick } = this.props;

    if (onButtonClick) {
      onButtonClick(index, category);
    }
  }

  onPreviewClick(index, category, ev) {
    ev.preventDefault();
    const { onPreviewClick } = this.props;

    if (onPreviewClick) {
      onPreviewClick(index, category);
    }
  }

  renderImage() {
    const {category, index, publishButtonLabel, sizes} = this.props;

    let image;
    image = sizes.medium || sizes.large;
    image = image ? <img src={image} /> : null;

    return (
      <div className={
          cx({
            'BannerCard-Image': true,
            'BannerCard-Image--hasImage': image,
          })
      }>
        {image}
        <button
          className="Button BannerCard-PublishButton"
          onClick={this.onButtonClick.bind(this, index, category)}
        >
          {publishButtonLabel}
        </button>
      </div>
    );
  }

  renderSizes() {
    const {sizes} = this.props;
    const sizesArray = Object.keys(sizes);

    if (sizesArray.length) {
      return (
        <ul className="BannerCard-SizeList">
          {
            sizesArray.map(item => {
              const active = sizes[item] ? 'active' : '';
              const icon = sizes[item] ? 'check' : 'close';
              const label = `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`;

              return (
                <li
                  key={`BannerCard-SizeListItem-${item}`}
                  className={`BannerCard-SizeListItem ${active}`}
                >
                  <Icon className="BannerCard-Icon" name={icon} />{label}
                </li>
              );
            })
          }
        </ul>
      );
    }
  }

  render() {
    const { availability, category, className, index, title } = this.props;
    const BannerCardClasses = cx({
      'BannerCard': true,
    }, className);

    const startDate = moment(availability.start).format('ll');
    const endDate = moment(availability.end).format('ll');

    return (
      <div className={BannerCardClasses}>
        {this.renderImage()}
        <p className="BannerCard-Title">{title}</p>
        {this.renderSizes()}
        <p className="BannerCard-Availability">
          Availability: <span className="date">{startDate}</span> - <span className="date">{endDate}</span>
        </p>
        <a
          className="BannerCard-ClickArea"
          onClick={this.onPreviewClick.bind(this, index, category)}
        />
      </div>
    );
  }
}

export default BannerCard;
