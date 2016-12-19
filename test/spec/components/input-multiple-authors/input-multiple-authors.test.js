import React from 'react';
import InputMultipleAuthors from 'views/components/input-multiple-authors';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('InputMultipleAuthors', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<InputMultipleAuthors />);
      expect(component.is('ul')).to.be.true;
    });

    it('should render with class InputMultipleAuthors', () => {
      const component = shallow(<InputMultipleAuthors />);
      expect(component.hasClass('InputMultipleAuthors')).to.be.true;
    });

    it('should render give class CustomInputMultipleAuthors', () => {
      const component = shallow(<InputMultipleAuthors className="CustomInputMultipleAuthors"/>);
      expect(component.hasClass('CustomInputMultipleAuthors')).to.be.true;
    });

    it('should render add button', () => {
      const component = mount(<InputMultipleAuthors value={[{}]} />);
      expect(component.find('.InputMultipleAuthors-add')).to.have.length(1);
    });

    it('should not render add button if current number of authors = max', () => {
      const component = mount(<InputMultipleAuthors value={[{}, {}]}/>);
      expect(component.find('.InputMultipleAuthors-add')).to.have.length(0);
    });

    it('should not render remove button if only one author exists', () => {
      const component = mount(<InputMultipleAuthors value={[{}]}/>);
      expect(component.find('.InputMultipleAuthors-remove')).to.have.length(0);
    });

    it('should render remove button if there are multiple authors', () => {
      const component = mount(<InputMultipleAuthors value={[{}, {}]}/>);
      expect(component.find('.InputMultipleAuthors-remove')).to.have.length(2);
    });

    it('should render remove and add button if there are multiple authors but max is greater', () => {
      const component = mount(<InputMultipleAuthors max={3} value={[{}, {}]}/>);
      expect(component.find('.InputMultipleAuthors-remove')).to.have.length(2);
      expect(component.find('.InputMultipleAuthors-add')).to.have.length(1);
    });

    it('should render 3 inputs fields', () => {
      const component = mount(<InputMultipleAuthors />);
      expect(component.find('.InputField')).to.have.length(3);
    });

    it('should render all 3 fields as disabled when disabled=true', () => {
      const component = mount(<InputMultipleAuthors disabled/>);
      expect(component.find('.InputField').filter('.disabled')).to.have.length(3);
    });

    it('should render 6 inputs when there are two authors', () => {
      const component = mount(<InputMultipleAuthors value={[{}, {}]}/>);
      expect(component.find('.InputField')).to.have.length(6);
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<InputMultipleAuthors onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
