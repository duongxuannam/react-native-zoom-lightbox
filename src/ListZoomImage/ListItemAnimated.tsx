import React, {useEffect} from 'react';
import {LayoutRectangle, StyleSheet, View, Image} from 'react-native';
import {GestureDetector, FlatList} from 'react-native-gesture-handler';
import {SimultaneousGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {screenHeight, screenWidth} from 'src/responsive';

interface Props {
  measureImage: LayoutRectangle | undefined;
  valueAnimatedItem: SharedValue<number>;
  gesture: SimultaneousGesture;
  offSet: SharedValue<number>;
  scaleOffset: SharedValue<number>;
  isPressed: SharedValue<boolean>;
  scrollRef: any;
  data: any[];
  onScroll: (number: number) => void;
  currentIndex: number | undefined;
}

const ItemAnimated: React.FC<Props> = ({
  measureImage,
  valueAnimatedItem,
  gesture,
  offSet,
  scaleOffset,
  isPressed,
  scrollRef,
  data,
  onScroll,
  currentIndex,
}) => {
  useEffect(() => {
    valueAnimatedItem.value = withTiming(1, {duration: 500});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <GestureDetector gesture={gesture}>
        <FlatList
          ref={scrollRef}
          horizontal
          initialScrollIndex={currentIndex || 0}
          pagingEnabled
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          onScroll={e => {
            onScroll(
              Math.floor(e.nativeEvent.contentOffset.x / (screenWidth - 10)),
            );
          }}
          data={data}
          renderItem={({item, index}) => {
            return (
              <ChildItem
                item={item}
                measureImage={measureImage}
                valueAnimatedItem={valueAnimatedItem}
                isActive={index === currentIndex}
                offSet={offSet}
                scaleOffset={scaleOffset}
                isPressed={isPressed}
                index={index}
                currentIndex={currentIndex}
              />
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </GestureDetector>
    </>
  );
};
export default ItemAnimated;

interface PropsChild {
  item: any;
  measureImage: LayoutRectangle | undefined;
  valueAnimatedItem: SharedValue<number>;
  offSet: SharedValue<number>;
  scaleOffset: SharedValue<number>;
  isActive: boolean;
  isPressed: SharedValue<boolean>;
  index: number;
  currentIndex: number | undefined;
}

const ChildItem: React.FC<PropsChild> = ({
  valueAnimatedItem,
  measureImage,
  offSet,
  scaleOffset,
  item,
  isActive,
}) => {
  const rContainerImageView = useAnimatedStyle(() => {
    if (!measureImage) {
      return {};
    }

    if (!isActive) {
      return {
        top: 0,
        left: 0,
        height: screenHeight,
        width: screenWidth,
        transform: [
          {translateY: 0},
          {
            scale: 1,
          },
        ],
      };
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
    <View style={[style.oer]}>
      <Animated.View style={[rContainerImageView]}>
        <Image source={{uri: item?.source}} style={style.imgModalContainer} />
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  imgModalContainer: {
    flex: 1,
    resizeMode: 'contain',
  },
  oer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
});
