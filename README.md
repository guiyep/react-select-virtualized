# react-select-virtualized

**** UNSTABLE VERSION - NOT YET FINISHED ****
> react-select v2 + react-virtualized + react hooks!

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/react-select-virtualized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-select-virtualized
```

## Roadmap

- move fast options to group
- upgrade alpha version
- try filtering data on infinite loader
- add multi value support
- add testing so we do not only relay on storybook
- review all the TODOs
- remove react-hover-observer and do it ourselves so we do not have one more peer dep. Leave this till the end.

## Usage

```jsx
import React, { Component } from 'react';

import Select from 'react-select-virtualized';

class Example extends Component {
  render() {
    return <Select />;
  }
}
```

## License

MIT © [guiyep](https://github.com/guiyep)
