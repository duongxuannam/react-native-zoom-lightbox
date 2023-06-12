
# react-native-zoom-lightbox

## Demo 

### iOS

![](https://media.giphy.com/media/j5Pjmn8svN4P7SVP8f/giphy.gif)
### Android

![](https://media.giphy.com/media/fS54tItV4GUM4Fq488/giphy.gif)

## Getting started

  A new version support typescript, latest RN, using react-native-reanimated, react-native-gesture-handle to run animation in UI thread (make sure installed 2 library before install this library)

  If you want to use old version use HOC. It's on branch [old-version](https://github.com/duongxuannam/react-native-zoom-lightbox/tree/old-version) 

`$ yarn add react-native-zoom-lightbox`


## Usage
### Single Image

```javascript
import {ZoomImage} from 'react-native-zoom-lightbox';

      <ZoomImage
        style={{
          height: 200,
          width: 400,
          resizeMode: 'contain',
        }}
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      />
```

##### Properties

Just use Props of base [Image](https://reactnative.dev/docs/image#props) from React Native component

  ### List Image

You need to wrap your container with a provider named ZoomImageProvider and provide data list image and make sure item have property named: "source" then use ZoomImageItem inside for show image ([see example](https://github.com/duongxuannam/react-native-zoom-lightbox/blob/master/Examples/index.js))


Item of list must be have 2 properties: <b>source</b> and <b>index</b> (to same with index beside list).
```javascript
export const EXAMPLE_DATA = [
  {
    index: 0,
    source: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    index: 1,
    source:
      'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.18169-1/11193438_402423169882782_2597021278587966343_n.jpg?stp=c0.4.80.80a_cp0_dst-jpg_p80x80&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ijzswzxrJ0wAX__ihZZ&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfDyTQd2-V2elAOMQtv3hJgG5N_mV4Zarla-C6v5cXvqqQ&oe=64A67468',
  },
  {
    index: 2,
    source: 'https://reactnative.dev/img/tiny_logo.png',
  },
  ...
]
```

##### Usage

```javascript
const Example = () => {
  return (
    <ZoomImageProvider data={EXAMPLE_DATA}>
      <FlatList
        data={EXAMPLE_DATA}
        renderItem={({item, index}) => {
          return (
            <View style={styles.imageContainer} bg="transparent" key={item.id}>
              <ZoomImageItem
                style={styles.imageStyle}
                source={{uri: item.source}}
                index={index}
              />
            </View>
          );
        }}
        keyExtractor={(item: any) => item.id}
      />
    </ZoomImageProvider>
  );
};
```
or
```javascript
    <ZoomImageProvider data={EXAMPLE_DATA}>
        <ScrollView>
            <ZoomImageItem
              source={{uri: EXAMPLE_DATA[0].source}}
              index={EXAMPLE_DATA[0].index}
              style={[styles.imageStyle, {marginBottom:20}]}
            />
            <Text>Text Example</Text>
            <ZoomImageItem
              source={{uri: EXAMPLE_DATA[1].source}}
              index={EXAMPLE_DATA[1].index}
              style={[styles.imageStyle, {marginBottom:20}]}
            />
        </ScrollView>
    </ZoomImageProvider>

```

##### Properties

ZoomImageProvider Props

| Prop   | Type  | Required | Description |
| :------------ |:---------------:| :---------------:| :-----|
| data | array [ ] | yes | Item of list must be have 2 properties: <b>source</b> and <b>index</b> (to same with index outside list) |

ZoomImageItem Props

| Prop   | Type  | Required | Description |
| :------------ |:---------------:| :---------------:| :-----|
| index | `number` | yes | It's must be same with id each item provided in ZoomImageProvider |
| ...props | [Image Props](https://reactnative.dev/docs/image#props) |  | Image props from base react native component |


 [Example](https://github.com/duongxuannam/react-native-zoom-lightbox/blob/master/Examples/index.js)




