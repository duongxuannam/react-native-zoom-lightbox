import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { GestureDetector, FlatList } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { screenHeight, screenWidth } from '../responsive';
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
  useEffect(() => {
    valueAnimatedItem.value = withTiming(1, {
      duration: 500
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: gesture
  }, /*#__PURE__*/React.createElement(FlatList, {
    ref: scrollRef,
    horizontal: true,
    initialScrollIndex: currentIndex || 0,
    pagingEnabled: true,
    getItemLayout: (_, index) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index
    }),
    onScroll: e => {
      onScroll(Math.floor(e.nativeEvent.contentOffset.x / (screenWidth - 10)));
    },
    data: data,
    renderItem: _ref2 => {
      let {
        item,
        index
      } = _ref2;
      return /*#__PURE__*/React.createElement(ChildItem, {
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
export default ItemAnimated;
const ChildItem = _ref3 => {
  let {
    valueAnimatedItem,
    measureImage,
    offSet,
    scaleOffset,
    item,
    isActive
  } = _ref3;
  const rContainerImageView = useAnimatedStyle(() => {
    if (!measureImage) {
      return {};
    }
    if (!isActive) {
      return {
        top: 0,
        left: 0,
        height: screenHeight,
        width: screenWidth,
        transform: [{
          translateY: 0
        }, {
          scale: 1
        }]
      };
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
  return /*#__PURE__*/React.createElement(View, {
    style: [style.oer]
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [rContainerImageView]
  }, /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: item === null || item === void 0 ? void 0 : item.source
    },
    style: style.imgModalContainer
  })));
};
const style = StyleSheet.create({
  flex1: {
    flex: 1
  },
  imgModalContainer: {
    flex: 1,
    resizeMode: 'contain'
  },
  oer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight
  }
});
//# sourceMappingURL=ListItemAnimated.js.map