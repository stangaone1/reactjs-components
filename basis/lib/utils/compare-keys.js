export default function compareKeys(obj1, obj2, props, excludeFunctions) {
  let propList = props;
  if (!(props instanceof Array)) {
    propList = [props];
  }

  for (let i = 0; i < propList.length; i++) {
    if (excludeFunctions && typeof obj1[propList[i]] === 'function') {
      continue;
    }
    if (obj1[propList[i]] !== obj2[propList[i]]) {
      return propList[i];
    }
  }
  return false;
}