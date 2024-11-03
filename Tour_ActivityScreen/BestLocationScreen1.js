import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image, Alert} from "react-native";
import React, { useState, useEffect } from "react";
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from "react-native-gesture-handler";

const bestLocationData = [
    {
        id: 1,
        countryDetail: 'Detail of Tokyo',
        countryName: 'Tokyo',
        countryFlag: require('../assets/ImgDesign/Tour Screen/Country Flag/Japan.jpg'),
        countryImage: require('../assets/ImgDesign/Tour Screen/Tokyo/Tokyo.jpg'),
        countryState: 'Japan, Southwest Asia',
        coutryImageCenterRight1: require('../assets/ImgDesign/Tour Screen/Tokyo/Detail top right image/1.jpg'),
        coutryImageCenterRight2: require('../assets/ImgDesign/Tour Screen/Tokyo/Detail top right image/2.jpg'),
        coutryImageCenterRight3: require('../assets/ImgDesign/Tour Screen/Tokyo/Detail top right image/3.jpg'),
        countryIntroduction: 'Tokyo, One of Japan Largest Sightseeing Areas where you can Enjoy Everything. This including natural, historical and cultural spots, as well as museums, zoos and aquariums, amusement spots and spots related to Anime.',
        countryPlace1Name: 'Senso-ji Pagoda',
        countryLocation1: 'Asakusa, Tokyo',
        countryRateCount1: '4.8',
        countryImgPlace1: require('../assets/ImgDesign/Tour Screen/Tokyo/Tokyo_sensoji.jpg'),
        countryPlace2Name: 'Tokyo Station',
        countryLocation2: 'Chiyoda-ku, Tokyo',
        countryRateCount2: '4.8',
        countryImgPlace2: require('../assets/ImgDesign/Tour Screen/Tokyo/Tokyo_Station.jpg'),
    },

    {
        id: 2,
        countryDetail: 'Detail of London',
        countryName: 'London',
        countryFlag: require('../assets/ImgDesign/Tour Screen/Country Flag/London.png'),
        countryImage: require('../assets/ImgDesign/Tour Screen/London/London.jpg'),
        countryState: 'England, Western Europe',
        coutryImageCenterRight1: require('../assets/ImgDesign/Tour Screen/London/Detail top right image/1.jpg'),
        coutryImageCenterRight2: require('../assets/ImgDesign/Tour Screen/London/Detail top right image/2.jpg'),
        coutryImageCenterRight3: require('../assets/ImgDesign/Tour Screen/London/Detail top right image/3.jpg'),
        countryIntroduction: 'London, a city rich in history and brimming with contemporary culture. Whether you are a first-time visitor or a seasoned traveler, London has a range of fascinating attractions and activities that promise to make your visit memorable. ',
        countryPlace1Name: 'Royal Observatory',
        countryLocation1: 'Greenwich, England',
        countryRateCount1: '5.0',
        countryImgPlace1: require('../assets/ImgDesign/Tour Screen/London/London_The Royal Observatory.png'),
        countryPlace2Name: 'Tower of London',
        countryLocation2: 'Tower Hill, London',
        countryRateCount2: '4.9',
        countryImgPlace2: require('../assets/ImgDesign/Tour Screen/London/London_The Tower Of London.jpg'),
    },
    
];

const BestLocationComponent = ({item, navigation}) => {
    return(
        <TouchableOpacity style={style.countryComponent} onPress={() => navigation.navigate("DetailLocationScreen", {item})}>
            <Image 
            style={{objectFit: 'cover', width: 150, height: 250, borderRadius: 10}}
            source={item.countryImage}></Image>
            <View style={style.absoluteWithImage}>
                <Text style={style.textShadowAbsolute}>{item.countryName}</Text>
            </View>
       </TouchableOpacity>
        
    );
};


const PopularData = [
    {
        id: 1,
        Name: 'The Hanging Monastery in China',
        Location: 'East Asian China',
        Image: require('../assets/ImgDesign/Tour Screen/The Hanging Monastery in China.jpg'),
        Cost: '1.020.075 đ',
    },
    {
        id: 2,
        Name: 'Sun World Ba Na Hills',
        Location: 'Da Nang, Vietnam',
        Image: require('../assets/ImgDesign/Tour Screen/Ba Na Hills in Vietnam.jpg'),
        Cost: '478.264 đ',
    },
];

