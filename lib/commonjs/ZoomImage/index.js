"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _ItemAnimated = _interopRequireDefault(require("./ItemAnimated"));
var _CloseIconHeader = _interopRequireDefault(require("../components/CloseIconHeader"));
var _CloseIconBottom = _interopRequireDefault(require("../components/CloseIconBottom"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ZoomImage = props => {
  const [measureImage, setMeasureImage] = (0, _react.useState)();
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const valueAnimated = (0, _reactNativeReanimated.useSharedValue)(0);
  const valueAnimatedItem = (0, _reactNativeReanimated.useSharedValue)(0);
  const isPressed = (0, _reactNativeReanimated.useSharedValue)(false);
  const startValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const offSet = (0, _reactNativeReanimated.useSharedValue)(0);
  const scaleOffset = (0, _reactNativeReanimated.useSharedValue)(1);
  const onCloseModal = async () => {
    valueAnimatedItem.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration: 500
    }, () => {
      valueAnimated.value = 0;
      (0, _reactNativeReanimated.runOnJS)(setIsOpenModal)(false);
      startValue.value = 0;
      offSet.value = 0;
    });
  };
  const panGesture = _reactNativeGestureHandler.Gesture.Pan().onBegin(() => {
    isPressed.value = true;
  }).onUpdate(e => {
    offSet.value = e.translationY + startValue.value;
  }).onEnd(() => {
    startValue.value = offSet.value;
  }).onFinalize(() => {
    isPressed.value = false;
    offSet.value = (0, _reactNativeReanimated.withTiming)(0);
    startValue.value = (0, _reactNativeReanimated.withTiming)(0);
    if (Math.abs(offSet.value) > _constants.OFFSET_CLOSE) {
      (0, _reactNativeReanimated.runOnJS)(onCloseModal)();
    }
  });
  const zoomGesture = _reactNativeGestureHandler.Gesture.Pinch().onUpdate(e => {
    scaleOffset.value = (0, _reactNativeReanimated.withTiming)(e.scale);
  }).onFinalize(() => {
    scaleOffset.value = (0, _reactNativeReanimated.withTiming)(1);
  });
  const gesture = _reactNativeGestureHandler.Gesture.Simultaneous(zoomGesture, panGesture);
  const rStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.interpolate)(valueAnimated.value, [0, 1], [1, 0])
    };
  });
  const rStyleModal = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.interpolate)(valueAnimated.value, [0, 1], [0, 1]),
      backgroundColor: isPressed.value ? (0, _reactNativeReanimated.interpolateColor)(Math.abs(offSet.value), [0, 190, 200], ['rgba(0,0,0,1)', 'rgba(0,0,0,0.9)', 'transparent']) : (0, _reactNativeReanimated.interpolateColor)(valueAnimatedItem.value, [0, 0.1, 1], ['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)'])
    };
  });
  const ref = (0, _react.useRef)(null);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => {
      var _ref$current;
      ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.measure((_, __, width, height, pageX, pageY) => {
        setMeasureImage({
          x: pageX,
          y: pageY,
          width,
          height
        });
      });
      valueAnimated.value = (0, _reactNativeReanimated.withTiming)(1, {
        duration: 500
      });
      setIsOpenModal(true);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [rStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, _extends({
    ref: ref
  }, props, {
    source: props.source || {
      uri: _constants.DEFAULT_IMAGE
    },
    style: props.style
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true,
    visible: isOpenModal,
    onRequestClose: onCloseModal
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: style.flex1
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [style.modalContainer, rStyleModal]
  }, /*#__PURE__*/_react.default.createElement(_CloseIconHeader.default, {
    offSet: offSet,
    onPress: onCloseModal
  }), /*#__PURE__*/_react.default.createElement(_CloseIconBottom.default, {
    offSet: offSet
  }), /*#__PURE__*/_react.default.createElement(_ItemAnimated.default, {
    valueAnimatedItem: valueAnimatedItem,
    measureImage: measureImage,
    gesture: gesture,
    offSet: offSet,
    scaleOffset: scaleOffset
  }))))));
};
var _default = ZoomImage;
exports.default = _default;
const style = _reactNative.StyleSheet.create({
  flex1: {
    flex: 1
  },
  animatedContainer: {
    height: 150,
    width: 200
  },
  modalContainer: {
    ..._reactNative.StyleSheet.absoluteFillObject
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  }
});
//# sourceMappingURL=index.js.map