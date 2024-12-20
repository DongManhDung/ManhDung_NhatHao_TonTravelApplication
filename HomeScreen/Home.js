import react, {useEffect, useState} from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Promotion from "./Promotion";
import MySaved from "./MySaved";
import Dashboard from "./Dashboard.js";
import { Audio } from 'expo-av';
import SuperPromotionDialog from "../Dialog/SuperPromotionDialog";
import TonTravelAIScreen from "../AISupportScreen/TonTravelAIScreen.js";
import Entypo from 'react-native-vector-icons/Entypo';
import CustomHeader from "../AISupportScreen/CustomHeader.js";

const Tab = createBottomTabNavigator();

const HomeComponent = ({navigation}) => {

    const [username, setUsername] = useState('');

    useEffect(() => { 
        const getUsername = async () => { 
            const name = await AsyncStorage.getItem('username'); 
            setUsername(name || ''); 
        };
        getUsername(); 
    }, []);

    return(<ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={style.container}>
            
           <View style={style.imgHeaderContainer}>
               <Image
               style={style.image}
               opacity={0.2}
               source={require('../assets/ImgDesign/Home Screen/Home.jpg')}></Image>
           </View>
           
           <View style={style.emptyGroup}>
            </View>
           <View style={style.greetingUserContainer}>
               <View style={style.greetingUserFlud}>
                   <View style={style.greetingUserLeftItem}>
                           <Image 
                           style={style.miniLogoLeft}
                           source={require('../assets/ImgDesign/tontravel-logo-zip-file/RemoveBg/logo.png')}></Image>
                       <Text style={style.text}>Have a nice day!</Text>
                       <View style={style.userGroup}>
                           <Image 
                           style={style.icon4040}
                           source={require('../assets/ImgDesign/Home Screen/Avatar.png')}></Image>
                           <Text style={style.userText}>{username}</Text>
                       </View>
                       
                   </View>

                   <View style={[style.greetingUserRightItem]}>
                       <TouchableOpacity style={style.notificationContainer}>
                           <Image 
                           style={[style.icon4040]}
                           source={require('../assets/ImgDesign/Home Screen/notification-vector-icon-removebg-preview.png')}></Image>

                           
                       </TouchableOpacity>
                   </View>
               </View>
           </View>


           <View style={style.menuContainer}>
               <View style={style.menuFlud}>
                   <Text style={style.menuText}>Service</Text>
                   <TouchableOpacity>
                       <AntIcon name='arrowright' size={30}></AntIcon>
                   </TouchableOpacity>
               </View>
           </View>

           <View style={style.optionContainer}>
               <View style={style.optionFlud}>
                   <View style={[style.optionItem, {borderWidth: 0}]}>
                       <View style={style.optionRowGroup}>
                           <TouchableOpacity style={style.optionSubItem}
                           onPress={() => {
                            navigation.navigate('Flight1', {username: username});
                            console.log(username);
                            }}
                           >
                               <Image 
                               style={[style.image, style.containImage]}
                               source={require('../assets/ImgDesign/Home Screen/Service/Flight.png')}></Image>
                               <Text style={[style.serviceText,{position: 'absolute', bottom: 25, left: 25}]}>Flight</Text>
                           </TouchableOpacity>

                           <TouchableOpacity style={style.optionSubItem}
                           onPress={() => navigation.navigate('HotelScreen1')}
                           >
                               <Image 
                               style={[style.image, style.containImage]}
                               source={require('../assets/ImgDesign/Home Screen/Service/Hotel-removebg-preview.png')}></Image>
                               <Text style={[style.serviceText,{position: 'absolute', top: 10, left: 10}]}>Hotel</Text>
                           </TouchableOpacity>
                       </View>
                   </View>
                   <TouchableOpacity style={[style.optionItem]}
                   onPress={() => navigation.navigate('BestLocationScreen1')}
                   >
                                   <Image 
                                   style={[style.image, style.containImage]}
                                   source={require('../assets/ImgDesign/Home Screen/Service/tour.png')}></Image>
                                   <Text style={[style.serviceText,{position: 'absolute', left: 10, width: '30%'}]}>Tour + Activity</Text>
                   </TouchableOpacity>
               </View>
           </View>

           <View style={style.menuContainer}>
               <View style={style.menuFlud}>
                   <Text style={style.menuText}>Special Deals</Text>
                   <TouchableOpacity>
                       <AntIcon name='arrowright' size={30}></AntIcon>
                   </TouchableOpacity>
               </View>
           </View>

           <View style={style.optionContainer}>
               <View style={style.optionFlud}>
                   <View style={[style.optionItem, {borderWidth: 0}]}>
                       <View style={style.optionRowGroup}>
                           <TouchableOpacity style={[style.optionSubItem, style.noRadius]}>
                               <Image 
                               style={[style.image]}
                               source={require('../assets/ImgDesign/Promotion Screen/advertise 1.jpg')}></Image>
                           </TouchableOpacity>

                           <TouchableOpacity style={[style.optionSubItem, style.noRadius]}>
                               <Image 
                               style={[style.image]}
                               source={require('../assets/ImgDesign/Promotion Screen/advertise 3.jpg')}></Image>

                           </TouchableOpacity>
                       </View>
                   </View>
               </View>
           </View>

       </View>
       
      </ScrollView>);
};


