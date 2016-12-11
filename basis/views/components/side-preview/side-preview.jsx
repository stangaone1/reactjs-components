import React, {Component, PropTypes} from 'react';
import cssClassBuilder from 'classnames';

import NextPrev from 'views/components/nextprev';
import {Button} from 'views/components/buttons';
import Dropdown from 'views/components/dropdown';
import DropdownMenu from 'views/components/dropdown-menu';

import './side-preview.scss';
import ellipsis from './ellipsis.png';

const PropTypeStringOrFunc = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
]);

export default class SidePreview extends Component {
  static propTypes = {
    restaurant: PropTypes.object,
    prevDisabled: PropTypes.bool,
    nextDisabled: PropTypes.bool,
    className: PropTypes.any,
    onNext: PropTypeStringOrFunc,
    onPrev: PropTypeStringOrFunc,
    onEdit: PropTypeStringOrFunc,
    onQuickEdit: PropTypeStringOrFunc,
    children: PropTypes.node,
    otherActions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
      })
    ),
  };
  static defaultProps = {
    otherActions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      othersDropdownOpened: false,
    };
  }

  onDropdownClick(value) {
    this.setState({
      othersDropdownOpened: typeof value !== 'boolean' ? value : !this.state.othersDropdownOpened,
    });
  }

  onDropdownItemClick(value) {
    this.props.otherActions[value].action();
    this.onDropdownClick(false);
  }

  renderOtherActions() {
    const otherActions = this.props.otherActions;
    if (!otherActions || !otherActions.length) {
      return void 0;
    }

    const label = (
      <img src={ellipsis} alt="…"/>
    );

    return (
      <Dropdown
        className="SidePreview-actions-others"
        size="small"
        open={this.state.othersDropdownOpened}
        label={label}
        onClick={this.onDropdownClick.bind(this, !this.state.othersDropdownOpened)}
        theme="light"
        position="right"
      >
        <DropdownMenu
          items={otherActions.map((item, index) =>{
            return {
              label: item.label,
              value: index,
            };
          })}
          onItemClick={this.onDropdownItemClick.bind(this)}/>
      </Dropdown>
    );
  }

  render() {
    const props = this.props;


    return (
      <div className={cssClassBuilder('SidePreview', props.className)}>
        <NextPrev
          prevDisabled={props.prevDisabled}
          nextDisabled={props.nextDisabled}
          onClickNext={props.onNext}
          onClickPrev={props.onPrev}/>
        <div className="SidePreview-content">
          {this.props.children}
        </div>

        <div className="SidePreview-actions">
          <Button type="main" className="edit" onClick={props.onEdit}>
            EDIT
          </Button>

          <Button className="quick-edit" onClick={props.onQuickEdit}>
            QUICK EDIT
          </Button>

          {this.renderOtherActions()}
        </div>
      </div>
    );
  }
}
