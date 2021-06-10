import React, { useState } from 'react';
import {View, ToastAndroid, SafeAreaView, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Button } from '../components/Button';
import colors from '../styles/colors'
import fonts from '../styles/fonts';
import {useNavigation} from '@react-navigation/core';
import AsyncStore from '@react-native-async-storage/async-storage'

export function User() {

    const [isFocus, setFocus] = useState(false);
    const [isFilled, setFilled] = useState(false);
    const [Name, setName] = useState<string>();
    const navigation = useNavigation();


    function handleInputblur(){
        setFocus(false);
        setFilled(!!Name);
    }
    function handleInputfocus(){
        setFocus(true);
    }
    function handleChange(value: string){
        setFilled(!!value);
        setName(value);
    }

    async function handleSubmit(){
        if(!Name)
            return ToastAndroid.showWithGravityAndOffset(
                "Digite seu nome para começar",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50);
        const nameCapitalized = Name[0].toLocaleUpperCase() + Name.substr(1);
        await AsyncStore.setItem("@Plant:user", nameCapitalized);

        navigation.navigate("Confirma")
    }

  return( 
      <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding': 'height'} style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
              <View style={styles.form}>
                  <View style={styles.header}>
                <Text style={styles.emoji}>
                    {isFilled ? '😆' : '🙂'}
                </Text>
                <Text style={styles.title}>
                    Como podemos {'\n'}
                    chamar você?
                                </Text>
                                </View>
                <TextInput style={[
                    styles.input,
                    (isFocus || isFilled) && {borderColor: colors.green}                   
                ]} placeholder="Digite seu nome" 
                onBlur={handleInputblur} 
                onFocus={handleInputfocus}
                onChangeText={handleChange}
                 />
                <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
                </View>
                
              </View>
              
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
      </SafeAreaView>
   );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        width: '100%',
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
});