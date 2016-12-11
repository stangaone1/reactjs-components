export function dropdownGroupPropTypes(props, propName) {
  const children = props[propName];

  if (!children.length) {
    return new Error('Must have at least one dropdown child');
  }
}
