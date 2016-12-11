export default function restaurantFiltersCounter(filter) {
  const {location, objectives, facilities, events, quickSearch} = filter;
  let counter = 0;
  if (location && (location.state || location.city)) {
    counter += 1;
  }
  if (objectives) {
    counter += objectives.length;
  }
  if (facilities) {
    counter += facilities.length;
  }
  if (events) {
    counter += events.length;
  }
  if (quickSearch && quickSearch.length) {
    counter += 1;
  }
  return counter;
}
