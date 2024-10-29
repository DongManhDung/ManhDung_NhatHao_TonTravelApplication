import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import './gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Bỏ hết notification log
LogBox.ignoreAllLogs();



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Onboarding Screen
import OnBoarding from "./OnBoarding_Screen/OnBoarding.js";
import OnBoarding2 from "./OnBoarding_Screen/OnBoarding2.js";

// SignIn Screen
import Login from "./LoginScreen/Login.js";

export default function App() {
  return (
    <NavigationContainer initialRouteName="OnBoarding">
        <Stack.Navigator Navigator screenOptions={{headerShown: false}}>

            {/* OnBoarding Flow */}
            <Stack.Screen name='OnBoarding' component={OnBoarding}></Stack.Screen>
            <Stack.Screen name='OnBoarding2' component={OnBoarding2}></Stack.Screen>

            {/* SignIn Flow */}
            <Stack.Screen name='Login1' component={Login}></Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
