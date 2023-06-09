import React, { useCallback, useContext, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import ModalZoomListImage from './Modal';
const initData = {
  data: [],
  getListRef: () => undefined,
  getRef: () => undefined,
  setRef: () => {},
  currentIndex: 0,
  setCurrentIndex: number => {
    console.log(number);
  },
  isOpenModal: false,
  setIsOpenModal: value => {
    console.log(value);
  },
  valueAnimated: 0
};
export const ZoomImageContext = /*#__PURE__*/React.createContext(initData);
export const ZoomImageProvider = _ref => {
  let {
    children,
    data
  } = _ref;
  const listRef = useRef();
  const valueAnimated = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const getListRef = useCallback(() => {
    return listRef.current;
  }, []);
  const getRef = useCallback(id => {
    return listRef.current ? listRef.current[id] : undefined;
  }, []);
  const setRef = useCallback((id, layoutRectangle) => {
    listRef.current = {
      ...listRef.current,
      [id]: layoutRectangle
    };
  }, []);
  return /*#__PURE__*/React.createElement(ZoomImageContext.Provider, {
    value: {
      data,
      valueAnimated,
      getListRef,
      getRef,
      setRef,
      currentIndex,
      setCurrentIndex,
      isOpenModal,
      setIsOpenModal
    }
  }, children, /*#__PURE__*/React.createElement(ModalZoomListImage, null));
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
    valueAnimated
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
    valueAnimated
  };
};
//# sourceMappingURL=ZoomImageProvider.js.map