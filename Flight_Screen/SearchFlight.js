import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import apiRequest from "../Service/ApiService";
 
const SearchFlight = ({ navigation, route }) => {
    const { username } = route.params;
    const [search, setSearch] = useState([]);

    const [bookingCodeSearch, setBookingCodeSearch] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await apiRequest('/getBookingFlightByBookingCode', 'GET', null ,{
                search: search,
                username: username
            });
            console.log('API Response:', response);

            if (response && response.length > 0) { //Nếu có
                setBookingCodeSearch(response);
            } else {
                setBookingCodeSearch([]);
            }
            setIsSearching(true);
          } catch (error) {
            console.error('ERROR fetching flight booked: ', error);
            setIsSearching(true);
            setBookingCodeSearch([]);
          }
          
    };

  return (
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
            height: 180,
            objectFit: "cover",
            position: "absolute",
            zIndex: 0,
          }}
          source={require("../assets/ImgDesign/Flight Screen/Flight_bg-removebg-preview.png")}
        ></Image>

        <View style={style.searchFrom}>
            <View style={style.searchFormFluid}>
                <TextInput 
                value={search}
                onChangeText={setSearch}
                placeholder="Booking Code/Mã đặt chỗ"
                style={{width: "80%", height: 50, borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 10, fontSize: 17}}
                />
                <TouchableOpacity style={{padding: 10, backgroundColor: '#CAF0F8', borderRadius: 5}} onPress={handleSearch}>
                    <Ionicons name="search" size={30}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>

        {/* Result from here */}
        <View style={style.resultForm}>
            {/* ForEach passenger index here */}
            {isSearching && bookingCodeSearch.length  ===  0 ? (
                <Text style={[style.text, {textAlign: 'center', marginTop: 20}]}>
                Not found with Booking Code: <Text style={style.boldText}>{search}</Text>
                </Text>
                    
            ) : (
                bookingCodeSearch.map((search, index) => (
                    <>
                        <View style={style.resultFormFlud}>
                            <View style={{flexDirection: 'row', borderRadius: 10}}>
                                {/* LeftItem */}
                                <View style={{flexDirection: 'column', width: '70%',borderWidth: 0.5, borderColor: 'gray'}}>
                                    <View style={[style.itemComponent, style.row]}>
                                        <Text style={style.text}>
                                            Họ và tên/Fullname: <Text style={[style.text, style.boldText]}>{search.gender === 'male' ? 'MR' : 'MS'} {search.fullName}  </Text> 
                                        </Text> 
                                    </View>
    
                                    <View style={[style.itemComponent, style.row]}>
                                        <Text style={style.text}>Chuyến bay/Flight: <Text style={[style.text, style.boldText]}>{search.flightNumber}</Text> </Text> 
                                    </View>
    
                                    <View style={[style.itemComponent, style.row]}>
                                        <Text style={style.text}>Hãng hàng không/Airline: <Text style={[style.text, style.boldText]}>{search.airline}</Text> </Text> 
                                    </View>
    
                                    <View style={[style.itemComponent, style.row]}>
                                        <Text style={style.text}>
                                            Chặng/Route: <Text style={[style.text, style.boldText]}>{search.startPlaceFullName}  </Text> 
                                            - <Text style={[style.text, style.boldText]}>  {search.endPlaceFullName}</Text>
                                        </Text> 
                                    </View>
    
                                    <View style={[style.itemComponent, style.row]}>
                                        <Text style={style.text}>
                                            Thời gian/DateTime: <Text style={[style.text, style.boldText]}>{search.departureDate}</Text> 
                                        </Text> 
                                    </View>
    
                                    <View style={[style.itemComponent, style.row]}>
                                        <Text style={style.text}>Cửa/Gate: <Text style={[style.text, style.boldText]}>{search.gate}</Text> </Text> 
                                    </View>
    
                                    <View style={[style.itemComponent, style.row]}>
                                        <Text style={style.text}>
                                            Lịch trình/Boarding time: <Text style={[style.text, style.boldText]}>{search.timeStart} - {search.timeEnd}</Text> 
                                        </Text> 
                                    </View>
                                </View>

                                {/* Insert img absolute leftItem */}
                                <View style={{position: 'absolute', zIndex: 0, backgroundColor: 'transparent', width: '70%', height: 305}}>
                                    <View style={{backgroundColor: 'transparent', width: 80, height: 60, top: 30, right: 0, position: 'absolute', zIndex: 1}}>
                                        <Image style={{width: '100%', height: '100%', objectFit: 'contain'}} source={{uri: search.airPlaneLogoImg}}></Image>
                                    </View>
                                </View>
                                
                                {/* RightItem */}
                                <View style={{width: '30%', borderWidth: 0.5, borderColor: 'gray', justifyContent: 'flex-start', alignItems: 'center', height: '100%', flexDirection: 'column'}}>
                                    {/* Top: Route */}
                                    <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center',alignItems: 'center',padding: 10, height: '25%'}}>
                                        <Text style={style.text}>Destination</Text>
                                        <Text>
                                            <Text style={[style.routeText]}>{search.startPlace}  </Text> 
                                            <Text style={{fontSize: 25}}>✈</Text>
                                            <Text style={[style.routeText]}>  {search.endPlace}</Text>
                                        </Text>
                                    </View>
                                    {/* Bottom: QRCode */}
                                    <View style={{justifyContent: 'center',alignItems: 'center', height: '75%'}}>
                                        {/* Change image from csdl */}
                                        <Image source={{uri: search.qrCodeImg}}
                                        style={{width: 150, height: 150, objectFit: 'contain'}}
                                        >
                                        </Image>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                ))
            )}
        </View>
      </View>
    </View>
  );
};

export default SearchFlight;

const style = StyleSheet.create({
    between: {
    justifyContent: "space-between",
    },
  row: {
    flexDirection: "row",
  },
  routeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 17,
  },
  boldText: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#CAF0F8",
  },
  containerFlud: {
    width: "100%",
    backgroundColor: "#CAF0F8",
  },
  backGroup: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  backItem: {
    width: "95%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  searchFrom: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  searchFormFluid: {
    width: "95%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  resultForm: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    gap: 20,
    marginTop: 15,
  },
  resultFormFlud: {
    width: "95%",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderWidth: 1,
    gap: 10,
    height: 305,
  },
  itemComponent: {
    flexDirection: "row",
    padding: 10,
  },
});
