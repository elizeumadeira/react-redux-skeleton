"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.toastrsCache = void 0;

var _utils = require("./utils.js");

var _config = _interopRequireDefault(require("./config"));

var _constants = require("./constants");

var _createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TOTO: find a better way of handling this issue
// We will cache data so we can check for duplicated before fire the add action.
var toastrsCache = [];
exports.toastrsCache = toastrsCache;
var initialState = {
  toastrs: [],
  confirm: null
};

var _default = (0, _utils.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _constants.ADD_TOASTR, function (state, toastr) {
  if (toastr.ignoreToastr) {
    return state;
  }

  var newToastr = _objectSpread({
    id: (0, _utils.guid)(),
    position: _config.default.position
  }, toastr);

  var newState = {};

  if (!_config.default.newestOnTop) {
    newState = _objectSpread({}, state, {
      toastrs: [].concat(_toConsumableArray(state.toastrs), [newToastr])
    });
  } else {
    newState = _objectSpread({}, state, {
      toastrs: [newToastr].concat(_toConsumableArray(state.toastrs))
    });
  }

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.REMOVE_TOASTR, function (state, id) {
  var newState = _objectSpread({}, state, {
    toastrs: state.toastrs.filter(function (toastr) {
      return toastr.id !== id;
    })
  });

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.REMOVE_BY_TYPE, function (state, type) {
  var newState = _objectSpread({}, state, {
    toastrs: state.toastrs.filter(function (toastr) {
      return toastr.type !== type;
    })
  });

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.CLEAN_TOASTR, function (state) {
  exports.toastrsCache = toastrsCache = [];
  return _objectSpread({}, state, {
    toastrs: []
  });
}), _defineProperty(_createReducer, _constants.SHOW_CONFIRM, function (state, _ref) {
  var id = _ref.id,
      message = _ref.message,
      options = _ref.options;
  return _objectSpread({}, state, {
    confirm: {
      id: id || (0, _utils.guid)(),
      show: true,
      message: message,
      options: options || {}
    }
  });
}), _defineProperty(_createReducer, _constants.HIDE_CONFIRM, function (state) {
  return _objectSpread({}, state, {
    confirm: null
  });
}), _createReducer));

exports.default = _default;