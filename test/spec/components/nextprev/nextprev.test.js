/* eslint-env mocha */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

import NextPrev from 'views/components/nextprev';
import {Button} from 'views/components/buttons';


describe('NextPrev', () => {
  let component = null;

  it('should have a div.NextPrev as container', () => {
    component = shallow(<NextPrev />);

    expect(component.is('div')).to.be.true;
    expect(component.hasClass('NextPrev')).to.be.true;
  });

  it('should have two buttons as children', () => {
    component = shallow(<NextPrev />);

    expect(component.find(Button)).to.have.length(2);
  });

  it('should correctly disable buttons when specified', () => {
    component = render(<NextPrev prevDisabled nextDisabled/>);
    const buttons = component.find('.Button--disabled');
    expect(buttons).to.have.length(2);
  });

  const prevClickHandler = spy();
  const nextClickHandler = spy();

  beforeEach(() => {
    prevClickHandler.reset();
    nextClickHandler.reset();
  });

  it('should correctly trigger click handlers', () => {
    component = mount(
      <NextPrev
        onClickPrev={prevClickHandler}
        onClickNext={nextClickHandler}
      />);

    component.find('.NextPrev-nextButton').simulate('click');
    component.find('.NextPrev-prevButton').simulate('click');

    expect(prevClickHandler.calledOnce).to.equal(true);
    expect(nextClickHandler.calledOnce).to.equal(true);
  });

  it('should not trigger click handlers when buttons disabled', () => {
    component = mount(
      <NextPrev
        onClickPrev={prevClickHandler}
        onClickNext={nextClickHandler}
        prevDisabled
        nextDisabled
      />);

    component.find('.NextPrev-nextButton').simulate('click');
    component.find('.NextPrev-prevButton').simulate('click');

    expect(prevClickHandler.calledOnce).to.equal(false);
    expect(nextClickHandler.calledOnce).to.equal(false);
  });

  it('should render a label', () => {
    component = shallow(<NextPrev
      onClickPrev={prevClickHandler}
      onClickNext={nextClickHandler}
      labelSide={'right'}
      total={100}
    />);

    expect(component.find('.NextPrev-label')).to.have.length(1);
  });

  it('should render a label in left side', () => {
    component = shallow(<NextPrev
      onClickPrev={prevClickHandler}
      onClickNext={nextClickHandler}
      labelSide={'left'}
      total={100}
    />);

    expect(component.find('.NextPrev-label--left')).to.have.length(1);
    expect(component.find('.NextPrev-label--right')).to.have.length(0);
  });

  it('should render a label in right side', () => {
    component = shallow(<NextPrev
      onClickPrev={prevClickHandler}
      onClickNext={nextClickHandler}
      labelSide={'right'}
      total={100}
    />);

    expect(component.find('.NextPrev-label--right')).to.have.length(1);
    expect(component.find('.NextPrev-label--left')).to.have.length(0);
  });

  it('should render correct label text', () => {
    component = render(<NextPrev
      onClickPrev={prevClickHandler}
      onClickNext={nextClickHandler}
      labelSide={'right'}
      total={30}
      maxVisible={10}
      current={1}
    />);

    expect(component.find('.NextPrev-label').text()).to.contain('1 - 10 of 30');
  });

  it('correctly increments and disables next when total is reached', () => {
    const total = 30;
    const maxVisible = 10;
    const current = 3;
    component = mount(<NextPrev
      onClickNext={nextClickHandler}
      labelSide={'right'}
      total={total}
      maxVisible={maxVisible}
      current={current}
      nextDisabled={current * maxVisible >= total}
    />);

    component.find('.NextPrev-nextButton').simulate('click');
    expect(nextClickHandler.calledOnce).to.equal(false);
  });
});
