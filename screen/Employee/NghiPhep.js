import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NghiPhep = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [shift, setShift] = useState('ca_sang');
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

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };
    const formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
        let year = date.getFullYear();

        // Đảm bảo rằng ngày và tháng có dạng 2 chữ số
        if (day < 10) day = `0${day}`;
        if (month < 10) month = `0${month}`;

        return `${year}-${month}-${day}`; // Định dạng dd/MM/yyyy
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.12.117:3000/api/XinNghiPhep', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employeeID: employeeID,
                    //name: name,
                    LyDoNghi: reason,
                    ThoiGianNghi: formatDate(date), // Truyền ngày với định dạng dd/MM/yyyy
                    caNghi: shift,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Đã gửi đơn xin nghỉ thành công:', result);
                Alert.alert('Đã gửi đơn xin nghỉ thành công')
            } else {
                console.error('Gửi đơn xin nghỉ thất bại:', result);
            }
        } catch (error) {
            console.error('Lỗi khi gửi đơn xin nghỉ:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập họ và tên"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Phòng ban</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập phòng ban"
                value={department}
                onChangeText={setDepartment}
            />

            <Text style={styles.label}>Lý do nghỉ</Text>
            <TextInput
                style={styles.reasonInput}
                placeholder="Nhập lý do nghỉ"
                value={reason}
                onChangeText={setReason}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />

            <Text style={styles.label}>Ngày gian nghỉ</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text>{date.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
            <Text style={styles.label}>Ca nghỉ</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="ca_sang"
                        status={shift === 'ca_sang' ? 'checked' : 'unchecked'}
                        onPress={() => setShift('ca_sang')}
                    />
                    <Text>Ca sáng</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="ca_chieu"
                        status={shift === 'ca_chieu' ? 'checked' : 'unchecked'}
                        onPress={() => setShift('ca_chieu')}
                    />
                    <Text>Ca chiều</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="ca_ngay"
                        status={shift === 'ca_ngay' ? 'checked' : 'unchecked'}
                        onPress={() => setShift('ca_ngay')}
                    />
                    <Text>Cả ngày</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Gửi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    reasonInput: {
        height: 100, // Adjust height as needed
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        textAlignVertical: 'top', // Ensure text starts from the top of the input field
    },
    dateButton: {
        padding: 15,
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#3399CC',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioGroup: {
        marginBottom: 15,
        backgroundColor: '#C0C0C0',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,

    },
});

export default NghiPhep;
