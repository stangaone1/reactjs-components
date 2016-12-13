import React, { Component } from 'react';
import Dropdown from 'views/components/dropdown';
import DropdownFooter from 'views/components/dropdown-footer';
import DropdownScroll from 'views/components/dropdown-scroll';
import DropdownMenu from 'views/components/dropdown-menu';
import {Button} from 'views/components/buttons';

const data = [
  {value: '0', label: 'Edit'},
  {value: '1', label: 'Delete'},
  {value: '2', label: 'Select'},
  {type: 'header', label: 'header'},
  {value: '3', label: 'Link'},
];

export default class DropdownContainer extends Component {
  static displayName = 'DropdownContainer';

  constructor(props) {
    super(props);
    this.state = {
      open: [false, false, false, false],
    };

    this.onClick = this.onClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  onClick(index) {
    const temp = [false, false, false, false];
    temp[index] = !this.state.open[index];

    this.setState({
      open: temp,
    });
  }

  onItemClick(index) {
    this.onClick(index);
  }

  render() {
    return (
      <div>
        <Dropdown
          label="Small"
          open={this.state.open[0]}
          onClick={this.onClick.bind(this, 0)}
          size="small"
          theme="dark"
        >
          <DropdownMenu
            items={data}
            onItemClick={this.onItemClick.bind(this, 0)}
          />
        </Dropdown>
        <br /> <br />

        <Dropdown
          label="htw"
          open={this.state.open[1]}
          onClick={this.onClick.bind(this, 1)}
          size="small"
          theme="dark"
          position="center"
        >
          Hiring to win
        </Dropdown>
        <br /> <br />


        <Dropdown
          label="Large, with scroll"
          open={this.state.open[2]}
          onClick={this.onClick.bind(this, 2)}
          size="large"
          noPadding
        >
          <div>
          <DropdownScroll>
              Lorem
          </DropdownScroll>
          <DropdownFooter>
            <Button
              centered
              size="small"
            >
              Reset to default
            </Button>
          </DropdownFooter>
          </div>
        </Dropdown>
        <br /> <br />

        <Dropdown
          label="Inverse"
          open={this.state.open[3]}
          onClick={this.onClick.bind(this, 3)}
          inverse
        >
          <div>
            foo
          </div>
        </Dropdown>

      </div>
    );
  }
}
