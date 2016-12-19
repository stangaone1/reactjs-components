import React from 'react';
import VideoSelector from 'views/components/video-selector';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('VideoSelector', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<VideoSelector />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class VideoSelector', () => {
      const component = shallow(<VideoSelector />);
      expect(component.hasClass('VideoSelector')).to.be.true;
    });

    it('should render give class CustomVideoSelector', () => {
      const component = shallow(<VideoSelector className="CustomVideoSelector"/>);
      expect(component.hasClass('CustomVideoSelector')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<VideoSelector onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
