import React from "react";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";

type Props = { useInnerRef: boolean, tagName?: string | React.ComponentType<any> };
type State = { html: string, props: {} };
type RCEvent = { target: { value: string } };

class EditComponent extends React.Component<Props, State> {
  history: RCEvent[];
  changeCallback: (_: any) => void;
  el: React.RefObject<HTMLElement>;

  constructor() {
    super({ useInnerRef: false, tagName: "div" });
    this.state = { html: "", props: {} };
    this.history = [];
    this.changeCallback = _ => { };
    this.el = React.createRef();
  }

  getHtml = () => this.state.html;
  setHtml = (html: string) => this.setState({ html });

  setChangeCallback = (cb: Function) => this.changeCallback = cb.bind(this);

  setProps = (props: Props) => this.setState({ props });

  handleChange = (evt: RCEvent) => {
    this.history.push(evt);
    this.setHtml(evt.target.value);
    this.changeCallback(evt);
  }

  render = () => {
    return <ContentEditable
      id="editableDiv"
      style={{ "height": "300px", "border": "1px dashed" }}
      html={this.state.html}
      onChange={this.handleChange}
      innerRef={this.props.useInnerRef ? this.el : undefined}
      {...this.state.props}
    />;
  };
}

(window as any)["render"] = ({
  useInnerRef,
  tagName
}: {
  useInnerRef: boolean,
  tagName?: string | React.ComponentType<any>
}) => {
  (window as any)["editComponent"] = ReactDOM.render(
    <EditComponent useInnerRef={useInnerRef} tagName={tagName} />,
    document.getElementById("root")
  );
}
