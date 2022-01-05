import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MasonryList from './src/MasonryList';

const data = [
  {image: 'https://picsum.photos/id/10/200/300', text: 'ulalalal'},
  {image: 'https://picsum.photos/id/11/200/300', text: 'ololo'},
  {image: 'https://picsum.photos/id/12/200/300', text: 'ajhsdljasd'},
  {image: 'https://picsum.photos/id/13/200/300', text: 'olqoqoq'},
  {image: 'https://picsum.photos/id/14/200/300', text: 'papapala'},
  {image: 'https://picsum.photos/id/15/200/300', text: 'lorem'},
  {image: 'https://picsum.photos/id/16/200/300', text: 'ipsum'},
  {image: 'https://picsum.photos/id/17/200/300', text: 'dolor'},
  {image: 'https://picsum.photos/id/18/200/300', text: 'sit'},
  {image: 'https://picsum.photos/id/19/200/300', text: 'amet'},
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <MasonryList data={data} gap={14} numColumns={2} />
    </SafeAreaView>
  );
};

export default App;
