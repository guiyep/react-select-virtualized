# react-select-virtualized

\***\* UNSTABLE VERSION - NOT YET FINISHED \*\*** SOON TO BE RELEASED \*\*\*\*

> react-select v2 + react-virtualized + react hooks!

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/react-select-virtualized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project came up after hours of trying to find an autocomplete component that supports large sets of data to be displayed and searched for while maintain performance. The only libraries out there that allow this functionality are either not maintained anymore, use outdated libraries or are poorly performant.
I created a component that uses the Airbnb library called `react-virtualized` for the virtual data loading of elements and plugged it to the `react-select’ (the most used autocomplete library for react) menu list.

## Install

```bash
npm install --save react-select-virtualized
```

## Storybook

Do you want to see it working? -> https://serene-hawking-021d7a.netlify.com/

## Roadmap

- useCallback every where. DONE
- move fast options to group. DONE
- fix minimum input search on grouped component. DONE
- upgrade alpha version.
- review all the TODOs. DONE
- review support to all the react-select props. Should all work but multi-val.
- filtering data on infinite loader, performance degradation start after 30000 elements we need to filter only first batch size so we don't see any
  <----- FIRST RELEASE ---->
- add multi value support
- add testing so we do not only relay on storybook
- remove react-hover-observer and do it ourselves so we do not have one more peer dep. Leave this till the end.

## React-select Issues

- cacheOptions do not work with async select and grouped options. we will need to relay on filtering on infinite loader.

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
