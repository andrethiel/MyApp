import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Platform, TouchableOpacity} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {SvgFromUri} from 'react-native-svg'
import water from '../assets/waterdrop.png';
import { Button } from '../components/Button';

export function Salvar () {
  return (
      <>
      <View style={styles.container}>
        <SvgFromUri 
        uri=""
        width={150}
        height={150} />
        <Text style={styles.plantName}>
            Nome da planta
        </Text>
        <Text style={styles.plantAbout}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur harum cupiditate recusandae dolor officiis placeat. Illo, porro totam possimus repudiandae obcaecati provident iure explicabo, voluptatem beatae sapiente assumenda voluptatum impedit!
        </Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
            <Image source={water}
            style={styles.tipImage} />
            <Text style={styles.tipText}>
                Lorem ipsum dolor sit, amet
            </Text>
        </View>
        <Text style={styles.alertLabel}>
            Escolha o melhor horario
        </Text>

        <Button title="Cadastrar Planta" onPress={() => {}} />


      </View>
      </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    scrollListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
      },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});