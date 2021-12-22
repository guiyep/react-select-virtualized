module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sss|style)$': '<rootDir>/node_modules/jest-css-modules',
    '^@rsv-lib(.*)$': '<rootDir>/src/lib$1',
    '^@rsv-hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@rsv-components(.*)$': '<rootDir>/src/components$1',
  },
};
