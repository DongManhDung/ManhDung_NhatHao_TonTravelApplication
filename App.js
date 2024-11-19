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
import SignUp from "./LoginScreen/SignUp.js";
import signUpSucessScreen from "./LoginScreen/signUpSucessScreen.js";
import ResetPassword from "./LoginScreen/ResetPassword.js";
import VerifyCodeScreen from "./LoginScreen/VerifyCodeScreen.js";
import NewPasswordScreen from "./LoginScreen/NewPasswordScreen.js";
import NoticePasswordChanged from "./LoginScreen/NoticePasswordChanged.js";
import FaceScanScreen from "./LoginScreen/FaceScanScreen.js";

// Home screen
import Home from "./HomeScreen/Home.js";
import Promotion from "./HomeScreen/Promotion.js";
import MySaved from "./HomeScreen/MySaved.js";
import Dashboard from "./HomeScreen/Dashboard.js";

// Flight screen
import Flight1 from './Flight_Screen/Flight1.js';
import Flight2 from './Flight_Screen/Flight2.js';
import Flight3 from './Flight_Screen/Flight3.js';
import Flight4 from './Flight_Screen/Flight4.js';
import Flight5 from './Flight_Screen/Flight5.js';
import Flight6 from './Flight_Screen/Flight6.js';
import ListDestination from './Flight_Screen/ListDestination.js';
import Flight7 from './Flight_Screen/Flight7.js';

// Hotel Screen
import HotelScreen1 from './HotelScreen/HotelScreen1.js';
import HotelScreen2 from './HotelScreen/HotelScreen2.js';

// Tour Screen + Activity Screen
import BestLocationScreen1 from './Tour_ActivityScreen/BestLocationScreen1.js';
import DetailLocationScreen from './Tour_ActivityScreen/DetailLocationScreen.js';

//AI Screen
import TonTravelAIScreen from './AISupportScreen/TonTravelAIScreen.js';
import CustomHeader from './AISupportScreen/CustomHeader.js';

export default function App() {
  return (
    <NavigationContainer initialRouteName="OnBoarding">
        <Stack.Navigator Navigator screenOptions={{headerShown: false}}>

            {/* OnBoarding Flow */}
            <Stack.Screen name='OnBoarding' component={OnBoarding}></Stack.Screen>
            <Stack.Screen name='OnBoarding2' component={OnBoarding2}></Stack.Screen>

            {/* SignIn Flow */}
            <Stack.Screen name='Login1' component={Login}></Stack.Screen>
            <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
            <Stack.Screen name='signUpSucessScreen' component={signUpSucessScreen}></Stack.Screen>
            <Stack.Screen name='ResetPassword' component={ResetPassword}></Stack.Screen>
            <Stack.Screen name='VerifyCodeScreen' component={VerifyCodeScreen}></Stack.Screen>
            <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen}></Stack.Screen>
            <Stack.Screen name='NoticePasswordChanged' component={NoticePasswordChanged}></Stack.Screen>
            <Stack.Screen name='FaceScanScreen' component={FaceScanScreen}></Stack.Screen>

            {/* Home Screen */}
            <Stack.Screen name='Home' component={Home}></Stack.Screen>
            <Stack.Screen name='Promotion' component={Promotion}></Stack.Screen>
            <Stack.Screen name='MySaved' component={MySaved}></Stack.Screen>
            <Stack.Screen name='Dashboard' component={Dashboard}></Stack.Screen>

            {/* Flight Screen */}
            <Stack.Screen name='Flight1' component={Flight1}></Stack.Screen>
            <Stack.Screen name='Flight2' component={Flight2}></Stack.Screen>
            <Stack.Screen name='Flight3' component={Flight3}></Stack.Screen>
            <Stack.Screen name='Flight4' component={Flight4}></Stack.Screen>
            <Stack.Screen name='Flight5' component={Flight5}></Stack.Screen>
            <Stack.Screen name='Flight6' component={Flight6}></Stack.Screen>
            <Stack.Screen name='Flight7' component={Flight7}></Stack.Screen>
            <Stack.Screen name='ListDestination' component={ListDestination}></Stack.Screen>

            {/* Hotel Screen */}
            <Stack.Screen name='HotelScreen1' component={HotelScreen1}></Stack.Screen>
            <Stack.Screen name='HotelScreen2' component={HotelScreen2}></Stack.Screen>

            {/* Tour Screen + Activity Screen */}
            <Stack.Screen name='BestLocationScreen1' component={BestLocationScreen1}></Stack.Screen>
            <Stack.Screen name='DetailLocationScreen' component={DetailLocationScreen}></Stack.Screen>

            {/* AI Screen */}
            <Stack.Screen name='TonTravelAIScreen' component={TonTravelAIScreen}></Stack.Screen>


        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
