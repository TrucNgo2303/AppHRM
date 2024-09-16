import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { BASE_API_URL } from '../../config';

const SelfScreen = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        role: '',
        department: '',
        location: '',
        avatar: '',
        email: '',
        phoneNumber: '',
        nationalID: '',
        taxCode: '',
    });
    const [employeeID, setEmployeeID] = useState(null);

    useEffect(() => {
        const fetchEmployeeID = async () => {
            try {
                const id = await AsyncStorage.getItem('employeeID');
                if (id) {
                    setEmployeeID(id);
                }
            } catch (error) {
                console.error('Error fetching employee ID:', error);
            }
        };

        fetchEmployeeID();
    }, []);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            if (employeeID) {
                try {
                    const response = await fetch(`${BASE_API_URL}employees/${employeeID}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setEmployeeData(data);
                } catch (error) {
                    console.error('Error fetching employee data:', error);
                }
            }
        };

        fetchEmployeeData();
    }, [employeeID]);
    const { name, role, department, location, avatar, email, phoneNumber, nationalID, taxCode } = employeeData;

    const handleSaveChanges = () => {
        // Logic xử lý khi người dùng nhấn nút "Thay đổi thông tin"
        alert('Thông tin đã được thay đổi');
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/*BackGround*/}
                <ImageBackground
                    source={require('../picture/background.png')}
                    style={styles.background}
                />
                {/* Avatar */}
                <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                />
                <ScrollView style={styles.overlay}>
                    {/* Họ tên (Không thể chỉnh sửa) */}
                    <Text style={styles.label}>Họ và tên</Text>
                    <TextInput
                        value={name}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                    />

                    {/* Chức vụ (Không thể chỉnh sửa) */}
                    <Text style={styles.label}>Chức vụ</Text>
                    <TextInput
                        value={role}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                    />
                    <Text style={styles.label}>Phòng ban</Text>
                    <TextInput
                        value={department}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                    />
                    {/* Địa chỉ */}
                    <Text style={styles.label}>Địa chỉ</Text>
                    <TextInput
                        value={location}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                    />
                    {/* Email */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                        placeholder="Nhập số điện thoại"
                        keyboardType="phone-pad"
                    />
                    {/* Số điện thoại */}
                    <Text style={styles.label}>Số điện thoại</Text>
                    <TextInput
                        value={phoneNumber}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                        placeholder="Nhập số điện thoại"
                        keyboardType="phone-pad"
                    />
                    {/* CCCD  */}
                    <Text style={styles.label}>Căn cước công dân (CCCD)</Text>
                    <TextInput
                        value={nationalID}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                        placeholder="Căn cước công dân"
                        keyboardType="phone-pad"
                    />
                    <Text style={styles.label}>Mã số thuế</Text>
                    <TextInput
                        value={taxCode}
                        editable={false}
                        style={[styles.input, styles.disabledInput]}
                        placeholder="Nhập mã số thuế"
                    />

                    {/* Nút Thay đổi thông tin */}
                    {/* <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                        <Text style={styles.buttonText}>Thay đổi thông tin</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

        //paddingVertical: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 30,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        marginTop: 50,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    overlay: {
        width: 350, // Sửa lại để overlay trải hết bề ngang màn hình
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        //alignItems: 'center', // Đảm bảo các phần tử bên trong căn giữa
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    disabledInput: {
        backgroundColor: '#e0e0e0',
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SelfScreen;
