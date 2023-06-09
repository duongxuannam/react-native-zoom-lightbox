import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { responsiveHeight, screenWidth } from '../responsive';
import { OFFSET_CLOSE } from '../constants';
const CloseIconBottom = _ref => {
  let {
    offSet
  } = _ref;
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(Math.abs(offSet.value), [0, OFFSET_CLOSE], [0, 1])
    };
  });
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, rStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, "x"));
};
export default CloseIconBottom;
const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    position: 'absolute',
    bottom: responsiveHeight(50),
    left: screenWidth / 2 - 20,
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