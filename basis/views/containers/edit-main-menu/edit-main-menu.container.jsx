import React, {Component} from 'react';
import EditMainMenu from 'views/components/edit-main-menu';

import mainMenu from './menu-data';

export default class EditMainMenuContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu1: {
        mainMenuIndex: 1,
        title: 'New Item Title',
      },
      menu2: {
        mainMenuIndex: 2,
        position: 2,
      },
      menu3: {},
    };
  }

  handleTitleChange(menu, value) {
    this.setState({
      [menu]: {
        ...this.state[menu],
        title: value,
      },
    });
  }

  handlePositionChange(menu, newPos) {
    console.log('...arguments', ...arguments, this.state);

    const newMenu = {
      mainMenuIndex: newPos.mainMenuIndex,
      position: newPos.position,
    };

    if (this.state[menu].title) {
      newMenu.title = this.state[menu].title;
    }

    this.setState({
      [menu]: newMenu,
    });
  }

  render() {
    return (
      <div>
        <h2>new menu item</h2>
        <EditMainMenu
          mainMenu={mainMenu}
          title={this.state.menu1.title}
          mainMenuIndex={this.state.menu1.mainMenuIndex}
          onTitleChange={this.handleTitleChange.bind(this, 'menu1')}
          onPositionChange={this.handlePositionChange.bind(this, 'menu1')}
        />
        <br/>
        <h2>editing existing menu item</h2>
        <EditMainMenu
          mainMenu={mainMenu}
          position={this.state.menu2.position}
          mainMenuIndex={this.state.menu2.mainMenuIndex}
          onTitleChange={this.handleTitleChange.bind(this, 'menu2')}
          onPositionChange={this.handlePositionChange.bind(this, 'menu2')}
        />
        <h2>editing position</h2>
        <EditMainMenu
          mainMenu={mainMenu}
          onTitleChange={this.handleTitleChange.bind(this, 'menu3')}
          onPositionChange={this.handlePositionChange.bind(this, 'menu3')}
        />
        <br/>
        value:
        <pre>

        {JSON.stringify(this.state, false, 4)}
        </pre>
      </div>
    );
  }
}
