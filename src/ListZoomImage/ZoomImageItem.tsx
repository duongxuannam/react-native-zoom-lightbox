import React, {useEffect, useRef} from 'react';
import {Image, ImageProps, Pressable} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DEFAULT_IMAGE} from '../constants';
import {useZoomImage} from './ZoomImageProvider';
import {delay} from 'src/constants';
import {screenHeight} from 'src/responsive';

interface Props extends ImageProps {
  index: number;
}

export const ZoomImageItem: React.FC<Props> = ({
  index,

  source,
  style,

  ...rest
}) => {
  const {
    setRef,
    setCurrentIndex,
    currentIndex,
    valueAnimated: providerDataAnimated,
    setIsOpenModal,
  } = useZoomImage();
  const tempValue = useSharedValue<number>(0);

  const valueAnimated = providerDataAnimated || tempValue;

  const ref = useRef<Image>(null);

  useEffect(() => {
    if (currentIndex !== index) {
      ref?.current?.measure((_, __, width, height, pageX, pageY) => {
        const tempData = width
          ? {
              x: pageX,
              y: pageY,
              width,
              height,
            }
          : {
              x: screenHeight / 2 - 200,
              y: index > currentIndex ? screenHeight + 200 : -200,
              width: 200,
              height: 200,
            };
        setRef(index, tempData);
      });
    }
  }, [currentIndex, index, setRef]);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex === index
          ? interpolate(valueAnimated.value, [0, 1], [1, 0])
          : 1,
    };
  });

  return (
    <Pressable
      onPress={() => {
        ref?.current?.measure(async (_, __, width, height, pageX, pageY) => {
          const tempData = width
            ? {
                x: pageX,
                y: pageY,
                width,
                height,
              }
            : {
                x: screenHeight / 2 - 200,
                y: index > currentIndex ? screenHeight + 200 : -200,
                width: 200,
                height: 200,
              };
          setRef(index, tempData);
          valueAnimated.value = withTiming(1, {duration: 500});
          await setCurrentIndex(index);
          delay(300);
          setIsOpenModal(true);
        });
      }}>
      <Animated.View style={[rStyle]}>
        <Image
          ref={ref}
          onLayout={() => {
            ref?.current?.measure((_, __, width, height, pageX, pageY) => {
              setRef(index, {
                x: pageX,
                y: pageY,
                width,
                height,
              });
            });
          }}
          {...rest}
          source={source || {uri: DEFAULT_IMAGE}}
          style={style}
        />
      </Animated.View>
    </Pressable>
  );
};
