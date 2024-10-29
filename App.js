import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import './gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


LogBox.ignoreAllLogs();



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Onboarding Screen
import OnBoarding from "./OnBoarding_Screen/OnBoarding.js";

export default function App() {
  return (
    <NavigationContainer initialRouteName="OnBoarding">
        <Stack.Navigator Navigator screenOptions={{headerShown: false}}>

            {/* OnBoarding Flow */}
            <Stack.Screen name='OnBoarding' component={OnBoarding}></Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
