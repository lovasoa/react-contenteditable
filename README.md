react-contenteditable
=====================

React component for a div with editable contents
## Install
```sh
npm install react-contenteditable --save
```

## Usage
```javascript
  var ContentEditable = require("react-contenteditable");
  var MyComponent = React.createClass({
    getInitialState: function(){
      return {
        placeholder: "<b>placeholder...</b>",
        html: "<b>Hello <i>World</i></b>"
      };
    },

    handleChange: function(evt){
      this.setState({html: evt.target.value});
    },

    render: function(){
      return <ContentEditable
                html={this.state.html} // innerHTML of the editable div
                placeholder={this.state.placeholder} // placeholder on the div
                disabled={false}       // use true to disable edition
                onChange={this.handleChange} // handle innerHTML change
              />
    }
  });
```

## Structure of this repository
 * [`lib/`](https://github.com/lovasoa/react-contenteditable/tree/master/lib) compiled javascript, usable directly in the browser
 * [`src/`](https://github.com/lovasoa/react-contenteditable/tree/master/src) source javascript. Uses JSX and ES6.

