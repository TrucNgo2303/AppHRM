import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BASE_API_URL } from '../../config';

const AttendanceManagementScreen = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAllEmployeesModalVisible, setAllEmployeesModalVisible] = useState(false);
    const [isSingleEmployeeModalVisible, setSingleEmployeeModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState({});

    // Hàm fetch danh sách nhân viên từ API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}employees`);
                const data = await response.json();
                setEmployees(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const markDayOff = (date) => {
        setMarkedDates({
            ...markedDates,
            [date]: { selected: true, marked: true, selectedColor: 'red' },
        });
    };


    const handleSetDayOffForAll = (day) => {
        markDayOff(day.dateString);
        setAllEmployeesModalVisible(false);
    };

    const handleSetDayOffForSingle = (day) => {
        markDayOff(day.dateString);
        setSingleEmployeeModalVisible(false);
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
            <Text style={styles.header}>Danh sách nhân viên</Text>

            <FlatList
                data={employees}
                keyExtractor={(item) => item.employeeID.toString()}
                renderItem={({ item }) => (
                    <View style={styles.employeeItem}>
                        <Text>ID: {item.employeeID} - {item.name}</Text>
                    </View>
                )}
            />

            {/*Set Lịch nghỉ cho toàn bộ nhân viên */}
            <TouchableOpacity onPress={() => setAllEmployeesModalVisible(true)} style={styles.buttonAll}>
                <Text style={styles.buttonText}>Set lịch nghỉ cho toàn bộ nhân viên</Text>
            </TouchableOpacity>
            {/*Set Lịch nghỉ cho 1 nhân viên */}
            <TouchableOpacity onPress={() => setSingleEmployeeModalVisible(true)} style={styles.buttonOne}>
                <Text style={styles.buttonText}>Set lịch nghỉ cho 1 nhân viên</Text>
            </TouchableOpacity>
            {/* Modal chọn ngày nghỉ cho toàn bộ nhân viên */}
            <Modal visible={isAllEmployeesModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Chọn ngày nghỉ cho toàn bộ nhân viên</Text>
                    <Calendar
                        onDayPress={handleSetDayOffForAll}
                        markedDates={markedDates}
                    />
                    <Button title="Đóng" onPress={() => setAllEmployeesModalVisible(false)} />
                </View>
            </Modal>

            {/* Modal chọn ngày nghỉ cho 1 nhân viên */}
            <Modal visible={isSingleEmployeeModalVisible} animationType="slide">
                {selectedEmployee ? (
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Chọn ngày nghỉ cho {selectedEmployee.name}</Text>
                        <Calendar
                            onDayPress={handleSetDayOffForSingle}
                            markedDates={markedDates}
                        />
                        <Button title="Đóng" onPress={() => setSingleEmployeeModalVisible(false)} />
                    </View>
                ) : (
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Chọn nhân viên</Text>
                        <FlatList
                            data={employees}
                            keyExtractor={(item) => item.employeeID.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.employeeItem}
                                    onPress={() => setSelectedEmployee(item)}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button title="Đóng" onPress={() => setSingleEmployeeModalVisible(false)} />
                    </View>
                )}
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
    },
    employeeItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    modalHeader: {
        fontSize: 18,
        marginBottom: 20,
        marginTop: 30,
    },
    buttonAll: {
        right: 10,
        left: 10,
        bottom: 160,
        position: 'absolute',
        paddingVertical: 15,
        backgroundColor: '#3399CC',
        borderRadius: 5,
        marginHorizontal: 20,
        alignItems: "center",
    },
    buttonOne: {
        right: 10,
        left: 10,
        bottom: 100,
        position: 'absolute',
        paddingVertical: 15,
        backgroundColor: '#3399CC',
        borderRadius: 5,
        marginHorizontal: 20,
        alignItems: "center",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AttendanceManagementScreen;

