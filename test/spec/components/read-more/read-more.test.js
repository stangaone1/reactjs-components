import React from 'react';
import ReadMore from 'views/components/read-more';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('ReadMore', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<ReadMore />);

      expect(component.is('div')).to.be.true;
    });

    it('should render with class ReadMore', () => {
      const component = shallow(<ReadMore />);

      expect(component.hasClass('ReadMore')).to.be.true;
    });

    it('should render give class CustomReadMore', () => {
      const component = shallow(<ReadMore className="CustomReadMore"/>);

      expect(component.hasClass('CustomReadMore')).to.be.true;
    });

    it('should render give readMore text on button by default', () => {
      const readMore = 'Continue reading';
      const component = shallow(<ReadMore readMore={readMore}/>);

      expect(component.find('.ReadMore-Button').text()).to.equal(readMore);
    });

    it('should render give readLess text on button when state.expand===true', () => {
      const readLess = 'Continue reading';
      const component = shallow(<ReadMore readLess={readLess}/>);

      component.setState({expand: true});

      expect(component.find('.ReadMore-Button').text()).to.equal(readLess);
    });
  });

  describe('behavior', () => {
    it('should handle given events like onHover', () => {
      const handleHover = spy();
      const component = shallow(<ReadMore onHover={handleHover}/>);

      component.simulate('hover');

      expect(handleHover.calledOnce).to.be.true;
    });

    it('should render trimmed content by default', () => {
      const trimmed = 'some small text';
      const component = shallow(
        <ReadMore trimmed={trimmed} />
      );

      expect(component.find('.ReadMore-Content').text()).to.equal(trimmed);
    });

    it('should not render full content by default', () => {
      const component = shallow(
        <ReadMore >
          <span className="content"> content </span>
        </ReadMore>
      );

      expect(component.find('.content')).to.have.length(0);
    });

    it('should set state.expand=true on clicking read more', () => {
      const component = shallow(
        <ReadMore >
          <span className="content"> content </span>
        </ReadMore>
      );

      component.find('.ReadMore-Button').simulate('click');

      expect(component.state('expand')).to.be.true;
    });

    it('should set state.expand=true and after false on clicking read more twice', () => {
      const component = shallow(
        <ReadMore >
          <span className="content"> content </span>
        </ReadMore>
      );

      component.find('.ReadMore-Button').simulate('click');

      expect(component.state('expand')).to.be.true;

      component.find('.ReadMore-Button').simulate('click');

      expect(component.state('expand')).to.be.false;
    });

    it('should render with class "ReadMore--expanded" when state.expand === true', () => {
      const component = shallow(
        <ReadMore >
          <span className="content"> content </span>
        </ReadMore>
      );

      component.setState({expand: true});

      expect(component.hasClass('ReadMore--expanded')).to.be.true;
    });

    it('should render full content when state.expanded===true', () => {
      const component = shallow(
        <ReadMore >
          <span className="content"> content </span>
        </ReadMore>
      );

      component.setState({expand: true});

      expect(component.find('.content')).to.have.length(1);
    });

    it('should not render trimmed content when expanded', () => {
      const trimmed = 'some small text';
      const component = shallow(
        <ReadMore trimmed={trimmed} />
      );

      component.setState({expand: true});

      expect(component.find('.ReadMore-Content').text()).to.not.equal(trimmed);
    });

    it('should call given onClick function instead of expading', () => {
      const handleClick = spy();
      const trimmed = 'some small text';
      const component = shallow(
        <ReadMore trimmed={trimmed} onClick={handleClick}>
          full content here
        </ReadMore>
      );

      component.find('.ReadMore-Button').simulate('click');

      expect(component.state('expand')).to.be.false;
      expect(handleClick.called).to.be.true;
    });
  });
});
