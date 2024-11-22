import react, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback ,
  FlatList
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import {RadioButton} from "react-native-paper"
import moment from "moment";
import apiRequest from "../Service/ApiService";

const Flight1 = ({navigation, route}) => {
  const {
    item,
    seatClass,
    selectedDate,
    totalPassengers,
    updatedPassengerDetails,
    selectedSeats,
    adultCount,
    childCount,
    username
  } = route.params;
  const dateFormat = moment(selectedDate).format("ddd, MMM DD, YYYY");
  const [selectedValue, setSelectedValue] = useState("option1");

 

  

  const handleInsert = async () => {
    // Hàm random cổng đợi
    const generateRandomGate = () => {
      const gates = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"];
      return gates[Math.floor(Math.random() * gates.length)];
    };
    const gate = generateRandomGate();

    // Hàm random mã đặt chỗ gồm 12 kí tự bao gồm chữ và số, không trùng lặp lại
    const generateUniqueBookingRef = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let bookingCode = "";
      for (let i = 0; i < 12; i++) {
        bookingCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return bookingCode;
    };
    const bookingCode = generateUniqueBookingRef();

    const price = Intl.NumberFormat("vi-VN").format(parseInt(item.discountPrice.replace(/\./g, ""), 10) * totalPassengers);

    // POST data to server
    try {
      const response = await apiRequest("/addBookingFlight", "POST", {
        item: item,
        seatClass: seatClass,
        selectedDate: selectedDate,
        totalPassengers: totalPassengers,
        passengerDetails: updatedPassengerDetails,
        selectedSeats: selectedSeats,
        adultCount: adultCount,
        childCount: childCount,
        price: price,
        gate: gate,
        bookingCode: bookingCode,
        username: username,
      });
      if (response.success) {
        console.log("Flight added successfully!");
        // Navigate to Flight7 screen
        navigation.navigate("Flight7", {
          item: item,
          seatClass: seatClass,
          selectedDate: selectedDate,
          totalPassengers: totalPassengers,
          passengerDetails: updatedPassengerDetails,
          selectedSeats: selectedSeats,
          adultCount: adultCount,
          childCount: childCount,
          price: price,
          gate: gate,
          bookingCode: bookingCode,
          username: username,
        });
      } else {
        console.log("Cannot add a flight!");
        return;
      }
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={style.textTitle}>Book a flight</Text>
          </View>
          <Image
            opacity={0.35}
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              position: "absolute",
              zIndex: -1,
            }}
            source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
          ></Image>

          <View style={style.formContainer}>
            <View style={style.formFlud}>
              <View style={style.yourETicketContainer}>
                <Text style={[style.bigText, style.boldText]}>
                  Your e-ticket
                </Text>
              </View>

              <View style={style.flightDetailContainer}>
                <View style={style.flightLeftItem}>
                  <View style={style.flightGroup}>
                    <Image
                      style={[
                        style.icon4040,
                        { width: "25%", height: "80%", objectFit: "contain" },
                      ]}
                      source={{ uri: item.logo }}
                    ></Image>
                    <Text style={[style.text]}>{item.airline}</Text>
                  </View>

                  <View style={[style.flightGroup, { height: 80 }]}>
                    <View style={style.flghtGroupItems}>
                      <Text style={[style.biggerFont, style.textBlur]}>
                        {item.startPlace}
                      </Text>
                      <Text style={style.biggerFont}>{item.timeStart}</Text>
                    </View>

                    <View style={[style.flghtGroupItems, { width: "20%" }]}>
                      <View style={style.itemAbsoluteGroup}>
                        <Text style={[style.miniText, style.textBlur]}>
                          {item.duration}
                        </Text>
                        <Image
                          style={[style.icon4040]}
                          source={require("../assets/ImgDesign/Flight Screen/Half_arrow-removebg-preview.png")}
                        ></Image>
                        <Text style={[style.miniText, style.textBlur]}>
                          {item.direct}
                        </Text>
                      </View>
                    </View>

                    <View style={style.flghtGroupItems}>
                      <Text style={[style.biggerFont, style.textBlur]}>
                        {item.endPlace}
                      </Text>
                      <Text style={style.biggerFont}>{item.timeEnd}</Text>
                    </View>
                  </View>

                  <View style={[style.flightGroup, { height: 40 }]}>
                    <Text style={[style.text, { right: 10 }]}>
                      {item.startPlaceFullName}
                    </Text>
                    <Text style={style.text}>{item.endPlaceFullName}</Text>
                  </View>
                </View>

                <View style={style.flightRightItem}>
                  <View style={style.imageFlightContainer}>
                    <Image
                      style={style.imageCover}
                      source={{ uri: item.airlineImage }}
                    ></Image>
                  </View>

                  <View style={style.dateTimeContainer}>
                    <Text style={style.text}>{selectedDate}</Text>
                  </View>
                </View>
              </View>

              <View style={style.baggageNoticeContainer}>
                <View style={style.baggageNoticeFlud}>
                  <View style={style.baggageLeftItem}>
                    <View style={style.baggageGroup}>
                      <Image
                        style={style.imgIcon}
                        source={require("../assets/ImgDesign/Flight Screen/Carry-on_luggage_icon-removebg-preview.png")}
                      ></Image>
                      <Text style={style.miniText}>Carry-on baggage</Text>
                    </View>

                    <View style={style.baggageGroup}>
                      <Image
                        style={style.imgIcon}
                        source={require("../assets/ImgDesign/Flight Screen/checked luggage icon.png")}
                      ></Image>
                      <Text style={style.miniText}>Checked baggage</Text>
                    </View>
                  </View>

                  <View style={style.baggageRightItem}>
                    <View
                      style={[
                        style.baggageGroup,
                        { justifyContent: "flex-start", marginLeft: 10 },
                      ]}
                    >
                      <Text style={style.miniText}>{item.carryOnBaggage}</Text>
                    </View>

                    <View
                      style={[
                        style.baggageGroup,
                        { justifyContent: "flex-start", marginLeft: 10 },
                      ]}
                    >
                      <Text style={style.miniText}>{item.checkedBaggage}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={style.informationContainer}>
                <View style={style.informationLeftItem}>
                  <View style={style.informationLeftGroup}>
                    <Text style={[style.textBlur]}>Passenger</Text>
                    <Text style={style.text15}>{totalPassengers}</Text>
                  </View>

                  <View style={style.informationLeftGroup}>
                    <Text style={[style.textBlur]}>Class</Text>
                    <Text style={style.text15}>{seatClass}</Text>
                  </View>

                  <View style={style.informationLeftGroup}>
                    <Text style={[style.textBlur, { top: 13 }]}>Seat</Text>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={selectedSeats}
                      keyExtractor={(seat, index) => index.toString()}
                      renderItem={({ item: seat }) => (
                        <View
                          style={{
                            padding: 17,
                            width: "100%",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ fontSize: 18 }}>{seat}</Text>
                        </View>
                      )}
                      contentContainerStyle={{ width: "100%" }}
                    />
                  </View>
                </View>

                <View style={style.informationRightItem}>
                  <Text style={style.text}>Total</Text>
                  <Text style={style.costBigRedText}>
                    {Intl.NumberFormat("vi-VN").format(
                      parseInt(item.discountPrice.replace(/\./g, ""), 10) *
                        totalPassengers
                    )}{" "}
                    &#8363;
                  </Text>
                </View>
              </View>

              <View style={style.discountContainer}>
                <View style={style.discountItem}>
                  <View style={style.discountGroup}>
                    <Text style={style.biggerFont}>Discount Voucher</Text>
                    <TouchableOpacity
                      style={{ height: "100%", justifyContent: "center" }}
                    >
                      <Text style={[style.text, { color: "#023E8A" }]}>
                        My vouchers
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={style.discountItem}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={style.textInput100}
                  >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <TextInput
                        style={style.textInput100}
                        placeholder="Voucher code"
                        editable
                        inputMode="text"
                      ></TextInput>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
                </View>
              </View>

              <View style={style.paymentMethodContainer}>
                <View style={style.paymentMethodFlud}>
                  <View
                    style={[
                      style.paymentMethodItem,
                      { justifyContent: "center", borderWidth: 0 },
                    ]}
                  >
                    <Text style={style.biggerFont}>Payment Method</Text>
                  </View>

                  <View style={style.paymentMethodItem}>
                    <View style={style.paymentMethodGroup}>
                      <Image
                        style={style.icon6040}
                        source={require("../assets/ImgDesign/Flight Screen/Payment/bca payment img.png")}
                      ></Image>
                      <Text>BCA Virtual Account</Text>
                      <RadioButton.Android
                        value="option1"
                        status={
                          selectedValue === "option1" ? "checked" : "unchecked"
                        }
                        onPress={() => setSelectedValue("option1")}
                        color="black"
                      />
                    </View>
                  </View>

                  <View style={style.paymentMethodItem}>
                    <View style={style.paymentMethodGroup}>
                      <Image
                        style={[style.icon6040]}
                        source={require("../assets/ImgDesign/Flight Screen/Payment/visa payment png.jpg")}
                      ></Image>
                      <Text>Visa - 5*** *** **2</Text>
                      <RadioButton.Android
                        value="option2"
                        status={
                          selectedValue === "option2" ? "checked" : "unchecked"
                        }
                        onPress={() => setSelectedValue("option2")}
                        color="black"
                      />
                    </View>
                  </View>

                  <View style={style.paymentMethodItem}>
                    <View style={style.paymentMethodGroup}>
                      <Image
                        style={style.icon6040}
                        source={require("../assets/ImgDesign/Flight Screen/Payment/logo-momo.png")}
                      ></Image>
                      <Text>Momo E-vallet</Text>
                      <RadioButton.Android
                        value="option2"
                        status={
                          selectedValue === "option3" ? "checked" : "unchecked"
                        }
                        onPress={() => setSelectedValue("option3")}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={style.footerBtnContainer}>
                <TouchableOpacity
                  style={style.footerBtn}
                  onPress={handleInsert}
                >
                  <Text style={{ fontSize: 17 }}>Confirm and continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Flight1;

const style = StyleSheet.create({
  miniText: {
    fontSize: 11,
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
    objectFit: "contain",
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
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  backItem: {
    width: "95%",
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 15
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    bottom: 15,
    letterSpacing: 0.75,
    textAlign: "left",
    width: "95%",
    height: 30
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
  yourETicketContainer: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#CAF0F8",
  },
  flightDetailContainer: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  flightLeftItem: {
    width: "50%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },

  flightGroup: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  flghtGroupItems: {
    width: "39%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  itemAbsoluteGroup:{
    justifyContent: "space-evenly",
    width: "100%",
    height: "20%",
    alignItems: "center",
  },

  flightRightItem: {
    width: "50%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageFlightContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  dateTimeContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  baggageNoticeContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "gray",
  },
  baggageNoticeFlud: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  baggageLeftItem: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'cyan',
    flexDirection: "column",
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  baggageRightItem: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'yellow',
    flexDirection: "column",
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: "gray",
  },
  baggageGroup: {
    width: "100%",
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  informationContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "gray",
    borderStyle: "solid",
  },

  informationLeftItem: {
    width: "60%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  informationLeftGroup: {
    width: "33%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },

  informationRightItem: {
    width: "40%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  paymentMethodContainer: {
    width: "100%",
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  paymentMethodFlud: {
    width: "97%",
    height: "100%",
    flexDirection: "column",
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  paymentMethodItem: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 3,
  },
  paymentMethodGroup: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  radioButtonLabel: {
    height: "100%",
    flexDirection: "column",
    borderWidth: 0.5,
    justifyContent: "center",
    paddingVertical: 10,
  },
  radioButton: {
    borderWidth: 0.5,
    borderColor: "gray",
  },
  discountContainer: {
    width: "100%",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  discountItem: {
    width: "100%",
    height: 60,
    alignItems: "center",
  },
  discountGroup: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
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
