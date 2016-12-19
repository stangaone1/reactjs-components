import React from 'react';
import Pagination from 'views/components/pagination';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('Pagination', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<Pagination />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class Pagination', () => {
      const component = shallow(<Pagination />);
      expect(component.hasClass('Pagination')).to.be.true;
    });

    it('should have a prev page button', () => {
      const component = shallow(<Pagination />);
      const prevBtn = component.node.props.children[0];
      expect(prevBtn.props.className).to.equal('Pagination-prev');
    });

    it('should disable prev page button if first page is selected', () => {
      const component = shallow(
        <Pagination
          selectedPage={0}
          totalPages={10}
          />);
      const prevBtn = component.node.props.children[0];
      expect(prevBtn.props.className).to.contain('Pagination-prev--disabled');
    });

    it('should have a next button button', () => {
      const component = shallow(<Pagination />);
      const nextBtn = component.node.props.children[2];
      expect(nextBtn.props.className).to.equal('Pagination-next');
    });

    it('should disable next page button if last page is selected', () => {
      const component = shallow(
        <Pagination
          selectedPage={9}
          totalPages={10}
          />);
      const prevBtn = component.node.props.children[2];
      expect(prevBtn.props.className).to.contain('Pagination-next--disabled');
    });

    it('should render the correct number of pages', () => {
      const pages = 10;
      const component = shallow(
        <Pagination
          selectedPage={9}
          totalPages={pages}
          />);
      const pageNodes = component.node.props.children[1].props.children;
      expect(pageNodes.length).to.equal(pages);
    });

    it('should render pages with a class of Pagination-page', () => {
      const component = shallow(
        <Pagination
          selectedPage={1}
          totalPages={10}
          />);
      const pages = component.node.props.children[1].props.children;
      expect(pages.filter(page => !shallow(page).hasClass('Pagination-page')).length).to.equal(0);
    });

    it('should render the selected page with a class of Pagination-page--selected', () => {
      const selectedPage = 2;
      const component = shallow(
        <Pagination
          selectedPage={selectedPage}
          totalPages={10}
          />);
      const selectedPageComponent = component.node.props.children[1].props.children
        .filter(page => page.props.children === selectedPage + 1);
      expect(selectedPageComponent.length === 1 &&
        shallow(selectedPageComponent[0]).hasClass('Pagination-page--selected')).to.be.true;
    });
  });

  describe('behavior', () => {
    let component = null;
    let prevPageComponent = null;
    let nextPageComponent = null;
    const handleClick = spy();
    const selectedPage = 3;

    beforeEach(() => {
      handleClick.reset();
      component = shallow(
        <Pagination
          selectedPage={selectedPage}
          totalPages={10}
          onPageChange={handleClick}/>);
      prevPageComponent = component.node.props.children[0];
      nextPageComponent = component.node.props.children[2];
    });

    it('should return the new page number when clicked', () => {
      const newPage = 5;
      expect(handleClick.called).to.be.false;
      const newPageComponent = component.node.props.children[1].props.children[newPage];
      shallow(newPageComponent).simulate('click');
      expect(handleClick.calledOnce).to.be.true;
      expect(handleClick.calledWith(newPage)).to.be.true;
    });

    it('should correctly increment the pages', () => {
      expect(handleClick.called).to.be.false;
      shallow(prevPageComponent).simulate('click');
      expect(handleClick.calledOnce).to.be.true;
      expect(handleClick.calledWith(selectedPage - 1)).to.be.true;
    });

    it('should correctly decrement the pages', () => {
      expect(handleClick.called).to.be.false;
      shallow(nextPageComponent).simulate('click');
      expect(handleClick.calledOnce).to.be.true;
      expect(handleClick.calledWith(selectedPage + 1)).to.be.true;
    });
  });
});
