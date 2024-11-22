import react, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView
} from "react-native";
import Checkbox from "expo-checkbox";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIsto from "react-native-vector-icons/Fontisto";
import { FlatList } from "react-native-gesture-handler";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import moment from 'moment';
import apiRequest from '../Service/ApiService';




const Flight1 = ({navigation, route}) => {
  

  const {text1, text2, selectedDate, totalPassengers, adultCount , childCount, username} = route.params;
  console.log(adultCount + ' Adult');
  console.log(childCount + ' Child');

  const yesterday2date = moment(selectedDate, 'ddd, MMM DD, YYYY').clone().subtract(2, 'days');
  const yesterdayDate = moment(selectedDate, 'ddd, MMM DD, YYYY').clone().subtract(1, 'days');
  const currentDate = moment(selectedDate, 'ddd, MMM DD, YYYY');
  const tomorrowDate = moment(selectedDate, 'ddd, MMM DD, YYYY').clone().add(1, 'days');
  const tomorrow2Date = moment(selectedDate, 'ddd, MMM DD, YYYY').clone().add(2, 'days');


  const yesterday2 = moment(currentDate).clone().subtract(2, 'days').format('DD MMM');
  const yesterday = moment(currentDate).clone().subtract(1, 'days').format('DD MMM');
  const today = moment(currentDate).format('DD MMM');
  const tomorrow = moment(currentDate).clone().add(1, 'days').format('DD MMM');
  const tomorrow2 = moment(currentDate).clone().add(2, 'days').format('DD MMM');


  const [selectedCategory, setSelectedCategory] = useState(today);
  
  const categories = [
    {
      id: 1,
      name: yesterday2,
      price: 'From 3.252.292'
    },
    {
      id: 2,
      name: yesterday,
      price: 'From 3.252.292'
    },
    {
      id: 3,
      name: today,
      price: 'From 3.252.292'
    },
    {
      id: 4,
      name: tomorrow,
      price: 'From 3.252.292'
    },
    {
      id: 5,
      name: tomorrow2,
      price: 'From 3.252.292'
    }
  ];
  


  const ChooseDayComponent = ({item}) => {
    return (
      <View style={{justifyContent : 'center'}}>
          <TouchableOpacity 
          style={[style.slideItem, selectedCategory === item.name && style.selectedCategory]}
          onPress={() => setSelectedCategory(item.name)}>
            <Text style={style.toolText}>{item.name}</Text>
            <Text style={style.toolText}>{item.price}&#8363;</Text>
          </TouchableOpacity>
      </View>
    );
  };

  //api get all flight data
  const [allFlight, setAllFlight] = useState([]);

  const getFlightData = async () => {
    try {
      const response = await apiRequest('/getAllFlightsByDepAndDesAndClass', 'GET', null, {
        text1: text1,
        text2: text2,
      });
      console.log('API Response:', response);  // Log kết quả để kiểm tra
      setAllFlight(response);
    } catch (error) {
      console.error('ERROR fetching recent searches: ', error);
    }
  };
  

  useEffect(() => {
    getFlightData();
  }, [])



  

  return (
    <ScrollView showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    >
      <View style={style.container}>
        <View style={style.containerFlud}>
          <View style={style.backGroup}>
            <View style={style.backItem}>
              <TouchableOpacity
                style={{ width: "10%", height: 35 }}
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
              height: 120,
              objectFit: "cover",
              position: "absolute",
              zIndex: -1,
            }}
            source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
          ></Image>

          <View style={style.destinationContainer}>
            <View style={style.destinationFlud}>
              <View style={style.destinationItem}>
                <Text style={[style.destinationText, {fontWeight: 'bold'}]}>{text1}</Text>
              </View>

              <View style={style.destinationItem}>
                <Text style={style.destinationText}>To</Text>
              </View>

              <View style={style.destinationItem}>
                <Text style={[style.destinationText, {fontWeight: 'bold'}]}>{text2}</Text>
              </View>

              <View
                style={[
                  style.destinationItem,
                  { flexDirection: "row", columnGap: 10 },
                ]}
              >
                <Text style={style.destinationText}>{selectedDate}</Text>
                <Text style={style.destinationText}>*</Text>
                <Text style={style.destinationText}>
                  {totalPassengers} Passengers
                </Text>
              </View>
            </View>
          </View>

          <View style={style.slideContainer}>
            <ScrollView
              horizontal
              contentContainerStyle={{ columnGap: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((item) => (
                <ChooseDayComponent
                  item={item}
                  key={item.name}
                ></ChooseDayComponent>
              ))}
            </ScrollView>
          </View>

          <ScrollView style={style.flightInfoContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {/* Log all flight here */}
            {allFlight.length > 0 &&
              allFlight.map((search, index) => (
                <>
                  <TouchableOpacity
                    style={style.flightInfoItem}
                    onPress={() => {
                      if (selectedCategory.includes(today)) {
                        const dateFormat = currentDate;
                        navigation.navigate("Flight4", {
                          item: search,
                          selectedDate: dateFormat,
                          seatClass: search.class,
                          totalPassengers: totalPassengers,
                          adultCount: adultCount,
                          childCount: childCount,
                          username: username
                        });
                      } else if (selectedCategory.includes(tomorrow)) {
                        const dateFormat = tomorrowDate;
                        navigation.navigate("Flight4", {
                          item: search,
                          selectedDate: dateFormat,
                          seatClass: search.class,
                          totalPassengers: totalPassengers,
                          adultCount: adultCount,
                          childCount: childCount,
                          username: username
                        });
                      } else if (selectedCategory.includes(tomorrow2)) {
                        const dateFormat = tomorrow2Date;
                        navigation.navigate("Flight4", {
                          item: search,
                          selectedDate: dateFormat,
                          seatClass: search.class,
                          totalPassengers: totalPassengers,
                          adultCount: adultCount,
                          childCount: childCount,
                          username: username
                        });
                      } else if (selectedCategory.includes(yesterday)) {
                        const dateFormat = yesterdayDate;
                        navigation.navigate("Flight4", {
                          item: search,
                          selectedDate: dateFormat,
                          seatClass: search.class,
                          totalPassengers: totalPassengers,
                          adultCount: adultCount,
                          childCount: childCount,
                          username: username
                        });
                      } else if (selectedCategory.includes(yesterday2)) {
                        const dateFormat = yesterday2date;
                        navigation.navigate("Flight4", {
                          item: search,
                          selectedDate: dateFormat,
                          seatClass: search.class,
                          totalPassengers: totalPassengers,
                          adultCount: adultCount,
                          childCount: childCount,
                          username: username
                        });
                      }
                    }}
                  >
                    <View style={style.logoImageContainer}>
                      <Image
                        source={{ uri: search.logo }}
                        style={{
                          width: "90%",
                          height: "50%",
                          resizeMode: "contain",
                        }}
                      ></Image>
                    </View>

                    <View style={style.scheduleContainer}>
                      <View style={style.scheduleItem}>
                        <Text style={style.scheduleText}>
                          {search.timeStart}
                        </Text>
                        <View
                          style={{
                            width: "30%",
                            height: 30,
                            flexDirection: "column",
                          }}
                        >
                          <Image
                            style={{ width: "100%", height: 15, objectFit: "cover" }}
                            source={require("../assets/ImgDesign/Flight Screen/Half arrow.jpg")}
                          ></Image>
                          <Text
                            style={[
                              style.blurText,
                              { width: "100%", fontSize: 15, bottom: 2 },
                            ]}
                          >
                            {search.duration}
                          </Text>
                        </View>

                        <Text style={style.scheduleText}>{search.timeEnd}</Text>
                      </View>

                      <View style={style.scheduleItem}>
                        <Text style={[style.scheduleText, style.blurText]}>
                          {search.startPlace}
                        </Text>
                        <View
                          style={{
                            width: "40%",
                            height: 20,
                            flexDirection: "column",
                          }}
                        ></View>
                        <Text style={[style.scheduleText, style.blurText]}>
                          {search.endPlace}
                        </Text>
                      </View>

                      <View
                        style={[
                          style.scheduleItem,
                          {
                            justifyContent: "flex-start",
                            flexDirection: "row",
                          },
                        ]}
                      >
                        <Text style={{fontSize: 13}}>{search.airline}</Text>
                      </View>

                      {(search.notePrice || search.noteFast) && (
                        <View
                          style={{
                            position: "absolute",
                            zIndex: 1,
                            padding: 5,
                            right: 10,
                            bottom: 5,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          {search.notePrice && (
                            <View style={{ marginHorizontal: 5 }}>
                              <Text
                                style={{ fontSize: 11, padding: 5,backgroundColor: "cyan", borderRadius: 5, color: "#023E8A", backgroundColor: '#90E0EF'}}>
                                {search.notePrice}
                              </Text>
                            </View>
                          )}

                          {search.noteFast && (
                            <View style={{ marginHorizontal: 5 }}>
                              <Text style={{ fontSize: 11, padding: 5,backgroundColor: "cyan", borderRadius: 5, color: "#023E8A", backgroundColor: '#90E0EF'}}>
                                {search.noteFast}
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>

                    <View style={style.costContainer}>
                      <View style={style.costContainerFlud}>
                        <Text style={style.textLineThrough}>
                          {search.originalPrice} &#8363;
                        </Text>
                        <Text style={style.textCost}>
                          {search.discountPrice} &#8363;
                        </Text>
                        <TouchableOpacity style={style.flightDetailsGroup}>
                          <Text style={style.toolText}>Choose</Text>
                          <AntIcon
                            name="right"
                            style={{ fontSize: 20, color: "#023E8A" }}
                          ></AntIcon>
                        </TouchableOpacity>
                      </View>

                      <View style={[style.costContainer,{position: "absolute", zIndex: 1, left: 0, width: '45%', justifyContent: 'center', alignItems: 'center'}]}>
                          <Text style={{padding: 10, borderRadius: 5, backgroundColor: '#e3f2fd'}}>{search.class}</Text>
                      </View>
                    </View>
                    
                  </TouchableOpacity>
                </>
              ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Flight1;

const style = StyleSheet.create({
  selectedCategory: {
    backgroundColor: '#90E0EF',
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerFlud: {
    width: "100%",
    backgroundColor: "#CAF0F8",
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
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    bottom: 15,
    letterSpacing: 0.75,
  },
  destinationContainer: {
    width: "100%",
    height: 100,

    justifyContent: "center",
    alignItems: "center",
    top: 3
  },
  destinationFlud: {
    width: '95%',
    height: '100%',
    backgroundColor: "transparent",
  },
  destinationItem: {
    width: '100%',
    height: '25%',
  },
  destinationText: {
    fontSize: 16,
    letterSpacing: 0.75,
  },
  toolContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    
    // backgroundColor: "lime",
  },
  toolFlud: {
    width: '95%',
    height: '100%',
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "gray",
    borderStyle: "solid",
    borderRadius: 10,
  },
  toolItem: {
    width: '33.5%',
    height: '100%',
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "gray",
    borderRightWidth: 0.5,
    borderRightWidth: 0.5,
    flexDirection: "row",
    columnGap: 5,
  },
  toolText: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.25,
    color: "#023E8A",
    textAlign: "center",
  },
  slideContainer: {
    width: "100%",
    flexDirection: "row",
    height: 60,
    marginTop: 5,
  },
  slideItem: {
    width: "100%",
    height: "95%",
    backgroundColor: "#D9D9D9",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 10,
    paddingHorizontal: 10
  },
  flightInfoContainer: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "white",
    flexDirection: "column",
  },
  flightInfoItem: {
    width: "100%",
    height: 100,
    // backgroundColor: "cyan",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    borderStyle: "solid",
    flexDirection: "row",
  },
  logoImageContainer: {
    width: '20%',
    height: '100%',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scheduleContainer: {
    width: '45%',
    height: '100%',
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  scheduleItem: {
    width: '100%',
    height: 32,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "cyan",
  },
  scheduleText: {
    fontSize: 17,
    letterSpacing: 0.75,
    height: '100%',

  },
  blurText: {
    color: "#808080",
  },

  costContainer: {
    width: '35%',
    height: '100%',
    backgroundColor: "#D9D9D9",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  costContainerFlud:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textLineThrough: {
    textDecorationLine: "line-through",
  },
  textCost: {
  fontSize: 18,
  color: '#A40303'
  },
  flightDetailsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
