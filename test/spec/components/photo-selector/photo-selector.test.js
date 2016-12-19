import React from 'react';
import PhotoSelector from 'views/components/photo-selector';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('PhotoSelector', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<PhotoSelector />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class PhotoSelector', () => {
      const component = shallow(<PhotoSelector />);
      expect(component.hasClass('PhotoSelector')).to.be.true;
    });

    it('should render give class CustomPhotoSelector', () => {
      const component = shallow(<PhotoSelector className="CustomPhotoSelector"/>);
      expect(component.hasClass('CustomPhotoSelector')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<PhotoSelector onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
