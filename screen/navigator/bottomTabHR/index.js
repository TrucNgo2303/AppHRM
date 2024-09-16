import { View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HRScreen from '../../HR/HRScreen';
import { Entypo, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { NotificationScreen, SelfScreen } from '../../Tabbar';
import SetScreen from '../../Tabbar/SetScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SuccessScreen from '../../Setting/SuccessScreen';
import CompanyIntroScreen from '../../Setting/CompanyIntroScreen';
import CompanyRulesScreen from '../../Setting/CompanyRulesScreen';
import SupportScreen from '../../Setting/SupportScreen';
import SendFeedbackScreen from '../../Setting/SendFeedbackScreen';
import EmployeeManagementScreen from '../../HR/EmployeeManagementScreen';
import AttendanceManagementScreen from '../../HR/AttendanceManagementScreen';
import SalaryManagementScreen from '../../HR/SalaryManagementScreen';
import IncidentRequestManagementScreen from '../../HR/IncidentRequestManagementScreen';
import AttendanceScreen from '../../Tabbar/AttendanceScreen';
import ResetPassInAppScreen from '../../Setting/ResetPassInApp';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: 85,
        ...Platform.select({
            ios: {
                shadowColor: '#7e8187',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
            },
            android: {
                elevation: 15,
            },
        }),
    },
};

const IconSize = 24

const COLOR = {
    primary: 'rgb(96 165 250)',
};
const SettingScreenStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Cài Đặt" component={SetScreen}
                options={{
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Stack.Screen name="Phản Hồi" component={SendFeedbackScreen}
                options={{
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Stack.Screen name="Hỗ Trợ" component={SupportScreen}
                options={{
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Stack.Screen name="Luật Lệ" component={CompanyRulesScreen}
                options={{
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Stack.Screen name="Giới Thiệu" component={CompanyIntroScreen}
                options={{
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Stack.Screen name="Đổi Mật Khẩu" component={ResetPassInAppScreen} />
        </Stack.Navigator>
    );
};
const BottomTabHR = () => {
    const [employees, setEmployees] = useState([]);
    const addEmployee = (employee) => {
        setEmployees((prevEmployees) => [...prevEmployees, employee]);
    };
    return (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="HR">
            <Tab.Screen
                name="HR"
                component={HRScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Entypo name="home" size={IconSize} color={focused ? COLOR.primary : 'gray'} />;
                    },
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name="notifications" size={IconSize} color={focused ? COLOR.primary : 'gray'} />;
                    },
                }}
            />
            <Tab.Screen
                name="Chấm Công"
                component={AttendanceScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Text style={{ borderRadius: 'full' }}>
                                <AntDesign name="qrcode" size={IconSize} color={focused ? COLOR.primary : 'gray'} />
                            </Text>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Self"
                component={SelfScreen}
                initialParams={{ name: 'Nguyễn Văn A' }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name="person-circle" size={IconSize} color={focused ? COLOR.primary : 'gray'} />;
                    },
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingScreenStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Feather name="settings" size={IconSize} color={focused ? COLOR.primary : 'gray'} />;
                    },
                }}
            />
            <Tab.Screen
                name="Success"
                component={SuccessScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name="Quản Lý Nhân Viên"
                component={EmployeeManagementScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Tab.Screen
                name="Quản lý chấm công và thời gian"
                component={AttendanceManagementScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Tab.Screen
                name="Quản lý lương và phúc lợi"
                component={SalaryManagementScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Tab.Screen
                name="Quản lý sự cố và yêu cầu"
                component={IncidentRequestManagementScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    headerLeft: () => null,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabHR