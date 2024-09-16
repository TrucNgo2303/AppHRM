import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { BASE_API_URL } from '../../config';

export default function AttendanceScreen() {
    const [employeeID, setEmployeeID] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleAttendance = async () => {
        setLoading(true);
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentDate = now.toISOString().split('T')[0];
        let status = '';
        let apiStatus = '';

        if (hours < 7) {
            status = 'Chấm công thành công';
        } else if (hours === 7 && minutes <= 15) {
            status = 'Đi làm muộn';
            apiStatus = 'Late';
        } else {
            status = 'Không chấp nhận chấm công';
            apiStatus = 'not accept';
        }

        Alert.alert('Thông báo', status);

        if (apiStatus) {
            try {
                await fetch(`${BASE_API_URL}worktimes/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: apiStatus,
                        Day: currentDate,
                        employeeID: employeeID,
                    }),
                });
                console.log('Attendance status sent successfully.');
            } catch (error) {
                console.error('Error sending attendance status:', error);
            }
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleAttendance}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Chấm công'}</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    button: {
        backgroundColor: '#FF0000', // Red color
        width: 200,  // Adjust size as needed
        height: 200, // Adjust size as needed
        borderRadius: 100, // Half of width and height for a circular shape
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, // For Android shadow
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 10, // Shadow blur radius
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
