import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../config';

const WorkingHoursScreen = () => {
    const [markedDates, setMarkedDates] = useState(getInitialMarkedDates);
    const [loading, setLoading] = useState(true);
    const [employeeID, setEmployeeID] = useState(null);
    const [totalHours, setTotalHours] = useState(0); // State để lưu tổng giờ làm
    const getInitialMarkedDates = () => {
        let marked = {};
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();

        for (let i = 1; i <= 31; i++) {
            const date = new Date(currentYear, currentMonth - 1, i);
            if (date.getMonth() + 1 === currentMonth && date.getDay() !== 0 && date.getDay() !== 6) {
                const dateString = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                marked[dateString] = { selected: true, selectedColor: 'green' };
            }
        }
        return marked;
    };
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
        if (employeeID) {
            fetchWorktimes();
        }
    }, [employeeID]);

    const fetchWorktimes = async () => {
        if (employeeID) {
            try {
                const response = await axios.get(`${BASE_API_URL}worktimes/${employeeID}`);
                const data = response.data;
                const newMarkedDates = {};
                let totalWorkedHours = 0; // Biến lưu tổng giờ làm

                data.forEach(item => {
                    const { status, Day, totalHours: hours } = item;

                    // Cộng tổng giờ làm việc
                    totalWorkedHours += hours;

                    // Kiểm tra xem Day là một khoảng thời gian hay một ngày cụ thể
                    if (Day.includes('/')) {
                        const [startDate, endDate] = Day.split('/');
                        let currentDate = moment(startDate);
                        const end = moment(endDate);

                        while (currentDate.isSameOrBefore(end)) {
                            const dayOfWeek = currentDate.day();
                            if (dayOfWeek !== 6 && dayOfWeek !== 0) { // Đánh dấu ngày làm việc (thứ 2 - thứ 6)
                                const formattedDate = currentDate.format('YYYY-MM-DD');
                                newMarkedDates[formattedDate] = {
                                    marked: true,
                                    dotColor: 'green',
                                    customStyles: {
                                        container: { backgroundColor: 'green' },
                                        text: { color: 'white' }
                                    }
                                };
                            }
                            currentDate.add(1, 'day');
                        }
                    }
                })
                setMarkedDates(newMarkedDates);
                setTotalHours(totalWorkedHours); // Lưu tổng giờ làm vào state
            } catch (error) {
                console.error('Error fetching worktimes:', error);
            } finally {
                setLoading(false);
            }
        }
    };
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch làm việc</Text>
            <Calendar style={styles.calendar}
                markedDates={markedDates}
                theme={{
                    todayTextColor: 'red',
                }}
            />
            <Text style={styles.title}>Tổng thời gian làm việc trong tháng này:</Text>
            <Text style={styles.totalHours}>{parseFloat(totalHours).toFixed(2)} giờ</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    calendar: {
        borderColor: "#000",
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalHours: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default WorkingHoursScreen;
