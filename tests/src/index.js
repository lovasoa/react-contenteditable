import React from "react";
import ReactDOM from "react-dom";
import ContentEditable from "./react-contenteditable.js";

class EditComponent extends React.Component {
  constructor() {
    super();
    this.state = {html: ""};
  }

  getHtml = () => this.state.html;
  setHtml = html => this.setState({ html });

  handleChange = evt => this.setHtml(evt.target.value);

  render = () => {
    return <ContentEditable
      id="editableDiv"
      html={this.state.html}
      onChange={this.handleChange}
    />;
  };
}

window["editComponent"] = ReactDOM.render(<EditComponent/>, document.getElementById("root"));
