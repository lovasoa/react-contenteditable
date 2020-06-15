react-contenteditable
=====================

React component for a div with editable contents

[![Build Status](https://travis-ci.org/lovasoa/react-contenteditable.svg?branch=master)](https://travis-ci.org/lovasoa/react-contenteditable)
[![download count](https://img.shields.io/npm/dm/react-contenteditable.svg)](https://www.npmjs.com/package/react-contenteditable)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-contenteditable.svg)](https://www.npmjs.com/package/react-contenteditable)
[![license](https://img.shields.io/github/license/lovasoa/react-contenteditable.svg)](https://github.com/lovasoa/react-contenteditable/blob/master/LICENSE)


## Install

```sh
npm install react-contenteditable
```

## Usage

```javascript
import React from 'react'
import ContentEditable from 'react-contenteditable'

class MyComponent extends React.Component {
  constructor() {
    super()
    this.contentEditable = React.createRef();
    this.state = {html: "<b>Hello <i>World</i></b>"};
  };

  handleChange = evt => {
    this.setState({html: evt.target.value});
  };

  render = () => {
    return <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
  };
};
```

## Available props
|prop|description|type|
|--|----|----|
|innerRef|element's [`ref` attribute](https://reactjs.org/docs/refs-and-the-dom.html)|Object \| Function|
|html|**required:** innerHTML of the editable element|String|
|disabled|use true to disable editing|Boolean|
|onChange|called whenever `innerHTML` changes|Function|
|onBlur|called whenever the html element is [blurred](https://developer.mozilla.org/en-US/docs/Web/Events/blur)|Function|
|onFocus|event fires when an element has received [focus](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)|Function|
|onKeyUp|called whenever a key is released|Function|
|onKeyDown|called whenever a key is pressed |Function|
|className|the element's [CSS class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)|String|
|style|a collection of CSS properties to apply to the element|Object|

## Known Issues
If you are using hooks, please see [this issue](https://github.com/lovasoa/react-contenteditable/issues/161). Using this component with [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) doesn't work, but you can still use [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) : 

```js
const text = useRef('');

const handleChange = evt => {
    text.current = evt.target.value;
};

const handleBlur = () => {
    console.log(text.current);
};

return <ContentEditable html={text.current} onBlur={handleBlur} onChange={handleChange} />
```

## Examples

You can try **react-contenteditable** right from your browser to see if it fits your project's needs:

 * [Simple example](https://codesandbox.io/s/4rlw34mnk7) : just an editable `<div>` with a default value.
 * [Advanced example](https://codesandbox.io/s/l91xvkox9l) : custom tag, input sanitization, and rich text edition.
