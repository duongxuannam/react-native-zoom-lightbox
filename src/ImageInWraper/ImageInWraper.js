import React, { PureComponent } from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import ImageCustom from '../ImageCustom';

export default class ImageInWraper extends PureComponent {

  static propTypes = {
    open: PropTypes.func,
    getOpacity:PropTypes.func,
    index: PropTypes.number,
    captureCarouselItem:PropTypes.func,
    url:PropTypes.string,
    indexState:PropTypes.number,
    style:PropTypes.object,
  }

 
 

  render() {
    const { open,
      getOpacity,
      index,
      url,
      captureCarouselItem,
      indexState,
      style,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={open(index)} >
        <View style={indexState === index ? getOpacity() : null}>
          <ImageCustom
            url={url}
            style={[{ resizeMode: 'cover', height: 200, width: 200, borderRadius: 8 },style]}
            ref={ref => captureCarouselItem(ref, index)}
            index={index}
          />
        </View>
      </TouchableWithoutFeedback>

    );
  }
}