const PopularTravelComponent = ({item}) => {
    return(
        <View style={{backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 15, paddingHorizontal: 5}}>
                            <View style={style.imageContainer}>
                                <Image 
                                    style={style.bestLocationImage}
                                    source={item.Image}></Image>
                            </View>
                            <Text style={{paddingHorizontal: 5}}>{item.Name}</Text>
                            <View style={{flexDirection: 'row', width: '100%', height: '23%',alignItems: 'center'}}>
                                <Ionicons name="location-outline" size={20}></Ionicons>
                                <Text style={{fontSize: 11, color: '#747373'}}>{item.Location}</Text>
                                <TouchableOpacity style={style.costInformation} onPress={() => Alert.alert("Info","Additional fees and taxes included")}>
                                    <Text style={{textDecorationLine: 'underline'}}>{item.Cost}</Text>
                                </TouchableOpacity>
                            </View>
        </View>
    );
}

// const NearbyLocationData = [
//     {
//         id: 1,
//         Name: 'Hồ Chí Minh',
//         Image: require('../assets/ImgDesign/Tour Screen/HCM City.jpg'),
//     },
//     {
//         id: 2,
//         Name: 'Đà Nẵng',
//         Image: require('../assets/ImgDesign/Tour Screen/Da Nang.jpg'),
//     },
//     {
//         id: 3,
//         Name: 'Nha Trang',
//         Image: require('../assets/ImgDesign/Tour Screen/Nha Trang.jpg'),
//     }

// ];

// const NearbyLocationComponent = ({item}) => {
//     return (
//         <TouchableOpacity style={style.locationContainer}>
//                         <Image 
//                         style={{width: 200, height: '100%', objectFit: 'cover',borderRadius: 15}}
//                         source={item.Image}></Image>
//                         <View style={[style.overlay, {width: 200}]} />
//                         <View style={style.countryAbsoluteContainer}>
//                             <Text style={{color: '#fff', fontWeight: 'bold', letterSpacing: 0.75}}>{item.Name}</Text>
//                         </View>
//         </TouchableOpacity>
//     );
// }

