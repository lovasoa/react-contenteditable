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

    handleChange: function(value){
      this.setState({content: value});
    },

    render: function(){
      return <ContentEditable
                html={this.state.html} // innerHTML of the editable div
                disabled={false}       // use true to disable edition
                onChange={this.handleChange} // handle ContentEditable change

                // handle what you want to return from ContentEditable
                // if handleReturn function is not given, return the innerHTML
                handleReturn={(refEle) => refEle.innerText}
              />
    }
  });
```

## Structure of this repository
 * [`lib/`](https://github.com/lovasoa/react-contenteditable/tree/master/lib) compiled javascript, usable directly in the browser
 * [`src/`](https://github.com/lovasoa/react-contenteditable/tree/master/src) source javascript. Uses JSX and ES6.
