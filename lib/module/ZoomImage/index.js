function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useRef, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet } from 'react-native';
import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import ItemAnimated from './ItemAnimated';
import CloseIconHeader from '../components/CloseIconHeader';
import CloseIconBottom from '../components/CloseIconBottom';
import { DEFAULT_IMAGE, OFFSET_CLOSE } from '../constants';
const ZoomImage = props => {
  const [measureImage, setMeasureImage] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const valueAnimated = useSharedValue(0);
  const valueAnimatedItem = useSharedValue(0);
  const isPressed = useSharedValue(false);
  const startValue = useSharedValue(0);
  const offSet = useSharedValue(0);
  const scaleOffset = useSharedValue(1);
  const onCloseModal = async () => {
    valueAnimatedItem.value = withTiming(0, {
      duration: 500
    }, () => {
      valueAnimated.value = 0;
      runOnJS(setIsOpenModal)(false);
      startValue.value = 0;
      offSet.value = 0;
    });
  };
  const panGesture = Gesture.Pan().onBegin(() => {
    isPressed.value = true;
  }).onUpdate(e => {
    offSet.value = e.translationY + startValue.value;
  }).onEnd(() => {
    startValue.value = offSet.value;
  }).onFinalize(() => {
    isPressed.value = false;
    offSet.value = withTiming(0);
    startValue.value = withTiming(0);
    if (Math.abs(offSet.value) > OFFSET_CLOSE) {
      runOnJS(onCloseModal)();
    }
  });
  const zoomGesture = Gesture.Pinch().onUpdate(e => {
    scaleOffset.value = withTiming(e.scale);
  }).onFinalize(() => {
    scaleOffset.value = withTiming(1);
  });
  const gesture = Gesture.Simultaneous(zoomGesture, panGesture);
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(valueAnimated.value, [0, 1], [1, 0])
    };
  });
  const rStyleModal = useAnimatedStyle(() => {
    return {
      opacity: interpolate(valueAnimated.value, [0, 1], [0, 1]),
      backgroundColor: isPressed.value ? interpolateColor(Math.abs(offSet.value), [0, 190, 200], ['rgba(0,0,0,1)', 'rgba(0,0,0,0.9)', 'transparent']) : interpolateColor(valueAnimatedItem.value, [0, 0.1, 1], ['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)'])
    };
  });
  const ref = useRef(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Pressable, {
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
      valueAnimated.value = withTiming(1, {
        duration: 500
      });
      setIsOpenModal(true);
    }
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [rStyle]
  }, /*#__PURE__*/React.createElement(Image, _extends({
    ref: ref
  }, props, {
    source: props.source || {
      uri: DEFAULT_IMAGE
    },
    style: props.style
  })))), /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    visible: isOpenModal,
    onRequestClose: onCloseModal
  }, /*#__PURE__*/React.createElement(GestureHandlerRootView, {
    style: style.flex1
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [style.modalContainer, rStyleModal]
  }, /*#__PURE__*/React.createElement(CloseIconHeader, {
    offSet: offSet,
    onPress: onCloseModal
  }), /*#__PURE__*/React.createElement(CloseIconBottom, {
    offSet: offSet
  }), /*#__PURE__*/React.createElement(ItemAnimated, {
    valueAnimatedItem: valueAnimatedItem,
    measureImage: measureImage,
    gesture: gesture,
    offSet: offSet,
    scaleOffset: scaleOffset
  }))))));
};
export default ZoomImage;
const style = StyleSheet.create({
  flex1: {
    flex: 1
  },
  animatedContainer: {
    height: 150,
    width: 200
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  }
});
//# sourceMappingURL=index.js.map