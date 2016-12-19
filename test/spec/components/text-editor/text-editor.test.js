import React from 'react';
import TextEditor from 'views/components/text-editor';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('TextEditor', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<TextEditor />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class TextEditor', () => {
      const component = shallow(<TextEditor />);
      expect(component.hasClass('TextEditor')).to.be.true;
    });

    it('should render give class CustomTextEditor', () => {
      const component = shallow(<TextEditor className="CustomTextEditor"/>);
      expect(component.hasClass('CustomTextEditor')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<TextEditor onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
