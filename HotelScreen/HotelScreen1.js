import react, {useState} from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ioicon from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { View, StyleSheet, Text, TextInput,FlatList, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";

// Add hotel data here
const hotelData = [
    {
        id: 1,
        name: 'Nusa Pedina',
        image: require('../assets/ImgDesign/Hotel Screen/Nusa Pedina.jpg'),
        address: 'Bali, Indonesia',
        rateCount: '4.8',
        special: ['Mountain', 'Lake', 'Gym', 'Restaurant', 'Pool'],
        price: '580',
        content: 'Nusa Penida is a must-visit from Bali! This island boasts pristine beaches, fantastic snorkeling, and I’m sure you’ve seen the photos of the iconic T-rex cliffs all over Instagram',
        offer1: '2 Bed',
        imgOffer1: require('../assets/ImgDesign/Hotel Detail Screen/bedroom_icon.png'),
        offer2: 'Dinner',
        imgOffer2: require('../assets/ImgDesign/Hotel Detail Screen/dinner icon.png'),
        offer3: 'HotTub',
        imgOffer3: require('../assets/ImgDesign/Hotel Detail Screen/hot tub icon.png'),
        offer4: '2 Ac',
        imgOffer4: require('../assets/ImgDesign/Hotel Detail Screen/ac-icon.png'),
        hostName: 'John Smith',
        imgHostName: require('../assets/ImgDesign/Hotel Detail Screen/man avatar.png'),
        hostRateStar: '5.0',
        hostRateCount: '10.5K'
    },
    {
        id: 2,
        name: 'Bora Bora',
        image: require('../assets/ImgDesign/Hotel Screen/Bora Bora.jpg'),
        address: 'Matira Point',
        rateCount: '4.9',
        special: ['Beach', 'Spa', 'Restaurant', 'Pool'],
        price: '970',
        content: 'An island group in the Leeward Islands in the South Pacific. The Leeward Islands comprise the western part of the Society Islands of French Polynesia',
        offer1: '2 Bed',
        imgOffer1: require('../assets/ImgDesign/Hotel Detail Screen/bedroom_icon.png'),
        offer2: 'Dinner',
        imgOffer2: require('../assets/ImgDesign/Hotel Detail Screen/dinner icon.png'),
        offer3: 'Gym',
        imgOffer3: require('../assets/ImgDesign/Hotel Detail Screen/gym.png'),
        offer4: 'Rent Car',
        imgOffer4: require('../assets/ImgDesign/Hotel Detail Screen/rent_car-.png'),
        hostName: 'Jane Doe',
        imgHostName: require('../assets/ImgDesign/Hotel Detail Screen/woman avatar.png'),
        hostRateStar: '5.0',
        hostRateCount: '5.2K'
    },
    {
        id: 3,
        name: 'Climb the Matterhorn',
        image: require('../assets/ImgDesign/Hotel Screen/Matterhorn.png'),
        address: 'Switzerland',
        rateCount: '5.0',
        special: ['Mountain', 'Restaurant', 'Gym', 'Horse Rent'],
        price: '1580',
        content: 'The Matterhorn is one of the most recognizable mountains in all the Alps! Our guided climb up the Matterhorn is perfect for mountaineers who want to climb one of the most classic routes in all of the World.',
        offer1: '2 Bed',
        imgOffer1: require('../assets/ImgDesign/Hotel Detail Screen/bedroom_icon.png'),
        offer2: 'Dinner',
        imgOffer2: require('../assets/ImgDesign/Hotel Detail Screen/dinner icon.png'),
        offer3: 'Gym',
        imgOffer3: require('../assets/ImgDesign/Hotel Detail Screen/gym.png'),
        offer4: 'Horse Rent',
        imgOffer4: require('../assets/ImgDesign/Hotel Detail Screen/horseIcon.png'),
        hostName: 'Martin Mix',
        imgHostName: require('../assets/ImgDesign/Hotel Detail Screen/man avatar.png'),
        hostRateStar: '4.9',
        hostRateCount: '25K'
    },
    {
        id: 4,
        name: 'Shanghai City',
        image: require('../assets/ImgDesign/Hotel Screen/shanghai.png'),
        address: 'China',
        rateCount: '5.0',
        special: ['Special', 'Spa', 'Restaurant', 'Bar'],
        price: '1020',
        content: 'Shanghai is a direct-administered municipality and the most populous urban area in China. The city is located on the Chinese shoreline on the southern estuary of the Yangtze River',
        offer1: '2 Bed',
        imgOffer1: require('../assets/ImgDesign/Hotel Detail Screen/bedroom_icon.png'),
        offer2: 'Dinner',
        imgOffer2: require('../assets/ImgDesign/Hotel Detail Screen/dinner icon.png'),
        offer3: 'Gym',
        imgOffer3: require('../assets/ImgDesign/Hotel Detail Screen/gym.png'),
        offer4: 'Rent Car',
        imgOffer4: require('../assets/ImgDesign/Hotel Detail Screen/rent_car-.png'),
        hostName: 'Martin Mix',
        imgHostName: require('../assets/ImgDesign/Hotel Detail Screen/man avatar.png'),
        hostRateStar: '4.9',
        hostRateCount: '25K'
    },
];

// Add top place data here
const topPlaceData = [
    {
        id: 1,
        name: 'Akasha Beach Hotel',
        image: require('../assets/ImgDesign/Hotel Screen/Akasha Beach Hotel.jpg'),
        address: 'Crete, Greece',
        roomLeft: 1,
    },
    {
        id: 2,
        name: 'Steela Island Luxury',
        image: require('../assets/ImgDesign/Hotel Screen/Stella Island Luxury Resort.jpg'),
        address: 'Crete, Greece',
        roomLeft: 5,
    },
];

// Add advertisement data here
const advertisementData = [
    {
        id: 1,
        name: 'Promotion 1',
        image: require('../assets/ImgDesign/Hotel Screen/United Airline Routes to Latin America.jpg'),
    },
    {
        id: 2,
        name: 'Promotion 2',
        image: require('../assets/ImgDesign/Hotel Screen/China Southern Airlines Promotion.jpg'),
    },
];

const HotelPromotionComponent = ({item, navigation}) => {


    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('HotelScreen2', {item})}
        style={style.hotelPromotionFlud}>
        <View style={style.hotelPromotionImageContainer}>
            <Image 
            style={{width: '100%', height: '100%',borderRadius: 10}}
            source={item.image}></Image>
        </View>
        <View style={style.hotelPromotionContent}>
            <View style={style.hotelPromotionContentGroup}>
                <Text style={{fontWeight: '500', letterSpacing: 0.5}}>{item.name}</Text>
                
                <View style={style.hotelAddressGroup}>
                    <EvilIcons name='location' size={20}></EvilIcons>
                    <Text style={{fontSize: 12, color: '#747373'}}>{item.address}</Text>
                </View>
            </View>
            
            <View style={{paddingHorizontal: 5, flexDirection: 'row'}}>
                <EvilIcons name='star' size={20}  color='#FF9500'></EvilIcons>
                <Text style={{fontSize: 12, color: '#747373'}}>{item.rateCount}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
};


