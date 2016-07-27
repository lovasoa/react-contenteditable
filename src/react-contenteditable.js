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
    return !this.htmlEl || this.normalizeHtml(nextProps.html) !== this.htmlEl.innerHTML ||
            this.props.disabled !== nextProps.disabled;
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.normalizeHtml(this.props.html) !== this.htmlEl.innerHTML ) {
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

  normalizeHtml(htmlValue) {
    // Skip browser reformatting when rendering on the server.
    if (typeof window === 'undefined') {
      return htmlValue;
    }

    // Run the HTML string through the browser's reformatting, otherwise it
    // could throw off our comparison.
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = htmlValue
    return tempContainer.innerHTML
  }
}
