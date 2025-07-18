#### 1. How do you optimize your react application ?

- **Code Splitting**: Break down large bundles into smaller chunks to reduce initial load times
- **Lazy Loading**: Load non-essential components\asynchronously to prioritize critical content.
- **Caching and Memoization**: Cache data locally or use memoization libraries to avoid redundant API calls and computations.- Memoization: Memoize expensive computations and avoid unnecessary re-renders using tools like React.memo and useMemo.
- **Optimized Rendering**: Use shouldComponentUpdate, PureComponent, or React.memo to prevent unnecessary re-renders of components.
- **Virtualization**: Implement virtual lists and grids to render only the visible elements, improving rendering performance for large datasets.
- **Server-Side Rendering (SSR)**: Pre-render content on the server to improve initial page load times and enhance SEO.
- **Bundle Analysis**: Identify and remove unused dependencies, optimize images, and minify code to reduce bundle size.
- **Performance Monitoring**: Continuously monitor app performance using tools like Lighthouse, Web Vitals, and browser DevTools.
- **Optimize rendering with keys**: - Ensure each list item in a mapped array has a unique and stable key prop to optimize rendering performance. Keys help React identify which items have changed, been added, or removed, minimizing unnecessary DOM updates.
- **CDN Integration**: Serve static assets and resources from Content Delivery Networks (CDNs) to reduce latency and improve reliability.

#### 2. What is useRef hook?
useRef is a React Hook used to persist values between renders without causing re-renders.
It’s commonly used for:

- Accessing DOM elements directly

- Storing mutable values (like timers, counters)

- Avoiding re-renders on value updates
```
Syntax:
import { useRef } from 'react';

const myRef = useRef(initialValue);

```

```
🔧 1. Accessing a DOM Element

import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus(); // Focus the input field
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

```

```
🔧 2. Compare Previous Value
import React, { useEffect, useRef, useState } from 'react';

function PreviousValue() {
  const [number, setNumber] = useState(0);
  const prevNumber = useRef();

  useEffect(() => {
    prevNumber.current = number;
  }, [number]);

  return (
    <div>
      <p>Current: {number}</p>
      <p>Previous: {prevNumber.current}</p>
      <button onClick={() => setNumber(n => n + 1)}>Increment</button>
    </div>
  );
}

```

#### 3. What is UseEffect hook and common pitfalls developers encounter when working with UseEffect, and how do you avoid them?
The useEffect hook is React's way to handle side effects in functional components - things like data fetching, subscriptions, timers, or manually updating the DOM. It essentially combines the functionality of componentDidMount, componentDidUpdate, and componentWillUnmount from class components.

**Most Common Mistakes:**

- Missing dependencies - forgetting to include values used inside the effect
- Infinite loops - dependencies that change on every render
- Memory leaks - not cleaning up timers, listeners, or subscriptions
- Stale closures - using outdated values in async operations

**Quick Fixes:**

- Use functional updates: setState(prev => prev + 1)
- Always return cleanup functions for side effects
- Use useCallback/useMemo for complex dependencies


#### 4. Output of below code?
```
import { useState, useEffect } from 'react';

function Counter() {
  const [c, setC] = useState(0);

  useEffect(() => {
    console.log('Before updates:', c);
    setC(prev => prev + 1);
    setC(prev => prev + 1);
    setC(prev => prev + 1);
    console.log('After scheduling updates (still stale):', c);
  }, []); // empty dependency → runs once on mount

  console.log('Render with c =', c);

  return <div>{c}</div>;
}

```
o/p
```
Render with c = 0
Before updates: 0
After scheduling updates (still stale): 0
Render with c = 3

```
