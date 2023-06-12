

import React from 'react';
import View from 'src/components/View';
import {ScrollView, Text, StyleSheet, View, FlatList} from 'react-native';
import {ZoomImageItem, ZoomImageProvider} from 'react-native-zoom-lightbox';

export const EXAMPLE_DATA = [
    {
      id: 0,
      source: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 1,
      source:
        'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.18169-1/11193438_402423169882782_2597021278587966343_n.jpg?stp=c0.4.80.80a_cp0_dst-jpg_p80x80&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ijzswzxrJ0wAX__ihZZ&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDyTQd2-V2elAOMQtv3hJgG5N_mV4Zarla-C6v5cXvqqQ&oe=64A67468',
    },
    {
      id: 2,
      source: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 3,
      source: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 4,
      source: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 5,
      source:
        'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.18169-1/11193438_402423169882782_2597021278587966343_n.jpg?stp=c0.4.80.80a_cp0_dst-jpg_p80x80&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ijzswzxrJ0wAX__ihZZ&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDyTQd2-V2elAOMQtv3hJgG5N_mV4Zarla-C6v5cXvqqQ&oe=64A67468',
    },
    {
      id: 6,
      source: 'https://reactnative.dev/img/tiny_logo.png',
    },
];

const Example = () => {
    return (
      
        // Flatlist example
    <ZoomImageProvider data={EXAMPLE_DATA}>
      <FlatList
        data={EXAMPLE_DATA}
        renderItem={({item, index}) => {
          return (
            <View mb={200} bg="transparent" key={item.id}>
              <ZoomImageItem
                style={styles.animatedContainer}
                source={{uri: item.source}}
                index={index}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      </ZoomImageProvider>

        //  ScrollView Example
//   <ZoomImageProvider data={EXAMPLE_DATA}>
//         <ScrollView>
//         <ZoomImageItem
//           source={{uri: EXAMPLE_DATA[0].source}}
//           index={EXAMPLE_DATA[0].index}
//           style={[styles.imageStyle, {marginBottom:20}]}
//         />
//         <Text>Text Example</Text>
//         <ZoomImageItem
//           source={{uri: EXAMPLE_DATA[1].source}}
//           index={EXAMPLE_DATA[1].index}
//           style={[styles.imageStyle, {marginBottom:20}]}
//         />
//   </ScrollView>
    // </ZoomImageProvider>
      
        //Single Image Example
    //   <View style={{flex:1}}>
    //   <ZoomImage
    //     style={{
    //       height: 200,
    //       width: 400,
    //       resizeMode: 'contain',
    //     }}
    //     source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
    //   />

    //   </View>

  );
};

export default Example;

const styles = StyleSheet.create({
  image1: {
    width: 200,
    aspectRatio: 1,
  },
  image2: {
    height: 300,
    width: 200,
    resizeMode: 'contain',
    marginLeft: 40,
    marginTop: 60,
  },
  text: {
    margin: 30,
  },
  animatedContainer: {
    height: 100,
    width: 150,
    resizeMode: 'contain',
  },
});
