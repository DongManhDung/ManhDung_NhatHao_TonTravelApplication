import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import moment from "moment";

const Flight5 = ({ navigation, route }) => {
  const { item, seatClass, selectedDate, totalPassengers, passengerDetails, selectedSeats: initialSelectedSeats = [], adultCount, childCount, username } =
    route.params;
  const dateFormat = moment(selectedDate).format("ddd, MMM DD, YYYY");
  const [value, setValue] = useState(0);
  const items = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(initialSelectedSeats); // Chứa các ghế người dùng đã chọn initialSelectedSeats
  const rows = ["A", "B", "C", "D", "E", "F"]; // 6 hàng ghế từ A -> F
  const seatsPerRow = 35; // Số ghế mỗi hàng
  let seats = [];

  //Thêm chức năng random ghế đã bán
  const [soldSeats, setSoldSeats] = useState([]);

  useEffect(() => {
    randomSoldSeats(); // Tạo ghế đã bán khi khởi tạo
  }, []);

  // Hàm ngẫu nhiên chọn các ghế làm ghế đã bán
  const randomSoldSeats = () => {
    let randomSeats = [];
    let totalSeats = rows.length * seatsPerRow;
    let soldSeatsCount = Math.floor(totalSeats * 0.3); // Khoảng 30% ghế sẽ được bán

    while (randomSeats.length < soldSeatsCount) {
      let row = rows[Math.floor(Math.random() * rows.length)];
      let seat = String(Math.floor(Math.random() * seatsPerRow) + 1).padStart(
        2,
        "0"
      );
      let seatNumber = `${row}${seat}`;

      if (!randomSeats.includes(seatNumber)) {
        randomSeats.push(seatNumber);
      }
    }
    setSoldSeats(randomSeats);
  };

  // Xử lý khi người dùng chọn ghế
  const handleSeatSelect = (seatNumber) => {
    if (soldSeats.includes(seatNumber)) {
      Alert.alert(
        "🔴 Warning",
        "This place has been sold. Please select another seat!"
      );
      return;
    } else if (!(selectedSeat === seatNumber)) {
      setSelectedSeat(seatNumber);
      Alert.alert("🟢 Success", `You have selected seat ${seatNumber}`);
    } else {
      setSelectedSeat(null);
    }
  };

  

  const handleNextPassenger = () => {
    if (!selectedSeat) {
      Alert.alert("🔴 Warning", "Please select your seat before proceeding!");
      return;
    }
    const updatedPassengerDetails = [...passengerDetails];
    updatedPassengerDetails[currentPassengerIndex].selectedSeat = selectedSeat;

    // Update the soldSeats list to include the selected seat
    setSoldSeats([...soldSeats, selectedSeat]); 
    setSelectedSeats((prevSeats) => {
      const updatedSeats = [...prevSeats, selectedSeat];
      console.log("Updated selected seats:", updatedSeats);
      return updatedSeats;
    });
    if (currentPassengerIndex < passengerDetails.length - 1) {
      setSelectedSeat(null);
      setCurrentPassengerIndex(currentPassengerIndex + 1);
    } else {
      // Log xem có bao nhiêu ghế được chọn?
      navigation.navigate("Flight6", {
        item,
        seatClass,
        selectedDate,
        totalPassengers,
        updatedPassengerDetails,
        selectedSeats: [...selectedSeats, selectedSeat],
        adultCount,
        childCount,
        username,
      });
      
    }
  };

  const passenger = passengerDetails[currentPassengerIndex];

  // Tạo các ghế bằng vòng lặp for
  for (let row = 0; row < rows.length; row++) {
    let rowSeats = [];
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      let seatNumber = `${rows[row]}${String(seat).padStart(2, "0")}`; // Tạo số ghế: A01, A02, ..., B01, B02... cho tới F35
      rowSeats.push(
        <TouchableOpacity
          key={seatNumber}
          style={[
            style.emptyBackground,
            style.item4040,
            style.seatItem, // Mặc định màu ghế trống
            soldSeats.includes(seatNumber) && style.soldSeat, // Đổi màu nếu ghế đã bán
            selectedSeat === seatNumber && style.bookedBackground, // Đổi màu nếu ghế cá nhân chọn
            selectedSeats.includes(seatNumber) && style.bookedBackground, // Đổi màu nếu người thứ n chọn xong, người thứ n++ sẽ biết để chọn cùng
          ]}
          onPress={() => handleSeatSelect(seatNumber)}
        >
          <Text style={style.biggerFont}>{seatNumber}</Text>
        </TouchableOpacity>
      );
    }
    seats.push(
      <View key={`row-${rows[row]}`} style={style.row}>
        {rowSeats}
      </View>
    );
  }

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
            <Text style={style.textTitle}>Select your seat</Text>
          </View>

          <View style={style.seatCustomerChoose}>
            <FlatList
              data={[passenger]}
              keyExtractor={(passenger, index) => index.toString()}
              renderItem={({ item: passenger}) => (
                <View style={style.seatCustomerChooseFlud}>
                  <View style={{ width: 300 }}>
                    <View
                      style={{
                        width: "100%",
                        height: "45%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "green",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    >
                      {/* Passenger here */}
                      <Text style={{ fontSize: 14, letterSpacing: 1 }}>
                        Customer {currentPassengerIndex + 1}:
                        {passenger.isAdult ? "Adult" : "Child"}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        {passenger.fullName}
                      </Text>
                    </View>
                    {/* Seat's passenger here */}
                    <View
                      style={{
                        width: "100%",
                        height: "55%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>Destination</Text>
                      <Text style={{ fontSize: 17, letterSpacing: 1 }}>
                        {item.startPlace} - {item.endPlace}
                      </Text>
                      <Text style={{ fontSize: 15 }}>{selectedSeat}</Text>
                    </View>
                  </View>
                </View>
              )}
              contentContainerStyle={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                flexDirection: "row",
              }}
            />
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
              <View style={style.introductionContainer}>
                <View style={style.introductionGroup}>
                  <View style={[style.seatBox, style.seatItem]}></View>
                  <View style={[style.seatBox, style.soldSeat]}></View>
                  <View
                    style={[
                      style.seatBox,
                      style.seatItem,
                      style.employeeBackground,
                    ]}
                  ></View>
                </View>

                <View style={style.introductionGroup}>
                  <Text style={style.seatTextBox}>Free Seat</Text>
                  <Text style={style.seatTextBox}>Sold Seat</Text>
                  <Text style={style.seatTextBox}>Staff Seat</Text>
                </View>

                <View style={style.seatContainer}>
                  <View style={style.seatContainerFlud}>
                    <View style={style.seatHeader}>
                      <View style={style.outletGroup}>
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              "ℹ️ Detail",
                              "This is WC. You can enter!"
                            )
                          }
                        >
                          <Image
                            style={[style.item4040]}
                            source={require("../assets/ImgDesign/Flight Screen/WC icon png.png")}
                          ></Image>
                        </TouchableOpacity>

                        <View style={style.outletRightSize}>
                          <TouchableOpacity
                            style={[style.item4040, style.employeeBackground]}
                            onPress={() =>
                              Alert.alert(
                                "🔴 Notice",
                                "You are not allowed to select this seat! Please choose another seat."
                              )
                            }
                          >
                            <Text style={style.biggerFont}>H01</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[style.item4040, style.employeeBackground]}
                            onPress={() =>
                              Alert.alert(
                                "🔴 Notice",
                                "You are not allowed to select this seat! Please choose another seat."
                              )
                            }
                          >
                            <Text style={style.biggerFont}>H02</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[style.item4040, style.employeeBackground]}
                            onPress={() =>
                              Alert.alert(
                                "🔴 Notice",
                                "You are not allowed to select this seat! Please choose another seat."
                              )
                            }
                          >
                            <Text style={style.biggerFont}>H03</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={style.seatBody}>
                      <View style={style.outletGroup}>
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              "🔴 Warning",
                              "This is Emergency exit. Do not touch!"
                            )
                          }
                        >
                          <Image
                            style={[style.item4040, style.rotate270Icon]}
                            source={require("../assets/ImgDesign/Flight Screen/Red triangle Transparent.png")}
                          ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              "🔴 Warning",
                              "This is Emergency exit. Do not touch!"
                            )
                          }
                        >
                          <Image
                            style={[style.item4040, style.rotate90Icon]}
                            source={require("../assets/ImgDesign/Flight Screen/Red triangle Transparent.png")}
                          ></Image>
                        </TouchableOpacity>
                      </View>

                      {/* Detail your seat selected */}
                      <View style={style.outletLeftSize}>{seats}</View>
                    </View>

                    <View style={style.outletGroup}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert("ℹ️ Detail", "This is WC. You can enter!")
                        }
                      >
                        <Image
                          style={[style.item4040]}
                          source={require("../assets/ImgDesign/Flight Screen/WC icon png.png")}
                        ></Image>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert("ℹ️ Detail", "This is WC. You can enter!")
                        }
                      >
                        <Image
                          style={[style.item4040]}
                          source={require("../assets/ImgDesign/Flight Screen/WC icon png.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>

                    <View style={style.outletGroup}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            "🔴 Warning",
                            "This is Emergency exit. Do not touch!"
                          )
                        }
                      >
                        <Image
                          style={[style.item4040, style.rotate270Icon]}
                          source={require("../assets/ImgDesign/Flight Screen/Red triangle Transparent.png")}
                        ></Image>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            "🔴 Warning",
                            "This is Emergency exit. Do not touch!"
                          )
                        }
                      >
                        <Image
                          style={[style.item4040, style.rotate90Icon]}
                          source={require("../assets/ImgDesign/Flight Screen/Red triangle Transparent.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>

                    {selectedSeat && (
                      <View
                        style={{
                          width: "100%",
                          height: 120,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: 10,
                        }}
                      >
                        <Text style={style.selectedSeatText}>
                          Your seat selection: {selectedSeat}
                        </Text>
                      </View>
                    )}

                    <View style={style.seatFooter}>
                      <TouchableOpacity
                        onPress={handleNextPassenger}
                        style={style.seatButton}
                      >
                        <Text style={[style.bigText, { fontWeight: "600" }]}>
                          Sweep To Booking
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Flight5;

const style = StyleSheet.create({
  soldSeat: {
    backgroundColor: "#FF0000",
  },
  row: {
    rowGap: 20,
  },
  selectedSeatText: {
    width: "100%",
    fontSize: 18,
    textAlign: "center",
  },
  miniText: {
    fontSize: 12,
    letterSpacing: 0.25,
  },
  bookedBackground: {
    backgroundColor: "#48CAE4",
    borderRadius: 5,
  },
  emptyBackground: {
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
  employeeBackground: {
    backgroundColor: "#fee440",
    borderRadius: 5,
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
    fontWeight: "600",
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
    width: 40,
    height: 40,
    objectFit: "cover",
    transform: [{ rotate: "270deg" }],
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
  },

  containerFlud: {
    width: "100%",
    height: 3250,
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
  seatCustomerChoose: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  seatCustomerChooseFlud: {
    width: "100%",
    height: "100%",
    backgroundColor: "#48CAE4",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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

  introductionContainer: {
    width: "100%",
    height: 150,
    flexDirection: "column",
    rowGap: 10,
    paddingVertical: 10,
  },

  introductionGroup: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  seatBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  seatItem: {
    backgroundColor: "#D9D9D9",
  },
  seatTextBox: {
    fontSize: 15,
    fontWeight: "500",
  },
  seatContainer: {
    width: "100%",
    height: 2550,
    justifyContent: "center",
    alignItems: "center",
  },
  seatContainerFlud: {
    // backgroundColor: "gray",
    width: "90%",
    height: "100%",
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderWidth: 0.5,
    borderColor: "gray",
    borderStyle: "solid",
    justifyContent: "flex-start",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  seatHeader: {
    width: "100%",
    height: 180,
    // backgroundColor: "#48CAE4",
    justifyContent: "flex-end",
    paddingVertical: 15,
  },

  seatBody: {
    width: "100%",
    height: 2200,
    // backgroundColor: "#48CAE4",
    // borderWidth: 0.5,
    // borderColor: "green",
    rowGap: 25,
  },

  outletGroup: {
    width: "100%",
    height: 40,
    // backgroundColor: "#48CAE4",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  item4040: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  rotate90Icon: {
    transform: [{ rotate: "90deg" }],
  },
  rotate270Icon: {
    transform: [{ rotate: "270deg" }],
  },

  outletLeftSize: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#48CAE4",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  outletRightSize: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
  },
  seatFooter: {
    width: "100%",
    height: 150,
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  seatButton: {
    width: "100%",
    height: 60,
    backgroundColor: "#48CAE4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
