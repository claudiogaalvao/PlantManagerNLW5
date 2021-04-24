import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[];
    frequency: {
        times: number;
        repeat_every: string;
    }
}

export function PlantSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);

    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [plantsFiltered, setPlantsFiltered] = useState<PlantProps[]>([]);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment);

        if(environment === 'all') {
            setPlantsFiltered(plants);
            return;
        }

        const filtered = plants.filter((plant) => 
            plant.environments.includes(environment)
        );
        setPlantsFiltered(filtered);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1) {
            return;
        }
        
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        
        if(!data) {
            setLoading(true);
            return;
        }

        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data);
            setPlantsFiltered(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([{ key: 'all', title: 'Todos'}, ...data]);
        }

        fetchEnvironment();
    }, []);

    console.log(page);

    useEffect(() => {
        fetchPlants();
    }, []);

    if(loading) {
        return <Load />
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                data={environments}
                renderItem={({ item }) => (
                    <EnvironmentButton
                    key={item.key}
                    title={item.title}
                    isActive={item.key === environmentSelected}
                    onPress={() => handleEnvironmentSelected(item.key)} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.environmentList} />
            </View>

            <View style={styles.plants}>
                <FlatList
                data={plantsFiltered}
                renderItem={({ item }) => (
                    <PlantCardPrimary
                    data={item} />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}
                onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                ListFooterComponent={
                    loadingMore ? <ActivityIndicator color={colors.green} /> : <></>} />
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
        padding: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        marginLeft: 32,
        marginBottom: 30
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
});