react-contenteditable
=====================

React component for a div with editable contents

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
            />
  };
};
```

## Examples

You can try **react-contenteditable** right from your browser to see if it fits your project's needs:

 * [Simple example](https://codesandbox.io/s/yqnkxx2qw1) : just an editable `<div>` with a default value. 
 * [Advanced example](https://codesandbox.io/s/n067mmwjym) : custom tag, input sanitization, and rich text edition. 

## Structure of this repository

 * [`lib/`](https://github.com/lovasoa/react-contenteditable/tree/master/lib) compiled javascript, usable directly in the browser
 * [`src/`](https://github.com/lovasoa/react-contenteditable/tree/master/src) source javascript. Uses JSX and ES6.