const TopPlaceComponent = ({item}) => {
    return (
        <TouchableOpacity style={style.topPlaceRowItem}>
                         <View style={style.LeftContainer}>
                             <Image
                             style={{width: '100%', height: '100%',borderRadius: 10}}
                              source={item.image}></Image>
                         </View>
                         <View style={style.rightContainer}>
                             <View style={style.rightGroup}>
                                 <Text style={{fontWeight: '500', letterSpacing: 0.5}}>{item.name}</Text>
                             </View>
 
                             <View style={style.rightGroup}>
                                 <EvilIcons name='location' size={20}></EvilIcons>
                                 <Text style={{fontSize: 12, color: '#747373'}}>{item.address}</Text>   
                             </View>
 
                             <View style={style.rightGroup}>
                                 <Image 
                                 style={{width: 30, height: 30,
                                     objectFit: 'cover'}}
                                 source={require('../assets/ImgDesign/Hotel Screen/Flash_deal_icon-removebg-preview.png')}></Image>
                                 <Text style={{fontSize: 16, fontWeight: '500',letterSpacing: 1}}>{item.roomLeft} room left</Text>
                             </View>
                         </View>
                     </TouchableOpacity>
    );
}

const AdvertisementConponent = ({item}) => {
    return (
        <TouchableOpacity style={[style.hotelPromotionFlud, {width: 350}]}>
                         <View style={[style.hotelPromotionImageContainer, {height: '100%'}]}>
                             <Image 
                             style={{width: '100%', height: '100%',borderRadius: 10, objectFit: 'cover'}}
                             source={item.image}></Image>
                         </View>
                         
                     </TouchableOpacity>
    );
};


