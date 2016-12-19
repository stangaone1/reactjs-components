import React from 'react';
import ScrollArea from 'views/components/scroll-area';
import {expect} from 'chai';
import * as enzime from 'enzyme';

describe('ScrollArea', () => {
  const areaRoot = enzime.mount(
    <ScrollArea className="customClass">
     <div>content here</div>
    </ScrollArea>
  );

  const area = areaRoot.find('.ScrollArea');

  describe('display', () => {
    it('should render as a <div>', () => {
      expect(area.is('div')).to.be.true;
    });

    it('should render with class "ScrollArea"', () => {
      expect(area.is('.ScrollArea')).to.be.true;
    });

    it('should render given className', () => {
      expect(area.is('.customClass')).to.be.true;
    });

    it('should contain one div.ScrollArea-shadowBottom element', () =>{
      expect(area.find('.ScrollArea-shadowBottom')).to.have.length(1);
    });

    it('should contain one div.ScrollArea-content element', () =>{
      expect(area.find('.ScrollArea-content')).to.have.length(1);
    });

    it('should render children in a div.ScrollArea-content element', () =>{
      expect(area.find('.ScrollArea-content').text()).to.equal('content here');
    });
  });

  describe('behavior', () =>{
    it('should recalculate boundaries', () => {
      areaRoot.setState({
        hasScrollTop: true,
      });

      areaRoot.find('.ScrollArea-content').simulate('scroll');
      expect(areaRoot.state().hasScrollTop).to.be.false;
    });
  });
});
