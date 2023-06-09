import React, {useCallback, useContext, useRef, useState} from 'react';
import {LayoutRectangle} from 'react-native';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import ModalZoomListImage from './Modal';

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

const initData: ZoomImageType = {
  data: [],
  getListRef: () => undefined,
  getRef: () => undefined,
  setRef: () => {},
  currentIndex: 0,
  setCurrentIndex: (number: number) => {
    console.log(number);
  },
  isOpenModal: false,
  setIsOpenModal: (value: boolean) => {
    console.log(value);
  },
  valueAnimated: 0,
};

export const ZoomImageContext = React.createContext<ZoomImageType>(initData);

export const ZoomImageProvider: React.FC<Props> = ({children, data}) => {
  const listRef = useRef<ListRef>();
  const valueAnimated = useSharedValue(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getListRef = useCallback(() => {
    return listRef.current;
  }, []);

  const getRef = useCallback((id: any) => {
    return listRef.current ? listRef.current[id] : undefined;
  }, []);

  const setRef = useCallback((id: any, layoutRectangle: LayoutRectangle) => {
    listRef.current = {
      ...listRef.current,
      [id]: layoutRectangle,
    };
  }, []);

  return (
    <ZoomImageContext.Provider
      value={{
        data,
        valueAnimated,
        getListRef,
        getRef,
        setRef,
        currentIndex,
        setCurrentIndex,
        isOpenModal,
        setIsOpenModal,
      }}>
      {children}
      <ModalZoomListImage />
    </ZoomImageContext.Provider>
  );
};

export const useZoomImage = () => {
  const {
    getListRef,
    getRef,
    setRef,
    data,
    currentIndex,
    setCurrentIndex,
    isOpenModal,
    setIsOpenModal,
    valueAnimated,
  } = useContext(ZoomImageContext);
  return {
    getListRef,
    getRef: getRef,
    setRef: setRef,
    data: data,
    currentIndex,
    setCurrentIndex,
    isOpenModal,
    setIsOpenModal,
    valueAnimated,
  };
};
