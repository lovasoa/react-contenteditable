import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    var { tagName, html, ...props } = this.props;

    return React.createElement(
      tagName || 'div',
      {
        ...props,
        ref: (e) => this.htmlEl = e,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: {__html: html}
      },
      this.props.children);
  }

  shouldComponentUpdate(nextProps) {
    // We need not rerender if the change of props simply reflects the user's
    // edits. Rerendering in this case would make the cursor/caret jump.
    var updatedProgrammatically = this.htmlEl
      && nextProps.html !== this.htmlEl.innerHTML
      && nextProps.html !== this.props.html;

    if (updatedProgrammatically) {
      this.lastHtml = nextProps.html;
    }

    return (
      // Rerender if there is no element yet... (somehow?)
      !this.htmlEl
      // ...or if html really changed... (programmatically, not by user edit)
      || updatedProgrammatically
      // ...or if editing is enabled or disabled.
      || this.props.disabled !== nextProps.disabled
      // ...or if className changed
      || this.props.className !== nextProps.className
    );
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return;
    var html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }
}
