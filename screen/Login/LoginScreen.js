import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, TextInput, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    Keyboard.dismiss();
    // Kiểm tra nếu tài khoản và mật khẩu không trống
    if (username.trim() !== '' && password.trim() !== '') {
      try {
        // Gửi yêu cầu đến server Node.js
        const response = await fetch('http://192.168.12.117:3000/api/login/login', { // Địa chỉ IP hoặc localhost của server
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.status === 200) {
          // Lưu trạng thái đăng nhập
          await AsyncStorage.setItem('user', data.token);
          await AsyncStorage.setItem('employeeID', JSON.stringify(data.id));

          if (data.role === 'employee') {
            navigation.navigate('BottomTab', { screen: 'Employee' });
          } else if (data.role === 'hr') {
            navigation.navigate('BottomTabHR', { screen: 'HR', params: { employeeID: data.id } });
          }

        } else {
          Alert.alert('Lỗi', data.message);
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể kết nối với server. Vui lòng thử lại.');
      }
    } else {
      Alert.alert('Cảnh báo', 'Tài khoản hoặc mật khẩu trống');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../picture/background.png')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.loginText}>Đăng nhập</Text>
          <TextInput
            placeholder="Tài khoản"
            style={styles.input}
            placeholderTextColor="#C0C0C0"
            value={username}
            onChangeText={setUsername}
            borderColor='#3399CC'
            borderWidth='1'
          />
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#C0C0C0"
            value={password}
            onChangeText={setPassword}
            borderColor='#3399CC'
            borderWidth='1'
          />
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPass')}>
            <Text>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
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

export default LoginScreen;

