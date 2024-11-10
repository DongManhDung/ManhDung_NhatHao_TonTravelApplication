import { Ionicons } from "@expo/vector-icons";
import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {
  
  const [username, setUsername] = useState('');
  
  useEffect(() => { 
    const getUsername = async () => { 
      const name = await AsyncStorage.getItem('username'); 
      setUsername(name || ''); 
    }; 
    getUsername(); 
  }, []); 

  

  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => { 
    const formatDate = () => { 
      const date = new Date(); 
      const options = { 
        day: '2-digit', 
        month: 'short', 
        weekday: 'long' 
      }; 
      return date.toLocaleDateString('en-GB', options).replace(/,/g, ''); 
    }; 
    setCurrentDate(formatDate()); 
  }, []);

  const handleLogout = async () => { 
    await AsyncStorage.removeItem('isLoggedIn'); 
    await AsyncStorage.removeItem('username');
    Alert.alert('🟢 Success', 'You have been logged out successfully', [ 
      { text: 'OK', onPress: () =>  navigation.navigate('Login1') }, 
    ]); 
  };

  const confirmLogout = () => { Alert.alert( 
      'ℹ️ Logout', 'Are you sure you want to logout?',
      [ 
        { text: 'No', style: 'cancel' }, 
        { text: 'Yes', onPress: handleLogout }, 
      ], 
      { 
        cancelable: false 
      } 
    );
  }


  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}> Dashboard</Text>
      </View>
      <View style={styles.greetingContainer}>
        <Image
          source={require("../assets/ImgDesign/Home Screen/Avatar.png")}
          style={styles.avatar}
        />
        <View style={styles.greetingTextContainer}>
          <Text style={styles.greetingText}>Hello, {username}</Text>
          <Text style={styles.dateText}>It’s {currentDate}</Text>
        </View>
        <Image
          style={styles.imageLogo}
          resizeMode="contain"
          source={require("../assets/ImgDesign/tontravel-logo-zip-file/png/logo-no-background.png")}
        />
      </View>
      <View></View>

      <View style={styles.section}>
        <View style={styles.headerSection}>
          <Ionicons name="person-circle-outline" size={23} />
          <Text style={styles.sectionTitle}>Your account</Text>
        </View>
        <TouchableOpacity style={styles.item}>
          <Text>Personal Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>Update TonTravel Pro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>Discount Voucher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>Cashback Information</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.headerSection}>
          <Ionicons name="settings-outline" size={23} />
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>
        <TouchableOpacity style={styles.item}>
          <Text>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>Currency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>Notices</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.headerSection}>
          <Ionicons name="information-circle-outline" size={23} />
          <Text style={styles.sectionTitle}>Informations</Text>
        </View>
        <TouchableOpacity style={styles.item}>
          <Text>Our Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>Help Center</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.headerSection}>
          <Ionicons name="information-circle-outline" size={23} />
          <Text style={styles.sectionTitle}>Account Setup</Text>
        </View>
        <TouchableOpacity style={[styles.item, {width: '100%'}]} onPress={confirmLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.textDanger]}>
          <Text style={styles.textDanger}>Delete Account (Not recommend)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  textDanger: {
    // red color
    color: "red",
    backgroundColor: "#f9d7da",
  },
  container: {
    flex: 1,
    backgroundColor: "#98e1f0",
    padding: 16,
  },
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  imageLogo: {
    width: 200,
    height: 50,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 35,
    height: 50,
    marginRight: 10,
  },
  greetingTextContainer: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  headerSection: {
    flexDirection: "row"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    top: 2,
  },
  item: {
    backgroundColor: "#b1e9f4",
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
});
