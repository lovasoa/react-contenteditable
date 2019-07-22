import * as React from 'react';
import deepEqual from 'fast-deep-equal';
import * as PropTypes from 'prop-types';

function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}

function findLastTextNode(node: Node) : Node | null {
  if (node.nodeType === Node.TEXT_NODE) return node;
  let children = node.childNodes;
  for (let i = children.length-1; i>=0; i--) {
    let textNode = findLastTextNode(children[i]);
    if (textNode !== null) return textNode;
  }
  return null;
}

function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = findLastTextNode(el);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var sel = window.getSelection();
    if (sel !== null) {
      var range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}

/**
 * A simple component for an html element with editable contents.
 */
export default class ContentEditable extends React.Component<Props> {
  lastHtml: string = this.props.html;
  el: any = typeof this.props.innerRef === 'function' ? { current: null } : React.createRef<HTMLElement>();

  getEl = () => (this.props.innerRef && typeof this.props.innerRef !== 'function' ? this.props.innerRef : this.el).current;

  render() {
    const { tagName, html, innerRef, ...props } = this.props;

    return React.createElement(
      tagName || 'div',
      {
        ...props,
        ref: typeof innerRef === 'function' ? (current: HTMLElement) => {
          innerRef(current)
          this.el.current = current
        } : innerRef || this.el,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        onKeyUp: this.props.onKeyUp || this.emitChange,
        onKeyDown: this.props.onKeyDown || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html }
      },
      this.props.children);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    const { props } = this;
    const el = this.getEl();

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!el) return true;

    // ...or if html really changed... (programmatically, not by user edit)
    if (
      normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)
    ) {
      return true;
    }

    // Handle additional properties
    return props.disabled !== nextProps.disabled ||
      props.tagName !== nextProps.tagName ||
      props.className !== nextProps.className ||
      props.innerRef !== nextProps.innerRef ||
      !deepEqual(props.style, nextProps.style);
  }

  componentDidUpdate() {
    const el = this.getEl();
    if (!el) return;

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (this.props.html !== el.innerHTML) {
      el.innerHTML = this.lastHtml = this.props.html;
    }
    replaceCaret(el);
  }

  emitChange = (originalEvt: React.SyntheticEvent<any>) => {
    const el = this.getEl();
    if (!el) return;

    const html = el.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html
        }
      });
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }

  static propTypes = {
    html: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown:  PropTypes.func,
    disabled: PropTypes.bool,
    tagName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    innerRef: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ])
  }
}

export interface Props {
  html: string,
  onChange?: Function,
  onBlur?: Function,
  onKeyUp?: Function,
  onKeyDown?: Function,
  disabled?: boolean,
  tagName?: string,
  className?: string,
  style?: Object,
  innerRef?: React.RefObject<HTMLElement> | Function,
}
