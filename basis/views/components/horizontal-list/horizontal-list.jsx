import React, {Component, PropTypes} from 'react';
import theClassNames from 'classnames';
import './horizontal-list.scss';

export default class HorizontalList extends Component {
  render() {
    const {scrollable, className, children, ...otherProps} = this.props;
    const containerClasses = theClassNames({
      'HorizontalListContainer': true,
      'HorizontalListContainer--selfScrolled': scrollable,
    }, className);

    return (
      <div {...otherProps} className={containerClasses}>
        <ul className="HorizontalList">
          {this.props.children}
        </ul>
      </div>
    );
  }
}

HorizontalList.displayName = 'HorizontalList';

HorizontalList.propTypes = {
  scrollable: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.any,
};

HorizontalList.defaultProps = {};
