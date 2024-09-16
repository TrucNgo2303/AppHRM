import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BASE_API_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EmployeeBenefitsScreen = ({ navigation }) => {
    const [benefits, setBenefits] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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
        const fetchBenefit = async () => {
            if (employeeID) {
                try {
                    const response = await fetch(`${BASE_API_URL}salaries/${employeeID}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setBenefits(data);
                } catch (error) {
                    console.error('Error fetching employee data:', error);
                }
            }
        };

        fetchBenefit();
    }, [employeeID]);
    useEffect(() => {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        // Kiểm tra nếu ngày hiện tại không phải từ 1 đến 5 hàng tháng
        if (currentDay < 1 || currentDay > 5) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, []);

    const { LuongCoBan, heSoLuong, Thuong, phucLoi, tongLuong } = benefits;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Phúc lợi nhân viên</Text>

            {/* Gray Box Container */}
            <View style={styles.grayBox}>
                <View style={styles.item}>
                    <Text style={styles.label}>Lương cơ bản:</Text>
                    <Text style={styles.value}>{LuongCoBan} VND</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Hệ số lương:</Text>
                    <Text style={styles.value}>{heSoLuong}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Thưởng:</Text>
                    <View style={styles.Thuong}>
                        <Text style={styles.value}>{Thuong} VND</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Phúc lợi:</Text>
                    <Text style={styles.value}>{phucLoi} VND</Text>
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Lương tháng này nhận được:</Text>
                    <Text style={styles.totalValue}>{tongLuong} VND</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SalaryIncreaseProposalScreen')}>
                <Text style={styles.buttonText}>Đề xuất tăng lương</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity
                    style={[
                        styles.button,
                        isButtonDisabled ? { backgroundColor: 'gray' } : { backgroundColor: 'blue' }
                    ]}
                    onPress={() => {
                        if (!isButtonDisabled) {
                            navigation.navigate('ErrorReport');
                        }
                    }}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.buttonText}>Báo lỗi</Text>
                </TouchableOpacity>

                <Text style={styles.noteText}>Chỉ chấp nhận từ ngày 1 - 5 hàng tháng</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    grayBox: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
    },
    value: {
        fontSize: 18,
    },
    rewardRow: {
        flexDirection: 'row',
    },
    rewardType: {
        fontSize: 18,
        marginLeft: 10,
        fontStyle: 'italic',
        color: 'gray',
    },
    totalContainer: {
        marginTop: 30,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        color: '#28a745',
    },
    button: {
        backgroundColor: '#3399CC', // Màu nền của Button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // Bo tròn góc
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: '#fff', // Màu chữ của Button
        fontSize: 16,
        fontWeight: 'bold',
    },
    noteText: {
        marginTop: 10,
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default EmployeeBenefitsScreen;
