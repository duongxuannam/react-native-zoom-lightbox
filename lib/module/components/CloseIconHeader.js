import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { responsiveHeight, responsiveWidth } from '../responsive';
import { OFFSET_CLOSE } from '../constants';
const AnimatedContainer = Animated.createAnimatedComponent(Pressable);
const CloseIconHeader = _ref => {
  let {
    onPress,
    offSet
  } = _ref;
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(Math.abs(offSet.value), [0, OFFSET_CLOSE], [1, 0])
    };
  });
  return /*#__PURE__*/React.createElement(AnimatedContainer, {
    onPress: onPress,
    style: [styles.container, rStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, "x"));
};
export default CloseIconHeader;
const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    position: 'absolute',
    top: responsiveHeight(50),
    right: responsiveWidth(10),
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
//# sourceMappingURL=CloseIconHeader.js.map