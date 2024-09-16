import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ErrorReport = ({ navigation }) => {
    const [selectedError, setSelectedError] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [errorDetail, setErrorDetail] = useState('');

    const errorOptions = ['Lương cơ bản', 'Hệ số lương', 'Thưởng', 'Phúc lợi', 'Khác'];

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            />
            <Text style={styles.title}>Báo lỗi</Text>
            <Text style={styles.header}>Loại lỗi</Text>
            {/* Dropdown for Error Type */}
            <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)} style={styles.dropdown}>
                <Text>{selectedError || 'Chọn lỗi'}</Text>
            </TouchableOpacity>

            {isDropdownVisible && (
                <View style={styles.dropdownMenu}>
                    {errorOptions.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            setSelectedError(option);
                            setDropdownVisible(false);
                        }}>
                            <Text style={styles.dropdownItem}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Error Detail Input */}
            <Text style={styles.header}>Chi tiết lỗi</Text>
            <TextInput
                style={styles.input}
                value={errorDetail}
                onChangeText={setErrorDetail}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />

            {/* Submit Button */}
            <TouchableOpacity onPress={() => navigation.navigate('Success')} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Báo cáo lỗi</Text>
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
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
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
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 10,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ErrorReport;
