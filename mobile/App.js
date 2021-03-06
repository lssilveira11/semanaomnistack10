import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </>
  )
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Hello Omnistack!</Text>
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#7159c1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }, 
//   title: {
//     fontWeight: 'bold',
//     fontSize: 32,
//     color: '#FFF'
//   },
// });
