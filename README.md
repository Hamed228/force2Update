# force2update

[![npm version](https://img.shields.io/npm/v/react-forceupdate.svg?style=flat-square)](https://www.npmjs.com/package/force2update?activeTab=versions)
[![npm downloads](https://img.shields.io/npm/dm/react-forceupdate.svg?style=flat-square)](https://www.npmjs.com/package/force2update)
[![license](https://img.shields.io/github/license/kunukn/react-forceupdate)](https://amisa.co)

## About

React hooks for force updating components.
Force update from anywhere to those using a useForceUpdate hook with optional payload.

## Install

```bash
npm i force2update

# or
# yarn add mittt force2update
```

## Usage example

### Basic

```jsx
import { useForceUpdate, useForceUpdateField } from 'force2update'

function App() {
  let onUpdate = () => {
    // apply non-reactive changes.
    nonReactive.something = 'something updated'

    useForceUpdate()
  }

  return (
    <main>
      <button onClick={onUpdate}>Force update</button>
      <DeeplyNestedComponentContainingComponent1 />
      <DeeplyNestedComponentContainingComponent2 />
    </main>
  )
}
```
