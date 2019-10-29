import { buildErrorText } from '../../shared-helpers/error-builder';
export const SET_VALUE = 'set-value';
export const SET_OPTIONS = 'set-options';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_VALUE:
      return { ...state, value: action.payload };
    case SET_OPTIONS:
      return { ...state, options: action.payload };
    default:
      throw new Error(buildErrorText(`Unknown reducer action ${action}`));
  }
}
