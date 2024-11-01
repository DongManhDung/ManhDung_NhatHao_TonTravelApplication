import {View, StyleSheet, Text, Touchable, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';

const HotelScreen2 = ({navigation, route}) => {
    const {item}  = route.params;
    const [pressed, setPressed] = useState(false);
    const handlePress = () => {
        setPressed(!pressed);
    }
    return(
        <ScrollView showsVerticalScrollIndicator={false} >
            <View styles={style.container}>
            <View style={style.imageHeaderContainer}>
                <Image
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                source={item.image}></Image>
            </View>
            <View style={style.optionContainer}>
                <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={{width: 35, height: 35, backgroundColor: 'transparent', zIndex: 1, borderRadius: 5}}>
                    <AntIcon name='arrowleft' style={style.icon}></AntIcon>
                </TouchableOpacity>
                <View style={style.rightOptionGroup}>
                    <TouchableOpacity style={{width: 35, height: 35, backgroundColor: 'transparent', zIndex: 1, borderRadius: 5}}>
                        <AntIcon name='hearto' style={pressed ? style.loved : style.icon} onPress={handlePress}></AntIcon>
                    </TouchableOpacity><TouchableOpacity style={{width: 35, height: 35, backgroundColor: 'transparent', zIndex: 1, borderRadius: 5}}>
                        <AntIcon name='sharealt' style={style.icon}></AntIcon>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={style.footerContainer}>
                <View style={style.footerContainerFlud}>
                    <View style={[style.footerComponent, {alignItems: 'flex-end'}]}>
                        <Text style={{width: '70%', fontSize: 35, fontWeight: '500', letterSpacing: 1.25}}>{item.name}</Text>
                    </View>

                    <View style={[style.footerComponent, {borderBottomWidth: 0.5}]}>
                        <View style={style.footerItem50Container}>
                            <View style={style.footerItemGroup}>
                                <TouchableOpacity><EvilIcon name='location' size={25}></EvilIcon></TouchableOpacity>
                                <Text style={style.blurText}>{item.address}</Text>
                            </View>

                            <View style={style.footerItemGroup}>
                                <EvilIcon name='star' size={25} color='#FF9500'></EvilIcon>
                                <Text style={style.blurText}>{item.rateCount} <Text>(6.8K review)</Text></Text>
                            </View>
                        </View>

                        <View style={[style.footerItem50Container,{alignItems: 'flex-end'}]}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>${item.price}<Text style={{fontSize: 16, fontWeight: 400}}>/night</Text></Text>
                        </View>
                    </View>

                    <View style={[style.footerComponent, {justifyContent: 'center', alignItems: 'center'}]}>
                        <Text style={{textAlign: 'justify'}}>{item.content}
                            <Text style={{color: '#0096C7'}}> Read more</Text>
                        </Text>
                    </View>

                    <View style={style.textComponent}>
                        <Text style={{fontSize: 27, fontWeight: 'bold', letterSpacing: 1}}>What we offer</Text>
                    </View>

                    <View style={[style.footerComponent, {justifyContent: 'space-evenly',alignItems: 'center'}]}>

                        <View style={style.offerItem}>
                            <Image 
                            style={{width: 40, height: 40, objectFit: 'cover'}}
                            source={item.imgOffer1}></Image>
                            <Text style={{fontWeight: 'bold'}}>{item.offer1}</Text>
                        </View>

                        <View style={style.offerItem}>
                            <Image 
                            style={{width: 40, height: 40, objectFit: 'cover'}}
                            source={item.imgOffer2}></Image>
                            <Text style={{fontWeight: 'bold'}}>{item.offer2}</Text>
                        </View>


                        <View style={style.offerItem}>
                            <Image 
                            style={{width: 40, height: 40, objectFit: 'cover'}}
                            source={item.imgOffer3}></Image>
                            <Text style={{fontWeight: 'bold'}}>{item.offer3}</Text>
                        </View>

                        <View style={style.offerItem}>
                            <Image 
                            style={{width: 40, height: 40, objectFit: 'cover'}}
                            source={item.imgOffer4}></Image>
                            <Text style={{fontWeight: 'bold'}}>{item.offer4}</Text>
                        </View>
                    </View>

                    <View style={style.textComponent}>
                        <Text style={{fontSize: 27, fontWeight: 'bold', letterSpacing: 1}}>Hosted by</Text>
                    </View>

                    <View style={[style.footerComponent, {flexDirection: 'row'}]}>
                        <View style={style.avatarHostContainer}>
                            <Image 
                            style={{width: 50, height: 50, objectFit: 'cover', borderWidth: 0.5, borderRadius: 10}}     
                            source={item.imgHostName}></Image>
                        </View>

                        <View style={style.inforHostContainer}>
                            <Text style={style.blurText}>{item.hostName}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcon name='star' size={25} color='#FF9500'></EvilIcon>
                                <Text style={style.blurText}>{item.hostRateStar} <Text>({item.hostRateCount} review)</Text></Text>
                            </View>
                        </View>

                        <View style={style.chatBoxContainer}>
                            <TouchableOpacity>
                                <Image 
                                style={{width: 50, height: 50, objectFit: 'cover', borderWidth: 1, borderRadius: 10}}
                                source={require('../assets/ImgDesign/Hotel Detail Screen/chat-1024.png')}></Image>
                            </TouchableOpacity>
                        </View>


                    </View>

                    <View style={style.footerComponent}>
                        <TouchableOpacity style={style.button} onPress={() => Alert.alert("Sorry", "The system is being update. See you later!")}>
                            <Text style={{fontSize: 23, fontWeight: '500'}}>Book now</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
        </ScrollView>
    );
};

export default HotelScreen2;

const style = StyleSheet.create({
    icon: {
        fontSize: 35,
        color: 'white'
    },
    loved: {
        fontSize: 35,
        color: 'red'
    },
    blurText: {
        color: '#747373'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageHeaderContainer: {
        height: 350,
        width: '100%',
    },
    optionContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    rightOptionGroup: {
        flexDirection: 'row',
        columnGap: 15
    },
    footerContainer: {
        width: '100%',
        height: 750,
        backgroundColor: '#CAF0F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainerFlud: {
        width: '95%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        rowGap: 5
    },
    footerComponent: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
    },
    footerItem50Container: {
        width: '50%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    footerItemGroup: {
        flexDirection: 'row',
    },
    textComponent: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        
    },
    offerItem: {
        width: 70,
        height: 70,
        backgroundColor: 'cyan',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        elevation: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarHostContainer: {
        width: '15%',
        height: '100%',
        objectFit: 'cover',
        justifyContent: 'center',
        alignItems: 'flex-start',
        
    },
    inforHostContainer: {
        width: '65%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingHorizontal: 10
    },
    chatBoxContainer: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        width: '100%',
        height: 60,
        backgroundColor: '#48CAE4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});