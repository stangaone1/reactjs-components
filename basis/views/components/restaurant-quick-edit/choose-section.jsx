import React, { Component, PropTypes } from 'react';
import Button from 'views/components/buttons/button';
import Modal, { ModalHeader, ModalBody } from 'views/components/modal';
import Card from 'views/components/card';
import restrictedCompare from 'lib/utils/restricted-compare';

import './choose-section.scss';

export default class ChooseSection extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    onChooseSection: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sections: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  renderSections() {
    const { sections } = this.props;
    return sections.map(section => this.renderSection(section));
  }

  renderSection(section) {
    return (
      <div className="ChooseSection-cardContainer" key={section.id}>
        <Card heading={section.name}>
          <div className="clearfix">
            {this.renderSubsections(section.subsections)}
          </div>
        </Card>
      </div>
    );
  }

  renderSubsections(subsections) {
    const { onChooseSection } = this.props;
    return subsections.map(subsection => {
      return (
        <Button
          type="link"
          key={subsection.id}
          onClick={onChooseSection.bind(this, subsection)}
          className="ChooseSection-link"
        >
          {subsection.name}
        </Button>
      );
    });
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        padded
      >
        <ModalHeader>Choose section to edit</ModalHeader>
        <ModalBody>
          {this.renderSections()}
        </ModalBody>
      </Modal>
    );
  }
}
