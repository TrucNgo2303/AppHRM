import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeScreen from '../../Employee/EmployeeScreen';
import { Entypo, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { NotificationScreen, SelfScreen } from '../../Tabbar';
import NghiPhep from '../../Employee/NghiPhep';
import SetScreen from '../../Tabbar/SetScreen';
import SendFeedbackScreen from '../../Setting/SendFeedbackScreen';
import SupportScreen from '../../Setting/SupportScreen';
import CompanyRulesScreen from '../../Setting/CompanyRulesScreen';
import CompanyIntroScreen from '../../Setting/CompanyIntroScreen';
import SuccessScreen from '../../Setting/SuccessScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPassInAppScreen from '../../Setting/ResetPassInApp';
import ImportantNoticeScreen from '../../Employee/ImportantNoticeScreen';
import NoticeDetail from '../../Employee/NoticeDetailScreen';
import WorkingHoursScreen from '../../Employee/WorkingHoursScreen';
import EmployeeBenefitsScreen from '../../Employee/EmployeeBenefitsScreen';
import SalaryIncreaseProposalScreen from '../../Employee/SalaryIncreaseProposalScreen';
import ErrorReport from '../../Employee/ErrorReport';
import AttendanceScreen from '../../Tabbar/AttendanceScreen';

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
            <Stack.Screen name="Phản Hồi" component={SendFeedbackScreen} />
            <Stack.Screen name="Hỗ Trợ" component={SupportScreen} />
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
const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Employee">
            <Tab.Screen
                name="Employee"
                component={EmployeeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Entypo name="home" size={IconSize} color={focused ? COLOR.primary : 'gray'} />;
                    },
                }}
            />
            <Tab.Screen
                name="Thông báo"
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
                name="Đơn Xin Nghỉ Phép"
                component={NghiPhep}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}

            />
            <Tab.Screen
                name="Thông báo công ty"
                component={ImportantNoticeScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}

            />
            <Tab.Screen
                name="NoticeDetail"
                component={NoticeDetail}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name="Thời gian làm việc"
                component={WorkingHoursScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#3399CC', // Đổi màu nền header
                    },
                }}
            />
            <Tab.Screen
                name="EmployeeBenefitsScreen"
                component={EmployeeBenefitsScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name="SalaryIncreaseProposalScreen"
                component={SalaryIncreaseProposalScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name="ErrorReport"
                component={ErrorReport}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
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
        </Tab.Navigator>
    )
}

export default BottomTab