const HotelScreen1 = ({navigation}) => {
    const categories = ['Popular', 'Lake', 'Beach', 'Mountain', 'Gym', 'Special', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Horse Rent'];
    const [selectedCategory, setSelectedCategory] = useState('Popular');
    const filteredData = (selectedCategory === 'Popular' ? hotelData : hotelData.filter(item => item.special.includes(selectedCategory)));

    return (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
                <View style={style.container}>
            
            <View style={style.imgHeaderContainer}>
                <Image
                style={style.image}
                opacity={0.8}
                source={require('../assets/ImgDesign/Home Screen/Home.jpg')}></Image>
            </View>
 
            <View style={style.emptyGroup}>
                 <TouchableOpacity style={{ width: "10%", height: 35}}
                     onPress={() => navigation.navigate('Home')}
                     >
                         <AntIcon
                         name="arrowleft"
                         size={35}
                         ></AntIcon>
                     </TouchableOpacity>
             </View>
 
            <View style={style.greetingUserContainer}>
                <View style={style.greetingUserFlud}>
                    <View style={style.greetingUserLeftItem}>
                            
                        <Text style={style.text}>Have a nice day!</Text>
                        <View style={style.userGroup}>
                            <Image 
                            style={style.icon4040}
                            source={require('../assets/ImgDesign/Home Screen/Avatar.png')}></Image>
                            <Text style={style.userText}>Andriew</Text>
                        </View>
                        <Text style={style.locationText}><Ioicon name='location-outline' size={30}></Ioicon>VietNam</Text>
                        
                    </View>
 
                    <View style={[style.greetingUserRightItem]}>
                        <TouchableOpacity style={style.notificationContainer}>
                            <Image 
                            style={[style.icon4040]}
                            source={require('../assets/ImgDesign/Home Screen/notification-vector-icon-removebg-preview.png')}></Image>
 
                            
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
 
            <View style={style.searchContainer}>
                     <TextInput style={style.searchFlud} placeholder='Search here...' editable></TextInput>
            </View>
 
             
             <View style={style.filterContainer}>
             <ScrollView horizontal= {true} style={{height: "100%", width: "100%", marginTop: 25}}
             scrollEnabled
             showsHorizontalScrollIndicator={false}
             >
                {categories.map((category) => (
                 <TouchableOpacity 
                 style={[style.filterItem, selectedCategory === category && style.selectedCategory]}
                 key={category}
                 onPress={() => setSelectedCategory(category)}
                 >
                     
                     <Text style={style.filterText}>{category}</Text>
                 </TouchableOpacity>
 
                ))}
 
                 
                 </ScrollView>  
             </View>
             
 
             <View style={style.hotelPromotionContainer}>
                 
                 <ScrollView
                 horizontal= {true}
                 scrollEnabled
                 showsHorizontalScrollIndicator={false}
                 >
                    
                    <View>
                        <FlatList 
                            data={filteredData}
                            renderItem={({item}) => <HotelPromotionComponent item={item} navigation={navigation} />}
                            horizontal
                            keyExtractor={item => item.id}
                        ></FlatList>
                    </View>
                 </ScrollView>
                     
                 
                 
             </View>
 
             <View style={style.textComponentContainer}>
                 <View style={style.textComponentFlud}>
                     <Text style={{fontSize: 22, fontWeight: 'bold',letterSpacing: 0.5}}>Top place</Text>
                 </View>
             </View>
 
             <View style={style.hotelPromotionContainer}>
                 
                 <ScrollView
                 horizontal= {true}
                 scrollEnabled
                 showsHorizontalScrollIndicator={false}
                 >
                    <View>
                        <FlatList
                            data={topPlaceData}
                            renderItem={({item}) => <TopPlaceComponent item={item} />}
                            horizontal
                            keyExtractor={item => item.id.toString()}
                        ></FlatList>
                    </View>
                 </ScrollView>
                     
                 
                 
             </View>
 
             <View style={style.textComponentContainer}>
                 <View style={style.textComponentFlud}>
                     <Text style={{fontSize: 22, fontWeight: 'bold',letterSpacing: 0.5}}>Promotion</Text>
                 </View>
             </View>

             <View style={[style.hotelPromotionContainer]}>
                 <ScrollView
                 horizontal= {true}
                 scrollEnabled
                 showsHorizontalScrollIndicator={false}
                 >
                    <FlatList
                    data={advertisementData}
                    renderItem={({item}) => <AdvertisementConponent item={item} />}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    ></FlatList>
                </ScrollView>
             </View>
 
 
 
        </View>
        </ScrollView>
    );
};

export default HotelScreen1;

const style=StyleSheet.create({
    selectedCategory: {
        backgroundColor: "#00B4D8",
    },
    miniLogoLeft: {
        width: '100%',
        height: '25%',
        objectFit: "cover",
    },
    icon4040: {
        width: 40,
        height: 40,
    },
    filterIcon: {
        width: 20,
        height: '100%',
        objectFit: "contain",
        // borderWidth: 1,
    },
    text: {
        fontSize: 18,
        letterSpacing: 0.75,
    },
    locationText: {
        fontSize: 25,
        letterSpacing: 0.75,
        fontWeight: '400'
    },
    userText: {
        fontSize: 27,
        letterSpacing: 1,
    },
    filterText:{
        fontSize: 13,
        letterSpacing: 0.75,
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    notificationContainer: {
        width: 40, 
        height: 40, 
        borderRadius: 50,
        backgroundColor: "white",
    },
    container: {
        width: "100%",
        height: 1200,
        backgroundColor: "#CAF0F8",
    },
    imgHeaderContainer: {
        width: "100%",
        height: 250,
    },

    emptyGroup: {
        width: "100%",
        height: 70,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        position: 'absolute',
        paddingHorizontal: 10,
        zIndex: 1,
      },
      greetingUserContainer: {
        width: "100%",
        height: 250,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    greetingUserFlud: {
        width: "95%",
        height: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    greetingUserLeftItem: {
        width: "50%",
        height: "80%",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        rowGap: 12,
    },
    greetingUserRightItem: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "column",
    },
    userGroup: {
        width: "100%",
        height: "30%",
        flexDirection: "row",
        alignItems: "center",
    },
    searchContainer: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    searchFlud: {
        width: "90%",
        height: "90%",
        backgroundColor: "#E0F7FA",
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: "#00B4D8",
        paddingHorizontal: 25,
        fontSize: 18
    },
    filterContainer: {
        width: "100%",
        height: 70,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    filterItem: {
        height: "60%",
        backgroundColor: "#e3f7fb",
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "white",
        flexDirection: "row",
        marginLeft: 10,
        paddingHorizontal: 10,
        columnGap: 10
    },
    hotelPromotionContainer: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        flexDirection: "row",
    },
    hotelPromotionFlud: {
        height: 200,
        width: 250,
        backgroundColor: "#e3f7fb",
        borderRadius: 10,
        flexDirection: 'column',
        padding: 3,
        marginLeft: 20,
    },
    hotelPromotionImageContainer: {
        width: '100%', 
        height: '70%', 
        objectFit: 'cover', 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    hotelPromotionContent: {
        width: '100%',
        height: '33%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    hotelPromotionContentGroup: {
        width: '50%',
        height: '100%',
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        paddingHorizontal: 2
    },
    hotelAddressGroup: {
        flexDirection: "row",
    },
    textComponentContainer: {
        width: '100%',
        height: 50,
        
        justifyContent: "center",
        alignItems: "center",
    },
    textComponentFlud: {
        width: '95%',
        height: '100%',
        alignItems: "flex-start",
        justifyContent: "center",
    },
    topPlaceRowItem: {
        width: 330,
        height:  '100%',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        marginLeft: 20,
        flexWrap: "wrap",
        columnGap: 5,
        borderColor: 'white',
        backgroundColor: "#e3f7fb",
    },
    LeftContainer: {
        width: 160,
        height: '100%',
        objectFit: 'cover',
    },
    rightContainer: {
        width: 160,
        height: '100%',
        borderRadius: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
    },
    rightGroup: {
        width: '100%',
        height: '27%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});