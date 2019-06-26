
# react-native-zoom-lightbox

## Demo 

### iOS

![](https://media.giphy.com/media/j5Pjmn8svN4P7SVP8f/giphy.gif)
### Android

![](https://media.giphy.com/media/fS54tItV4GUM4Fq488/giphy.gif)

## Getting started

`$ npm install react-native-zoom-lightbox --save`


## Usage
### SingleImage

```javascript
import {SingleImage} from 'react-native-zoom-lightbox';

<SingleImage 
uri='https://avatars2.githubusercontent.com/u/31804215?s=40&v=4'
style={{}} />
```

##### Properties


| Prop   | Type  | Description |
| :------------ |:---------------:| :-----|
| uri  | `string` | Url of image |
| style  | `object` | Style of Image component |
  
  ### List Image

You need to wrap your container with a HOC named wrapperZoomImages to get the required props ([see example](https://github.com/duongxuannam/react-native-zoom-lightbox/blob/master/Examples/index.js).
```javascript
import {wrapperZoomImages,ImageInWraper } from 'react-native-zoom-lightbox'

export default wrapperZoomImages(YourContainer);
```

Array of images must be saved at state named arrayImages.
```javascript
  constructor(props){
    super(props);
    this.state={
      arrayImages : [
        {url:'example',
        },
        {url:'example' }],
    };
  }
```

```javascript
   const {getOpacity,captureCarouselItem,indexState,open} = this.props;
   const {arrayImages} = this.state;
```
##### Usage

```javascript
   <View style={{ flex:1,alignItems:'center' }}>
        {
          this.state.arrayImages.map((item,index) => 
            <ImageInWraper
            open={open}
            indexState={indexState}
            getOpacity={getOpacity}
            captureCarouselItem={captureCarouselItem}
            index={index}
            url={item.url}
            style={{marginBottom:20}}
            />
          )
        }
      </View>
```
or
```javascript
     <View style={{ flex:1,alignItems:'center' }}>
        
            <ImageInWraper
            open={open}
            indexState={indexState}
            getOpacity={getOpacity}
            captureCarouselItem={captureCarouselItem}
            index={0}
            url={this.state.arrayImages[0].url}
            style={{marginBottom:20}}
            />
          
            <Text>Example</Text>

            <ImageInWraper
            open={open}
            indexState={indexState}
            getOpacity={getOpacity}
            captureCarouselItem={captureCarouselItem}
            index={1}
            url={this.state.arrayImages[1].url}
            style={{marginBottom:20}}
            />
      </View>
```

##### Properties
ImageInWraper

| Prop   | Type  | Required | Description |
| :------------ |:---------------:| :---------------:| :-----|
| uri | `string` | yes | Url of image |
| style | `object` | no | Style of Image component |
| index | `number` | yes | Index of Image |
| captureCarouselItem | `func` | yes | Props received from HOC |
| getOpacity | `func` | yes | Props received from HOC |
| indexState | `number` | yes | Props received from HOC |
| open | `string` | yes | Props received from HOC | 

 [Example](https://github.com/duongxuannam/react-native-zoom-lightbox/blob/master/Examples/index.js)




