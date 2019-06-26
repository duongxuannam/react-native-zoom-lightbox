import React, { Component } from 'react';
import {
  View, Text,
  Animated,
  TouchableWithoutFeedback,
  PanResponder, Image,
  ScrollView, Modal,
  StyleSheet,Dimensions,
} from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';

import PropTypes from 'prop-types';

const ANIM_CONFIG = { duration: 200 };
const { width, height } = Dimensions.get('window');

export default function (WrappedComponent) {
  return class extends Component {
        static propTypes = {
          uri: PropTypes.string,
        }
        static defaultProps = {
          uri: 'https://avatars0.githubusercontent.com/u/31804215?s=40&u=e062af680bf255b696606270b8cbd23465dac616&v=4',
        }
        constructor(props) {
          super(props);
          this.myWrapper = React.createRef();
          this.state = {
            index: 0,
            origin: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
            target: {
              x: 0,
              y: 0,
              opacity: 1,
            },
            fullscreen: false,
            animating: false,
            panning: false,
            selectedImageHidden: false,
            slidesDown: false,
          };
          this.openAnim = new Animated.Value(0);
          this.pan = new Animated.Value(0);

          this.carouselItems = {};

          this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => !this.state.animating,
            onStartShouldSetPanResponderCapture: () => !this.state.animating,
            onMoveShouldSetPanResponder: () => !this.state.animating,
            onMoveShouldSetPanResponderCapture: () => !this.state.animating,
            onPanResponderTerminationRequest: () => true,
            onPanResponderMove: (evt, gestureState) => {
              this.pan.setValue(gestureState.dy);

              if (Math.abs(gestureState.dy) > 15 && !this.state.panning) {
                this.pan.setValue(0);
                this.setState({ panning: true });
              }
            },
            onPanResponderRelease: this.handlePanEnd,
            onPanResponderTerminate: this.handlePanEnd,
          });
        }

        animateOpenAnimToValue = (toValue, onComplete) => (
          Animated.timing(this.openAnim, {
            ...ANIM_CONFIG,
            toValue,
          }).start(() => {
            this.setState({ animating: false });
            if (onComplete) {
              onComplete();
            }
          })
        )
        open = (index) => () => {
          const activeComponent = this.carouselItems[index].carouselItems[index];
          activeComponent.measure((rx, ry, width, height, x, y) => {
            this.setState(
              {
                fullscreen: true,
                animating: true,
                origin: { x, y, width, height },
                target: { x: 0, y: 0, opacity: 1 },
                index: index,
              },
              () => {
                this.animateOpenAnimToValue(1);
              }
            );
          });
        }

        close = () => {
          this.setState({ animating: true });
          this.carouselItems[this.state.index].carouselItems[this.state.index].measure((rx, ry, width, height, x, y) => {
            this.setState({
              origin: { x, y, width, height },
              slidesDown: x + width < 0 || x > width,
            });

            this.animateOpenAnimToValue(0, () => {
              this.setState({
                fullscreen: false,
                selectedImageHidden: false,
                slidesDown: false,
              });
            });
          });
        }
        handlePanEnd = (evt, gestureState) => {
          if (Math.abs(gestureState.dy) > 50) {
            this.setState({
              panning: false,
              target: {
                x: gestureState.dx,
                y: gestureState.dy,
                opacity: 1 - Math.abs(gestureState.dy / height),
              },
            });
            this.close();
          } else {
            Animated.timing(this.pan, {
              toValue: 0,
              ...ANIM_CONFIG,
            }).start(() => this.setState({ panning: false }));
          }
        }

        getFullscreenOpacity = () => {
          const { panning, target } = this.state;

          return {
            opacity: panning
              ? this.pan.interpolate({
                inputRange: [-height, 0, height],
                outputRange: [0, 1, 0],
              })
              : this.openAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, target.opacity],
              }),
          };
        };
        captureCarouselItem = (ref, idx) => {
          this.carouselItems[idx] = ref;
        }
        handleModalShow = () => {
          const { animating, selectedImageHidden } = this.state;

          if (!selectedImageHidden && animating) {
            this.setState({ selectedImageHidden: true });
          }
        }
        getSwipeableStyle = () => {
          const { fullscreen, origin, slidesDown, target } = this.state;

          if (!fullscreen) {
            return { flex: 1 };
          }

          const inputRange = [0, 1];

          return !slidesDown
            ? {
              left: this.openAnim.interpolate({
                inputRange,
                outputRange: [origin.x, target.x],
              }),
              top: this.openAnim.interpolate({
                inputRange,
                outputRange: [origin.y, target.y],
              }),
              width: this.openAnim.interpolate({
                inputRange,
                outputRange: [origin.width, width],
              }),
              height: this.openAnim.interpolate({
                inputRange,
                outputRange: [origin.height, height],
              }),
            }
            : {
              left: 0,
              right: 0,
              height,
              top: this.openAnim.interpolate({
                inputRange,
                outputRange: [height, target.y],
              }),
            };
        };

        renderDefaultHeader = () => (
          <TouchableWithoutFeedback onPress={this.close}>
            <View>
              <Text style={{
                color: 'white',
                textAlign: 'right',
                padding: 10,
                margin: 30,
              }}>Close</Text>
            </View>
          </TouchableWithoutFeedback>
        )

        renderFullscreenContent = (url,index) => () => {
          const { panning } = this.state;
          const containerStyle = [
            this.getSwipeableStyle(),
            panning && { top: this.pan },
          ];
          return (
            <Animated.View style={containerStyle} key={index}>
              <ScrollView
                ref={ref => {
                  if (ref) {
                    ref.scrollResponderHandleStartShouldSetResponder = () => true;
                  }
                }}
                contentContainerStyle={{ flex: 1 }}
                maximumZoomScale={2}
                alwaysBounceVertical={false}
              >
                <Image
                  source={{ uri: url }}
                  style={[{ flex: 1 }, { resizeMode: 'contain' }]}
                  {...this.panResponder.panHandlers}
                />
              </ScrollView>
            </Animated.View>
          );
        }
        renderFullscreen = () => {
          const { animating, panning, fullscreen } = this.state;
          const opacity = this.getFullscreenOpacity();
          const images = this.myWrapper.current.state.arrayImages;
          return (
            <Modal
              transparent
              visible={fullscreen}
              onShow={this.handleModalShow}
              onRequestClose={this.close}
            >
              <Animated.View style={[{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'black',
              }, opacity]} />
              <SwipeableViews
                disabled={animating || panning}
                index={this.state.index}
                onChangeIndex={(index) => {
                  this.setState({
                    index,
                  });
                }}
              >

                {
                  images.map((item, index) => {
                    return this.renderFullscreenContent(item.url, index)();
                  })
                }

                {/* {this.renderFullscreenContent(uri)()} */}
              </SwipeableViews>
              <Animated.View style={[opacity, {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }]}>
                {this.renderDefaultHeader()}
              </Animated.View>
            </Modal>
          );
        }
        render() {
          const {
            fullscreen,
            selectedImageHidden,
            index,
          } = this.state;
          //   const { indexState } = index;
          const getOpacity = () => ({
            opacity: selectedImageHidden ? 0 : 1,
          });
          return (
            <View>
              <WrappedComponent 
                ref={this.myWrapper} 
                {...this.props}
                open={this.open}
                indexState={index}
                getOpacity={getOpacity}
                captureCarouselItem={this.captureCarouselItem}
              />
              {fullscreen && this.renderFullscreen()}
            </View >
          );
        }
  };
}