import compareKeys from './compare-keys';

export default function restrictedCompare(instance, props, state) {
  const propList = instance.constructor && instance.constructor.propTypes ? Object.keys(instance.constructor.propTypes) : Object.keys(props);
  return compareKeys(instance.props, props, propList, true)
    || state && compareKeys(instance.state, state, Object.keys(state), true);
}
