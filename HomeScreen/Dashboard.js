import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function DashboardScreen({navigation}) {
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
          <Text style={styles.greetingText}>Hello, Andrew</Text>
          <Text style={styles.dateText}>It’s 02 Dec, Monday</Text>
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
        <TouchableOpacity style={styles.item}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.textDanger]}>
          <Text style={styles.textDanger}>Delete Account (Not recommend)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
