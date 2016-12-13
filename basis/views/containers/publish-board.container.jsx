import React, {Component} from 'react';
import PublishBoard from 'views/components/publish-board';

// mock data
const pageActions = [
  {
    actions: [
      {
        label: 'Replace',
        className: 'SomeCustomClass',
        onClick: () => { console.log('Replace click'); },
      },
      {
        label: 'Flip',
        onClick: null,
      },
      {
        label: 'Delete',
        onClick: () => { console.log('Delete click');},
      },
    ],
  },
  {
    actions: [
      {
        label: 'See',
        className: 'SomeCustomClass',
        onClick: () => { console.log('See click'); },
      },
      {
        label: 'Do',
        onClick: () => { console.log('Do click');},
      },
      {
        label: 'Review',
        onClick: null,
      },
    ],
  },
];


const pages = [
  {
    preview: (<preview className="preview">
                <img src="http://www.military-today.com/aircraft/textron_scorpion.jpg" />
              </preview>),
    sidebar: (<sidebar className="sidebar" actions={pageActions[0].actions}>
                Page 1 content
              </sidebar>),
    backface: (<backface className="backface" showPagination>
                Page 1 backface
              </backface>),
  },
  {
    preview: (<preview className="preview">
                <img src="http://img11.hostingpics.net/pics/851033image490.jpg" />
              </preview>),
    sidebar: (<sidebar className="sidebar" actions={pageActions[1].actions}>
                Page 2 content
              </sidebar>),
  },
];

class PublishBoardContainer extends Component {
  constructor(props) {
    super(props);

    pageActions[0].actions[1].onClick = () => {
      this.refs.PublishBoard.onFlip();
    };

    this.onPageSet = this.onPageSet.bind(this);

    this.state = {
      currentPage: 0,
    };
  }

  onPrevPage() {
    let currentPage = this.state.currentPage;

    if (currentPage < pages.length - 1) {
      currentPage = currentPage + 1;
    } else {
      currentPage = 0;
    }

    // this.onPageSet(currentPage);
    setTimeout(this.onPageSet.bind(this), 530, currentPage);
  }

  onNextPage() {
    let currentPage = this.state.currentPage;

    if (currentPage > 0) {
      currentPage = currentPage - 1;
    } else {
      currentPage = pages.length - 1;
    }

    // this.onPageSet(currentPage);
    setTimeout(this.onPageSet, 530, currentPage);
  }

  onPageSet(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    });
  }

  render() {
    const requiredProps = {
      onCloseBoard: () => { console.log('Click on the close button'); },
      onPrevPage: this.onPrevPage.bind(this),
      onNextPage: this.onNextPage.bind(this),
    };

    return (
      <PublishBoard ref="PublishBoard" actions = {pages[this.state.currentPage].actions} {...requiredProps}>
        {pages[this.state.currentPage].preview}
        {pages[this.state.currentPage].sidebar}
        {pages[this.state.currentPage].backface}
      </PublishBoard>
    );
  }
}
export default PublishBoardContainer;
