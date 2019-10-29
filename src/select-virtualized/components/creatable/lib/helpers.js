export const isDifferentValueOption = (op, val) =>
  (op && val && op.value != val.value) || (!op && !!val) || (!!op && !val);
