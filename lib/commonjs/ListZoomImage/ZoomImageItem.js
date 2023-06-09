"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoomImageItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _constants = require("../constants");
var _ZoomImageProvider = require("./ZoomImageProvider");
var _responsive = require("../responsive");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ZoomImageItem = _ref => {
  let {
    index,
    source,
    style,
    ...rest
  } = _ref;
  const {
    setRef,
    setCurrentIndex,
    currentIndex,
    valueAnimated: providerDataAnimated,
    setIsOpenModal
  } = (0, _ZoomImageProvider.useZoomImage)();
  const tempValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const valueAnimated = providerDataAnimated || tempValue;
  const ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    if (currentIndex !== index) {
      var _ref$current;
      ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.measure((_, __, width, height, pageX, pageY) => {
        const tempData = width ? {
          x: pageX,
          y: pageY,
          width,
          height
        } : {
          x: _responsive.screenHeight / 2 - 200,
          y: index > currentIndex ? _responsive.screenHeight + 200 : -200,
          width: 200,
          height: 200
        };
        setRef(index, tempData);
      });
    }
  }, [currentIndex, index, setRef]);
  const rStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: currentIndex === index ? (0, _reactNativeReanimated.interpolate)(valueAnimated.value, [0, 1], [1, 0]) : 1
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => {
      var _ref$current2;
      ref === null || ref === void 0 ? void 0 : (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.measure(async (_, __, width, height, pageX, pageY) => {
        const tempData = width ? {
          x: pageX,
          y: pageY,
          width,
          height
        } : {
          x: _responsive.screenWidth / 2 - 200,
          y: index > currentIndex ? _responsive.screenHeight + 200 : -200,
          width: 200,
          height: 200
        };
        setRef(index, tempData);
        valueAnimated.value = (0, _reactNativeReanimated.withTiming)(1, {
          duration: 500
        });
        await setCurrentIndex(index);
        (0, _constants.delay)(300);
        setIsOpenModal(true);
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [rStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, _extends({
    ref: ref,
    onLayout: () => {
      var _ref$current3;
      ref === null || ref === void 0 ? void 0 : (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.measure((_, __, width, height, pageX, pageY) => {
        setRef(index, {
          x: pageX,
          y: pageY,
          width,
          height
        });
      });
    }
  }, rest, {
    source: source || {
      uri: _constants.DEFAULT_IMAGE
    },
    style: style
  }))));
};
exports.ZoomImageItem = ZoomImageItem;
//# sourceMappingURL=ZoomImageItem.js.map