# force2update

[![npm version](https://www.npmjs.com/package/force2update?activeTab=versions)](https://www.npmjs.com/package/force2update?activeTab=versions)
[![npm downloads](https://www.npmjs.com/package/force2update)](https://www.npmjs.com/package/force2update)
[![owner](https://amisa.co)](https://amisa.co)

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
