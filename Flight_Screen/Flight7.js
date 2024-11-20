import react, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import moment from "moment";

const Flight7 = ({navigation, route}) => {
  const { item, seatClass, selectedDate ,totalPassengers, updatedPassengerDetails, selectedSeats, adultCount, childCount } = route.params;

  const gates = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'];
  const bookingData = {
    fullName: updatedPassengerDetails[0].fullName,
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
              height: 250,
              objectFit: "cover",
              position: "absolute",
              zIndex: -1,
            }}
            source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
          ></Image>

          <View style={style.formContainer}>
            <View style={style.formFlud}>

                <View style={style.logoContainer}>
                    <Image
                    style={{width: '70%', height: '100%', objectFit: 'cover'}}
                    source={require('../assets/ImgDesign/tontravel-logo-zip-file/RemoveBg/logo.png')}></Image>
                </View>

                <View style={style.correctIconContainer}>
                    <Image style={{width: '100%', height: '100%', objectFit: 'contain'}}
                     source={require('../assets/ImgDesign/Flight Screen/Payment/done_icon-removebg-preview.png')}></Image>
                </View>

                <View style={style.successTextContainer}>
                    <Text style={[style.text,style.textCenter,{width: '60%', letterSpacing: 0.65}]}>Your ticket purchase successfully completed</Text>
                </View>

                {/* Test insert data here */}
                <View style={style.boardingPassContainer}>
                  <Text>Fullname: {updatedPassengerDetails[0].fullName}</Text>
                  <Text>Gender: {updatedPassengerDetails[0].gender}</Text>
                  <Text>Class: {item.class}</Text>
                  <Text>Departure Date: {selectedDate}</Text>
                  <Text>Adult: {adultCount}</Text>
                  <Text>Child: {childCount}</Text>
                  <Text>Total Passengers: {totalPassengers}</Text>
                  <Text>From: {item.startPlaceFullname}</Text>
                  <Text>To: {item.endPlaceFullname} </Text>
                  <Text>Departure Time: {item.timeStart}</Text>
                  <Text>Arrival Time: {item.timeEnd}</Text>
                  <Text>Airline: {item.airline}</Text>
                  <Text>Duration: {item.duration}</Text>
                  <Text>Flight Number: {item.flightNumber}</Text>
                  <Text>Seat: {selectedSeats}</Text>
                  <Text>Direct: {item.direct}</Text>
                  <Text>Gate: {gates[Math.floor(Math.random() * gates.length)]}</Text>
                </View>

                <View style={style.thanksContainer}>
                    <View style={style.thankFlud}>
                        <Text style={[style.text,style.textCenter, {width: '50%', letterSpacing: 0.65}]}>Thank you for using our service.</Text>
                        {/* <Image 
                        style={{width: '40%', height: '100%', objectFit: 'cover'}}
                        source={require('../assets/ImgDesign/Flight Screen/qr_code_PNG6.png')}></Image> */}
                    </View>
                </View>

                <View style={style.footerBtnContainer}>
                        <TouchableOpacity style={style.footerBtn}>
                            <Text style={{fontSize: 17}}>Download E-ticket</Text>
                        </TouchableOpacity>
                </View>

            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Flight7;

const style = StyleSheet.create({
  miniText: {
    fontSize: 12,
    letterSpacing: 0.25,
  },
  boldText:{
    fontWeight: "bold",
  },
  text: {
    fontSize: 17,
    letterSpacing: 0.25,
  },
  text15: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  bigText: {
    fontSize: 25,
    letterSpacing: 0.5,
  },
  biggerFont: {
    fontSize: 19,
    fontWeight: "500",
  },
  textCenter: {
    textAlign: "center",
  },
  textBlur: {
    color: "#808080",
  },
  safeText: {
    color: "#088F08",
  },
  textInput100: {
    width: '95%',
    height: '100%', 
    backgroundColor: '#f6f5f5',
    fontSize: 17,
    letterSpacing: 0.5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  lineThroughText: {
    fontSize: 17,
    textDecorationLine: "line-through",
  },
  costBigRedText: {
    fontSize: 20,
    color: "#A40303",
  },
  icon4040: {
    width: 40,
    height: 40,
  },
  icon6040: {
    width: 60,
    height: 40,
    objectFit: "contain",
    borderRadius: 10
  },
  imageCover: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imgIcon: {
    width: "15%",
    height: "60%",
    objectFit: "cover",
  },
  inputText: {
    width: "70%",
    height: "100%",
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    marginRight: 5,
  },
  left25Container: {
    width: "25%",
  },
  rowDirectionGroup: {

  },
  container: {
    flex: 1,
    flexDirection: "column",
  },

  containerFlud: {
    width: "100%",
    height: 950,
    backgroundColor: "#CAF0F8",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  backGroup: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  backItem: {
    width: "95%",
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
  formContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  formFlud: {
    width: "95%",
    height: "100%",
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    borderColor: "gray",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  logoContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  correctIconContainer: {
    width: "100%",
    height: 140,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  successTextContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

  },
  boardingPassContainer: {
    width: "100%",
    justifyContent  : "center",
    alignContent: "center",
    alignItems: "center",
  },

  thanksContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  thankFlud: {
    width: "95%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

  },

  footerBtnContainer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'cyan',
 },
 footerBtn: {
    width: "70%",
    height: "70%",
    backgroundColor: '#48CAE4',
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
 },
});
