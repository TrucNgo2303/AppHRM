import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NoticeDetail({ route }) {
    const { notification } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.content}>{notification.detail}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        color: '#333',
    },
});
