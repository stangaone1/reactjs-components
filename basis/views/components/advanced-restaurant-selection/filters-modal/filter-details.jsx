import React, {Component, PropTypes} from 'react';
import {find} from 'lodash';
import cx from 'classnames';
import moment from 'moment';

import InputField from 'views/components/inputfield';
import {Button} from 'views/components/buttons';
import restaurantFiltersCounter from 'lib/utils/restaurant-filters-counter';

export default class extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    defaultFacilities: PropTypes.array.isRequired,
    defaultEvents: PropTypes.array.isRequired,
    defaultObjectives: PropTypes.array.isRequired,
    selectedFilterItem: PropTypes.object,
    open: PropTypes.bool.isRequired,
    lastFilterId: PropTypes.number,
    canEdit: PropTypes.bool,
    onDeletePreset: PropTypes.func,
    onDescriptionChanged: PropTypes.func,
  };

  static defaultProps = {
    onDeletePreset: ()=> {
    },
    onDescriptionChanged: ()=> {
    },
    canEdit: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      showEditDescription: false,
      description: '',
    };
    this.onEditDescription = this.onEditDescription.bind(this);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.onCloseEditDetails = this.onCloseEditDetails.bind(this);
    this.onCloseEditCancelDetails = this.onCloseEditCancelDetails.bind(this);
  }

  componentWillMount() {
    this.setState({
      description: this.props.selectedFilterItem.description,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFilterItem.description !== this.state.description) {
      this.setState({
        description: nextProps.selectedFilterItem.description,
      });
    }
  }

  onEditDescription() {
    if (this.props.canEdit) {
      this.setState({
        showEditDescription: !this.state.showEditDescription,
      });
    }
  }

  onDescriptionChanged(value) {
    this.setState({
      description: value,
    });
  }

  onCloseEditCancelDetails() {
    this.setState({
      showEditDescription: false,
    });
  }

  onCloseEditDetails() {
    this.setState({
      showEditDescription: false,
    }, () => {
      this.props.onDescriptionChanged(this.props.selectedFilterItem.id, this.state.description);
    });
  }

  renderDetailsItem(label, target, filter) {
    if (!filter) {
      return;
    }
    const detailsList = filter
      .map(item => {
        const elem = find(target, (f) => f.id === item);
        if (elem && elem.label) return ` "${elem.label}"`;
      })
      .filter(item => item);
    /* eslint-disable */
    if (detailsList.length) {
      return (<li>{label.concat(detailsList)}</li>);
    }
  }

  renderDetailsLocation(filter) {
    if(filter.location) {
      let location = 'Restaurant is located in:';
      if (!filter.location.state && !filter.location.city) {
        return;
      }
      if (filter.location.city) {
        location += ` ${filter.location.city}, `;
      }
      if (filter.location.state) {
        location += ` ${filter.location.state}`;
      }
      /* eslint-disable */
      return <li>{location}</li>;
    }
  }

  renderDetailsObjectives(filter) {
    if(this.props.defaultObjective) {
      const label = 'Has the following objectives nearby: ';
      return this.renderDetailsItem(label, this.props.defaultObjectives,
        filter.objectives);
    }
  }

  renderDetailsFacilities(filter) {
    if(this.props.defaultFacilities) {
      const label = 'Offers the following facilities: ';
      return this.renderDetailsItem(label, this.props.defaultFacilities,
        filter.facilities);
    }
  }

  renderDetailsEvents(filter) {
    if(this.props.defaultEvents) {
      const label = 'Hosts the following events: ';
      return this.renderDetailsItem(label, this.props.defaultEvents,
        filter.events);
    }
  }

  renderEditButtonDescription() {
    if (this.props.canEdit) {
      return (
        <span
          className="Item-action"
          onClick={this.onEditDescription}>
             -&nbsp; edit description
          </span>
      );
    }
  }

  renderDeleteButtonDescription(filter) {
    if (this.props.canEdit) {
      return (
        <span className="Item-action"
                onClick={this.props.onDeletePreset.bind(null, filter.id)}> delete this preset</span>
      )
    }
  }

  renderDetailsDescription() {
    return (
      <ul>
        <li className="Item-detail">
          {this.state.description}
          {this.renderEditButtonDescription()}
        </li>
        <li>
          {this.renderDetailsEditDescription()}
        </li>
      </ul>
    )
  }

  renderDetailsEditDescription() {
    if (this.state.showEditDescription) {
      return (
        <div className="Item-description">
          <InputField className="Item-descriptionInput" value={this.state.description}
                      onChange={this.onDescriptionChanged}/>
          <Button onClick={this.onCloseEditDetails}>SAVE</Button>
          <Button onClick={this.onCloseEditCancelDetails}>CANCEL</Button>
        </div>
      )
    }
  }

  renderDetailsCreation(filter) {
    const nrFilters = restaurantFiltersCounter(filter);
    return (
      <li className="Item-creation">
        {nrFilters} &nbsp;{nrFilters > 1 ? 'filters' : 'filter'} saved by &nbsp;{filter.createdBy}&nbsp;
        on {moment(filter.createdAt).format('MM-DD-YYYY')}
        {this.renderDeleteButtonDescription(filter)}
      </li>
    )
  }

  renderPresetId(selectedFilterItem) {
    if (selectedFilterItem.id === undefined || selectedFilterItem.id === null) {
      return (<h6>Preset #{this.props.lastFilterId}</h6>);
    }
    return (<h6>Preset #{selectedFilterItem.id}</h6>);
  }

  render() {
    const {selectedFilterItem} = this.props;
    const elementClasses = cx('Filters-preset-details', {
      'Filters-preset-details--opened': this.props.open,
    });

    return (
      <div className={elementClasses}>
        {this.renderPresetId(selectedFilterItem)}
        <ul>
          {this.renderDetailsLocation(selectedFilterItem)}
          {this.renderDetailsObjectives(selectedFilterItem)}
          {this.renderDetailsFacilities(selectedFilterItem)}
          {this.renderDetailsEvents(selectedFilterItem)}
          {this.renderDetailsDescription()}
          {this.renderDetailsCreation(selectedFilterItem)}
        </ul>
      </div>
    );
  }
}
