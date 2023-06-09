"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _ListItemAnimated = _interopRequireDefault(require("./ListItemAnimated"));
var _CloseIconHeader = _interopRequireDefault(require("../components/CloseIconHeader"));
var _CloseIconBottom = _interopRequireDefault(require("../components/CloseIconBottom"));
var _constants = require("../constants");
var _ZoomImageProvider = require("./ZoomImageProvider");
var _PreviousButton = _interopRequireDefault(require("../components/PreviousButton"));
var _NextButton = _interopRequireDefault(require("../components/NextButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ModalZoomListImage = () => {
  const {
    currentIndex,
    setCurrentIndex,
    isOpenModal,
    getRef,
    setIsOpenModal,
    data: listImage,
    valueAnimated: valueAnimatedProvider
  } = (0, _ZoomImageProvider.useZoomImage)();
  const tempValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const measureImage = getRef(currentIndex);
  const valueAnimatedItem = (0, _reactNativeReanimated.useSharedValue)(0);
  const valueAnimated = valueAnimatedProvider || tempValue;
  const isPressed = (0, _reactNativeReanimated.useSharedValue)(false);
  const startValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const offSet = (0, _reactNativeReanimated.useSharedValue)(0);
  const scaleOffset = (0, _reactNativeReanimated.useSharedValue)(1);
  const onCloseModal = async () => {
    valueAnimatedItem.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration: 500
    }, () => {
      valueAnimated.value = 0;
      (0, _reactNativeReanimated.runOnJS)(setCurrentIndex)(0);
      (0, _reactNativeReanimated.runOnJS)(setIsOpenModal)(false);
      startValue.value = 0;
      offSet.value = 0;
    });
  };
  const scrollRef = (0, _react.useRef)(null);
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
  const rStyleModal = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.interpolate)(valueAnimated.value, [0, 1], [0, 1]),
      backgroundColor: isPressed.value ? (0, _reactNativeReanimated.interpolateColor)(Math.abs(offSet.value), [0, 190, 200], ['rgba(0,0,0,1)', 'rgba(0,0,0,0.9)', 'transparent']) : (0, _reactNativeReanimated.interpolateColor)(valueAnimatedItem.value, [0, 0.1, 1], ['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)'])
    };
  });
  const onPreviousImage = () => {
    var _scrollRef$current;
    scrollRef && ((_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.scrollToIndex({
      index: !currentIndex ? 0 : currentIndex - 1,
      animated: true
    }));
  };
  const onNextImage = () => {
    var _scrollRef$current2;
    scrollRef && ((_scrollRef$current2 = scrollRef.current) === null || _scrollRef$current2 === void 0 ? void 0 : _scrollRef$current2.scrollToIndex({
      index: currentIndex === listImage.length - 1 ? currentIndex : currentIndex + 1,
      animated: true
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
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
  }), /*#__PURE__*/_react.default.createElement(_PreviousButton.default, {
    offSet: offSet,
    onPress: onPreviousImage
  }), /*#__PURE__*/_react.default.createElement(_NextButton.default, {
    offSet: offSet,
    onPress: onNextImage
  }), /*#__PURE__*/_react.default.createElement(_ListItemAnimated.default, {
    currentIndex: currentIndex,
    data: listImage || [],
    scrollRef: scrollRef,
    onScroll: setCurrentIndex,
    valueAnimatedItem: valueAnimatedItem,
    measureImage: measureImage,
    gesture: gesture,
    offSet: offSet,
    scaleOffset: scaleOffset,
    isPressed: isPressed
  }))));
};
var _default = ModalZoomListImage;
exports.default = _default;
const style = _reactNative.StyleSheet.create({
  flex1: {
    flex: 1
  },
  animatedContainer: {
    height: 150,
    width: 200,
    marginTop: 3,
    marginLeft: 2,
    resizeMode: 'contain'
  },
  modalContainer: {
    ..._reactNative.StyleSheet.absoluteFillObject
  },
  imgModalContainer: {
    flex: 1,
    resizeMode: 'contain'
  }
});
//# sourceMappingURL=Modal.js.map