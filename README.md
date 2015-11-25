react-contenteditable
=====================

React component for a div with editable contents

## Usage
```javascript
  var ContentEditable = require("react-contenteditable");
  var MyComponent = React.createClass({
    getInitialState: function(){
      return {html: "<b>Hello <i>World</i></b>"};
    },

    handleChange: function(evt){
      this.setState({html: evt.target.value});
    },

    render: function(){
      return <ContentEditable
                html={this.state.html} // innerHTML of the editable div
                disabled={false}       // use true to disable edition
                onChange={this.handleChange} // handle innerHTML change
              />
    }
  });
```

## Structure of this repository
 * `lib/` compiled javascript, usable directly in the browser
 * `src/` source javascript. Uses JSX and ES6.

