import pkg from '../../../package.json';

export const buildErrorText = (error) =>
  `REACT-SELECT-VIRTUALIZED: V:${pkg.version}- Problem Found: ${
    error || 'Unknown'
  }. Please check the repo for any update: https://github.com/guiyep/react-select-virtualized (${pkg.description}) `;
