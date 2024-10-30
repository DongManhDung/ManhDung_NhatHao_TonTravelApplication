import react, {useState} from "react";
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




const Flight1 = ({navigation, route}) => {
  

  const {text1, text2, selectedDate, seatClass, totalPassengers} = route.params;

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


  const flightData = [
    {
      id: 1,
      logo: require("../assets/ImgDesign/Flight Screen/Airplane Logo/vietjetAir.png"),
      airlineImage: require("../assets/ImgDesign/Flight Screen/Airplane Image/Vietjet_Air_Airplane-removebg-preview.png"),
      dateTime: [today,tomorrow,tomorrow2],
      timeStart: "16:30",
      timeEnd: "01:00",
      startPlaceFullName: "Hồ Chí Minh",
      startPlace: "SGN",
      endPlaceFullName: "Tokyo",
      endPlace: "HND",
      airline: "Vietjet Air",
      duration: '8h30m',
      originalPrice: '3.376.198',
      discountPrice: '3.252.292',
      direct: 'Direct',
      class: 'Economy',
      carryOnBaggage: '1 piece per person, 7kg per piece',
      checkedBaggage: '10kg per item'
    },
    {
      id: 2,
      logo: require("../assets/ImgDesign/Flight Screen/Airplane Logo/vietjetAir.png"),
      airlineImage: require("../assets/ImgDesign/Flight Screen/Airplane Image/Vietjet_Air_Airplane-removebg-preview.png"),
      dateTime: [today, yesterday, yesterday2],
      timeStart: "23:20",
      timeEnd: "07:40",
      startPlaceFullName: "Hồ Chí Minh",
      startPlace: "SGN",
      endPlaceFullName: "Tokyo",
      endPlace: "NRT",
      airline: "Vietjet Air",
      duration: '6h20m',
      originalPrice: '4.090.970',
      discountPrice: '3.940.831',
      direct: '2 Stops',
      class: 'Economy',
      carryOnBaggage: '1 piece per person, 7kg per piece',
      checkedBaggage: '10kg per item'
    },
    {
      id: 3,
      logo: require("../assets/ImgDesign/Flight Screen/Airplane Logo/VnAirlines.png"),  
      airlineImage: require("../assets/ImgDesign/Flight Screen/Airplane Image/Vn_Airlines_Airplane-removebg-preview.png"),
      dateTime: [today, tomorrow, tomorrow2, yesterday, yesterday2],
      timeStart: "00:05",
      timeEnd: "08:00",
      startPlaceFullName: "Hồ Chí Minh",
      startPlace: "SGN",
      endPlaceFullName: "Tokyo",
      endPlace: "NRT",
      airline: "Vietnam Airlines",
      duration: '7h55m',
      originalPrice: '7.169.528',
      discountPrice: '6.768.177',
      direct: 'Direct',
      class: 'Business',
      carryOnBaggage: '1 piece per person, 10kg per piece',
      checkedBaggage: '23kg per item',
      boardingPass: require("../assets/ImgDesign/Flight Screen/Payment/VN Airlines Flight Ticket.png"),
    },
    {
      id: 4,
      logo: require("../assets/ImgDesign/Flight Screen/Airplane Logo/ANA logo.jpg"),
      airlineImage: require("../assets/ImgDesign/Flight Screen/Airplane Image/All_Nippon_Airways_Airplane-removebg-preview.png"),
      dateTime: [today, tomorrow2, yesterday],
      timeStart: "07:00",
      timeEnd: "23:00",
      startPlaceFullName: "Hồ Chí Minh",
      startPlace: "SGN",
      endPlaceFullName: "Tokyo",
      endPlace: "NRT",
      airline: "All Nippon Airways",
      duration: '16h00m',
      originalPrice: '20.581.036',
      discountPrice: '20.329.528',
      direct: '2 Stops',
      class: 'Economy',
      carryOnBaggage: '1 piece per person, 10kg per piece',
      checkedBaggage: '20kg per item'
    },
    {
      id: 5,
      logo: require("../assets/ImgDesign/Flight Screen/Airplane Logo/JapanAirlines.png"),
      airlineImage: require("../assets/ImgDesign/Flight Screen/Airplane Image/Japan_Airlines_Airplane-removebg-preview.png"),
      dateTime: [today, yesterday, yesterday, tomorrow2],
      timeStart: "08:00",
      timeEnd: "23:30",
      startPlaceFullName: "Hồ Chí Minh",
      startPlace: "SGN",
      endPlaceFullName: "Tokyo",
      endPlace: "HND",
      airline: "Japan Airlines",
      duration: '15h30m',
      originalPrice: '23.181.787',
      discountPrice: '22.932.680',
      direct: '2 Stops',
      class: 'Business',
      carryOnBaggage: '1 piece per person, 10kg per piece',
      checkedBaggage: '20kg per item'
    },
  ];
  
  
  const filteredData = (selectedCategory === today ? flightData : flightData.filter(item => item.dateTime.includes(selectedCategory)));
  


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

  

  return (
    <ScrollView>
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
            height: 120,
            objectFit: "cover",
            position: "absolute",
            zIndex: -1,
          }}
          source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
        ></Image>

        <View style={style. destinationContainer}>
            <View style={style.destinationFlud}>
                <View style={style.destinationItem}>
                    <Text style={style.destinationText}>{text1}</Text>
                </View>

                <View style={style.destinationItem}>
                    <Text style={style.destinationText}>To</Text>
                </View>

                <View style={style.destinationItem}>
                    <Text style={style.destinationText}>{text2}</Text>
                </View>

                <View style={[style.destinationItem,{flexDirection: 'row', columnGap: 10}]}>
                    <Text style={style.destinationText}>{selectedDate}</Text>
                    <Text style={style.destinationText}>*</Text>
                    <Text style={style.destinationText}>{totalPassengers} Passengers, {seatClass}</Text>
                </View>
            </View>
        </View>

        
          <View style={style.slideContainer}>
            <ScrollView horizontal contentContainerStyle={{columnGap: 20}}
            showsHorizontalScrollIndicator={false}>
                {
                  categories.map((item) => <ChooseDayComponent item={item} key={item.name}></ChooseDayComponent>)
                }
              </ScrollView>
          </View>
        
        <View style={style.flightInfoContainer}>
            <FlatList
            keyExtractor={(item) => item.id}
            data={filteredData}
            renderItem={({item}) => (
                <TouchableOpacity style={style.flightInfoItem}
                onPress={() => {
                  if(selectedCategory.includes(today)){
                    const dateFormat = currentDate;
                    navigation.navigate('Flight4', {
                      item: item,
                      selectedDate: dateFormat,
                      seatClass: seatClass,
                      totalPassengers: totalPassengers,
                    });
                  }
                  else if(selectedCategory.includes(tomorrow))
                  {
                      const dateFormat = tomorrowDate;
                      navigation.navigate('Flight4', {
                        item: item,
                        selectedDate: dateFormat,
                        seatClass: seatClass,
                        totalPassengers: totalPassengers,
                      });
                  }
                  else if (selectedCategory.includes(tomorrow2)){
                    const dateFormat = tomorrow2Date;
                      navigation.navigate('Flight4', {
                        item: item,
                        selectedDate: dateFormat,
                        seatClass: seatClass,
                        totalPassengers: totalPassengers,
                      });
                  }
                  else if (selectedCategory.includes(yesterday)){
                    const dateFormat = yesterdayDate;
                      navigation.navigate('Flight4', {
                        item: item,
                        selectedDate: dateFormat,
                        seatClass: seatClass,
                        totalPassengers: totalPassengers,
                      });
                  }
                  else if (selectedCategory.includes(yesterday2)){
                    const dateFormat = yesterday2date;
                      navigation.navigate('Flight4', {
                        item: item,
                        selectedDate: dateFormat,
                        seatClass: seatClass,
                        totalPassengers: totalPassengers,
                      });
                  }
                }}>
                    <View style={style.logoImageContainer}>
                      <Image source={item.logo}
                      style={{width: '90%', height: '50%', objectFit: 'contain'}}
                      ></Image>
                    </View>

                    <View style={style.scheduleContainer}>
                        <View style={style.scheduleItem}>
                            <Text style={style.scheduleText}>{item.timeStart}</Text>
                            <View style={{width: '30%',height: 20, flexDirection: 'column'}}>
                              <Image style={{width: '100%', height: '60%'}} source={require("../assets/ImgDesign/Flight Screen/Half arrow.jpg")}></Image>
                              <Text style={[style.blurText,{width: '100%', fontSize: 15, bottom: 2}]}>{item.duration}</Text>
                            </View>
                            
                            <Text style={style.scheduleText}>{item.timeEnd}</Text>
                        </View>

                        <View style={style.scheduleItem}>
                          <Text style={[style.scheduleText,style.blurText]}>{item.startPlace}</Text>
                          <View style={{width: '40%',height: 20, flexDirection: 'column'}}></View>
                          <Text style={[style.scheduleText,style.blurText]}>{item.endPlace}</Text>
                        </View>

                        <View style={[style.scheduleItem,{justifyContent: 'flex-start',}]}>
                          <Text style={{marginLeft: 5}}>Vietjet Air</Text>
                        </View>
                    </View>

                    <View style={style.costContainer}>
                        <View style={style.costContainerFlud}>
                          <Text style={style.textLineThrough}>{item.originalPrice} &#8363;</Text>
                          <Text style={style.textCost}>{item.discountPrice} &#8363;</Text>
                          <TouchableOpacity style={style.flightDetailsGroup}>
                            <Text style={style.toolText}>Choose</Text>
                            <AntIcon name='right' style={{fontSize: 20, color: '#023E8A'}}></AntIcon>
                          </TouchableOpacity>
                        </View>
                    </View>
                  </TouchableOpacity>
            )}
            ></FlatList>
        </View>
    
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
    height: 800,
    backgroundColor: "#CAF0F8",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
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
    height: 600,
    marginTop: 5,
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
