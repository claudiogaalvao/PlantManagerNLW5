import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Alert, Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { PlantProps, savePlant } from '../libs/storage';

import { Feather } from '@expo/vector-icons';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Params {
    plant: PlantProps;
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const navigation = useNavigation();
    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS === 'android') {
            setShowDatePicker(oldValue => !oldValue);
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldValue => !oldValue);
    }

    async function handleSave() {
        try {
            await savePlant({...plant, dateTimeNotification: selectedDateTime});

            navigation.navigate('Confirmation', { 
                title: 'Tudo certo', 
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });
        } catch (error) {
            return Alert.alert('Não foi possível salvar 😢');
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri 
                uri={plant.photo} 
                height={150} 
                width={150} />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image 
                    source={waterdrop} 
                    style={styles.tipImage} />

                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <View style={styles.alertContent}>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDatePicker && <DateTimePicker
                    value={selectedDateTime} 
                    mode="time" 
                    display="spinner" 
                    onChange={handleChangeTime} />}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDateTimePickerForAndroid}>
                                <Text style={styles.dateTimePickerLabel}>
                                    Lembrete agendado para
                                </Text>
                                <Text style={styles.dateTimePickerHour}>
                                    {format(selectedDateTime, 'HH:mm')}
                                </Text>                       
                            </TouchableOpacity>
                        )
                    }
                </View>

                <Button title="Confirmar alterações" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        color: colors.shape
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
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
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
        alignSelf: 'center',
        position: 'absolute',
        width: Dimensions.get('window').width - 60,
        top: -60,
        zIndex: 3
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertContent: {
        paddingTop: 70
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: 'auto',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 30,
        backgroundColor: colors.shape,
        borderRadius: 15,
        marginVertical: 25
    },
    dateTimePickerLabel: {
        color: colors.heading,
        fontSize: 12,
        fontFamily: fonts.text
    },
    dateTimePickerWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateTimePickerHour: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});