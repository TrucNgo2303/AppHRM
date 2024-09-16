import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        // Set a timeout of 5 seconds (5000 milliseconds)
        const timer = setTimeout(() => {
            // Navigate back to the main screen
            navigation.navigate('Employee');
        }, 2000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={require('../picture/success.png')} />
            <Text style={styles.message}>Gửi thành công!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    message: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
    },
    icon: {
        width: 100,  // Đặt chiều rộng của hình ảnh là 100% để nó phù hợp với chiều rộng của màn hình
        height: 100,    // Đặt chiều cao của hình ảnh
        marginTop: 100,  // Khoảng cách trên cùng cho logo
        marginBottom: 20,  // Khoảng cách dưới logo
    }
});

export default SuccessScreen;
