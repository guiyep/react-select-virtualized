# react-select-virtualized

**** UNSTABLE VERSION - NOT YET FINISHED **** SOON TO BBE RELEASE ****
> react-select v2 + react-virtualized + react hooks!

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/react-select-virtualized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project came up after hours of trying to find an autocomplete component that supports large sets of data to be displayed and search. react-select is the most used library out there and very customizable but poorly performant. I used the airbnb library react-virtualized for the virtual data loading of element and plugged it to the react-select menu list. I know that react-virtualized-select does the same, but the library is not maintained anymore and it is using the old 1.x version of react select. Also it has not full support of the grouping functionality and mny other new select props. So I decided to create a new component and share it to the community.

## Install

```bash
npm install --save react-select-virtualized
```

## Roadmap

- useCallback every where. DONE
- move fast options to group. DONE
- fix minimum input search on grouped component.
- upgrade alpha version.
- review all the TODOs.
- review support to all the react-select props. Should all work but multival.
<----- FIRST RELEASE ---->
- try filtering data on infinite loader
- add multi value support
- add testing so we do not only relay on storybook
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
