import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../config';
const EmployeeScreen = ({ navigation }) => {
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

    const { name, role, location, avatar } = employeeData;
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            />
            <Image
                source={{ uri: avatar }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
            <View style={styles.location}>
                <MaterialIcons name="location-on" size={24} color="red" />
                <Text style={{ marginLeft: 4, }}>{location}</Text>
            </View>
            <View style={styles.overlay}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Thông báo công ty')} style={styles.button}>
                        <Text>Thông báo công ty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Thời gian làm việc')} style={styles.button}>
                        <Text>Thời gian làm việc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('EmployeeBenefitsScreen')} style={styles.button}>
                        <Text>Phúc lợi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Đơn Xin Nghỉ Phép')} style={styles.button}>
                        <Text>Nghỉ Phép</Text>
                    </TouchableOpacity>
                </View>
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
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        width: '100%',
        top: '12%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    name: {
        color: '#000',
        marginVertical: 8,
        fontSize: 20,
        fontWeight: 'bold',
    },
    department: {
        color: '#000',
        fontSize: 16,
    },
    location: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3399CC',
        flexBasis: '48%',
        borderRadius: '5px',
        textAlign: 'center',
        marginBottom: 10,
        display: 'flex',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',

    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    avatar: {
        height: 155,
        width: 155,
        borderRadius: 999,
        borderColor: '#fff',
        borderWidth: 2,
        marginTop: -90,
    }

});

export default EmployeeScreen;
