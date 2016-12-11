import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {debounce} from 'lodash';
import './scroll-area.scss';


export default class ScrollArea extends Component {
  static propTypes = {
    element: PropTypes.node,
    debounce: PropTypes.number,
    children: PropTypes.node,
    className: PropTypes.string,
    contentProps: PropTypes.object,
    scrollBuffer: PropTypes.number,
  };

  static defaultProps = {
    element: 'div',
    debounce: 300,
    contentProps: {},
    scrollBuffer: 30,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasScrollTop: false,
      hasScrollBottom: false,
    };
    this.handleScroll = debounce(this.calculateBoundaries.bind(this), props.debounce);
  }

  componentDidMount() {
    this.calculateBoundaries();
  }

  componentDidUpdate() {
    this.calculateBoundaries();
  }

  scrollTop(position = 0) {
    this.refs.content.scrollTop = position;
  }

  calculateBoundaries() {
    const scrollTop = this.refs.content.scrollTop;
    const scrollBuffer = this.props.scrollBuffer;

    if (this.state.hasScrollTop && scrollTop < scrollBuffer) {
      this.setState({
        hasScrollTop: false,
      });
    } else if (!this.state.hasScrollTop && scrollTop > scrollBuffer) {
      this.setState({
        hasScrollTop: true,
      });
    }

    const scrollBottom = this.refs.content.scrollHeight - this.refs.content.offsetHeight - scrollTop;
    if (!this.state.hasScrollBottom && scrollBottom > scrollBuffer) {
      this.setState({
        hasScrollBottom: true,
      });
    } else if (this.state.hasScrollBottom && scrollBottom < scrollBuffer) {
      this.setState({
        hasScrollBottom: false,
      });
    }
  }

  render() {
    const {className, element, debounce, contentProps, ...props} = this.props;

    const builtClasses = cx('ScrollArea', className, {
      'ScrollArea--hasScrollTop': this.state.hasScrollTop,
      'ScrollArea--hasScrollBottom': this.state.hasScrollBottom,
    });

    return (
      <this.props.element className={builtClasses} {...props}>
        <div className="ScrollArea-content" ref="content" onResize={this.handleScroll} onScroll={this.handleScroll} {...contentProps}>
          {this.props.children}
        </div>
      </this.props.element>
    );
  }
}
