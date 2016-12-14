import React, {Component, PropTypes} from 'react';
import {merge} from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';

import Panel, {PanelHeader} from 'views/components/panel';
import SwitchButton from 'views/components/switch-button';
import DayOpenStatusList from 'views/components/day-open-status-list';

import './hours-panel.scss';

export default class HoursPanel extends Component {
  static propTypes = {
    days: PropTypes.array.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.number,
    hoursTitle: PropTypes.object,
    sameProgram: PropTypes.bool,
    renderOpenButtons: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onHoursChanged: PropTypes.func,
  };

  static defaultProps = {
    days: [],
    checked: false,
    name: '',
  };

  constructor() {
    super();
    this.onDaysStatusChanged = this.onDaysStatusChanged.bind(this);
    this.onChangeCheckState = this.onChangeCheckState.bind(this);
    this.state = {
      checked: false,
    };
  }

  componentWillMount() {
    this.setState({checked: !this.props.sameProgram});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sameProgram !== nextProps.sameProgram) {
      this.setState({checked: !nextProps.sameProgram});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onChangeCheckState() {
    this.setState({
      checked: !this.state.checked,
    }, () => {
      if (this.props.onHoursChanged) {
        const {sameProgram, type, id, days} = this.props;

        const newHoursData = merge({},
          {
            sameProgram,
            id,
            type,
            days,
          },
          {
            sameProgram: !this.state.checked,
          }
        );

        this.props.onHoursChanged(newHoursData);
      }
    });
  }

  onDaysStatusChanged(newDays) {
    const {sameProgram, type, id, days} = this.props;
    const newHoursData = merge({},
      {sameProgram, type, id, days},
      {
        sameProgram: !this.state.checked,
        days: newDays,
      });
    this.props.onHoursChanged(newHoursData);
  }

  renderSwitchButton(days) {
    if (days > 1) {
      return (
        <SwitchButton
          checked={this.state.checked}
          onChange={this.onChangeCheckState}
          leftLabel="ALL"
          rightLabel="EACH"
        />
      );
    }
  }

  render() {
    const {days, type, hoursTitle, name} = this.props;
    const daysLength = days.length;
    if (days && !daysLength) return <div/>;

    const renderOpenButtons = this.props.renderOpenButtons !== null ? this.props.renderOpenButtons : true;

    return (
      <Panel className="Panel--hours">
        <PanelHeader className="PanelHeader--hours">
          <div className="Hours-title">{name ? name : hoursTitle[type] ? hoursTitle[type] : 'No name title set'}</div>
          <div className="Hours-subtitle">{daysLength > 1 ? daysLength + ' days' : daysLength + ' day'}</div>
          <div className="Hours-panel">
            {this.renderSwitchButton(daysLength)}
          </div>
        </PanelHeader>
        <DayOpenStatusList
          isMultiple={!this.state.checked}
          days={days}
          renderOpenButtons={renderOpenButtons}
          onDaysStatusChanged={this.onDaysStatusChanged}
        />
      </Panel>
    );
  }
}
