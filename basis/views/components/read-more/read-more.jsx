import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import './read-more.scss';

export default class ReadMore extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    trimmed: PropTypes.string,
    readMore: PropTypes.string.isRequired,
    readLess: PropTypes.string.isRequired,
    // other propTypes here
  };

  static defaultProps = {
    readMore: 'Read More',
    readLess: 'Read Less',
    onClick: function expand() {
      this.setState({
        expand: !this.state.expand,
      });
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      expand: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      className,
      children,
      trimmed,
      readMore,
      readLess,
      onClick,
       ...props,
    } = this.props;

    const componentClasses = cx('ReadMore', {
      'ReadMore--expanded': this.state.expand,
    }, className);

    return (
      <div {...props} className={componentClasses}>
        <div className="ReadMore-Content">
          {this.state.expand ? children : trimmed}
        </div>
        <div className="ReadMore-Button" onClick={onClick.bind(this)}>
          {!this.state.expand ? readMore : readLess}
        </div>
      </div>
    );
  }
}
