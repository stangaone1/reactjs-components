import moment from 'moment';
import {upperFirst} from 'lodash';

export function customDateTitle(date) {
  const momentDate = moment(date, 'MM-DD-YYYY');
  return `${date} ( ${upperFirst(momentDate.format('dddd'))} )`;
}

export function datesDaysDifference(startDate, endDate) {
  return moment.duration(startDate.diff(endDate)).asDays();
}
