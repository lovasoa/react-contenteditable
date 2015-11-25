var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    return React.createElement('div', _extends({}, this.props, {
      onInput: this.emitChange,
      onBlur: this.emitChange,
      contentEditable: !this.props.disabled,
      dangerouslySetInnerHTML: { __html: this.props.html } }));
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== React.findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== React.findDOMNode(this).innerHTML) {
      React.findDOMNode(this).innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    var html = React.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }
}