import React, {useRef} from 'react';
import {FlatList, Modal, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureHandlerRootView} from 'react-native-gesture-handler';
import ListItemAnimated from './ListItemAnimated';
import CloseIconHeader from '../components/CloseIconHeader';
import CloseIconBottom from '../components/CloseIconBottom';
import {OFFSET_CLOSE} from '../constants';
import {useZoomImage} from './ZoomImageProvider';
import PreviousButton from '../components/PreviousButton';
import NextButton from '../components/NextButton';

const ModalZoomListImage: React.FC = () => {
  const {
    currentIndex,
    setCurrentIndex,
    isOpenModal,
    getRef,
    setIsOpenModal,
    data: listImage,
    valueAnimated: valueAnimatedProvider,
  } = useZoomImage();
  const tempValue = useSharedValue<number>(0);

  const measureImage = getRef(currentIndex);

  const valueAnimatedItem = useSharedValue(0);
  const valueAnimated = valueAnimatedProvider || tempValue;

  const isPressed = useSharedValue(false);
  const startValue = useSharedValue(0);
  const offSet = useSharedValue(0);
  const scaleOffset = useSharedValue(1);

  const onCloseModal = async () => {
    valueAnimatedItem.value = withTiming(0, {duration: 500}, () => {
      valueAnimated.value = 0;
      runOnJS(setCurrentIndex)(0);
      runOnJS(setIsOpenModal)(false);
      startValue.value = 0;
      offSet.value = 0;
    });
  };
  const scrollRef = useRef<FlatList>(null);
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

  const onPreviousImage = () => {
    scrollRef &&
      scrollRef.current?.scrollToIndex({
        index: !currentIndex ? 0 : currentIndex - 1,
        animated: true,
      });
  };

  const onNextImage = () => {
    scrollRef &&
      scrollRef.current?.scrollToIndex({
        index:
          currentIndex === listImage.length - 1
            ? currentIndex
            : currentIndex + 1,
        animated: true,
      });
  };
  return (
    <Modal transparent visible={isOpenModal} onRequestClose={onCloseModal}>
      <GestureHandlerRootView style={style.flex1}>
        <Animated.View style={[style.modalContainer, rStyleModal]}>
          <CloseIconHeader offSet={offSet} onPress={onCloseModal} />
          <CloseIconBottom offSet={offSet} />
          <PreviousButton offSet={offSet} onPress={onPreviousImage} />
          <NextButton offSet={offSet} onPress={onNextImage} />

          {/* Content  */}

          <ListItemAnimated
            currentIndex={currentIndex}
            data={listImage || []}
            scrollRef={scrollRef}
            onScroll={setCurrentIndex}
            valueAnimatedItem={valueAnimatedItem}
            measureImage={measureImage}
            gesture={gesture}
            offSet={offSet}
            scaleOffset={scaleOffset}
            isPressed={isPressed}
          />
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ModalZoomListImage;

const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  animatedContainer: {
    height: 150,
    width: 200,
    marginTop: 3,
    marginLeft: 2,
    resizeMode: 'contain',
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  imgModalContainer: {
    flex: 1,
    resizeMode: 'contain',
  },
});
