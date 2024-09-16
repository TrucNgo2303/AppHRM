import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Giả sử bạn có một số điều kiện để kiểm tra hoặc tải dữ liệu
    const checkLoginStatus = async () => {
      //Ví dụ: kiểm tra trạng thái đăng nhập


      // Để kiểm tra, bạn có thể điều hướng sau vài giây
      setTimeout(() => {
        navigation.navigate('Login'); // Thay thế bằng màn hình bạn muốn điều hướng đến
      }, 3000); // Chờ 3 giây
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./picture/background.png')}
        style={styles.background}
      />
      <Text style={styles.title_1}>Phần mềm</Text>
      <Text style={styles.title_2}>quản lý nhân sự</Text>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3399CC" />
        <Text>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_1: {
    position: 'absolute',
    top: '40%',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  title_2: {
    position: 'absolute',
    top: '45%',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    top: '60%',
    backgroundColor: '#3399CC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
