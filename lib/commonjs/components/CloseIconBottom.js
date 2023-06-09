"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _responsive = require("../responsive");
var _constants = require("../constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CloseIconBottom = _ref => {
  let {
    offSet
  } = _ref;
  const rStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.interpolate)(Math.abs(offSet.value), [0, _constants.OFFSET_CLOSE], [0, 1])
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.container, rStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, "x"));
};
var _default = CloseIconBottom;
exports.default = _default;
const styles = _reactNative.StyleSheet.create({
  container: {
    borderColor: 'white',
    position: 'absolute',
    bottom: (0, _responsive.responsiveHeight)(50),
    left: _responsive.screenWidth / 2 - 20,
    height: 40,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  text: {
    fontWeight: 'bold'
  }
});
//# sourceMappingURL=CloseIconBottom.js.map