const Home = ({navigation}) => {

    const [sound, setSound] = useState(null);
    const [isDialogVisible, setDialogVisible] = useState(false);

    useEffect(() => { 
        const checkLoginStatus = async () => { 
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn'); 
            if (isLoggedIn !== 'true') { 
                navigation.navigate('Login1'); 
            } 
        }; 
        checkLoginStatus(); 
        setDialogVisible(true); 
    }, [navigation]);

    const handleCloseDialog = () => { 
        setDialogVisible(false); 
    };

    const playSound = async () => { const { sound } = await Audio.Sound.createAsync( 
        require('../assets/music/short_click.mp3') 
    ); 
        setSound(sound); 
        await sound.playAsync();
    };
    

    useEffect(() => { 
        return sound ? () => { 
            sound.unloadAsync(); 
        } 
            : undefined; 
    }, [sound]); 
    
    const handleTabPress = async () => { 
        await playSound(); 
    };

    return (
        <View style={{flex: 1}}>
            <SuperPromotionDialog isVisible={isDialogVisible} onClose={handleCloseDialog} />
            <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: '#CAF0F8'} ,tabBarActiveTintColor: "black", tabBarShowLabel: true}}>
                        <Tab.Screen name="HomeComponent" component={HomeComponent} options={{tabBarLabel: 'Home', tabBarIcon: ({color}) => 
                            (<MaterialCommunityIcons name="home" color={color} size={35}/>),}}
                        listeners={{tabPress: handleTabPress}}
                        >
                        </Tab.Screen>
                        
                        <Tab.Screen name="Promotion" component={Promotion} options={{tabBarLabel: 'Voucher', tabBarIcon: ({color}) => 
                            (<MaterialCommunityIcons name="sale" color={color} size={35}/>),}}
                        listeners={{tabPress: handleTabPress}}
                        >
                        </Tab.Screen>

                        <Tab.Screen name="MySaved" component={MySaved} options={{tabBarLabel: 'My Saved', tabBarIcon: ({color}) =>
                            (<MaterialCommunityIcons name="heart" color={color} size={35}/>),}}
                        listeners={{tabPress: handleTabPress}}    
                        >
                        </Tab.Screen>

                        <Tab.Screen name="TonTravelAIScreen" component={TonTravelAIScreen} options={{tabBarLabel: 'Yuta AI', tabBarIcon: ({color}) =>
                            (<Entypo name="baidu" color={color} size={35} ></Entypo>), headerShown: true,
                        header: () => <CustomHeader />}}
                        listeners={{tabPress: handleTabPress}}  
                        
                        > 
                        </Tab.Screen>

                        <Tab.Screen name="Dashboard" component={Dashboard} options={{tabBarLabel: 'More', tabBarIcon: ({color}) =>
                            (<MaterialCommunityIcons name="account-circle-outline" color={color} size={35}/>),}}
                        listeners={{tabPress: handleTabPress}}  
                        > 
                        </Tab.Screen>

            </Tab.Navigator>
        </View>
    );
    
};

export default Home;

const style = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    noRadius: {
        borderRadius: 0,
    },
    containImage: {
        objectFit: "contain",
    },
    miniLogoLeft: {
        width: '100%',
        height: '35%',
        objectFit: "cover",
    },
    icon4040: {
        width: 40,
        height: 40,
    },
    text: {
        fontSize: 18,
        letterSpacing: 0.75,
    },
    userText: {
        fontSize: 27,
        letterSpacing: 1,
    },
    menuText: {
        fontWeight: "bold",
        fontSize: 25,
        letterSpacing: 1,
    },
    serviceText: {
        fontSize: 25,
        letterSpacing: 1.5,
    },
    notificationContainer: {
        width: 40, 
        height: 40, 
        borderRadius: 50,
        backgroundColor: "white",
    },
    container: {
        width: "100%",
        height: 1200,
        backgroundColor: "#CAF0F8",
    },
    imgHeaderContainer: {
        width: "100%",
        height: 250,
    },
    emptyGroup: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
      },
    greetingUserContainer: {
        width: "100%",
        height: 250,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    greetingUserFlud: {
        width: "95%",
        height: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    greetingUserLeftItem: {
        width: "50%",
        height: "80%",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        rowGap: 12,
    },
    greetingUserRightItem: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "column",
    },
    userGroup: {
        width: "100%",
        height: "30%",
        flexDirection: "row",
        alignItems: "center",
    },
    menuContainer: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    menuFlud: {
        width: "95%",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        // backgroundColor: "yellow",
    },

    optionContainer: {
        width: "100%",
        height: 350,
        justifyContent: "center",
        alignItems: "center",
    },

    optionFlud: {
        width: "95%",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
    },
    optionItem: {
        width: "100%",
        height: "48%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 20,
    },

    optionRowGroup: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },

    optionSubItem: {
        width: "48%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "white",
    },
});