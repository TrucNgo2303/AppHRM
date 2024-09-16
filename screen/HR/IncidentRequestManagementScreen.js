import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Modal, ScrollView, StyleSheet } from 'react-native';
import { BASE_API_URL } from '../../config';

const IncidentRequestManagementScreen = () => {
    const [incidentData, setIncidentData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch incidents data
        const fetchIncidents = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}incidents/incidents`);
                const json = await response.json();
                console.log(json)
                setIncidentData(json);
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch requests data
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}incidents/requests`);
                const json = await response.json();
                setRequestData(json);
            } catch (error) {
                console.error(error);
            }
        };

        // Call both APIs
        fetchIncidents();
        fetchRequests();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const renderIncidentItem = ({ item }) => (
        <Pressable onPress={() => handleItemClick(item)} style={styles.item}>
            <Text>Mã nhân viên: {item.employeeID}</Text>
            <Text>{item.incidentInfo}</Text>
            <Text>Trạng thái: {item.status}</Text>
        </Pressable>
    );

    const renderRequestItem = ({ item }) => (
        <Pressable onPress={() => handleItemClick(item)} style={styles.item}>
            <Text>Mã nhân viên: {item.employeeID}</Text>
            <Text>{item.requestInfo}</Text>
            <Text>Trạng thái: {item.status}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Fixed Incidents Section */}
            <Text style={styles.sectionTitle}>Sự cố</Text>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <FlatList
                    data={incidentData.filter(item => item.incidentInfo)}
                    keyExtractor={(item, index) => (item.ID ? item.ID.toString() : index.toString())} // Dự phòng cho trường hợp item.ID không tồn tại
                    renderItem={renderIncidentItem}
                    scrollEnabled={false}
                />
            </ScrollView>

            {/* Fixed Requests Section */}
            <Text style={styles.sectionTitle}>Yêu cầu</Text>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <FlatList
                    data={requestData.filter(item => item.requestInfo)}
                    keyExtractor={(item, index) => (item.ID ? item.ID.toString() : index.toString())} // Dự phòng cho trường hợp item.ID không tồn tại
                    renderItem={renderRequestItem}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollContainer: {
        maxHeight: 300,
        marginBottom: 20,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeText: {
        color: 'blue',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default IncidentRequestManagementScreen;
