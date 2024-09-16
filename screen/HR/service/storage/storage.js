import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
    try {
        let result = value;
        if (typeof value !== 'string') result = JSON.stringify(value);
        await AsyncStorage.setItem(key, result);
    } catch (error) {
        console.log('error storing value', error);
    }
};

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log('error retrieving value', error);
    }
};

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('error deleting value', error);
    }
};