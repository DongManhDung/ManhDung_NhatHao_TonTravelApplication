import react, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIsto from "react-native-vector-icons/Fontisto";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

const Flight1 = ({navigation, route}) => {
  const [isChecked, setChecked] = useState(false);
  const [text1, setText1] = useState(route.params?.selectedValue1 || 'Hồ Chí Minh (SGN)');
                      
  const [text2, setText2] = useState(route.params?.selectedValue2 || "Tokyo (NRT)");
  
  if (route.params?.selectedValue) {
    if (route.params?.selectedFor === 'button1') {
      setText1(route.params.selectedValue);
    } else if (route.params?.selectedFor === 'button2') {
      setText2(route.params.selectedValue);
    }

    // Xóa params sau khi đã gán dữ liệu
    route.params.selectedValue = undefined;
    route.params.selectedFor = undefined;
  }

  const navigateToList = (button) => {
    navigation.navigate('ListDestination', { 
      selectedFor: button,
      currentSelections: [text1, text2]
     });
  };

  const handleSwap = () => {
    setText1(text2);
    setText2(text1);
  };

  //Chọn ngày
  const [selectedDate, setSelectedDate] = useState('Select Departure Date');
  const [selectedReturnDate, setSelectedReturnDate] = useState('Select Return Date');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Xử lý hiển thị Departure DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDepartureConfirm = (date) => {
    const formattedDate = moment(date).format('ddd, MMM DD, YYYY');
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  // Xử lý hiển thị Return DatePicker
  const [isReturnDatePickerVisible, setReturnDatePickerVisibility] = useState(false);

  const showDateReturnPicker = () => {
    setReturnDatePickerVisibility(true);
  };

  const hideDateReturnPicker = () => {
    setReturnDatePickerVisibility(false);
  };

  const handleReturnConfirm = (date2) => {
    const formattedReturnDate = moment(date2).format('ddd, MMM DD, YYYY');
    if (moment(date2) <= moment(new Date())) {
      Alert.alert('Error', 'Return date must be after departure date!');
    }
    else {
      setSelectedReturnDate(formattedReturnDate);
      hideDateReturnPicker();
    }
  };


  //Tự Custom Modal Dialog cho TouchableOpacity chọn Passenger, Class
  const [isModalVisible, setModalVisible] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seatClass, setSeatClass] = useState('Economy');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //Tang so luong nguoi lon hoac tre em
  const increment = (type) => {
    if (type === 'adult') {
      setAdultCount(adultCount + 1);
    } else {
      setChildCount(childCount + 1);
    }
  };

  //Giam so luong nguoi lon hoac tre em
  const decrement = (type) => {
    if (type === 'adult' && adultCount > 0) {
      setAdultCount(adultCount - 1);
    } else if (type === 'child' && childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

  const handleSubmit = () => {
    if(text1 === null || text2 === null || selectedDate === 'Select Departure Date' || selectedReturnDate == 'Select Return Date'  || (adultCount === 0 && childCount === 0)) {
      Alert.alert('Error','Please fill in all fields!');
      navigation.navigate('Flight2');
    }
    else {
      const totalPassengers = adultCount + childCount;
      navigation.navigate('Flight3', {
        text1,
        text2,
        selectedDate,
        seatClass,
        totalPassengers,
      });
    }
  };
  return (
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
            height: 180,
            objectFit: "cover",
            position: "absolute",
            zIndex: -1,
          }}
          source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
        ></Image>

        <View style={style.formContainer}>
          <View style={style.formContainerFlud}>
            <View style={style.formGroupContainer}>
              <View style={style.formGroupItem}>
                <View style={[style.formLeftItem]}>
                    <TouchableOpacity style={style.doubleCenterBtn}
                    onPress={() => navigation.navigate('Flight1')}
                    >
                      <Text style={{fontSize: 17, fontWeight: '500', letterSpacing: 0.75}}>One-way</Text>
                    </TouchableOpacity>
                </View>

                <View style={[style.formRightItem,style.activated]}>
                    <TouchableOpacity style={style.doubleCenterBtn}
                    onPress={() => navigation.navigate('Flight2')}
                    >
                      <Text style={{fontSize: 17,  color: '#023E8A',fontWeight: '500', letterSpacing: 0.75}}>Round-trip</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[style.formGroupContainer,{height: 50, bottom: 10}]}>
              <View style={style.formGroupItem}>
                <View style={[style.formLeftItem,style.disactivated]}>
                  <Text style={{fontSize: 17, fontWeight: '500', letterSpacing: 0.75, color: '#023E8A'}}>From</Text>
                </View>

                <TouchableOpacity onPress={handleSwap}>
                  <FontIsto name = {'arrow-swap'}
                  style={{fontSize: 30, top: 10}}
                ></FontIsto>
                </TouchableOpacity>

                <View style={[style.formRightItem, style.disactivated]}>
                      <Text style={{fontSize: 17, fontWeight: '500', letterSpacing: 0.75, color: '#023E8A'}}>To</Text>
                </View>
              </View>
            </View>
            
            <View style={[style.formGroupContainer,{bottom: 25}]}>
              <View style={style.formGroupItem}>
                <View style={[style.formLeftItem,style.disactivated]}>
                  <TouchableOpacity style={[style.buttonShot]}>
                    <Text style={[style.textInputShort]} value={text1} onChangeText={setText1} onPress={() => navigateToList('button1')}>
                      {text1}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[style.formRightItem, style.disactivated]}>
                <TouchableOpacity style={style.buttonShot}>
                    <Text style={style.textInputShort} value={text2} onChangeText={setText2} onPress={() => navigateToList('button2')}>
                      {text2}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[style.formGroupContainer,{height: 50, bottom: 40}]}>
              <View style={style.formGroupItem}> 
                <View style={[style.formRightItem, style.disactivated]}>
                      <Text style={{fontSize: 17, fontWeight: '500', letterSpacing: 0.75, color: '#023E8A'}}>Departure Date</Text>
                </View>
              </View>
            </View>

            <View style={[style.formGroupContainer,{bottom: 40}]}>
              <View style={style.formGroupItem}>
                <View style={[style.formFullItem,style.disactivated]}>
                  <TouchableOpacity style={style.buttonShot} onPress={showDatePicker}>
                    <Text style={style.textInputShort}>
                      {selectedDate}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            display="default"
            onConfirm={handleDepartureConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            />



            <View style={[style.formGroupContainer,{height: 50, bottom: 75}]}>
              <View style={style.formGroupItem}> 
                <View style={[style.formRightItem, style.disactivated]}>
                      <Text style={{fontSize: 17, fontWeight: '500', letterSpacing: 0.75, color: '#023E8A'}}>Return Date</Text>
                </View>
              </View>
            </View>

            <View style={[style.formGroupContainer,{bottom: 75}]}>
              <View style={style.formGroupItem}>
                <View style={[style.formFullItem,style.disactivated]}>
                  <TouchableOpacity style={style.buttonShot} onPress={showDateReturnPicker}>
                    <Text style={style.textInputShort}>
                      {selectedReturnDate}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <DateTimePickerModal
            isVisible={isReturnDatePickerVisible}
            mode="date"
            display="default"
            onConfirm={handleReturnConfirm}
            onCancel={hideDateReturnPicker}
            minimumDate={new Date()}
            />

            <View style={[style.formGroupContainer,{height: 50, bottom: 110}]}>
              <View style={style.formGroupItem}> 
                <View style={[style.formRightItem, style.disactivated]}>
                      <Text style={{fontSize: 17, fontWeight: '500', letterSpacing: 0.75, color: '#023E8A'}}>Passengers</Text>
                </View>
              </View>
            </View>

            <View style={[style.formGroupContainer,{bottom: 110}]}>
              <View style={style.formGroupItem}>
                <View style={[style.formFullItem,style.disactivated]}>
                  <TouchableOpacity style={style.buttonShot} onPress={toggleModal}>
                    <Text style={style.textInputShort}>
                        {adultCount} Adults, {childCount} Children, {seatClass}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Modal Dialog Here  */}
            <Modal isVisible={isModalVisible} style={style.modal}>
                <View style={style.modalContent}>
                  <Text style={style.title}>Choose your number passenger</Text>
                  
                  <View style={style.option}>
                    <Text>Adult: </Text>
                    <TouchableOpacity style={style.counterButton} onPress={() => decrement('adult')}>
                      <Text style={style.counterText}>-</Text>
                    </TouchableOpacity>
                    <Text style={style.countText}>{adultCount}</Text>
                    <TouchableOpacity style={style.counterButton} onPress={() => increment('adult')}>
                      <Text style={style.counterText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={style.option}>
                    <Text>Child: </Text>
                    <TouchableOpacity style={style.counterButton} onPress={() => decrement('child')}>
                      <Text style={style.counterText}>-</Text>
                    </TouchableOpacity>
                    <Text style={style.countText}>{childCount}</Text>
                    <TouchableOpacity style={style.counterButton} onPress={() => increment('child')}>
                      <Text style={style.counterText}>+</Text>
                    </TouchableOpacity>
                  </View>

                        {/* Chọn class 1 trong 4 */}
                        <View style={style.option}>
                          <Text>Class:</Text>
                          <Picker
                          selectedValue={seatClass}
                          style={style.picker}
                          onValueChange={(itemValue) => setSeatClass(itemValue)}
                          >
                            <Picker.Item label="Basic" value="Basic" />
                            <Picker.Item label="Economy" value="Economy" />
                            <Picker.Item label="Premium" value="Premium" />
                            <Picker.Item label="Business" value="Business" />
                          </Picker>
                        </View>

                  <TouchableOpacity style={style.closeButton} onPress={toggleModal}>
                    <Text style={style.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

            <View style={style.addHotelContainer}>
                <View style={style.addHotelContainerFlud}>
                  <View style={[style.formLeftItem, style.disactivated, {flexDirection: 'row'}]}>
                      <Checkbox value={isChecked} onValueChange={setChecked}
                      style= {{width: 30, height: 30}}
                      ></Checkbox>
                      <Text style={{fontSize: 18, left: 10, color: '#023E8A', letterSpacing: 0.5}}>Hotel Additions</Text>
                  </View>

                  <View style={[style.formRightItem,style.disactivated]}>
                    <Text style={style.saveUpTxt}>Save up to 15%</Text>
                  </View>
                </View>
            </View>

            <View style={style.searchBtnContainer}>
              <View style={style.searchBtnFlud}>
                  <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                  onPress={handleSubmit}
                  >
                    <Text style={{fontSize: 20, color: '#fff', letterSpacing: 0.75}}>Search</Text>
                  </TouchableOpacity>
              </View>
            </View>


            
          </View>
        </View>

        <View style={style.recentSearchedContainer}>
          <View style={style.recentSearchedContainerFlud}>
            <Text style={style.textTitle}>Recent Searches</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Flight1;

const style = StyleSheet.create({
  picker: {
    height: 130,
    width: 150,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerFlud: {
    width: "100%",
    height: 1000,
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
  formContainer: {
    width: "100%",
    height: 520,
    top: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  formContainerFlud: {
    width: "95%",
    height: "100%",
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    bottom: 5,
    letterSpacing: 0.75,
  },
  formGroupContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    // backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  formGroupItem:{
    width: "90%",
    height: "100%",
    flexDirection: "row",
    // backgroundColor: "yellow",
    justifyContent: "space-evenly",
  },
  activated: {
    borderBottomWidth: 1,
    borderBottomColor: '#023E8A'
  },
  disactivated: {
    borderBottomWidth: 0,
  },
  formLeftItem: {
    width: "48%",
    height: "100%",
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000000",
  },

  formRightItem: {
    width: "48%",
    height: "100%",
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000000",
  },

  formFullItem: {
    width: "100%",
    height: "100%",
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000000",
    bottom: 20
  },

  doubleCenterBtn: {
    width: '100%',
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    buttonShot: {
      height: 40,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#D9D9D9',
      position: 'absolute',
      zIndex: 1,
    },
    buttonLong: {

    },
  textInputShort: {
    fontSize: 15, 
    fontWeight: '500', 
    letterSpacing: 0.75, 
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    zIndex: -1,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 400,
    height: 450,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  counterButton: {
    backgroundColor: '#007BFF',
    padding: 17,
    borderRadius: 5,
    marginHorizontal: 5,

  },
  counterText: {
    color: 'white',
    fontSize: 16,
  },
  countText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  addHotelContainer: {
    bottom: 130,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addHotelContainerFlud: {
    width: '90%',
    height: '100%',
    borderBottomWidth: 1,
    // backgroundColor: 'red',
    borderBottomColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveUpTxt: {
    fontSize: 18, 
    left: 10, 
    color: '#023E8A', 
    backgroundColor: '#ADE8F4',
    paddingVertical: 5, 
    paddingHorizontal: 5, 
    borderRadius: 10,
  },

  searchBtnContainer: {
    width: '100%',
    height: 50,
    bottom: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnFlud: {
    width: '90%',
    backgroundColor: '#023E8A',
    borderRadius: 20,
    height: 50,
  },

  recentSearchedContainer: {
    width: "100%",
    height: 50,
    // backgroundColor: 'red',
    top: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  recentSearchedContainerFlud: {
    width: "95%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
