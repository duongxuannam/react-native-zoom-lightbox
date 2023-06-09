"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = exports.OFFSET_CLOSE = exports.EXAMPLE_DATA = exports.DEFAULT_IMAGE = void 0;
var _responsive = require("./responsive");
const OFFSET_CLOSE = (0, _responsive.responsiveHeight)(200);
exports.OFFSET_CLOSE = OFFSET_CLOSE;
const DEFAULT_IMAGE = 'https://reactnative.dev/img/tiny_logo.png';
exports.DEFAULT_IMAGE = DEFAULT_IMAGE;
const EXAMPLE_DATA = [{
  id: 0,
  source: DEFAULT_IMAGE
}, {
  id: 1,
  source: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.18169-1/11193438_402423169882782_2597021278587966343_n.jpg?stp=c0.4.80.80a_cp0_dst-jpg_p80x80&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ijzswzxrJ0wAX__ihZZ&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDyTQd2-V2elAOMQtv3hJgG5N_mV4Zarla-C6v5cXvqqQ&oe=64A67468'
}, {
  id: 2,
  source: DEFAULT_IMAGE
}, {
  id: 3,
  source: DEFAULT_IMAGE
}, {
  id: 4,
  source: DEFAULT_IMAGE
}, {
  id: 5,
  source: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.18169-1/11193438_402423169882782_2597021278587966343_n.jpg?stp=c0.4.80.80a_cp0_dst-jpg_p80x80&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ijzswzxrJ0wAX__ihZZ&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDyTQd2-V2elAOMQtv3hJgG5N_mV4Zarla-C6v5cXvqqQ&oe=64A67468'
}, {
  id: 6,
  source: DEFAULT_IMAGE
}, {
  id: 7,
  source: DEFAULT_IMAGE
}];
exports.EXAMPLE_DATA = EXAMPLE_DATA;
const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
exports.delay = delay;
//# sourceMappingURL=constants.js.map