import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";

const promotions = [
  {
    id: "1",
    title: "CATHAY PACIFIC",
    description: "Currently, there is only one airline operating...",
    time: "13 March - 12 April",
    code: "CAPACI21018",
    image: require("../assets/ImgDesign/Promotion Screen/advertise 1.jpg"),
  },
  {
    id: "2",
    title: "JODOGO Airport Assist",
    description: "JODOGO operates flights to eleven year-round...",
    time: "Only: Sep 30, 2024",
    code: "JODOGO032024",
    image: require("../assets/ImgDesign/Promotion Screen/advertise 2.jpg"),
  },
  {
    id: "3",
    title: "Vietnam Grand Sale Offer",
    description: "Your trip to Vietnam might not be complete...",
    time: "Only: Every Oct, 2024",
    code: "VN472018",
    image: require("../assets/ImgDesign/Promotion Screen/advertise 3.jpg"),
  },
];

const PromotionScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.imageItem} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.time}>🕒 {item.time}</Text>
          <Text style={styles.code}>Code: {item.code}</Text>
          <View style={styles.iconAndButton}>
            {/* <Ionicons
              style={styles.icon}
              name="airplane"
              size={24}
              color="light-blue"
            /> */}
            <Image source={require('../assets/ImgDesign/Hotel Screen/Flash_deal_icon-removebg-preview.png')}
              style={{width: 24, height: 24}}></Image>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Use now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
        data={promotions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons
                style={styles.headerIcon}
                name="arrow-back-outline"
                size={24}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}> Promotion</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98e1f0",
    padding: 10,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {},
  card: {
    margin: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
  },
  imageItem: {
    width: 200,
    height: "100%",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    color: "grey",
  },
  code: {
    color: "blue",
  },
  iconAndButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "white",
    paddingHorizontal: 3,
    justifyContent: "space-between",
  },
  icon: {
    color: "blue",
  },
  button: {
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10
  },
  buttonText: {
    color: "#007aff",
  },
});

export default PromotionScreen;
