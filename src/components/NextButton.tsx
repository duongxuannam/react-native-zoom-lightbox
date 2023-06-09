import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {screenHeight} from '../responsive';
import {OFFSET_CLOSE} from '../constants';

interface Props {
  offSet: SharedValue<number>;
  onPress: () => void;
}

const nextIcon = require('./next.png');

const AnimatedContainer = Animated.createAnimatedComponent(Pressable);

const NextButton: React.FC<Props> = ({onPress, offSet}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(Math.abs(offSet.value), [0, OFFSET_CLOSE], [1, 0]),
    };
  });

  return (
    <AnimatedContainer onPress={onPress} style={[styles.container, rStyle]}>
      <Image source={nextIcon} style={styles.image} />
    </AnimatedContainer>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    position: 'absolute',
    top: screenHeight / 2 - 20,
    right: 0,
    height: 40,
    aspectRatio: 1,
    backgroundColor: 'transparent',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});
