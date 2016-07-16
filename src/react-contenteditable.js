import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    return React.createElement(
      this.props.tagName || 'div',
      Object.assign({}, this.props, {
        ref: (e) => this.htmlEl = e,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: {__html: this.props.html}
      }),
      this.props.children);
  }

  shouldComponentUpdate(nextProps) {
    // We need not rerender if the change of props simply reflects the user's
    // edits. Rerendering in this case would make the cursor/caret jump.
    return (
      // Rerender if there is no element yet... (somehow?)
      !this.htmlEl
      // ...or if html really changed... (programmatically, not by user edit)
      || nextProps.html !== this.htmlEl.innerHTML
      // ...or if editing is enabled or disabled.
      || this.props.disabled !== nextProps.disabled
    );
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
      // Apparently React's VDOM (which gets outdated because we often prevent
      // rerendering) thought that updating was not required. So we update the
      // element manually now.
      this.htmlEl.innerHTML = this.props.html;

      this.checkForImplicitReformat()
    }
  }

  componentDidMount() {
    this.checkForImplicitReformat()
  }

  checkForImplicitReformat() {
    // If DOM node is still different, it is because the browser decided to
    // reformat our HTML. We treat this reformatting as an edit and signal a
    // change, so it will not lead to an undesired rerender.
    const finalInnerHtml = this.htmlEl.innerHTML;
    if ( finalInnerHtml !== this.props.html ) {
      // Structure like the normal event, so the application can read the html
      // from evt.target.value as usual.
      this.props.onChange({target: {value: finalInnerHtml}});
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
