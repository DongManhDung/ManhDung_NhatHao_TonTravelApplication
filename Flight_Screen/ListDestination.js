import React, {useState} from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ScrollView} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIsto from "react-native-vector-icons/Fontisto";


const ListDestination = ({navigation, route}) => {
    const [searchDestination, setSearchDestination] = useState('');
    const { selectedFor, currentSelections } = route.params;
    const destinationData = [
        "Hồ Chí Minh (SGN)",
        "Hà Nội (HAN)",
        "Đà Nẵng (DAD)",
        "Nha Trang (CXR)",
        "Đà Lạt (DLI)",
        "Tokyo (HND)",
        "Narita (NRT)",
        "Sendai (SDJ)",
        "Sapporo (CTS)",
        "Okinawa (OKA)",
        "Fukuoka (FUK)",
        "Osaka (KIX)",
        "Seoul (ICN)",
        "Busan (PUS)",
        "Bangkok (BKK)",
        "Phuket (HKT)",
        "Chiang Mai (CNX)",
        "Singapore (SIN)",
        "Kuala Lumpur (KUL)",
        "Jakarta (CGK)",
        "Bali (DPS)",
        // Thêm một số sân bay tại đây
    ];
    
    // Lọc danh sách dựa trên searchText
    const filteredData = destinationData.filter(item => item.toLowerCase().startsWith(searchDestination.toLowerCase()));
    
    const handleSelect = (item) => {
        if (currentSelections.includes(item)) {
            Alert.alert("Error", "This value has been selected, please select a different value.");
            return;
          }
        // Điều hướng về HomeScreen và truyền dữ liệu đã chọn với `selectedFor`
        navigation.navigate('Flight1', {
          selectedValue: item,
          selectedFor: route.params?.selectedFor,
        });
      };

      
      
    return (
        <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
          <View style={style.container}>
            <View style={style.containerFlud}>
                    <View style={style.backGroup}>
                        <View style={style.backItem}>
                        <TouchableOpacity style={{ width: "10%", height: 35 }}
                        onPress={() => navigation.goBack()}
                        >
                            <AntIcon
                            name="arrowleft"
                            size={35}
                            style={{ bottom: 10 }}
                            ></AntIcon>
                        </TouchableOpacity>
                        </View>
                </View>
                <Image
                opacity={0.35}
                style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    position: "absolute",
                    zIndex: -1,
                }}
                source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
                ></Image>
        
                <View style={style.searchContainer}>
                    <TextInput style={style.search} placeholder="Search your destination" 
                    onChangeText={setSearchDestination} 
                    value={searchDestination}></TextInput>
                    <TouchableOpacity style={style.searchButton}>
                        <AntIcon name="search1" size={35}></AntIcon>
                    </TouchableOpacity>
                </View>

                <View style={{width: '95%'}}>
                        <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={style.destinationItemComponent}>
                                <TouchableOpacity style={style.destinationSelectButton} onPress={() => handleSelect(item)}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            </View>
                        )}>
                        </FlatList>
                </View>
        </View>
        
          </View>
        </ScrollView>
    );
};

export default ListDestination;


const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
      },
      containerFlud: {
        width: "100%",
        backgroundColor: "#CAF0F8",
        // display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        rowGap: 5,
      },
      backGroup: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      },
      backItem: {
        width: "95%",
        height: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "flex-end",
      },
      searchContainer: {
        width: "95%",
        height: 40,
        backgroundColor: "#ADE8F4",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
      },
      search: {
        width: "100%",
        height: 40,
        borderWidth: 0.5,
        borderColor: "gray",
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 10,
      },
      searchButton: {
        width: '20%',
        height: 40,
        justifyContent: "center",
        alignItems: 'center',
        position: "absolute",
        right: 0,
      },
      destinationItemComponent: {
        width: "100%",
        height: 50,
        backgroundColor: "#ADE8F4",
        justifyContent: "center",
        alignItems: "flex-start",
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "gray",
        marginTop: 5,
        borderRadius: 3,
        paddingHorizontal: 10,
      },
      destinationSelectButton: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "flex-start",
      },
});