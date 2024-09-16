import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetScreen = () => {
    const navigation = useNavigation();

    // Dữ liệu cho SectionList
    const DATA = [
        {
            title: 'Tài khoản',
            data: ['Đổi mật khẩu']
        },
        {
            title: 'Phản hồi',
            data: ['Phản hồi', 'Hỗ trợ']
        },
        {
            title: 'Về công ty',
            data: ['Luật lệ', 'Giới thiệu']
        },
    ];

    const handleItemPress = (item) => {
        if (item === 'Đổi mật khẩu') {
            navigation.navigate('Đổi Mật Khẩu');
        }
        if (item === 'Phản hồi') {
            navigation.navigate('Phản Hồi');
        }
        if (item === 'Hỗ trợ') {
            navigation.navigate('Hỗ Trợ');
        }
        if (item === 'Luật lệ') {
            navigation.navigate('Luật Lệ');
        }
        if (item === 'Giới thiệu') {
            navigation.navigate('Giới Thiệu');
        }
        // Tương tự với các màn hình khác
    };
    const logout = async () => {
        // Xóa trạng thái đăng nhập và điều hướng đến LoginScreen
        await AsyncStorage.removeItem('userToken');
        navigation.replace('Login');
    };
    return (
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                        <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                contentContainerStyle={styles.listContent}
                style={styles.sectionList} // thêm style cho SectionList
            />

            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionList: {
        flex: 1, // đảm bảo SectionList chiếm toàn bộ chiều cao nhưng không vượt quá
    },
    listContent: {
        paddingBottom: 20, // thêm khoảng trống phía dưới cho SectionList
    },
    sectionHeader: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontWeight: 'bold',
        backgroundColor: '#f4f4f4',
        color: '#333',
    },
    item: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        right: 10,
        left: 10,
        bottom: 100,
        position: 'absolute',
        paddingVertical: 15,
        backgroundColor: '#FF4500',
        borderRadius: 5,
        marginHorizontal: 20,
        alignItems: "center"
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
});

export default SetScreen;
