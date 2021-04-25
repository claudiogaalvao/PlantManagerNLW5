import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import ModalBox from 'react-native-modalbox';
import { PlantProps } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ModalProps {
    plant: PlantProps;
    isOpen: boolean;
    ref?: React.LegacyRef<ModalBox> | undefined;
    handleRemovePlant: (plant: PlantProps) => void;
    handleCancel: () => void;
}

export function ModalDeletePlant({ plant, isOpen, ref, handleRemovePlant, handleCancel }: ModalProps) {
    return(
        <ModalBox  
        style={styles.modal}
        position='center'
        backdrop={true}
        isOpen={isOpen}
        ref={ref}
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
                    <TouchableOpacity style={[styles.touchStyle]} onPress={() => handleRemovePlant(plant)}>
                        <Text style={[styles.buttonText, styles.danger]}>Deletar</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </ModalBox>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: 'auto',
        maxWidth: 265,
        height: 'auto',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 35,
        paddingHorizontal: 35,
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