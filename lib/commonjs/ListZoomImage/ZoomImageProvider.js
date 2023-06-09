"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useZoomImage = exports.ZoomImageProvider = exports.ZoomImageContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _Modal = _interopRequireDefault(require("./Modal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
const ZoomImageContext = /*#__PURE__*/_react.default.createContext(initData);
exports.ZoomImageContext = ZoomImageContext;
const ZoomImageProvider = _ref => {
  let {
    children,
    data
  } = _ref;
  const listRef = (0, _react.useRef)();
  const valueAnimated = (0, _reactNativeReanimated.useSharedValue)(0);
  const [currentIndex, setCurrentIndex] = (0, _react.useState)(0);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const getListRef = (0, _react.useCallback)(() => {
    return listRef.current;
  }, []);
  const getRef = (0, _react.useCallback)(id => {
    return listRef.current ? listRef.current[id] : undefined;
  }, []);
  const setRef = (0, _react.useCallback)((id, layoutRectangle) => {
    listRef.current = {
      ...listRef.current,
      [id]: layoutRectangle
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(ZoomImageContext.Provider, {
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
  }, children, /*#__PURE__*/_react.default.createElement(_Modal.default, null));
};
exports.ZoomImageProvider = ZoomImageProvider;
const useZoomImage = () => {
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
  } = (0, _react.useContext)(ZoomImageContext);
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
exports.useZoomImage = useZoomImage;
//# sourceMappingURL=ZoomImageProvider.js.map