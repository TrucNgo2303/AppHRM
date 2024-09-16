import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { BASE_API_URL } from '../../config';


const ImportantNoticeScreen = ({ navigation }) => {
    const [notification, setNotification] = useState([]);
    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}notification`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNotification(data); // Đảm bảo rằng data là một mảng
            } catch (error) {
                console.error('Error fetching notification data:', error);
            }

        };

        fetchNotificationData();
    }, []);
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('NoticeDetail', { notification: item })}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.NotificationCompany}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={notification}
                keyExtractor={item => item.notificationID}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    item: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});
export default ImportantNoticeScreen;
