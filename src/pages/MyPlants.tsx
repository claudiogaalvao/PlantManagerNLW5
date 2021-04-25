import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Header } from '../components/Header';
import { loadPlants, PlantProps } from '../libs/storage';
import colors from '../styles/colors';

import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    useEffect(() => {
        async function loadStorateData() {
            const plantsStorage = await loadPlants();

            const nextTime = formatDistance(
                new Date(plantsStorage[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStorage[0].name} daqui ${nextTime}.`
            );
            setMyPlants(plantsStorage);
            setLoading(false);
        }

        loadStorateData();
    }, []);

    return(
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterdrop} style={styles.spotlightImage} />

                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regas
                </Text>

                <FlatList 
                data={myPlants} 
                keyExtractor={(item) => String(item.id)} 
                renderItem={({ item }) => (
                    <PlantCardSecondary
                    data={item} />
                )} 
                contentContainerStyle={styles.myPlantsList} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    },
    myPlantsList: {
        flex: 1
    }
});