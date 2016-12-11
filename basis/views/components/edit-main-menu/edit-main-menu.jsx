import React, {Component, PropTypes} from 'react';

import {cloneDeep} from 'lodash';

import InputField from 'views/components/inputfield';

import {
  AccordionSection,
  AccordionSectionHeader,
  AccordionSectionBody,
  AccordionDraggable,
} from 'views/components/accordion';

import Sortable from 'views/components/sortable';

import './edit-main-menu.scss';


export default class EditMainMenu extends Component {

  static propTypes = {
    className: PropTypes.string,
    mainMenu: PropTypes.array.isRequired,
    title: PropTypes.string,
    onPositionChange: PropTypes.func,
    onTitleChange: PropTypes.func,
    mainMenuIndex: PropTypes.number,
    position: PropTypes.number,
    error: PropTypes.string,
    inputTitleDisabled: PropTypes.bool,
  };

  static defaultProps = {
    mainMenuIndex: -1,
    error: '',
    inputTitleDisabled: false,
  };

  constructor(props) {
    super(props);

    this.handleOpenMenu = this.onMenuOpen.bind(this);
    this.handleDragEnd = this.onDragEnd.bind(this);
    this.handleTitleChange = this.onTitleChange.bind(this);
    this.handleRenderMainMenuItem = this.renderMainMenuItem.bind(this);
  }

  componentWillMount() {
    this.setState(this.getInitialData(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mainMenu !== this.props.mainMenu) {
      this.setState(this.getInitialData(nextProps));
    }
  }

  getInitialData(props) {
    const mainMenu = cloneDeep(props.mainMenu);
    let newItemConstant = 'newItem';

    if (props.mainMenuIndex > -1) {
      if (typeof props.position !== 'undefined' && typeof mainMenu[props.mainMenuIndex].subMenu[props.position] !== 'undefined') {
        newItemConstant = mainMenu[props.mainMenuIndex].subMenu[props.position];
      } else if (this.props.title) {
        mainMenu[props.mainMenuIndex].subMenu.unshift(newItemConstant);
      } else {
        newItemConstant = false;
      }
    }

    return {
      openedMenu: [props.mainMenuIndex],
      mainMenu: mainMenu,
      newItemMainMenu: props.mainMenuIndex,
      position: props.position || 0,
      title: props.title || newItemConstant.title,
      newItemConstant: newItemConstant,
    };
  }

  onDragEnd(endProps) {
    this.setState({
      position: endProps.index,
      mainMenu: this.moveItem(endProps),
    });
  }

  onTitleChange(value) {
    this.setState({
      title: value,
    });

    if (this.props.onTitleChange) {
      this.props.onTitleChange(value, this.state.mainMenu);
    }
  }

  moveItem(endProps = {id: this.state.position, index: 0}, toggledSection = this.state.newItemMainMenu) {
    const newMenu = this.state.mainMenu;
    const item = newMenu[this.state.newItemMainMenu].subMenu[endProps.id];

    newMenu[this.state.newItemMainMenu].subMenu.splice(endProps.id, 1);

    newMenu[toggledSection].subMenu.splice(endProps.index, 0, item);


    if (this.props.onPositionChange) {
      this.props.onPositionChange({
        oldMainMenuIndex: this.state.newItemMainMenu,
        oldPosition: endProps.id,
        mainMenuIndex: toggledSection,
        position: endProps.index,
      }, this.state.mainMenu);
    }

    return newMenu;
  }

  onMenuOpen(toggledSection) {
    if (this.state.openedMenu && toggledSection === this.state.openedMenu[0]) {
      return;
    }

    if (!this.state.newItemConstant) {
      this.setState({
        openedMenu: [toggledSection],
      });

      return;
    }

    const newMenu = this.state.mainMenu;

    if (this.state.newItemMainMenu > -1) {
      const item = newMenu[this.state.newItemMainMenu].subMenu[this.state.position];

      newMenu[this.state.newItemMainMenu].subMenu.splice(this.state.position, 1);
      newMenu[toggledSection].subMenu.unshift(item);
    } else if (this.props.title) {
      newMenu[toggledSection].subMenu.unshift('newItem');
    }

    this.setState({
      mainMenu: newMenu,
      newItemMainMenu: toggledSection,
      openedMenu: [toggledSection],
      position: 0,
    });

    if (this.props.onPositionChange) {
      this.props.onPositionChange({
        mainMenuIndex: toggledSection,
        position: 0,
      }, this.state.mainMenu);
    }
  }

  renderNewItem() {
    if (typeof this.state.title !== 'undefined') {
      return (
        <div
          key={'newItem'}
          className="EditMainMenu-item EditMainMenu-item--new"
        >
          <span className="EditMainMenu-itemTitle">{this.state.title || 'missing title'}</span>
        </div>
      );
    }
  }

  renderTitleInput() {
    if (typeof this.state.title !== 'undefined') {
      return (
        <InputField
          label="Link Title"
          disabled={this.props.inputTitleDisabled}
          value={this.props.title || this.state.newItemConstant.title}
          error={!this.state.title.length && 'Submenu title is mandatory'}
          onChange={this.handleTitleChange}
          placeholder="Title"
        />
      );
    }
  }

  renderMainMenuItem(mainMenuItem, index) {
    return (
      <AccordionSection key={index}>
        <AccordionSectionHeader>
          {mainMenuItem.title}
        </AccordionSectionHeader>
        <AccordionSectionBody>
          <Sortable onDragEnd={this.handleDragEnd}>
            {mainMenuItem.subMenu.map((subItem, subIndex) => {
              if (subItem === this.state.newItemConstant) {
                return this.renderNewItem();
              }
              return (
                <div
                  key={subIndex}
                  className="EditMainMenu-item"
                  disabled={!!this.state.newItemConstant}
                >
                  <span
                    className="EditMainMenu-itemTitle"
                  >
                    {subItem.title || 'missing title'}
                  </span>
                  <span
                    className="EditMainMenu-itemMore"
                  >
                    {subItem.more ? subItem.more + ' more' : ''}
                  </span>
                </div>
              );
            })}
          </Sortable>
        </AccordionSectionBody>
      </AccordionSection>
    );
  }

  render() {
    const {
      className,
      onTitleChange,
      title,
      ...props,
    } = this.props;

    return (
      <div className="EditMainMenu">
        {this.renderTitleInput()}
        <label className="EditMainMenu-positionLabel">
          Main Menu Position
        </label>
        <div className="EditMainMenu-container">
          <AccordionDraggable
            openedSections={this.state.openedMenu}
            onSectionClick={this.handleOpenMenu}
          >
            {this.state.mainMenu.map(this.handleRenderMainMenuItem)}
          </AccordionDraggable>
        </div>
      </div>
    );
  }
}
