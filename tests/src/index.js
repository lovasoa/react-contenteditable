import React from "react";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";

class EditComponent extends React.Component {
  constructor() {
    super();
    this.state = { html: "", props: {} };
    this.history = [];
    this.changeCallback = _ => {};
  }

  getHtml = () => this.state.html;
  setHtml = html => this.setState({ html });

  setChangeCallback = cb => this.changeCallback = cb.bind(this);

  setProps = props => this.setState({ props });

  handleChange = evt => {
    this.history.push(evt);
    this.setHtml(evt.target.value);
    this.changeCallback(evt);
  }

  render = () => {
    return <ContentEditable
      id="editableDiv"
      style={{"height": "300px", "border": "1px dashed"}}
      html={this.state.html}
      onChange={this.handleChange}
      {...this.state.props}
    />;
  };
}

window["editComponent"] = ReactDOM.render(<EditComponent />, document.getElementById("root"));
