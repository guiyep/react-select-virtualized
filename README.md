# react-select-virtualized

<p align="center">
  <img src="./logo.png?raw=true">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-select-virtualized">
    <img src="https://img.shields.io/npm/v/react-select-virtualized.svg">
  </a>
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  <img src="https://img.shields.io/bundlephobia/minzip/react-select-virtualized">
</p>

> react-select v5 + react-virtualized + react hooks!

This project came up after hours of trying to find an autocomplete component that supports large sets of data to be displayed and searched for while maintain performance. The only libraries out there that allow this functionality are either not maintained anymore, use outdated libraries or are poorly performant.
I created a component that uses the Airbnb library called `react-virtualized` for the virtual data loading of elements and plugged it to the `react-select` (the most used autocomplete library for react) menu list.

![Alt Text](https://imagizer.imageshack.com/img922/7402/CSd9cM.gif)

## Install

```bash
yarn add react-select-virtualized
```

### Peer Dependencies

```bash
{
    "react",
    "react-dom",
    "react-virtualized",
    "react-select"
}
```

## API Documentation

You can check the full library documentation [here](https://deluxe-blancmange-4a5494.netlify.app/#/)!!!!.

## Examples

The select component will be the same from `react-select v5` so you will be able to use it with any select you already have.

Check [Storybook](https://serene-hawking-021d7a.netlify.com/) for more examples

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

const Example1 = () => <Select options={opsGroup} grouped />;
```

[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/angry-wing-5deq4)
