import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CompanyIntroScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Giới Thiệu Công Ty</Text>
            <Text style={styles.content}>
                Tiền thân của Vingroup là Tập đoàn Technocom, thành lập năm 1993 tại Ucraina. Đầu những năm 2000, Technocom trở về Việt Nam, tập trung đầu tư vào lĩnh vực du lịch và bất động sản với hai thương hiệu chiến lược ban đầu là Vinpearl và Vincom. Đến tháng 1/2012, công ty CP Vincom và Công ty CP Vinpearl sáp nhập, chính thức hoạt động dưới mô hình Tập đoàn với tên gọi Tập đoàn Vingroup – Công ty CP.
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
        lineHeight: 24
    },
});

export default CompanyIntroScreen;
