export declare const screenWidth: number;
export declare const screenHeight: number;
/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
export declare const widthPercentageToDP: (widthPercent: string | number) => number;
/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
export declare const heightPercentageToDP: (heightPercent: string | number) => number;
export declare const responsiveWidth: (size: number) => number;
export declare const responsiveHeight: (size: number) => number;
//# sourceMappingURL=responsive.d.ts.map