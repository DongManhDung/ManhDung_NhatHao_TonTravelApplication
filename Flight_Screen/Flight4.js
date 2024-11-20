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
import Checkbox from "expo-checkbox";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIsto from "react-native-vector-icons/Fontisto";
import RadioForm, { RadioButtonInput } from "react-native-simple-radio-button";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import moment from "moment";
import DateInputModal from "../Flight_Screen/DateInputModal";

const Flight1 = ({ navigation, route }) => {
  const currentYear = new Date().getFullYear();
  const [value, setValue] = useState(0);
  const {
    item,
    selectedDate,
    seatClass,
    totalPassengers,
    childCount,
    adultCount,
  } = route.params;
  const dateFormat = moment(selectedDate).format("ddd, MMM DD, YYYY");

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: adultCount + childCount }, () => ({
      fullName: "",
      gender: "male",
      dateOfBirth: "",
      passportNumber: "",
      countryRegion: "",
      expirationDate: "",
      address: "",
      citizenId: "",
      birthCertificate: "",
      phone: "",
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updatedPassengerDetails = [...passengerDetails];
    updatedPassengerDetails[index][field] = value;
    setPassengerDetails(updatedPassengerDetails);
  };

  const handleDateChange = (index, dateString, dateObject) => {
    handleInputChange(index, "dateOfBirth", dateString);
    handleInputChange(index, "dateObject", dateObject);
  };

  const handleFormSubmit = () => {
    const passengersWithAdultStatus = passengerDetails.map((passenger, index) => ({ ...passenger, isAdult: index < adultCount, }));
    navigation.navigate("Flight5", {
      item,
      seatClass,
      selectedDate: dateFormat,
      totalPassengers,
      passengerDetails: passengersWithAdultStatus,
      adultCount: adultCount,
      childCount: childCount,
    });
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
              <View style={style.destinationContainer}>
                <View style={style.destinationColumnItem}>
                  <View style={style.destinationGroupLeft}>
                    <Text style={style.text}>{item.startPlaceFullname}</Text>
                    <Image
                      style={style.imgIconRotate90}
                      source={require("../assets/ImgDesign/Flight Screen/plane_icon-removebg-preview.png")}
                    ></Image>
                    <Text style={style.text}>{item.endPlaceFullname}</Text>
                  </View>
                  <View style={style.destinationGroupRight}>
                    <View style={style.economySignal}>
                      <Text style={style.text}>{seatClass}</Text>
                    </View>
                  </View>
                </View>

                <View style={style.destinationColumnItem}>
                  <View
                    style={[
                      style.destinationGroupLeft,
                      { alignItems: "center", paddingHorizontal: 20 },
                    ]}
                  >
                    <Text style={style.text}>({item.startPlace})</Text>
                    <Text style={style.text}>({item.endPlace})</Text>
                  </View>
                </View>

                <View style={style.destinationColumnItem}>
                  <View
                    style={[
                      style.destinationGroupLeft,
                      { justifyContent: "flex-start" },
                    ]}
                  >
                    <Image
                      style={style.airlineIcon}
                      source={{ uri: item.logo }}
                    ></Image>
                    <Text style={style.text}>{item.airline}</Text>
                  </View>
                  <View
                    style={[
                      style.destinationGroupRight,
                      style.flexRowAlignLeft,
                    ]}
                  >
                    <Image
                      style={style.airlineIcon}
                      source={require("../assets/ImgDesign/Flight Screen/Clock_vectoricon (1).png")}
                    ></Image>
                    <Text style={[style.text, style.textBlur]}>
                      {item.duration}
                    </Text>
                  </View>
                </View>

                <View style={style.destinationColumnItem}>
                  <View
                    style={[
                      style.destinationGroupLeft,
                      { justifyContent: "flex-start" },
                    ]}
                  >
                    {/* Need to fix */}
                    <Text style={style.text}>{dateFormat}</Text>
                    <Text style={[style.text, style.biggerFont]}>
                      {item.timeStart} - {item.timeEnd}
                    </Text>
                  </View>
                  <View
                    style={[
                      style.destinationGroupRight,
                      style.flexRowAlignRight,
                    ]}
                  >
                    <Text
                      style={[style.text, style.textBlur, { marginRight: 20 }]}
                    >
                      {item.direct}
                    </Text>
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

              <View style={style.costContainer}>
                <View style={style.costLeftItem}>
                  <Text style={style.bigText}>Total</Text>
                </View>

                <View style={style.costMiddleItem}>
                  <Text style={style.textCenter}>
                    Tax included + Flight Insurance
                  </Text>
                  <Text style={[style.textCenter, style.safeText]}>
                    Free processing fee
                  </Text>
                </View>

                <View style={style.costRightItem}>
                  <Text style={style.safeText}>
                    {(
                      (parseFloat(item.originalPrice.replace(/\./g, "")) -
                        parseFloat(item.discountPrice.replace(/\./g, ""))) /
                      1000
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                    })}
                    &#8363; off
                  </Text>
                  <Text style={style.lineThroughText}>
                    {item.originalPrice} &#8363;
                  </Text>
                  <Text style={style.costBigRedText}>
                    {item.discountPrice} &#8363;
                  </Text>
                </View>
              </View>

              <View style={style.bookerInformationContainer}>
                <View style={style.bookerInformationFlud}>
                  <View style={style.bookerInformationHeader}>
                    <Text style={style.biggerFont}>Booker Information</Text>
                  </View>
                  <View style={style.bookerInformationBody}>
                    <Text
                      style={[
                        style.text,
                        style.textBlur,
                        style.left25Container,
                      ]}
                    >
                      Full Name:
                    </Text>
                    <TextInput style={style.inputText}></TextInput>
                  </View>

                  <View style={style.bookerInformationBody}>
                    <Text
                      style={[
                        style.text,
                        style.textBlur,
                        style.left25Container,
                      ]}
                    >
                      Email:
                    </Text>
                    <TextInput style={style.inputText}></TextInput>
                  </View>

                  <View style={style.bookerInformationBody}>
                    <Text
                      style={[
                        style.text,
                        style.textBlur,
                        style.left25Container,
                      ]}
                    >
                      Phone:
                    </Text>
                    <TextInput style={style.inputText}></TextInput>
                  </View>
                </View>
              </View>

              {/* Loop customer form here */}
              <View style={[style.customerInfoContainer]}>
                <View>
                  {passengerDetails.map((passenger, index) => {
                    const isAdult = index < adultCount;
                    const dateObject = passenger.dateObject;
                    const age = dateObject
                      ? currentYear - dateObject.getFullYear()
                      : null;
                    return (
                      <View
                        key={index}
                        style={[style.bookerInformationFlud, { margin: 15 }]}
                      >
                        <View style={style.bookerInformationHeader}>
                          <Text style={style.biggerFont}>
                            Customer {index + 1}: {isAdult ? "Adult" : "Child"}
                          </Text>
                        </View>
                        <View style={style.genderContainer}>
                          <View style={style.genderFlud}>
                            <Text>
                              Be Careful: Passenger information must match your
                              ID + photo
                            </Text>
                            <View style={style.genderBoxGroup}>
                              <RadioForm
                                labelStyle={style.radioButtonLabel}
                                buttonWrapStyle={style.radioButtonWrap}
                                radio_props={[
                                  { label: "Male", value: "male" },
                                  { label: "Female", value: "female" },
                                ]}
                                initial={0}
                                buttonColor="black"
                                selectedButtonColor="black"
                                formHorizontal
                                buttonSize={15}
                                onPress={(value) =>
                                  handleInputChange(index, "gender", value)
                                }
                              />
                            </View>
                          </View>
                        </View>
                        <View style={style.bookerInformationBody}>
                          <Text
                            style={[
                              style.text,
                              style.textBlur,
                              style.left25Container,
                            ]}
                          >
                            Full Name:
                          </Text>
                          <TextInput
                            style={style.inputText}
                            onChangeText={(value) =>
                              handleInputChange(index, "fullName", value)
                            }
                            value={passenger.fullName}
                          />
                        </View>
                        <View style={style.bookerInformationBody}>
                          <Text
                            style={[
                              style.text,
                              style.textBlur,
                              style.left25Container,
                            ]}
                          >
                            Date of birth:
                          </Text>
                          <DateInputModal
                            onDateChange={(dateString, dateObject) =>
                              handleDateChange(index, dateString, dateObject)
                            }
                          />
                        </View>
                        {isAdult ? (
                          <>
                            <View style={style.bookerInformationBody}>
                              <Text
                                style={[
                                  style.text,
                                  style.textBlur,
                                  style.left25Container,
                                ]}
                              >
                                Citizen ID:
                              </Text>
                              <TextInput
                                style={style.inputText}
                                onChangeText={(value) =>
                                  handleInputChange(index, "citizenId", value)
                                }
                                value={passenger.citizenId}
                              />
                            </View>
                            <View style={style.bookerInformationBody}>
                              <Text
                                style={[
                                  style.text,
                                  style.textBlur,
                                  style.left25Container,
                                ]}
                              >
                                Country/Region:
                              </Text>
                              <TextInput
                                style={style.inputText}
                                onChangeText={(value) =>
                                  handleInputChange(
                                    index,
                                    "countryRegion",
                                    value
                                  )
                                }
                                value={passenger.countryRegion}
                              />
                            </View>
                            <View style={style.bookerInformationBody}>
                              <Text
                                style={[
                                  style.text,
                                  style.textBlur,
                                  style.left25Container,
                                ]}
                              >
                                Expiration date:
                              </Text>
                              <TextInput
                                style={style.inputText}
                                onChangeText={(value) =>
                                  handleInputChange(
                                    index,
                                    "expirationDate",
                                    value
                                  )
                                }
                                value={passenger.expirationDate}
                              />
                            </View>
                            <View style={style.bookerInformationBody}>
                              <Text
                                style={[
                                  style.text,
                                  style.textBlur,
                                  style.left25Container,
                                ]}
                              >
                                Address:
                              </Text>
                              <TextInput
                                style={style.inputText}
                                onChangeText={(value) =>
                                  handleInputChange(index, "address", value)
                                }
                                value={passenger.address}
                              />
                            </View>
                          </>
                        ) : (
                          <View style={style.bookerInformationBody}>
                            <Text
                              style={[
                                style.text,
                                style.textBlur,
                                style.left25Container,
                              ]}
                            >
                              {age >= 14 ? "Citizen ID" : "Birth certificate"}:
                            </Text>
                            <TextInput
                              style={style.inputText}
                              onChangeText={(value) =>
                                handleInputChange(
                                  index,
                                  age >= 14 ? "citizenId" : "birthCertificate",
                                  value
                                )
                              }
                              value={
                                age >= 14
                                  ? passenger.citizenId
                                  : passenger.birthCertificate
                              }
                            />
                          </View>
                        )}
                        <View style={style.bookerInformationBody}>
                          <Text
                            style={[
                              style.text,
                              style.textBlur,
                              style.left25Container,
                            ]}
                          >
                            Phone:
                          </Text>
                          <TextInput
                            style={style.inputText}
                            onChangeText={(value) =>
                              handleInputChange(index, "phone", value)
                            }
                            value={passenger.phone}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={style.footerBtnContainer}>
                <TouchableOpacity
                  style={style.footerBtn}
                  onPress={handleFormSubmit}
                >
                  <Text style={{ fontSize: 17 }}>
                    Done, go to seat selection
                  </Text>
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
    fontSize: 12,
    letterSpacing: 0.25,
  },
  text: {
    fontSize: 17,
    letterSpacing: 0.25,
    marginLeft: 5,
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
  lineThroughText: {
    fontSize: 17,
    textDecorationLine: "line-through",
  },
  costBigRedText: {
    fontSize: 20,
    color: "#A40303",
  },
  imgIcon: {
    width: "15%",
    height: "40%",
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
  container: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 20,
  },

  containerFlud: {
    width: "100%",
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
    paddingVertical: 15,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    bottom: 15,
    letterSpacing: 0.75,
    textAlign: "left",
    width: "95%",
    height: 30,
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
  destinationContainer: {
    width: "100%",
    height: 200,
    flexDirection: "column",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0.5,
  },
  destinationColumnItem: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinationGroupLeft: {
    width: "60%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  airlineIcon: {
    width: "25%",
    height: "80%",
    objectFit: "contain",
  },
  imgIconRotate90: {
    width: "25%",
    height: "80%",
    objectFit: "contain",
    transform: [{ rotate: "90deg" }],
  },
  destinationGroupRight: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  flexRowAlignLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  flexRowAlignRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  economySignal: {
    width: "60%",
    height: "80%",
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  baggageNoticeContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
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
  costContainer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
  },
  costLeftItem: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  costMiddleItem: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  costRightItem: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    paddingHorizontal: 5,
  },
  bookerInformationContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    // backgroundColor: 'cyan',
  },
  bookerInformationFlud: {
    width: "95%",
    // backgroundColor: 'cyan',
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    rowGap: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  bookerInformationHeader: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bookerInformationBody: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerInfoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  genderContainer: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  genderFlud: {
    width: "95%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  genderBoxGroup: {
    width: "100%",
    height: 45,
    justifyContent: "space-around",
    alignItems: "flex-start",
    columnGap: 50,
  },
  radioButtonLabel: {
    fontSize: 16,
    paddingHorizontal: 60,
  },
  footerBtnContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,

    // backgroundColor: 'cyan',
  },
  footerBtn: {
    width: "70%",
    height: "100%",
    backgroundColor: "#48CAE4",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
