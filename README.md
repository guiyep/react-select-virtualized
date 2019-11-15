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

remember to install them (if they are not already in your project).

```bash (v1.3.4)
{
    "react": "^16.8.x || 16.9.x || 16.10.x || 16.11.x || 16.12.x",
    "react-dom": "^16.8.x || 16.9.x || 16.10.x || 16.11.x || 16.12.x",
    "react-virtualized": "^9.21.1",
    "react-select": "^3.0.x"
  }
```

## Note

The select component will be the same from `react-select v3` so you will be able to use it with any select you already have.

## Try It!!!

https://codesandbox.io/s/vigilant-mclean-wpbk7

## Storybook

Do you want to see it working? -> https://serene-hawking-021d7a.netlify.com/

## What we do support and don't from react-select

Components: Select, Async, Creatable

- [x] We support all the UI related props for the input. Extension also.
      `List: (...To be completed)`

- [x] We do not support any related prop to the popup list. We extend it. \*Sorry no extension of any component inside the list.\*
      `List Props Supported: (...To be completed)`

## Documentation - this are special to this library none is required

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

## Usage select without group

Check storybook for more examples, it can be used controlled/uncontrolled.

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
import React from 'react';

import Select from 'react-select-virtualized';

const Example1 = () => <Select options={options}/>

const Example2 = () => <Select options={options} {..ANY_REACT_SELECT_V2_PROP}/>
```

## Usage select with group - tooooo easy!!!

Check storybook for more examples, it can be used controlled/uncontrolled.

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
import React from 'react';

import Select from 'react-select-virtualized';

const Example1 = () => <Select options={options} grouped/>

const Example2 = () => <Select options={options} {..ANY_REACT_SELECT_V2_PROP} grouped/>
```

## Usage Async with/without group :)

Check storybook for more examples, it can be used controlled/uncontrolled.

CLARIFICATION: you are in charge of filtering the data.

```jsx

import React from 'react';

import { Async } from 'react-select-virtualized';

const loadOptions = (input, callback) => {...};

const Example1 = () => <Async loadOptions={loadOptions}/>

const Example2 = () => <Async defaultOptions={options} {..ANY_REACT_ASYNC_SELECT_V2_PROP} loadOptions={loadOptions}/>

const Example3 = () => <Async defaultOptions={opsGroup} {..ANY_REACT_ASYNC_SELECT_V2_PROP} loadOptions={loadOptions} grouped/>
```

## Usage with creatable

Check storybook for more examples, it can be used controlled/uncontrolled.

UNCONTROLLED:

```jsx
import React from 'react';

import { Creatable } from 'react-select-virtualized';

const Example1 = () => <Creatable options={options} {..ANY_REACT_CREATABLE_SELECT_V2_PROP} />;
```

CONTROLLED:

```jsx
import React from 'react';

import { Creatable } from 'react-select-virtualized';

const onCreateOption = (newItem) => {
  store.set({ options: store.state.options.concat([newItem]) });
  store.set({ selected: newItem });
};

const onChange = (item) => {
  store.set({ selected: item });
};

const Example1 = () => (
  <Creatable
    options={store.state.options}
    value={store.state.selected}
    onCreateOption={onCreateOption}
    onChange={onChange}
    {..ANY_REACT_CREATABLE_SELECT_V2_PROP}
  />
);
```

## Usage with creatable and group

NOT YET DONE.

## A WORD ABOUT CONTROLLED/UNCONTROLLED

When you use the `defaultValue` you will be using the component as uncontrolled and the state will be managed for you internally. There are some prop that cannot be mixed and the component will let you know when that is the case. Same happens when you use `value`, but will render the component as a controlled component where you will be in charge of the component internal state.

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

- [x] Better debouncing

-- v 2.2.0 --

- [x] add support to create element props.
- [x] add better error handling.

-- v 2.3.0 --

- [ ] move internal state of select and async select to reducer like creatable.
- [ ] add support to create element props with group.

-- v 2.4.0 --

- [ ] add testing so we do not only relay on storybook.

## License

MIT © [guiyep](https://github.com/guiyep)
