import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Pressable, TextInput, Alert } from 'react-native';
import { BASE_API_URL } from '../../config';
import axios from 'axios';

const EmployeeManagementScreen = ({ navigation }) => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ employeeID: '', name: '' });
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectEmployee = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
    };

    const handleAddEmployee = async () => {
        const employeeData = {
            employeeID: newEmployee.employeeID || null,
            name: newEmployee.name || null,
            role: newEmployee.role || null,
            department: newEmployee.department || null,
            location: newEmployee.location || null,
            avatar: newEmployee.avatar || null,
            email: newEmployee.email || null,
            phoneNumber: newEmployee.phoneNumber || null,
            nationalID: newEmployee.nationalID || null,
            taxCode: newEmployee.taxCode || null,
            userName: newEmployee.userName || null,
            passWord: newEmployee.passWord || null,
            keyRole: newEmployee.keyRole || null,
        };

        try {
            const response = await axios.post(`${BASE_API_URL}employees`, employeeData);
            if (response.status === 200 || response.status === 201) {
                setEmployees([...employees, employeeData]);
                setFilteredEmployees([...employees, employeeData]);
                setNewEmployee({
                    employeeID: '',
                    name: '',
                    role: '',
                    department: '',
                    location: '',
                    avatar: '',
                    email: '',
                    phoneNumber: '',
                    nationalID: '',
                    taxCode: '',
                    userName: '',
                    passWord: '',
                    keyRole: '',
                });
                setIsAddModalVisible(false);
                Alert.alert('Thành công', 'Đã thêm nhân viên mới');
            } else {
                Alert.alert('Lỗi', 'Không thể thêm nhân viên, vui lòng thử lại sau');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    const handleDeleteEmployee = async () => {
        if (employeeToDelete) {
            try {
                const response = await fetch(`${BASE_API_URL}employees/${employeeToDelete.employeeID}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setEmployees(employees.filter(emp => emp.employeeID !== employeeToDelete.employeeID));
                    setFilteredEmployees(filteredEmployees.filter(emp => emp.employeeID !== employeeToDelete.employeeID));
                    setEmployeeToDelete(null);
                    setIsDeleteModalVisible(false);
                } else {
                    console.error('Xóa nhân viên thất bại.');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
    };

    const renderEmployeeItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleSelectEmployee(item)}
            style={[
                styles.item,
                selectedEmployee && selectedEmployee.employeeID === item.employeeID && styles.selectedItem,
            ]}
        >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.employeeID}</Text>
        </TouchableOpacity>
    );

    const handleSearch = (text) => {
        setSearchTerm(text);
        setFilteredEmployees(employees.filter(emp => String(emp.employeeID).includes(text)));
    };

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}employees`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployees(data);
                setFilteredEmployees(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm theo mã nhân viên"
                placeholderTextColor="#888888"
                value={searchTerm}
                onChangeText={handleSearch}
            />

            <FlatList
                data={filteredEmployees}
                renderItem={renderEmployeeItem}
                keyExtractor={(item) => item.employeeID.toString()}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setIsAddModalVisible(true)} style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>Thêm Nhân Viên</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)} style={styles.buttonDelete}>
                    <Text style={styles.buttonText}>Xóa Nhân Viên</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={!!selectedEmployee}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedEmployee && (
                            <>
                                <Text style={styles.modalTitle}>Chi tiết nhân viên</Text>
                                <Text>ID: {selectedEmployee.employeeID}</Text>
                                <Text>Tên: {selectedEmployee.name}</Text>
                                <Text>Chức vụ: {selectedEmployee.role}</Text>
                                <Text>Phòng ban: {selectedEmployee.department}</Text>
                                <Pressable onPress={handleCloseModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Đóng</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isAddModalVisible}
                onRequestClose={() => setIsAddModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Thêm Nhân Viên</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mã nhân viên"
                            placeholderTextColor="#888888"
                            value={newEmployee.employeeID}
                            onChangeText={(text) => setNewEmployee({ ...newEmployee, employeeID: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tên nhân viên"
                            placeholderTextColor="#888888"
                            value={newEmployee.name}
                            onChangeText={(text) => setNewEmployee({ ...newEmployee, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Chức vụ"
                            placeholderTextColor="#888888"
                            value={newEmployee.role}
                            onChangeText={(text) => setNewEmployee({ ...newEmployee, role: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phòng ban"
                            placeholderTextColor="#888888"
                            value={newEmployee.department}
                            onChangeText={(text) => setNewEmployee({ ...newEmployee, department: text })}
                        />
                        <Pressable onPress={handleAddEmployee} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Thêm</Text>
                        </Pressable>
                        <Pressable onPress={() => setIsAddModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={() => setIsDeleteModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Xóa Nhân Viên</Text>
                        <Text style={styles.inputLabel}>Chọn nhân viên để xóa:</Text>
                        <FlatList
                            data={employees}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => setEmployeeToDelete(item)}
                                    style={[
                                        styles.item,
                                        employeeToDelete && employeeToDelete.employeeID === item.employeeID && styles.selectedItem,
                                    ]}
                                >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                    <Text style={styles.itemText}>{item.employeeID}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.employeeID.toString()}
                        />
                        <Pressable onPress={handleDeleteEmployee} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Xóa</Text>
                        </Pressable>
                        <Pressable onPress={() => setIsDeleteModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    list: {
        flexGrow: 1,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 5,
        borderRadius: 5,
        elevation: 2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1, // Vạch kẻ phân cách
        borderBottomColor: '#ddd', // Màu của vạch kẻ
    },
    selectedItem: {
        backgroundColor: '#e0f7fa', // Màu nền của item được chọn
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        width: '100%',
        borderRadius: 5,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        position: 'absolute',
        bottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    buttonAdd: {
        right: 10,
        bottom: 150,
        left: 10,
        position: 'absolute',
        paddingVertical: 15,
        backgroundColor: '#3399CC',
        borderRadius: 5,
        marginHorizontal: 20,
        alignItems: "center"
    },
    buttonDelete: {
        right: 10,
        left: 10,
        bottom: 70,
        position: 'absolute',
        paddingVertical: 15,
        backgroundColor: '#FF4500',
        borderRadius: 5,
        marginHorizontal: 20,
        alignItems: "center",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    filterText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent1: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
    },
    selectedFilterItem: {
        backgroundColor: '#007BFF',
    },
    filterItemText: {
        color: '#333',
        fontSize: 16,
    },
});

export default EmployeeManagementScreen;
