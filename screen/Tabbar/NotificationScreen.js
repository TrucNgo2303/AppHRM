import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_API_URL } from '../../config';
const { width, height } = Dimensions.get('window');

const NotificationScreen = () => {
    const [employeeID, setEmployeeID] = useState(null);
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(true);

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
        const fetchNotificationData = async () => {
            if (employeeID) {
                try {
                    const response = await fetch(`${BASE_API_URL}notification/${employeeID}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setNotification(data); // Đảm bảo rằng data là một mảng
                } catch (error) {
                    console.error('Error fetching notification data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchNotificationData();
    }, [employeeID]);

    const NotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <View style={styles.notificationTextContainer}>
                <Text style={styles.message}>{item.NotificationPerson}</Text>
            </View>
            <TouchableOpacity>
                <Icon name="ellipsis-h" size={20} color="#888" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            />
            <Text style={styles.header}>Thông báo</Text>

            <FlatList
                data={notification}
                renderItem={({ item }) => <NotificationItem item={item} />}
                keyExtractor={(item) => item.notificationID.toString()}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Dark theme background
        paddingHorizontal: 10,
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
        fontWeight: 'bold',
        color: '#000',
        marginTop: 70,
        marginBottom: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    notificationTextContainer: {
        flex: 1,
    },
    message: {
        color: '#000',
        fontSize: 16,
    },
});

export default NotificationScreen;
