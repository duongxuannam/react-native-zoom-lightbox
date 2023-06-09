import React from 'react';
import { LayoutRectangle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
interface ListRef {
    [key: number | string]: LayoutRectangle;
}
export interface ZoomImageType {
    data: any[];
    valueAnimated: SharedValue<number> | 0;
    getListRef: () => ListRef | undefined;
    getRef: (id: any) => LayoutRectangle | undefined;
    setRef: (id: any, ref: LayoutRectangle) => void;
    currentIndex: number;
    setCurrentIndex: (number: number) => void;
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
}
interface Props {
    children: React.ReactNode;
    data: any[];
}
export declare const ZoomImageContext: React.Context<ZoomImageType>;
export declare const ZoomImageProvider: React.FC<Props>;
export declare const useZoomImage: () => {
    getListRef: () => ListRef | undefined;
    getRef: (id: any) => LayoutRectangle | undefined;
    setRef: (id: any, ref: LayoutRectangle) => void;
    data: any[];
    currentIndex: number;
    setCurrentIndex: (number: number) => void;
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    valueAnimated: any;
};
export {};
//# sourceMappingURL=ZoomImageProvider.d.ts.map