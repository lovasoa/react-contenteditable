import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    var props = {};
    Object.assign(props, this.props);
    delete props.tagName;
    delete props.html;

    return React.createElement(
      this.props.tagName || 'div',
      Object.assign({}, props, {
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

    // Rerender if there is no element yet... (somehow?)
    if (!this.htmlEl)
      return true;
    // ...or if editing is being enabled or disabled...
    if (this.props.disabled !== nextProps.disabled)
      return true;
    // ...or if html is changed by application (unless we let user overrule).
    if (nextProps.html !== this.htmlEl.innerHTML
        && nextProps.html !== this.props.html) {
      if (this.props.userIsKing) {
        // Do not disturb if the user is editing now.
        return (this.props.disabled || this.htmlEl !== document.activeElement);
      }
      else
        return true;
    }
    // No need to update. The change in props was probably just the user's edit,
    // so it is already reflected in the DOM. (note that React's virtual DOM may
    // be out of sync with the real DOM now)
    return false;
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
