import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Header} from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import {CardPrimary} from '../components/CardPrimary'
import api from '../server/api';
import {Loading} from '../components/loading';
import { useNavigation } from '@react-navigation/core';

interface LocalProps{
    key: string;
    title: string;
}

interface PlatasProps{
    id: Number;
    name: string;
    about: string;
    water: string;
    photo: string;
    environments: [string];
    frequency:{
        times: number;
        repeat_every: string;
    }
}

export function SelectPlantas() {

    const [ListLocal, setListLocal] = useState<LocalProps[]>([]);
    const [Plantas, setPlantas] = useState<PlatasProps[]>([]);
    const [filterplantas, setfilterplantas] = useState<PlatasProps[]>([]);
    const [select, setSelect] = useState('all');
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [loadingMore, setloadingMore] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        async function fetchLocal() {
            const { data } = await api.get('/plants_environments?_sort=title&_order=asc');
            setListLocal([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }
        fetchLocal();
    },[])
    async function fetchPlantas() {
        const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        if(!data)
            return setloading(true);
        
        if(page > 1){
            setPlantas(oldValue => [... oldValue, ...data])
            setfilterplantas(oldValue => [... oldValue, ...data])
        }else{
            setfilterplantas(data);
            setPlantas(data);
            
        }
        setloading(false);
        setloadingMore(false);
    }
    useEffect(() => {
        
        fetchPlantas();
    },[])

    function handlerSelect(environments: string){
        setSelect(environments);
        if(environments === "all")
           return setfilterplantas(Plantas);
            console.log(Plantas);
            

            const filter = Plantas.filter(item => item.environments.includes(environments));
            setfilterplantas(filter);
    }

    function handlefetchMore(distance: number){
        if(distance < 1){
            return;
        }

        setloadingMore(true);
        setpage(old => old + 1);
        fetchPlantas();
    }

    function  handlerPlantSelect(item: PlatasProps) {
        navigation.navigate('Salvar', {item})
    }


    if(loading)
        return <Loading />

  return (
  <View style={styles.container}>
      <View style={styles.header}>
    <Header />
    <Text style={styles.title}>Em qual Ambiente</Text>
    <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
    </View>
    <View>
        <FlatList data={ListLocal}
        renderItem={({item}) => <EnviromentButton title={item.title} active={item.key === select} 
        onPress={() => handlerSelect(item.key)} /> } horizontal
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.enviromentList}
        keyExtractor={(item) => String(item.key)}/>
    </View>
    <View style={styles.plants}>
        <FlatList data={filterplantas}
        renderItem={({item}) => (<CardPrimary data={item} onPress={() => handlerPlantSelect(item)} />)} numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={({distanceFromEnd}) => handlefetchMore(distanceFromEnd)} 
        ListFooterComponent={ loadingMore ? <ActivityIndicator color={colors.green}/> :null}
        keyExtractor={(item) => String(item.id)}/>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
        paddingRight: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
});