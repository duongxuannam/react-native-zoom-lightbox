import React from 'react';
import { LayoutRectangle } from 'react-native';
import { SimultaneousGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
import { SharedValue } from 'react-native-reanimated';
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
declare const ItemAnimated: React.FC<Props>;
export default ItemAnimated;
//# sourceMappingURL=ListItemAnimated.d.ts.map