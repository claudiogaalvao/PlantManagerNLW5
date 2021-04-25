import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View, Text, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlants, PlantProps, removePlant } from '../libs/storage';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { ModalDeletePlant } from '../components/ModalDeletePlant';

import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/waterdrop.png';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();
    const [plantSelected, setPlantSelected] = useState<PlantProps>(myPlants[0]);
    const [showModal, setShowModal] = useState(false);

    function handleSwipeClickRemove(plant: PlantProps) {
        setPlantSelected(plant);
        setShowModal(true);
        // Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
        //     {
        //         text: 'Não',
        //         style: 'cancel'
        //     },
        //     {
        //         text: 'Sim',
        //         onPress: async () => {
        //             try {
        //                 await removePlant(String(plant.id));

        //                 setMyPlants(oldData => oldData.filter((item) => item.id !== plant.id));
        //             } catch (error) {
        //                 Alert.alert('Não foi possível remover! 😢');
        //             }
        //         }
        //     }
        // ]);
    }

    async function handleRemovePlant(plant: PlantProps) {
        try {
            await removePlant(String(plant.id));

            setMyPlants(oldData => oldData.filter((item) => item.id !== plant.id));
            setShowModal(false);
        } catch (error) {
            Alert.alert('Não foi possível remover! 😢');
        }
    }

    function handleCancelRemovePlant() {
        setShowModal(false);
    }

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
            setPlantSelected(plantsStorage[0]);
            setLoading(false);
        }

        loadStorateData();
    }, []);

    if(loading) {
        return <Load />
    }

    return(
        <>
            <View style={styles.container}>
                <Header firstWord="Minhas" secondWord="Plantinhas" />

                <View style={styles.spotlight}>
                    <Image source={waterdrop} style={styles.spotlightImage} />

                    <Text style={styles.spotlightText}>
                        {nextWatered}
                    </Text>
                </View>

                <View style={styles.plants}>
                    <Text style={styles.plantsTitle}>
                        Próximas regadas
                    </Text>

                    <FlatList 
                    data={myPlants} 
                    keyExtractor={(item) => String(item.id)} 
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                        data={item}
                        handleRemove={() => handleSwipeClickRemove(item)} />
                    )} 
                    contentContainerStyle={styles.myPlantsList} />
                </View>
            </View>

            <ModalDeletePlant 
            plant={plantSelected} 
            isOpen={showModal}
            handleCancel={handleCancelRemovePlant} 
            handleRemovePlant={handleRemovePlant} />
        </>
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