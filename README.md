# react-select-virtualized

![Alt text](./logo.png?raw=true 'react-select-virtualized')

> react-select v3 + react-virtualized + react hooks!

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/react-select-virtualized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project came up after hours of trying to find an autocomplete component that supports large sets of data to be displayed and searched for while maintain performance. The only libraries out there that allow this functionality are either not maintained anymore, use outdated libraries or are poorly performant.
I created a component that uses the Airbnb library called `react-virtualized` for the virtual data loading of elements and plugged it to the `react-select` (the most used autocomplete library for react) menu list.

![Alt Text](https://imagizer.imageshack.com/img922/7402/CSd9cM.gif)

## Install

```bash
npm install --save react-select-virtualized
```

### Peer Dependencies

Remember to install them (if they are not already in your project).

```bash
{
    "react",
    "react-dom",
    "react-virtualized",
    "react-select"
  }
```

## Note

The select component will be the same from `react-select v3` so you will be able to use it with any select you already have.

## Try It!!!

[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vigilant-mclean-wpbk7)

Check [Storybook](https://serene-hawking-021d7a.netlify.com/) for more examples

## What we do support and don't from react-select

Components: Select, Async, Creatable

- [x] We support all the UI related props for the input. Extension also.

- [x] We do not support any related prop to the popup list. We extend it. \*Sorry no extension of any component inside the list.\*

## Documentation - this are special to this library and none is required

<details>
  <summary>Toggle</summary>

| Props                                        | Type                                       | Default | Description                                                                          |
| -------------------------------------------- | ------------------------------------------ | ------- | ------------------------------------------------------------------------------------ |
| grouped                                      | boolean                                    | false   | specify if options are grouped                                                       |
| formatGroupHeaderLabel                       | function({ label, options}) => component   |         | will render a custom component in the popup grouped header (only for grouped)        |
| formatOptionLabel (coming from react-select) | function(option, { context }) => component |         | will render a custom component in the label                                          |
| optionHeight                                 | number                                     | 31      | height of each option                                                                |
| groupHeaderHeight                            | number                                     |         | header row height in the popover list                                                |
| maxHeight (coming from react-select)         | number                                     | auto    | max height popover list                                                              |
| defaultValue                                 | option                                     |         | will set default value and set the component as an uncontrolled component            |
| value                                        | option                                     |         | will set the value and the component will be a controlled component                  |
| onCreateOption (Only for Creatable)          | function(option) => nothing                |         | will be executed when a new option is created , it is only for controlled components |

  </details>

# Examples

## Options Shape

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

## Basic

```jsx
import React from 'react';

import Select from 'react-select-virtualized';

const Example1 = () => <Select options={options} />;
```

[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vigilant-mclean-wpbk7)

## With group

```jsx
import React from 'react';

import Select from 'react-select-virtualized';

const Example1 = () => <Select options={options} grouped />;
```

[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/angry-wing-5deq4)

## Usage Async

```jsx

import React from 'react';

import { Async } from 'react-select-virtualized';

const loadOptions = (input, callback) => {...};

const Example1 = () => <Async loadOptions={loadOptions}/>

const Example2 = () => <Async defaultOptions={options} loadOptions={loadOptions}/>

const Example3 = () => <Async defaultOptions={opsGroup} loadOptions={loadOptions} grouped/>
```

##### Async - No Group
[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/quirky-swanson-egeh8)

##### Async - Grouped
[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/runtime-cloud-jow57)

## Usage with creatable

```jsx
import React from 'react';

import { Creatable } from 'react-select-virtualized';

const Example1 = () => <Creatable options={options} />;
```

[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/twilight-cloud-nqwz1)

## Usage with creatable and group

NOT YET DONE.

### Roadmap

<details>
  <summary>Toggle</summary>
  
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

- [x] Better debouncing

-- v 2.2.0 --

- [x] add support to create element props.
- [x] add better error handling.

-- v 2.3.0 --

- [ ] move modules to lib.
- [ ] move internal state of select and async select to reducer like creatable.
- [ ] add support to create element props with group.

-- v 2.4.0 --

- [ ] add testing so we do not only relay on storybook.

  </details>

## License

MIT © [guiyep](https://github.com/guiyep)
