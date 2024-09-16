import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const SendFeedbackScreen = ({ navigation }) => {
    const [selectedFeedback, setSelectedFeedback] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const options = ['Về lương', 'Về phúc lợi', 'Về đồng nghiệp', 'Về chính sách công ty', 'Khác'];
    const sendFeedback = () => {
        setTimeout(() => {
            navigation.navigate('Success');
            setTimeout(() => {
                navigation.navigate('Setting');
            }, 2000);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../picture/background.png')}
                style={styles.background}
            />
            <Text style={styles.header}>Gửi Phản Hồi</Text>
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
            <TextInput
                style={styles.input}
                //placeholder="Lý do tăng lương"
                value={selectedFeedback}
                onChangeText={setSelectedFeedback}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TouchableOpacity style={styles.button} onPress={sendFeedback}>
                <Text style={styles.buttonText}>Gửi Phản Hồi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center', 
        padding: 20
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
        marginBottom: 20,
        fontWeight: 'bold',
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
    button: {
        backgroundColor: '#3399CC', // Màu nền của Button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // Bo tròn góc
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff', // Màu chữ của Button
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SendFeedbackScreen;