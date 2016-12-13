import React, {Component} from 'react';
import Select from 'views/components/select';

export default class SelectContainer extends Component {

  constructor(props) {
    super(props);
    let i;
    const arr = [];

    for (i = 0; i < 100; i++) {
      arr.push(i);
    }

    this.state = {
      value1: '1',
      value2: [],
      value3: '',
      optionList: arr,
      avatars: [],
    };
  }

  onchange(key, values) {
    this.setState({
      [key]: values,
    });
  }

  setSelected() {
    this.setState({
      value3: '1',
    });
  }

  getAvatar(id) {
    return (
      <img
      style={{
        display: 'inline',
        height: '40px',
        width: '40px',
        margin: '3px',
      }}
      key={id}
      src={`http://api.adorable.io/avatars/40/${id}`}
      />
    );
  }

  addOption() {
    const options = this.state.optionList.slice(0);
    options.push(options.length);
    this.setState({
      optionList: options,
    });
  }

  preventChange(key, values, e) {
    e.preventDefault();
  }

  renderAvatars() {
    if (this.state.avatars.length) {
      return this.state.avatars.map( (item) => {
        return this.getAvatar(item);
      });
    }
  }

  render() {
    const style = {
      width: '300px',
    };

    return (
      <div style={{backgroundColor: 'white'}}>
        <h3>Simple example</h3>
        <Select
          style={style}
          onChange={this.onchange.bind(this, 'value1')}
          value={this.state.value1}
          placeholder="select 1">
          <option value="1"> ioption 1</option>
          <option value="2"> ioption 2</option>
          <option value="3"> ioption 3</option>
        </Select>
        <br/>
        value: {this.state.value1.toString()}
        <br/><br/>

        <h3>dynamic options</h3>
        <button onClick={this.addOption.bind(this)}> add option</button>
        <Select
          selectLabel="dynamic label {number} selected"
          style={style}
          placeholder="select 2"
          multiple
          value={this.state.value2}
          onChange={this.onchange.bind(this, 'value2')}
          >
          {
            this.state.optionList.map((_, index) => {
              return (
                <option key={index} value={index}>option {index}</option>
              );
            })
          }
        </Select>
        <br/>
        <Select
          selectLabel="dynamic label {number} selected"
          style={style}
          placeholder="select 2 with options as props"
          value={this.state.value2}
          multiple
          onChange={this.onchange.bind(this, 'value2')}
          options={this.state.optionList.map((_, index) => {
            return {
              value: index,
              label: 'option ' + index,
            };
          })}
        />
        value: {this.state.value2.toString()}
        <br/><br/>

        <Select
          style={style}
          placeholder="select 2"
          multiple
          value={this.state.value3}
          onChange={this.onchange.bind(this, 'value3')}
          >
          <option value="1"> ioption 1</option>
          <option value="2"> ioption 2</option>
          <option value="3"> ioption 3</option>
        </Select>
        <button onClick={this.setSelected.bind(this)}>
          set selected to 1
        </button>
        <br/>
        value: {this.state.value3.toString()}
        <br/><br/>
        <h3>prevent change</h3>
        <Select
          style={style}
          placeholder="select 4"
          multiple
          onChange={this.preventChange.bind(this)}
          >
          <option value="1"> ioption 1</option>
          <option value="2"> ioption 2</option>
          <option value="3"> ioption 3</option>
        </Select>

        <br/><br/>
        <h3>Disabled option</h3>
        <Select
          style={style}
          placeholder="select 5"
          multiple
          >
          <option value="1"> ioption 1</option>
          <option value="2" disabled> disabled 2</option>
          <option value="3"> ioption 3</option>
        </Select>
        <br/><br/>
        <h3>Required select</h3>
        <Select
          style={style}
          required
          placeholder="select 5"
          multiple
        >
          <option value="1"> ioption 1</option>
          <option value="2" disabled> disabled 2</option>
          <option value="3"> ioption 3</option>
        </Select>

        <h3>Label select</h3>
        <Select
          style={style}
          label="CITY:"
          required
          placeholder="select 5"
          multiple
        >
          <option value="1"> ioption 1</option>
          <option value="2" disabled> disabled 2</option>
          <option value="3"> ioption 3</option>
        </Select>
        <h3>Required select</h3>
        <Select
          style={style}
          required
          placeholder="select 5"
          multiple
        >
          <option value="1"> ioption 1</option>
          <option value="2" disabled> disabled 2</option>
          <option value="3"> ioption 3</option>
        </Select>
        <h3>Disabled select</h3>
        <Select
          style={style}
          disabled
          placeholder="select 5"
          multiple
          >
          <option value="1"> ioption 1</option>
          <option value="2" disabled> disabled 2</option>
          <option value="3"> ioption 3</option>
        </Select>
        <br />
        <br />
        <h3>Custom options and label and custom styles</h3>
        <Select
          selectLabel={this.renderAvatars()}
          style={{
            width: '300px',
            maxHeight: '60px',
            height: '60px',
          }}
          placeholder="Please select a user"
          value={this.state.avatars}
          multiple
          onChange={this.onchange.bind(this, 'avatars')}
          error="Lorem ipsum dolor"
        >
        {
          this.state.optionList.map((_, index) => {
            return (
              <option
                style={{height: '60px'}}
                key={index}
                value={index}
                >
                {this.getAvatar(index)}
                <span> user {index} </span>
              </option>
            );
          })
        }
        </Select>
        value: {this.state.avatars.toString()}
        <br/><br/>
      </div>
    );
  }
}
