# react-select-virtualized

![Alt text](./logo.png?raw=true 'react-select-virtualized')

> react-select v3 + react-virtualized + react hooks!

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/react-select-virtualized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project came up after hours of trying to find an autocomplete component that supports large sets of data to be displayed and searched for while maintain performance. The only libraries out there that allow this functionality are either not maintained anymore, use outdated libraries or are poorly performant.
I created a component that uses the Airbnb library called `react-virtualized` for the virtual data loading of elements and plugged it to the `react-select` (the most used autocomplete library for react) menu list.

![Alt Text](https://imagizer.imageshack.com/img922/7402/CSd9cM.gif)

## Note

The select component will be the same from `react-select v3` so you will be able to use it with any select you already have.

## IMPORTANT

React Select introduced some braking changes in v3, so we will have to bump our version to 2.0.0 to don't stop anyone for using this library. If you use the react-select v2 your last usable version is 1.3.4.

## Install

```bash
npm install --save react-select-virtualized
```

### Peer Dependencies

remember to install them also if they are not already in your project.

```bash (v1.3.4)
{
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-virtualized": "^9.21.1",
    "react-select": "^3.0.4"
  }
```

## Try It!!!

https://codesandbox.io/s/vigilant-mclean-wpbk7

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
- [x] review support to all the react-select props. Should all work but multi-val.

-- v 1.0.0 --

- [x] add support to AsyncSelect.

-- v 1.1.0 --

- [x] add support to AsyncSelect with group.

-- v 1.2.0 --

- [x] upgrading packages and hooks.

-- v 2.0.0 --

- [x] adding react-select v3.
- [x] fixing addon-info.
- [x] remove classnames.
- [x] improve packaging.
- [x] remove react-hover-observer.
- [x] Added controlled components support.

-- v 2.1.0 --

- [ ] add support to create element props.

-- v 2.2.0 --

- [ ] add testing so we do not only relay on storybook.

-- v 2.3.0 --

- [ ] add multi value support.

## Documentation - Select Component - this are special to this library none is required

| Props                                        | Type                                       | Default | Description                                                                   |
| -------------------------------------------- | ------------------------------------------ | ------- | ----------------------------------------------------------------------------- |
| grouped                                      | boolean                                    | false   | specify if options are grouped                                                |
| formatGroupHeaderLabel                       | function({ label, options}) => component   |         | will render a custom component in the popup grouped header (only for grouped) |
| formatOptionLabel (coming from react-select) | function(option, { context }) => component |         | will render a custom component in the label                                   |
| optionHeight                                 | number                                     | 31      | height of each option                                                         |
| groupHeaderHeight                            | number                                     |         | header row height in the popover list                                         |
| maxHeight (coming from react-select)         | number                                     | auto    | max height popover list                                                       |
| defaultValue                                 | option                                     |         | will set default value and set the component as an uncontrolled component     |
| value                                        | option                                     |         | will set the value and the component will be a controlled component           |

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

## Usage Async Loading!!!! also with group :)

check storybook for more examples

CLARIFICATION: filtering happens in the server.

```jsx

import React, { Component } from 'react';

import { Async } from 'react-select-virtualized';

const loadOptions = (input, callback) => {...};

const Example extends Component {
  render() {
    return <Async defaultOptions={options} loadOptions={loadOptions}/>;
  }
}

const Example2 = () => <Async loadOptions={loadOptions}/>

const Example3 = () => <Async defaultOptions={options} {..ANY_REACT_ASYNC_SELECT_V2_PROP} loadOptions={loadOptions}/>

const Example4 = () => <Async defaultOptions={opsGroup} {..ANY_REACT_ASYNC_SELECT_V2_PROP} loadOptions={loadOptions} grouped/>
```

## License

MIT © [guiyep](https://github.com/guiyep)
