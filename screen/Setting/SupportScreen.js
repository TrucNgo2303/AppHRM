import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SupportScreen = ({ navigation }) => {
    const [request, setRequest] = useState('');

    const sendSupportRequest = () => {
        setTimeout(() => {
            navigation.navigate('Success');
            setTimeout(() => {
                navigation.navigate('Setting');
            }, 2000);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            />
            <Text style={styles.header}>Yêu Cầu Hỗ Trợ</Text>
            <TextInput
                placeholder="Nhập yêu cầu của bạn"
                style={styles.input}
                value={request}
                onChangeText={setRequest}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TouchableOpacity style={styles.button} onPress={sendSupportRequest}>
                <Text style={styles.buttonText}>Gửi Yêu Cầu Hỗ Trợ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    background: {
        position: 'absolute',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    input: {
        height: 300, // Adjust height as needed
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
        fontSize: 24,
        backgroundColor: '#fff',
        placeholderTextColor: '#C0C0C0',
    },
    button: {
        backgroundColor: '#3399CC', // Màu nền của Button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // Bo tròn góc
        alignItems: 'center',
    },
    buttonText: {
        color: '#000', // Màu chữ của Button
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SupportScreen;
