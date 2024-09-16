import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Dimensions, Alert } from 'react-native';
import { BASE_API_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const SalaryIncreaseProposalScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [reason, setReason] = useState('');

    // Mã định danh của nhân viên, bạn có thể lấy giá trị này từ context hoặc props
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

    const options = ['Hệ số lương', 'Thưởng'];

    // Hàm để gửi yêu cầu lên API
    const handleSubmit = async () => {
        if (!selectedOption || !reason) {
            Alert.alert('Lỗi', 'Vui lòng chọn mục và nhập lý do');
            return;
        }

        const requestInfo = `${selectedOption}: ${reason}`;
        const payload = {
            employeeID,
            requestInfo,
            status: 'waiting',
        };

        try {
            const response = await fetch(`${BASE_API_URL}incidents/requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            console.log(response.status)
            if (response.ok) {
                Alert.alert('Thành công', 'Yêu cầu của bạn đã được gửi.');
                navigation.navigate('Success'); // Điều hướng sang màn hình Success
            } else {
                Alert.alert('Lỗi', 'Không thể gửi yêu cầu. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi yêu cầu.');
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            />
            <Text style={styles.title}>Đề xuất tăng lương</Text>
            <Text style={styles.header}>Loại đề xuất</Text>

            {/* Dropdown for Salary/Reward */}
            <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)} style={styles.dropdown}>
                <Text>{selectedOption || 'Chọn mục'}</Text>
            </TouchableOpacity>

            {isDropdownVisible && (
                <View style={styles.dropdownMenu}>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            setSelectedOption(option);
                            setDropdownVisible(false);
                        }}>
                            <Text style={styles.dropdownItem}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Reason Input */}
            <Text style={styles.header}>Lý do tăng lương</Text>
            <TextInput
                style={styles.input}
                value={reason}
                onChangeText={setReason}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Gửi yêu cầu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    background: {
        position: 'absolute',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    dropdownMenu: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    dropdownItem: {
        padding: 10,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 24,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#3399CC',
        padding: 15,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    submitButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default SalaryIncreaseProposalScreen;
