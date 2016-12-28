'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentEditable = function (_React$Component) {
  _inherits(ContentEditable, _React$Component);

  function ContentEditable() {
    _classCallCheck(this, ContentEditable);

    var _this = _possibleConstructorReturn(this, (ContentEditable.__proto__ || Object.getPrototypeOf(ContentEditable)).call(this));

    _this.emitChange = _this.emitChange.bind(_this);
    return _this;
  }

  _createClass(ContentEditable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          tagName = _props.tagName,
          html = _props.html,
          props = _objectWithoutProperties(_props, ['tagName', 'html']);

      return _react2.default.createElement(tagName || 'div', _extends({}, props, {
        ref: function ref(e) {
          return _this2.htmlEl = e;
        },
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html }
      }), this.props.children);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // We need not rerender if the change of props simply reflects the user's
      // edits. Rerendering in this case would make the cursor/caret jump.
      return (
        // Rerender if there is no element yet... (somehow?)
        !this.htmlEl
        // ...or if html really changed... (programmatically, not by user edit)
        || nextProps.html !== this.htmlEl.innerHTML && nextProps.html !== this.props.html
        // ...or if editing is enabled or disabled.
        || this.props.disabled !== nextProps.disabled
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        this.htmlEl.innerHTML = this.props.html;
      }
    }
  }, {
    key: 'emitChange',
    value: function emitChange(evt) {
      if (!this.htmlEl) return;
      var html = this.htmlEl.innerHTML;
      if (this.props.onChange && html !== this.lastHtml) {
        evt.target = { value: html };
        this.props.onChange(evt);
      }
      this.lastHtml = html;
    }
  }]);

  return ContentEditable;
}(_react2.default.Component);

exports.default = ContentEditable;
module.exports = exports['default'];