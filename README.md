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
import ContentEditable from 'react-contenteditable'

class MyComponent extends React.Component {
  constructor() {
    super()
    this.state = {html: "<b>Hello <i>World</i></b>"};
  };

  handleChange = evt => {
    this.setState({html: evt.target.value});
  };

  render = () => {
    return <ContentEditable
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable edition
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
  };
};
```

## Examples

You can try **react-contenteditable** right from your browser to see if it fits your project's needs:

 * [Simple example](https://codesandbox.io/s/yqnkxx2qw1) : just an editable `<div>` with a default value. 
 * [Advanced example](https://codesandbox.io/s/n067mmwjym) : custom tag, input sanitization, and rich text edition. 
