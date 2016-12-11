import invariant from 'invariant';

export default function validatePositiveInteger(strictPositive, props, propName) {
  const propNumericValue = parseInt(props[propName], 10);
  invariant(
    !isNaN(propNumericValue) && // is numerical
    strictPositive ? propNumericValue > 0 : propNumericValue >= 0, // is positive (strict/non-strict)
  `Pagination prop validation Error: ${propName} should be a > 0 integer.`);
}
