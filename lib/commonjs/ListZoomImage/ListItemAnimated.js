"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _responsive = require("../responsive");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ItemAnimated = _ref => {
  let {
    measureImage,
    valueAnimatedItem,
    gesture,
    offSet,
    scaleOffset,
    isPressed,
    scrollRef,
    data,
    onScroll,
    currentIndex
  } = _ref;
  (0, _react.useEffect)(() => {
    valueAnimatedItem.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: 500
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gesture
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.FlatList, {
    ref: scrollRef,
    horizontal: true,
    initialScrollIndex: currentIndex || 0,
    pagingEnabled: true,
    getItemLayout: (_, index) => ({
      length: _responsive.screenWidth,
      offset: _responsive.screenWidth * index,
      index
    }),
    onScroll: e => {
      onScroll(Math.floor(e.nativeEvent.contentOffset.x / (_responsive.screenWidth - 10)));
    },
    data: data,
    renderItem: _ref2 => {
      let {
        item,
        index
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement(ChildItem, {
        item: item,
        measureImage: measureImage,
        valueAnimatedItem: valueAnimatedItem,
        isActive: index === currentIndex,
        offSet: offSet,
        scaleOffset: scaleOffset,
        isPressed: isPressed,
        index: index,
        currentIndex: currentIndex
      });
    },
    keyExtractor: item => item.id.toString()
  })));
};
var _default = ItemAnimated;
exports.default = _default;
const ChildItem = _ref3 => {
  let {
    valueAnimatedItem,
    measureImage,
    offSet,
    scaleOffset,
    item,
    isActive
  } = _ref3;
  const rContainerImageView = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    if (!measureImage) {
      return {};
    }
    if (!isActive) {
      return {
        top: 0,
        left: 0,
        height: _responsive.screenHeight,
        width: _responsive.screenWidth,
        transform: [{
          translateY: 0
        }, {
          scale: 1
        }]
      };
    }
    return {
      top: (0, _reactNativeReanimated.interpolate)(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.y, 0]),
      left: (0, _reactNativeReanimated.interpolate)(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.x, 0]),
      height: (0, _reactNativeReanimated.interpolate)(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.height, _responsive.screenHeight]),
      width: (0, _reactNativeReanimated.interpolate)(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.width, _responsive.screenWidth]),
      transform: [{
        translateY: offSet.value
      }, {
        scale: scaleOffset.value !== 1 ? scaleOffset.value : (0, _reactNativeReanimated.interpolate)(Math.abs(offSet.value), [0, 200], [1, 0.6])
      }]
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.oer]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [rContainerImageView]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: {
      uri: item === null || item === void 0 ? void 0 : item.source
    },
    style: style.imgModalContainer
  })));
};
const style = _reactNative.StyleSheet.create({
  flex1: {
    flex: 1
  },
  imgModalContainer: {
    flex: 1,
    resizeMode: 'contain'
  },
  oer: {
    flex: 1,
    width: _responsive.screenWidth,
    height: _responsive.screenHeight
  }
});
//# sourceMappingURL=ListItemAnimated.js.map