# react-on-sticky

A React implementation of
["An event for CSS position:sticky"](https://developers.google.com/web/updates/2017/09/sticky-headers)

**Note**

This is a pre-release, put this on npm for now so I can use it already for a
personal project (unfortunately, i don't pay for npm private packages _sob_
someone donate)

## Getting started

`yarn add react-on-sticky`

The package consists of three components:

- useStickyRoot (hook)
- useOnSticky (hook)
- StickyContainer

## Usage

### useOnStickyRoot

Use this hook within parent element/component of the targeted element which has
`position: sticky`. Pass the ref provided by the hook into your parent element's
ref.

```jsx
import { useOnStickyRoot } from 'react-on-sticky';

function MyScrollableParentElement() {
  const [ stickyRootRef ] = useOnStickyRoot();

  return (
    <div
      ref={stickyRootRef}
      style={{
        position: 'absolute';
        overflowY: 'auto';
      }}>
      { children }
    </div>
  );
}
```

### StickyContainer

The sticky container must wrap the target element with `position: sticky`. This
component will inject invisibble header/footer `sentinels` which the
IntersectionObserver will keep track of. Please see the reference article above
in the introduction to learn more about the mechanics of this. Play around with
the height/offset of the sentinels to get the exact trigger you're looking for.

```jsx
import { useOnStickyRoot, StickyContainer } from 'react-on-sticky';

function MyScrollableParentElement() {
  const [ stickyRootRef ] = useOnStickyRoot();

  return (
    <div
      ref={stickyRootRef}
      style={{
        position: 'absolute';
        overflowY: 'auto';
      }}>
      <StickyContainer>
      </StickyContainer>
    </div>
  );
}
```

### useOnSticky

The hook that will receive the on sticky event. In the reference article, it
toggles a class. This does not do that, but it exposes a boolean `isStuck` value
which you can then do anything under the sun with (including toggling
classNames).

Important note: Make sure that the element that has `position:sticky` has a
className `sticky`. Otherwise this won't work.

```jsx
import { useOnStickyRoot, StickyContainer, useOnSticky } from 'react-on-sticky';

function MyScrollableParentElement() {
  const [ stickyRootRef ] = useOnStickyRoot();

  return (
    <div
      ref={stickyRootRef}
      style={{
        position: 'absolute';
        overflowY: 'auto';
      }}>
      <StickyContainer
        component="div" // string or a e.g. StyledComponent
        headerHeight="100px"
        headerPosition="0px" // from top
        footerHeight="2rem"
        footerPosition="4rem" // from bottom
      >
      </StickyContainer>
    </div>
  );
}

function MyStickyElement() {
  const id = "someId";
  // important: you need to pass in a unique id
  const [ isStuck ] = useOnSticky(id);

  useEffect(() => {
    console.log(isStuck);
  }, [isStuck]);

  return (
    <div
      className="sticky"
      id={id} // important: you need to pass in a unique id
      style={{
        position: 'sticky',
        top: '10px',
      }}>
      I'm stuck!
    </div>
  );
}
```
