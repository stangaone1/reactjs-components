const wrapperNames = [
  'DecoratedComponent',
  'WrappedComponent',
];

export default function searchDeep(component) {
  let i;
  if (typeof component === 'undefined') {
    return component;
  }

  for (i = 0; i < wrapperNames.length; i++) {
    if (component[wrapperNames[i]]) {
      return searchDeep(component[wrapperNames[i]]);
    }
  }
  return component;
}
