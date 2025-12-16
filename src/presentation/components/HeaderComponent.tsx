import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles, colors } from '../../config/theme'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderComponentProps {
    title?: string;
    showSettingsButton?: boolean;
    showBackButton?: boolean;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, showSettingsButton = true, showBackButton = false }) => {
    const navigation = useNavigation<any>()

    return (
        <View style={styles.header}>

            <View style={{ width: '20%'}}>
                {
                    showBackButton && (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftButton} accessibilityLabel="Back">
                            <Ionicons name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>
                    )
                }
            </View>

            <View style={{ width: '60%'}}>
                <Text style={globalStyles.title}>{title}</Text>
            </View>

           <View style={{width: '20%'}}>
             {
                showSettingsButton && (
                    <TouchableOpacity onPress={() => navigation.navigate('Config')} style={styles.rightButton} accessibilityLabel="Configuración">
                        <FontAwesome5 name="cogs" size={24} color="white" />
                    </TouchableOpacity>
                )
            }
           </View>
        </View>

    );
};

const styles = StyleSheet.create({
    header: {
        height: 125,
        paddingTop: 20,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    rightButton: {
        margin: 'auto',
        padding: 8
    },
    leftButton: {
        margin: 'auto',
        padding: 8,
    }
})