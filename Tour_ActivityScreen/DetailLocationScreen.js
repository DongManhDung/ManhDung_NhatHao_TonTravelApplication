import React, {useState} from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Image, ScrollView, Alert } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const DetailLocationScreen = ({route, navigation}) => {
    const { item }  = route.params;
    return(
        <ScrollView>
                <View style={styles.container}>
                <View style={styles.imageHeaderContainer}>
                    <Image source={item.countryImage} style={{width: '100%', height: '100%'}}>
                    </Image>
                    <View style={styles.imageRightContainer}>
                        <TouchableOpacity style={styles.imageComponent}>
                            <Image source={item.coutryImageCenterRight1} style={{width: '100%', height: '100%', borderRadius: 10}}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imageComponent}>
                            <Image source={item.coutryImageCenterRight2} style={{width: '100%', height: '100%', borderRadius: 10}}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imageComponent}>
                            <Image source={item.coutryImageCenterRight3} style={{width: '100%', height: '100%', borderRadius: 10}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.goBackContainerGroup}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntIcon name='arrowleft' size={35}></AntIcon>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 5, letterSpacing: 0.5}}>Detail of {item.countryName}</Text>
                </View>

                <View style={styles.detailContainer}>
                    <View style={[styles.detailComponent, {height: 50}]}>
                        <Text style={{fontSize: 28, fontWeight: 'bold', letterSpacing: 1}}>{item.countryName}</Text>
                    </View>

                    <View style={[styles.detailComponent, {height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', columnGap: 5}]}>
                        <Image source={item.countryFlag} style={{width: 40, height: 40, borderRadius: '50%'}}></Image>
                        <Text style={{fontSize: 16, color: '#747373',letterSpacing: 0.5}}>{item.countryState}</Text>
                    </View>

                    <View style={[styles.detailComponent]}>
                        <Text style={{fontSize: 16, color: '#747373',letterSpacing: 0.5, textAlign: 'justify'}}>{item.countryIntroduction}</Text>
                    </View>

                    <View style={[styles.detailComponent]}>
                        <Text style={{fontSize: 22, fontWeight: 'bold', letterSpacing: 0.4}}>Best place to visit</Text>
                    </View>

                    <View style={[styles.detailComponent, {height: 200, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0, borderRadius: 10}]}>
                        <View style={[styles.bestLocationToVisitItem, {paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}]}>
                            <View style={{width: '100%', height: '70%'}}>
                                <Image source={item.countryImgPlace1} style={{width: '100%', height: '100%', objectFit: 'fill',borderRadius: 10}}></Image>
                            </View>
                            
                            <Text style={{fontSize: 17, letterSpacing: 0.5, height: '10%', justifyContent: 'center'}}>{item.countryPlace1Name}</Text>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '20%'}}>
                                <View style={{width: '70%', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
                                    <Entypo name="location-pin" size={20}></Entypo>
                                    <Text style={{fontSize: 11, width: '80%'}}>{item.countryLocation1}</Text>
                                </View>

                                <View style={{width: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 3}}>
                                    <AntIcon name="staro" size={20} color="#FF9500"></AntIcon>
                                    <Text>{item.countryRateCount1}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.bestLocationToVisitItem, {paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}]}>
                            <View style={{width: '100%', height: '70%'}}>
                                <Image source={item.countryImgPlace2} style={{width: '100%', height: '100%', objectFit: 'fill',borderRadius: 10}}></Image>
                            </View>
                            
                            <Text style={{fontSize: 17, letterSpacing: 0.5, height: '10%', justifyContent: 'center'}}>{item.countryPlace2Name}</Text>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '20%'}}>
                                <View style={{width: '70%', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
                                    <Entypo name="location-pin" size={20}></Entypo>
                                    <Text style={{fontSize: 11, width: '80%'}}>{item.countryLocation2}</Text>
                                </View>

                                <View style={{width: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 3}}>
                                    <AntIcon name="staro" size={20} color="#FF9500"></AntIcon>
                                    <Text>{item.countryRateCount2}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.detailComponent, {height: 60, backgroundColor: '#48CAE4', alignItems: 'center', borderRadius: 10}]}>
                        <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => Alert.alert("Sorry", "The system is being update. See you later!")}
                        >
                            <Text style={{fontSize: 18, fontWeight: '400', letterSpacing: 0.5}}>Start Adventure to {item.countryName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                
            </View>
        </ScrollView>
    );
}

export default DetailLocationScreen;

const styles = StyleSheet.create({ 
    container: {
        width: "100%",
        height: 1000,
        backgroundColor: "cyan",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    imageHeaderContainer: {
        width: "100%",
        height: "50%",
        backgroundColor: "red",
        position: "relative",
        zIndex: -1
    },
    goBackContainerGroup: {
        width: "95%",
        height: 50, 
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
        top: 40,
        flexDirection: "row",
    },
    imageRightContainer: {
        width: "50%",
        height: '80%',
        position: "absolute",
        zIndex: 1,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'column',
        rowGap: 15,
        paddingHorizontal: 15
    },
    imageComponent: {
        width: 80,
        height: 80,
        backgroundColor: "blue",
        borderRadius: 10
    },
    detailContainer: {
        width: "100%",
        height: 570,
        backgroundColor: "#CAF0F8",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: "absolute",
        bottom: 0,
        flexDirection: "column",
        rowGap: 5
    },
    detailComponent: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 10
    },
    bestLocationToVisitItem: {
        width: "49%",
        height: "100%",
        backgroundColor: "#e6f4f7",
        flexDirection: "column",
    },
    buttonContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "cyan",
    },
});