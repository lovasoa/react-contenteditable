react-contenteditable
=====================

React component for a div with editable contents

[![Build Status](https://travis-ci.org/lovasoa/react-contenteditable.svg?branch=master)](https://travis-ci.org/lovasoa/react-contenteditable)

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
|onKeyUp|called whenever a key is released|Function|
|onKeyDown|called whenever a key is pressed |Function|
|className|the element's [CSS class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)|String|
|style|a collection of CSS properties to apply to the element|Object|


## Examples

You can try **react-contenteditable** right from your browser to see if it fits your project's needs:

 * [Simple example](https://codesandbox.io/s/4rlw34mnk7) : just an editable `<div>` with a default value.
 * [Advanced example](https://codesandbox.io/s/l91xvkox9l) : custom tag, input sanitization, and rich text edition.
