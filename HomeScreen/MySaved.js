import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const favouriteList = [
  {
    id: "1",
    title: "Tokyo",
    location: "Japan, Southwest Asia",
    locationsCount: "3 Locations",
    image: require("../assets/ImgDesign/Tour Screen/Tokyo/Tokyo_sensoji.jpg"),
  },
  {
    id: "1",
    title: "Tokyo",
    location: "Japan, Southwest Asia",
    locationsCount: "3 Locations",
    image: require("../assets/ImgDesign/Tour Screen/Tokyo/Tokyo_sensoji.jpg"),
  },
  {
    id: "1",
    title: "Tokyo",
    location: "Japan, Southwest Asia",
    locationsCount: "3 Locations",
    image: require("../assets/ImgDesign/Tour Screen/Tokyo/Tokyo_sensoji.jpg"),
  },
];

const historyList = [
  {
    id: "1",
    title: "Nusa Pedina",
    location: "Bali, Indonesia",
    rating: "4.8",
    ratingText: "Good",
    ratingCount: "3,000 Ratings",
    image: require("../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg"),
  },
  {
    id: "2",
    title: "Nusa Pedina",
    location: "Bali, Indonesia",
    rating: "4.8",
    ratingText: "Good",
    ratingCount: "3,000 Ratings",
    image: require("../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg"),
  },
  {
    id: "3",
    title: "Nusa Pedina",
    location: "Bali, Indonesia",
    rating: "4.8",
    ratingText: "Good",
    ratingCount: "3,000 Ratings",
    image: require("../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg"),
  },
  {
    id: "4",
    title: "Nusa Pedina",
    location: "Bali, Indonesia",
    rating: "4.8",
    ratingText: "Good",
    ratingCount: "3,000 Ratings",
    image: require("../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg"),
  },
  {
    id: "5",
    title: "Nusa Pedina",
    location: "Bali, Indonesia",
    rating: "4.8",
    ratingText: "Good",
    ratingCount: "3,000 Ratings",
    image: require("../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg"),
  },
  {
    id: "6",
    title: "Nusa Pedina",
    location: "Bali, Indonesia",
    rating: "4.8",
    ratingText: "Good",
    ratingCount: "3,000 Ratings",
    image: require("../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg"),
  },
  {
    id: "7",
    title: "Nusa Pedina",
    location: "Bali, Indonesia",
    rating: "4.8",
    ratingText: "Good",
    ratingCount: "3,000 Ratings",
    image: require("../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg"),
  },
];

const MySavedScreen = () => {
  const [activeTab, setActiveTab] = useState("Favourite List");

  const renderFavouriteItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.imageItem} />
        <View style={styles.content}>
          <Text style={styles.locationsCount}>{item.locationsCount}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.trashIcon}>
        <Ionicons name="trash" size={25} color="#2574ac" />
      </TouchableOpacity>
    </Card>
  );

  const renderHistoryItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.imageItem} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <Text style={styles.ratingText}>{item.ratingText}</Text>
            <Text style={styles.ratingCount}>{item.ratingCount}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Thanh điều hướng */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Saved</Text>
        {activeTab === "History"}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Favourite List" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Favourite List")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Favourite List" && styles.activeTabText,
            ]}
          >
            Favourite List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "History" && styles.activeTabText,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
      {activeTab === "Favourite List" ? (
        <FlatList
          data={favouriteList}
          keyExtractor={(item) => item.id}
          renderItem={renderFavouriteItem}
        />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        >
          <Text style={styles.previousText}>Previous</Text>
          <FlatList
            data={historyList}
            keyExtractor={(item) => item.id}
            renderItem={renderHistoryItem}
          />
        </ScrollView>
      )}
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
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  delete: {
    color: "red",
  },
  tabs: {
    marginHorizontal: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#023E8A",

  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: "#023E8A",
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    position: "relative",
  },
  trashIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  imageItem: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  locationsCount: {
    color: "black",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  location: {
    color: "grey",
  },
  previousText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    color: "#f39c12",
  },
  ratingText: {
    color: "green",
    marginLeft: 10,
  },
  ratingCount: {
    color: "grey",
    marginLeft: 10,
  },
});

export default MySavedScreen;
