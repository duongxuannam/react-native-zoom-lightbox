import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { screenHeight, screenWidth } from '../responsive';
const ItemAnimated = _ref => {
  let {
    measureImage,
    valueAnimatedItem,
    gesture,
    offSet,
    scaleOffset
  } = _ref;
  useEffect(() => {
    valueAnimatedItem.value = withTiming(1, {
      duration: 500
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const rContainerImageView = useAnimatedStyle(() => {
    if (!measureImage) {
      return {};
    }
    return {
      top: interpolate(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.y, 0]),
      left: interpolate(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.x, 0]),
      height: interpolate(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.height, screenHeight]),
      width: interpolate(valueAnimatedItem.value, [0, 1], [measureImage === null || measureImage === void 0 ? void 0 : measureImage.width, screenWidth]),
      transform: [{
        translateY: offSet.value
      }, {
        scale: scaleOffset.value !== 1 ? scaleOffset.value : interpolate(Math.abs(offSet.value), [0, 200], [1, 0.6])
      }]
    };
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: gesture
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [rContainerImageView]
  }, /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: 'https://reactnative.dev/img/tiny_logo.png'
    },
    style: style.imgModalContainer
  }))));
};
export default ItemAnimated;
const style = StyleSheet.create({
  flex1: {
    flex: 1
  },
  imgModalContainer: {
    flex: 1,
    resizeMode: 'contain'
  }
});
//# sourceMappingURL=ItemAnimated.js.map