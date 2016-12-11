import React, {PropTypes, Component} from 'react';
import restrictedCompare from 'lib/utils/restricted-compare';

import DropdownTooltip from 'views/components/dropdown-tooltip';
import ScrollArea from 'views/components/scroll-area';
import DropdownFooter from 'views/components/dropdown-footer';
import {Button} from 'views/components/buttons';
import { startCase, isEmpty } from 'lodash';

import './setup-completion-tooltip.scss';

export default class SetupCompletionTooltip extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onShow: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    requiredSections: PropTypes.array,
    recommendedSections: PropTypes.array,
    isCompleted: PropTypes.bool,
  };

  static defaultProps = {
    isLoaded: false,
    isCompleted: false,
  };

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  handleEdit(e) {
    e.stopPropagation();
    this.props.onEdit();
  }

  renderRequiredSections() {
    const { requiredSections } = this.props;
    if (!isEmpty(requiredSections)) {
      const requiredSectionsList = requiredSections.map(requiredSection =>
        <li className="SetupCompletionTooltip-listItem" key={requiredSection}>{startCase(requiredSection)}</li>
      );

      return (
        <div>
          <div className="SetupCompletionTooltip-requiredHeading">Please fill up the following:</div>
          <ul className="SetupCompletionTooltip-list SetupCompletionTooltip-list--required">
            {requiredSectionsList}
          </ul>
        </div>
      );
    }
  }

  renderRecommendedSections() {
    const { recommendedSections } = this.props;
    if (!isEmpty(recommendedSections)) {
      const recommendedSectionsList = recommendedSections.map(recommendedSection =>
        <li className="SetupCompletionTooltip-listItem" key={recommendedSection}>{startCase(recommendedSection)}</li>
      );

      return (
        <div>
          <div className="SetupCompletionTooltip-recommendedHeading">Also consider filling up:</div>
          <ul className="SetupCompletionTooltip-list SetupCompletionTooltip-list--recommended">
            {recommendedSectionsList}
          </ul>
        </div>
      );
    }
  }

  renderContent() {
    const { isLoaded, isCompleted, recommendedSections, requiredSections } = this.props;
    if (isLoaded) {
      return (
        <div>
          {this.renderRequiredSections()}
          {this.renderRecommendedSections()}
          {isEmpty(recommendedSections) && isEmpty(requiredSections) && !isCompleted &&
            'All required sections are completed' }
          {isCompleted && 'All sections are completed'}
        </div>
      );
    }

    return 'Loading Restaurant Completion...';
  }

  render() {
    const { label, onShow, isLoaded } = this.props;
    return (
      <DropdownTooltip
        label={label}
        onShow={onShow}
        isLoaded={isLoaded}
        className="SetupCompletionTooltip"
        noPadding
      >
        <div>
          <ScrollArea>
            {this.renderContent()}
          </ScrollArea>
          <DropdownFooter>
            <Button
              centered
              size="small"
              onClick={this.handleEdit}
            >
              Edit Restaurant Settings
            </Button>
          </DropdownFooter>
        </div>
      </DropdownTooltip>
    );
  }
}
