import React, {useEffect} from 'react';
import {Image, LayoutRectangle, StyleSheet} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import {SimultaneousGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {screenHeight, screenWidth} from '../responsive';

interface Props {
  measureImage: LayoutRectangle | undefined;
  valueAnimatedItem: SharedValue<number>;
  gesture: SimultaneousGesture;
  offSet: SharedValue<number>;
  scaleOffset: SharedValue<number>;
}

const ItemAnimated: React.FC<Props> = ({
  measureImage,
  valueAnimatedItem,
  gesture,
  offSet,
  scaleOffset,
}) => {
  useEffect(() => {
    valueAnimatedItem.value = withTiming(1, {duration: 500});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rContainerImageView = useAnimatedStyle(() => {
    if (!measureImage) {
      return {};
    }
    return {
      top: interpolate(valueAnimatedItem.value, [0, 1], [measureImage?.y, 0]),
      left: interpolate(valueAnimatedItem.value, [0, 1], [measureImage?.x, 0]),

      height: interpolate(
        valueAnimatedItem.value,
        [0, 1],
        [measureImage?.height, screenHeight],
      ),
      width: interpolate(
        valueAnimatedItem.value,
        [0, 1],
        [measureImage?.width, screenWidth],
      ),
      transform: [
        {translateY: offSet.value},
        {
          scale:
            scaleOffset.value !== 1
              ? scaleOffset.value
              : interpolate(Math.abs(offSet.value), [0, 200], [1, 0.6]),
        },
      ],
    };
  });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[rContainerImageView]}>
          <Image
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            style={style.imgModalContainer}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
};
export default ItemAnimated;

const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  imgModalContainer: {
    flex: 1,
    resizeMode: 'contain',
  },
});
