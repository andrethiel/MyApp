import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){
    const [name, setname] = useState<string>();
    useEffect(() => {
        async function Username(){
            const user = await AsyncStorage.getItem("@Plant:user");
            setname(user || "");
        }
        Username();
    },[])
  return (
      <View style={styles.container}>
          <View>
          <Text style={styles.greeting}>Olá</Text>
          <Text style={styles.userName}>{name}</Text>
          </View>
          <Image source={{
              uri: "https://avatars.githubusercontent.com/u/43017985?s=400&u=faa4e159f3f968abde3cd73871992ab94b66bd79&v=4"
              }} style={styles.image}  />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,  
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
});