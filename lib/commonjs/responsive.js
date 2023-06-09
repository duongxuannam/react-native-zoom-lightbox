"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widthPercentageToDP = exports.screenWidth = exports.screenHeight = exports.responsiveWidth = exports.responsiveHeight = exports.heightPercentageToDP = void 0;
var _reactNative = require("react-native");
// Retrieve initial screen's width
const screenWidth = _reactNative.Dimensions.get('window').width;

// Retrieve initial screen's height
exports.screenWidth = screenWidth;
const screenHeight = _reactNative.Dimensions.get('window').height;

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
exports.screenHeight = screenHeight;
const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return _reactNative.PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
exports.widthPercentageToDP = widthPercentageToDP;
const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return _reactNative.PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
// const listenOrientationChange = that => {
//   Dimensions.addEventListener('change', newDimensions => {
//     // Retrieve and save new dimensions
//     screenWidth = newDimensions.window.width;
//     screenHeight = newDimensions.window.height;

//     // Trigger screen's rerender with a state update of the orientation variable
//     that.setState({
//       orientation: screenWidth < screenHeight ? 'portrait' : 'landscape',
//     });
//   });
// };

// /**
//  * Wrapper function that removes orientation change listener and should be invoked in
//  * componentWillUnmount lifecycle method of every class component (UI screen) that
//  * listenOrientationChange function has been invoked. This should be done in order to
//  * avoid adding new listeners every time the same component is re-mounted.
//  */
// const removeOrientationListener = () => {
//   Dimensions.removeEventListener('change', () => {});
// };

// export {
//   widthPercentageToDP,
//   heightPercentageToDP,
//   //   listenOrientationChange,
//   //   removeOrientationListener,
// };
exports.heightPercentageToDP = heightPercentageToDP;
const STANDARD_WINDOW = {
  width: 375,
  height: 812
}; // iphone 6

const responsiveWidth = size => screenWidth / STANDARD_WINDOW.width * size;
exports.responsiveWidth = responsiveWidth;
const responsiveHeight = size => screenHeight / STANDARD_WINDOW.height * size;
exports.responsiveHeight = responsiveHeight;
//# sourceMappingURL=responsive.js.map