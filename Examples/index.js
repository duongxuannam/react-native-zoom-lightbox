import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { wrapperZoomImages, ImageInWraper } from 'react-native-zoom-lightbox';

class ImageZoom extends PureComponent {

  static propTypes = {
    getOpacity: PropTypes.func,
    captureCarouselItem: PropTypes.func,
    indexState: PropTypes.number,
    open: PropTypes.func,

  }

  constructor(props) {
    super(props);
    this.state = {
      arrayImages: [
        {
          url: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-1/c50.0.400.400a/s240x240/11193438_402423169882782_2597021278587966343_n.jpg?_nc_cat=108&_nc_eui2=AeFzJn_9ORiZcmIC1GjuEEt8Fj6tz1Eer9fQ-5ox4s8MIT7SaIumEFjNlzancQOp2gmogtTR-bBOy2ZYtBk5dFAenlBF60lrj-3kRCNu6oS1Ug&_nc_oc=AQls3FFvIJc6ay665iAgA4x64nWq5rZQ4G50Txdx7_qFuNsIypnzVJEvonkEH5i8b2WRIEfao4I6NJxw6Qxttn1H&_nc_ht=scontent.fsgn2-3.fna&oh=b2c0c6b96c42edee86dc8afad40ceb9e&oe=5D9E67DC',
        },
        { url: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-1/c0.0.200.200a/p200x200/10371987_104877906510682_4850663589642953939_n.jpg?_nc_cat=100&_nc_eui2=AeGckVWfk6mWQe44jfumMT83RrotTAg5yGsQn_nGmUSCfRo5dXpwU7v6JT_T_7Lyvs9130UqvRwWYD0CnRvOdvSibnJ_bg2PcR2bL_obVJD2Xg&_nc_oc=AQn5HMCGXPGlSlCZM2YwtdSs4Pu8XAe5FThoCQVHyzU-5v3L-17UwTb4xjI1srkmans&_nc_ht=scontent.fsgn4-1.fna&oh=c6af33a020fd08a8a095a2faeb02ac0c&oe=5D54715B' }],
    };
  }

  render() {
    const { getOpacity, captureCarouselItem, indexState, open } = this.props;
    const { arrayImages } = this.state;
    return (
      <View style={{ alignItems: 'center' }}>
        {
          arrayImages.map((item, index) =>
            <ImageInWraper
              key={index}
              open={open}
              indexState={indexState}
              getOpacity={getOpacity}
              captureCarouselItem={captureCarouselItem}
              index={index}
              url={item.url}
              style={{ marginBottom: 20 }}
            />
          )
        }
      </View>

    );
  }
}

export default wrapperZoomImages(ImageZoom);

