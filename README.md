# react-select-virtualized

\* UNSTABLE VERSION - NOT YET FINISHED - SOON TO BE RELEASED \*

> react-select v2 + react-virtualized + react hooks!

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/react-select-virtualized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project came up after hours of trying to find an autocomplete component that supports large sets of data to be displayed and searched for while maintain performance. The only libraries out there that allow this functionality are either not maintained anymore, use outdated libraries or are poorly performant.
I created a component that uses the Airbnb library called `react-virtualized` for the virtual data loading of elements and plugged it to the `react-select` (the most used autocomplete library for react) menu list.

only takes 15kb or 4Kb Gzipped!!!!!

![Alt Text](https://imagizer.imageshack.com/img922/7402/CSd9cM.gif)

## Note

The select component will be the same from `react-select v2` so you will be able to use it with any select you already have.

## Install

```bash
npm install --save react-select-virtualized
```

### Peer Dependencies

remember to install them also if they are not already in your project.

NOTE: "react-hover-observer" is temporary until I implement it myself will be a dependency (not a peer dep) until then.

```bash
{
    "prop-types": "^15.5.4",
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "react-select": "2.2.0",
    "react-virtualized": "^9.21.0",
    "classnames": "^2.2.6"
  }
```

## Storybook

Do you want to see it working? -> https://serene-hawking-021d7a.netlify.com/

## Roadmap

- [x] useCallback everywhere.
- [x] move fast options to group.
- [x] fix minimum input search on grouped component.
- [x] upgrade alpha version.
- [x] review all the TODOs.
- [x] improve filtering function in `fast-react-select`.
  - [x] improved performance by 50%
- [x] add gzip.
- [ ] - IN PROCESS -review support to all the react-select props. Should all work but multi-val. (Update Doc)

```bash
I have decided to work in the filter on the infinite loader after the release. I tried but the results where not the expected one i wanted.
```

\* ----> First Release <---- \*

- [ ] filtering data on infinite loader, performance degradation start after 30000 elements we need to filter only first batch size so we don't see any
- [ ] add multi value support
- [ ] add testing so we do not only relay on storybook
- [ ] remove react-hover-observer.

## Documentation - Select Component - this are special to this library none is required

| Props                                        | Type                                                | Default | Description                                                                   |
| -------------------------------------------- | --------------------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| grouped                                      | boolean                                             | false   | specify if options are grouped                                                |
| formatGroupHeaderLabel                       | function({ label, options}) => component            |         | will render a custom component in the popup grouped header (only for grouped) |
| formatOptionLabel (coming from react-select) | function({ label, lang }, { context }) => component |         | will render a custom component in the label                                   |
| optionHeight                                 | number                                              | 31      | height of each option                                                         |
| groupHeaderHeight                            | number                                              |         | header row height in the popover list                                         |
| maxHeight (coming from react-select)         | number                                              | auto    | max height popover list                                                       |
| maxWidth (coming from react-select)          | number                                              | 500     | max width in the popover list                                                 |

## What we do support and don't from react-select

- [x] We support all the UI related props for the input. Extension also.
      `List: (...To be completed)`

- [x] We do not support any related prop to the popup list. We extend it. \*Sorry no extension of any component inside the list.\*
      `List Props Supported: (...To be completed)`

## Usage without group

check storybook for more examples

```jsx
const options = [
  {
    value: 1,
    label: `guiyep`,
  },
  ...
];
```

```jsx
import React, { Component } from 'react';

import Select from 'react-select-virtualized';

const Example extends Component {
  render() {
    return <Select options={options}/>;
  }
}

const Example2 = () => <Select options={options}/>

const Example3 = () => <Select options={options} {..ANY_REACT_SELECT_V2_PROP}/>
```

## Usage with group - tooooo easy!!!

check storybook for more examples

```jsx
const options = [
  {
    value: 1,
    label: `guiyep`,
  },
  ...
];


const opsGroup = [
  { label: `Group Name Header`, options },
  ...
]
```

```jsx
import React, { Component } from 'react';

import Select from 'react-select-virtualized';

const Example extends Component {
  render() {
    return <Select options={options} grouped/>;
  }
}

const Example2 = () => <Select options={options} grouped/>

const Example3 = () => <Select options={options} {..ANY_REACT_SELECT_V2_PROP} grouped/>
```

## React-select Issues

- cacheOptions do not work with async select and grouped options. we will need to relay on filtering on infinite loader.

## License

MIT © [guiyep](https://github.com/guiyep)
