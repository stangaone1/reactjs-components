import React, {Component, PropTypes} from 'react';
import Icon from 'views/components/icon/icon';
import {iconList} from 'views/components/icons/icons';

import './icons.scss';

export default class IconsContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      search: props.location ? props.location.hash.replace('#', '') : '',
    };
  }

  onSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }

  selectCode(codeRef) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(this.refs[codeRef]);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  render() {
    return (
      <div className="IconsContainer">
        <input placeholder="Search..." type="search" value={this.state.search} onChange={this.onSearch.bind(this)}/>
        <br/>
        <br/>
        <div className="IconsContainer-container">
          {
            iconList
              .filter((icon) => (new RegExp(this.state.search, 'i')).test(icon))
              .sort()
              .map((icon) => {
                return (
                  <a name={icon}
                     href={`#${icon}`}
                     key={icon}
                     className="IconsContainer-icon"
                     onClick={this.selectCode.bind(this, 'iconCode' + icon)}>

                    <h4>{icon.replace(/-/g, ' ')}</h4>

                    <code ref={'iconCode' + icon}>{`<Icon name="${icon}" />`}</code>
                    <div className="IconsContainer-IconWrapper">
                      <Icon name={icon}/>
                    </div>
                  </a>
                );
              })
            }
        </div>
      </div>
    );
  }
}
