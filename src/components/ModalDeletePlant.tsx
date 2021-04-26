import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import ModalBox from 'react-native-modalbox';
import { PlantProps } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ModalProps {
    plant: PlantProps;
    showModal: boolean;
    handleRemove: (plant: PlantProps) => void;
    handleCancel: () => void;
}

const { height } = Dimensions.get('window');

export function ModalDeletePlant({ plant, showModal, handleRemove, handleCancel }: ModalProps) {
    const [state, setState] = useState({
        opacity: new Animated.Value(0),
        container: new Animated.Value(height),
        modal: new Animated.Value(height)
    });

    const openModal = () => {
        Animated.sequence([
            Animated.timing(state.container, { toValue: 0, duration: 50, useNativeDriver: true }),
            Animated.timing(state.opacity, { toValue: 1, duration: 50, useNativeDriver: true }),
            Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
        ]).start();
    }
    
    const closeModal = () => {
        Animated.sequence([
            Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
            Animated.timing(state.opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: true })
        ]).start();
    }

    useEffect(() => {
        if(showModal) {
            openModal()
        } else {
            closeModal()
        }
    }, [showModal])
    
    return(
        <Animated.View 
        style={[styles.container, {
            opacity: state.opacity,
            transform: [
            { translateY: state.container }
            ]
        }]}
        >
            <Animated.View 
                style={[styles.modal, {
                transform: [
                    { translateY: state.modal }
                ]
                }]}
            >
                <View style={styles.imageContent}>
                    <SvgFromUri uri={plant.photo} width={70} height={75} />
                </View>

                <Text style={styles.text}>
                    Deseja mesmo deletar sua <Text style={[styles.text, styles.strongText]}>{plant?.name}</Text>?
                </Text>

                <View style={styles.buttonsContent}>
                    <View style={[styles.button]}>
                        <TouchableOpacity style={[styles.touchStyle]} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.button, styles.buttonDanger]}>
                        <TouchableOpacity style={[styles.touchStyle]} onPress={() => handleRemove(plant)}>
                            <Text style={[styles.buttonText, styles.danger]}>Deletar</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: 'auto',
        maxWidth: 265,
        height: 'auto',
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 35,
        paddingHorizontal: 35
    },
    imageContent: {
        width: 120,
        height: 120,
        backgroundColor: colors.shape,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 17,
        textAlign: 'center',
        color: colors.heading
    },
    strongText: {
        fontFamily: fonts.heading
    },
    buttonsContent: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 24,
        marginLeft: -9
    },
    button: {
        width: '50%',
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.shape,
    },
    touchStyle: {
        height: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 15
    },
    buttonDanger: {
        marginLeft: 9
    },
    danger: {
        color: colors.red
    }
});