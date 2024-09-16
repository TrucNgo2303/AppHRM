import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Login/LoginScreen';
import ForgotPasswordScreen from '../Login/ForgotPasswordScreen';
import CodeEmailScreen from '../Login/CodeEmailScreen';
import ResetPassScreen from '../Login/ResetPassScreen';
import MainScreen from '../MainScreen';
import BottomTab from './bottomTab';
import BottomTabHR from './bottomTabHR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
const Stack = createStackNavigator();

const Navigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Login"
                    options={{ headerShown: false }}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="ForgotPass"
                    options={{ headerShown: false }}
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen
                    name="CodeEmail"
                    options={{ headerShown: false }}
                    component={CodeEmailScreen}
                />
                <Stack.Screen
                    name="ResetPass"
                    options={{ headerShown: false }}
                    component={ResetPassScreen}
                />
                <Stack.Screen
                    name="Main"
                    options={{ headerShown: false }}
                    component={MainScreen}
                />
                <Stack.Screen
                    name="BottomTab"
                    options={{ headerShown: false }}
                    component={BottomTab}
                />
                <Stack.Screen
                    name="BottomTabHR"
                    options={{ headerShown: false }}
                    component={BottomTabHR}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default Navigator;
