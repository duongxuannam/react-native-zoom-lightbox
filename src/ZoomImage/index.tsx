import React, {useRef, useState} from 'react';
import {
  Image,
  ImageProps,
  LayoutRectangle,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureHandlerRootView} from 'react-native-gesture-handler';
import ItemAnimated from './ItemAnimated';
import CloseIconHeader from '../components/CloseIconHeader';
import CloseIconBottom from '../components/CloseIconBottom';
import {DEFAULT_IMAGE, OFFSET_CLOSE} from '../constants';

interface Props extends ImageProps {}

const ZoomImage: React.FC<Props> = props => {
  const [measureImage, setMeasureImage] = useState<LayoutRectangle>();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const valueAnimated = useSharedValue(0);
  const valueAnimatedItem = useSharedValue(0);

  const isPressed = useSharedValue(false);
  const startValue = useSharedValue(0);
  const offSet = useSharedValue(0);

  const scaleOffset = useSharedValue(1);

  const onCloseModal = async () => {
    valueAnimatedItem.value = withTiming(0, {duration: 500}, () => {
      valueAnimated.value = 0;
      runOnJS(setIsOpenModal)(false);
      startValue.value = 0;
      offSet.value = 0;
    });
  };

  const panGesture = Gesture.Pan()

    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      offSet.value = e.translationY + startValue.value;
    })
    .onEnd(() => {
      startValue.value = offSet.value;
    })
    .onFinalize(() => {
      isPressed.value = false;
      offSet.value = withTiming(0);
      startValue.value = withTiming(0);

      if (Math.abs(offSet.value) > OFFSET_CLOSE) {
        runOnJS(onCloseModal)();
      }
    });

  const zoomGesture = Gesture.Pinch()

    .onUpdate(e => {
      scaleOffset.value = withTiming(e.scale);
    })
    .onFinalize(() => {
      scaleOffset.value = withTiming(1);
    });

  const gesture = Gesture.Simultaneous(zoomGesture, panGesture);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(valueAnimated.value, [0, 1], [1, 0]),
    };
  });

  const rStyleModal = useAnimatedStyle(() => {
    return {
      opacity: interpolate(valueAnimated.value, [0, 1], [0, 1]),
      backgroundColor: isPressed.value
        ? interpolateColor(
            Math.abs(offSet.value),
            [0, 190, 200],
            ['rgba(0,0,0,1)', 'rgba(0,0,0,0.9)', 'transparent'],
          )
        : interpolateColor(
            valueAnimatedItem.value,
            [0, 0.1, 1],
            ['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)'],
          ),
    };
  });
  const ref = useRef<Image>(null);
  return (
    <>
      <>
        <Pressable
          onPress={() => {
            ref?.current?.measure((_, __, width, height, pageX, pageY) => {
              setMeasureImage({
                x: pageX,
                y: pageY,
                width,
                height,
              });
            });
            valueAnimated.value = withTiming(1, {duration: 500});
            setIsOpenModal(true);
          }}>
          <Animated.View style={[rStyle]}>
            <Image
              ref={ref}
              {...props}
              source={props.source || {uri: DEFAULT_IMAGE}}
              style={props.style}
            />
          </Animated.View>
        </Pressable>

        <Modal transparent visible={isOpenModal} onRequestClose={onCloseModal}>
          <GestureHandlerRootView style={style.flex1}>
            <Animated.View style={[style.modalContainer, rStyleModal]}>
              <CloseIconHeader offSet={offSet} onPress={onCloseModal} />
              <CloseIconBottom offSet={offSet} />
              {/* Content  */}

              <ItemAnimated
                valueAnimatedItem={valueAnimatedItem}
                measureImage={measureImage}
                gesture={gesture}
                offSet={offSet}
                scaleOffset={scaleOffset}
              />
            </Animated.View>
          </GestureHandlerRootView>
        </Modal>
      </>
    </>
  );
};

export default ZoomImage;

const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  animatedContainer: {
    height: 150,
    width: 200,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});
