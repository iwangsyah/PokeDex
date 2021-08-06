import { StyleSheet, Platform } from 'react-native';
import { BG_PRIMARY } from './Colors';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 65,
        backgroundColor: BG_PRIMARY,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        elevation: 25,
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    tabBar: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 11,
        alignSelf: 'center',
        marginBottom: Platform.OS === 'ios' ? 0 : 10,
        marginTop: 8,
    },
    image: { height: 34 },
});
