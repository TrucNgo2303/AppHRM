import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CompanyRulesScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Luật Lệ Công Ty</Text>
            <Text style={styles.content}>
                1. Không ăn vặt trong giờ giải lao vì có ther làm bẩn bàn làm việc{'\n'}
                2. Không được đi vệ sinh dùng rất buồn cũng phải nhinnj đến hết giờ
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left', // Align text to the left
        whiteSpace: 'pre-line', // Ensure proper line breaks
    },
});

export default CompanyRulesScreen;
