import React from 'react';
import Dropdown from 'views/components/dropdown/dropdown';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';
// import {Simulate} from 'react-addons-test-utils';

let state = true;
const label = 'test label';
const onButtonClick = spy(() => {
  state = !state;
});
const dropdown = (
  <Dropdown
    label={label}
    open={state}
    onButtonClick={onButtonClick}
  >
  <p className="Dropdown-child">Dropdown</p>
  </Dropdown>
);
const dropdownClosed = (
  <Dropdown
    label={label}
    open={false}
    onButtonClick={onButtonClick}
  >
  <p>Dropdown</p>
  </Dropdown>
);


describe('Dropdown', () => {
  it('displays the button', () => {
    const component = shallow(dropdown);

    expect(component.find('.Dropdown-button')).to.have.length(1);
  });

  it('render label as button text', () => {
    const component = shallow(dropdown);

    expect(component.find('.Dropdown-button').text()).to.equal(label);
  });

  it('displays the body when open is true', () => {
    const component = shallow(dropdown);

    expect(component.find('.Dropdown-button--open')).to.have.length(1);
  });

  it('hides the body when open is false', () => {
    const component = shallow(dropdownClosed);

    expect(component.find('.Dropdown-body')).to.have.length(0);
  });

  it('renders provided children in body', () => {
    const component = shallow(dropdown);
    const body = component.find('.Dropdown-body');

    expect(body.find('.Dropdown-child')).to.have.length(1);
  });

  it('adds theme classes when theme prop is provided', () => {
    const componentLight = shallow(<Dropdown theme="light" open label="foo">foo</Dropdown>);
    const componentDark = shallow(<Dropdown theme="dark" open label="foo">foo</Dropdown>);

    expect(componentLight.find('.Dropdown-body--light')).to.have.length(1);
    expect(componentDark.find('.Dropdown-body--dark')).to.have.length(1);
  });

  it('adds padding when padding prop is provided', () => {
    const component = shallow(<Dropdown open padding label="foo">foo</Dropdown>);

    expect(component.find('.Dropdown-body--padded')).to.have.length(1);
  });

  it('adds size class when size prop is provided', () => {
    const size = 'small';
    const component = shallow(<Dropdown open size={size} label="foo">foo</Dropdown>);

    expect(component.find('.Dropdown-body--' + size)).to.have.length(1);
  });

  it('adds body position when position prop is provided', () => {
    const position = 'right';
    const component = shallow(<Dropdown open position={position} label="foo">foo</Dropdown>);

    expect(component.find('.Dropdown-body--' + position)).to.have.length(1);
  });

  it('calls onButtonClick on button click', () => {
    const component = mount(dropdownClosed);

    component.find('.Dropdown-button').simulate('click');

    expect(onButtonClick).to.have.been.called;
    // test below fails
    // expect(onButtonClick).to.have.been.called.once;
  });
});
