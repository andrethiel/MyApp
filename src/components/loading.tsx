import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Animation from '../assets/load.json';
import colors from '../styles/colors';

export function Loading(){
  return <View style={styles.container}>
      <LottieView source={Animation}
      autoPlay
      loop
      style={styles.animation}/>
      {/* <Text style={styles.text}>Carregando suas plantas...</Text> */}
  </View>;
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation:{
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    },
    text:{
        margin: 15,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.green_dark,
    }
    
})