const Tour_ActivityScreen1 = ({navigation}) => {
    const [data, setData] = useState([]);
    
    const fetchData = async () => {
        try {
            const response = await fetch('https://671f9fdbe7a5792f052eef0f.mockapi.io/api/tour/NearbyLocation');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const jsonData = await response.json();
              setData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

   return (
       
       <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
             <View style={style.container}>
             <View style={style.imgHeaderContainer}>
                <Image 
                style={style.imageBG} 
                source={require('../assets/ImgDesign/Tour Screen/Tour background screen.jpg')}></Image>
            </View>

            <View style={style.itemComponent}>
                <View style={[style.itemComponentFlud, {height: 90}]}>
                    {/* Nothing here */}
                </View>

                <View style={[style.itemComponentFlud, {justifyContent: 'center', alignItems: 'flex-start'}]}>
                    <View style={style.itemComponentGroup}>
                            <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            >
                                <AntIcon name="arrowleft" size={35}></AntIcon>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image 
                           style={[style.icon4040]}
                           source={require('../assets/ImgDesign/Home Screen/notification-vector-icon-removebg-preview.png')}></Image>
                            </TouchableOpacity>
                    </View>
                </View>


                <View style={[style.itemComponentFlud, {justifyContent: 'center'}]}>
                    <Text style={{fontSize: 17, letterSpacing: 0.75}}>Where do you want to go, 
                         <Text style={{fontWeight: 'bold'}}>Andrew</Text>
                    ?</Text>
                </View>

                <View style={[style.itemComponentFlud, {justifyContent: 'center'}]}>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <Ionicons name="location-outline" size={35}></Ionicons>
                        <Text style={{fontSize: 17, letterSpacing: 0.75}}>Vietnam</Text>
                    </View>
                </View>

                <View style={[style.itemComponentFlud, {justifyContent: 'center'}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextInput 
                        style={{width: '78%', height: 40, backgroundColor: '#F5F5F5', borderRadius: 5, paddingLeft: 10, fontSize: 18}}
                        placeholder="Search here..."
                        ></TextInput>
                        <TouchableOpacity style={{width: '20%', height: 40, backgroundColor: '#F5f5f5', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                            <AntIcon name="search1" size={35}></AntIcon>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[style.itemComponentFlud, {justifyContent: 'center'}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Best Location To Travel</Text>
                        {/* <TouchableOpacity>
                            <Text style={{fontSize: 17, color: '#FFA500', letterSpacing: 0.75}}>See all</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                
                {/* Component here */}
                <View style={[style.itemComponentFlud, {height: 250}]}>
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={bestLocationData}
                        horizontal
                        renderItem={({item}) => <BestLocationComponent item={item} navigation={navigation}></BestLocationComponent>}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{columnGap: 30}}
                        ></FlatList>
                </View>

                <View style={[style.itemComponentFlud, {justifyContent: 'center'}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Popular Travel</Text>
                        {/* <TouchableOpacity>
                            <Text style={{fontSize: 17, color: '#FFA500', letterSpacing: 0.75}}>See all</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>

                {/* Component here */}
                <View style={[style.itemComponentFlud, {height: 200}]}>
                    <View style={style.popularTravelItem}>
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={PopularData}
                        renderItem={({item}) => <PopularTravelComponent item={item} navigation={navigation}></PopularTravelComponent>}
                        keyExtractor={item => item.id}
                        horizontal
                        contentContainerStyle={{columnGap: 30}}
                        ></FlatList>
                    </View>
                </View>
                        
                <View style={[style.itemComponentFlud, {justifyContent: 'center'}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Nearby Your Location</Text>
                        {/* <TouchableOpacity>
                            <Text style={{fontSize: 17, color: '#FFA500', letterSpacing: 0.75}}>See all</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                
                {/* Component here */}
                <ScrollView>
                    <View style={[style.itemComponentFlud, {justifyContent: 'center', height: 160}]}>
                        <View style={{width: '100%', height: 160, flexDirection: 'row', justifyContent: 'space-between', columnGap: 20, paddingHorizontal: 10}}>
                        {
                                data.length > 0 && data.map((item) => (
                                    <TouchableOpacity style={style.locationContainer}>
                                    <Image 
                                    key={item.id}
                                    style={{width: 200, height: '100%', objectFit: 'cover',borderRadius: 15}}
                                    source={{url: item.Image}}></Image>
                                        <View style={[style.overlay, {width: 200}]} />
                                        <View style={style.countryAbsoluteContainer}>
                                            <Text style={{color: '#fff', fontWeight: 'bold', letterSpacing: 0.75}}>{item.Name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>

            </View>
            
        </View>
       </ScrollView>
   ); 
};

export default Tour_ActivityScreen1;

const style = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% đen để làm tối ảnh
        borderRadius: 15,

    },
    bestLocationImage: {
        width: '100%',
        height: '100%', 
        objectFit: 'cover', 
        textAlign: 'center',
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15
    },
    costInformation: {
        width: 95, 
        height: 40, 
        borderWidth: 0.5,
        borderColor: 'gray',
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 2,
        shadowColor: 'gray', 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 1, 
        shadowRadius: 5,
        elevation: 5, 
        zIndex: 1
    },
    icon4040: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowDirection: {
        flexDirection: 'row',
    },
    absolute: {
        position: 'absolute',
    },
    container: {
        width: '100%',
        height: 1000,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgHeaderContainer: {
        width: '100%',
        height: 400,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    imageBG: {
        objectFit: 'cover',
        opacity: 0.6,
    },
    itemComponent: {
        width: '100%',
        height: 1100,
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        rowGap: 5
    },
    itemComponentFlud: {
        width: '95%',
        height: 40,
    },
    itemComponentGroup: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    countryComponent: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    textShadowAbsolute: {
        padding: 5, 
        fontSize: 17,
        zIndex: 1,
        shadowColor: '#CAF0F8', 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 1, 
        shadowRadius: 10,
        elevation: 5, 
        backgroundColor: '#CAF0F8',
        letterSpacing: 0.75,
        borderRadius: 3,
    },
    absoluteWithImage: {
        position: 'absolute',
        width: 150,
        height: 250,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 30,
        borderRadius: 10
    },
    popularTravelItem: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
    },
    locationContainer: {
        width:  200,
        height: '100%',
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    countryAbsoluteContainer: {
        position: 'absolute', 
        width: 300, 
        height: '100%', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start', 
        paddingVertical: 20, 
        paddingHorizontal: 10
    },
});