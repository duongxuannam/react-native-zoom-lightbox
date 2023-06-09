function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useRef } from 'react';
import { Image, Pressable } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DEFAULT_IMAGE, delay } from '../constants';
import { useZoomImage } from './ZoomImageProvider';
import { screenHeight, screenWidth } from '../responsive';
export const ZoomImageItem = _ref => {
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
  } = useZoomImage();
  const tempValue = useSharedValue(0);
  const valueAnimated = providerDataAnimated || tempValue;
  const ref = useRef(null);
  useEffect(() => {
    if (currentIndex !== index) {
      var _ref$current;
      ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.measure((_, __, width, height, pageX, pageY) => {
        const tempData = width ? {
          x: pageX,
          y: pageY,
          width,
          height
        } : {
          x: screenHeight / 2 - 200,
          y: index > currentIndex ? screenHeight + 200 : -200,
          width: 200,
          height: 200
        };
        setRef(index, tempData);
      });
    }
  }, [currentIndex, index, setRef]);
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex === index ? interpolate(valueAnimated.value, [0, 1], [1, 0]) : 1
    };
  });
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => {
      var _ref$current2;
      ref === null || ref === void 0 ? void 0 : (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.measure(async (_, __, width, height, pageX, pageY) => {
        const tempData = width ? {
          x: pageX,
          y: pageY,
          width,
          height
        } : {
          x: screenWidth / 2 - 200,
          y: index > currentIndex ? screenHeight + 200 : -200,
          width: 200,
          height: 200
        };
        setRef(index, tempData);
        valueAnimated.value = withTiming(1, {
          duration: 500
        });
        await setCurrentIndex(index);
        delay(300);
        setIsOpenModal(true);
      });
    }
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [rStyle]
  }, /*#__PURE__*/React.createElement(Image, _extends({
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
      uri: DEFAULT_IMAGE
    },
    style: style
  }))));
};
//# sourceMappingURL=ZoomImageItem.js.map