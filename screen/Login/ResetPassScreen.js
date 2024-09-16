import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, TextInput, Text, TouchableOpacity } from 'react-native';

const ResetPassScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            >
                <View style={styles.overlay}>
                    <Text style={styles.loginText}>Đổi mật khẩu</Text>
                    <TextInput
                        placeholder="Mật khẩu mới"
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        value={username}
                        onChangeText={setUsername}
                        borderColor='#3399CC'
                        borderWidth='1'
                    />
                    <TextInput
                        placeholder="Xác nhận mật khẩu"
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        value={password}
                        onChangeText={setPassword}
                        borderColor='#3399CC'
                        borderWidth='1'
                    />

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff', // Semi-transparent background
        borderRadius: 10,
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        color: '#000',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#3399CC', // Màu nền của Button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // Bo tròn góc
        alignItems: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff', // Màu chữ của Button
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 10,
        marginBottom: 10,
    },
});

export default ResetPassScreen;

