import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Pressable, TextInput } from 'react-native';
import { BASE_API_URL } from '../../config';

const SalaryManagementScreen = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isSalaryModalVisible, setIsSalaryModalVisible] = useState(false);
    const [isBenefitModalVisible, setIsBenefitModalVisible] = useState(false);
    const [newSalary, setNewSalary] = useState('');
    const [newBenefit, setNewBenefit] = useState('');
    const [newGift, setNewGift] = useState('');
    const [employees, setEmployees] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectEmployee = (employee) => {
        const employeeSalary = salaries.find(salary => salary.employeeID === employee.employeeID);
        if (employeeSalary) {
            setSelectedEmployee({
                ...employee,
                heSoLuong: employeeSalary.heSoLuong,
                thuong: employeeSalary.thuong,
                phucLoi: employeeSalary.phucLoi,
            });
        } else {
            setSelectedEmployee(employee);
        }
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
        setIsSalaryModalVisible(false);
        setIsBenefitModalVisible(false);
    };

    const handleUpdateSalary = async () => {
        if (selectedEmployee && newSalary) {
            try {
                const response = await fetch(`${BASE_API_URL}salaries/HeSo/${selectedEmployee.employeeID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        employeeID: selectedEmployee.employeeID,
                        heSoLuong: parseFloat(newSalary),
                    }),
                });
                if (response.ok) {
                    setEmployees((prevEmployees) =>
                        prevEmployees.map((emp) =>
                            emp.employeeID === selectedEmployee.employeeID
                                ? { ...emp, heSoLuong: parseFloat(newSalary) }
                                : emp
                        )
                    );
                    setNewSalary('');
                    handleCloseModal();
                } else {
                    console.error('Cập nhật lương thất bại.');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
    };

    const handleUpdateBenefit = async () => {
        if (selectedEmployee) {
            try {
                const response = await fetch(`${BASE_API_URL}salaries/PhucLoi/${selectedEmployee.employeeID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        employeeID: selectedEmployee.employeeID,
                        phucLoi: newBenefit !== '' ? newBenefit : selectedEmployee.phucLoi,
                        Thuong: newGift !== '' ? newGift : selectedEmployee.Thuong,
                    }),
                });

                if (response.ok) {
                    setEmployees((prevEmployees) =>
                        prevEmployees.map((emp) =>
                            emp.employeeID === selectedEmployee.employeeID
                                ? {
                                    ...emp,
                                    phucLoi: newBenefit !== '' ? newBenefit : emp.phucLoi,
                                    Thuong: newGift !== '' ? newGift : emp.Thuong
                                }
                                : emp
                        )
                    );
                    setNewBenefit('');
                    setNewGift('');
                    handleCloseModal();
                } else {
                    console.error('Cập nhật phúc lợi và thưởng thất bại.');
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
            <Text style={styles.itemText}>{item.employeeID}</Text>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.heSoLuong}</Text>


        </TouchableOpacity>
    );

    // Lọc danh sách nhân viên theo giá trị tìm kiếm
    const filteredEmployees = employees.filter((employee) =>
        employee.employeeID.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}salaries`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    return (
        <View style={styles.container}>
            {/* TextInput để nhập từ khóa tìm kiếm */}
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm theo mã nhân viên"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="gray"
            />

            {/* Hiển thị danh sách nhân viên đã được lọc */}
            <FlatList
                data={filteredEmployees}
                renderItem={renderEmployeeItem}
                keyExtractor={(item) => item.employeeID}
                numColumns={2}
                contentContainerStyle={styles.list}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setIsSalaryModalVisible(true)} style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>Thay đổi lương</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsBenefitModalVisible(true)} style={styles.buttonDelete}>
                    <Text style={styles.buttonText}>Thay đổi phúc lợi</Text>
                </TouchableOpacity>
            </View>
            {/* Modal to Update Salary */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isSalaryModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cập nhật lương</Text>

                        {/* Hiển thị thông tin nhân viên */}
                        <Text style={styles.modalText}>Tên: {selectedEmployee?.name}</Text>
                        <Text style={styles.modalText}>Mã nhân viên: {selectedEmployee?.employeeID}</Text>
                        <Text style={styles.modalText}>Hệ số lương hiện tại: {selectedEmployee?.heSoLuong}</Text>


                        <TextInput
                            style={styles.input}
                            placeholder="Nhập hệ số lương mới"
                            placeholderTextColor={'gray'}
                            value={newSalary}
                            onChangeText={setNewSalary}
                        />
                        <Pressable onPress={handleUpdateSalary} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Lưu</Text>
                        </Pressable>
                        <Pressable onPress={handleCloseModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Modal to Update Benefits */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isBenefitModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cập nhật thưởng và phúc lợi</Text>

                        {/* Hiển thị thông tin nhân viên */}
                        <Text style={styles.modalText}>Tên: {selectedEmployee?.name}</Text>
                        <Text style={styles.modalText}>Mã nhân viên: {selectedEmployee?.employeeID}</Text>
                        <Text style={styles.modalText}>Thưởng: {selectedEmployee?.Thuong}</Text>
                        <Text style={styles.modalText}>Phúc lợi: {selectedEmployee?.phucLoi}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập thưởng mới"
                            placeholderTextColor={'gray'}
                            value={newGift}
                            onChangeText={setNewGift}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập phúc lợi mới"
                            placeholderTextColor={'gray'}
                            value={newBenefit}
                            onChangeText={setNewBenefit}
                        />
                        <Pressable onPress={handleUpdateBenefit} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Lưu</Text>
                        </Pressable>
                        <Pressable onPress={handleCloseModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* Modal to Update Salary */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isSalaryModalVisible}
                onRequestClose={handleCloseModal}
            >
                {/* Nội dung của modal */}
            </Modal>

            {/* Modal to Update Benefits */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isBenefitModalVisible}
                onRequestClose={handleCloseModal}
            >
                {/* Nội dung của modal */}
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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        width: '100%',
        borderRadius: 5,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#333',
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
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    selectedItem: {
        backgroundColor: '#e0f7fa',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
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
    saveButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
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
});

export default SalaryManagementScreen;
