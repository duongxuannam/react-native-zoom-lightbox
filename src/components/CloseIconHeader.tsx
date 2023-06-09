import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {responsiveHeight, responsiveWidth} from '../responsive';
import {OFFSET_CLOSE} from '../constants';

interface Props {
  offSet: SharedValue<number>;
  onPress: () => void;
}

const AnimatedContainer = Animated.createAnimatedComponent(Pressable);

const CloseIconHeader: React.FC<Props> = ({onPress, offSet}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(Math.abs(offSet.value), [0, OFFSET_CLOSE], [1, 0]),
    };
  });

  return (
    <AnimatedContainer onPress={onPress} style={[styles.container, rStyle]}>
      <Text style={styles.text}>x</Text>
    </AnimatedContainer>
  );
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
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  text: {
    fontWeight: 'bold',
  },
});
