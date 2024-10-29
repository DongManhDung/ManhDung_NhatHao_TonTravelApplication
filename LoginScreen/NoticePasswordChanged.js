import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Image,
    View,
    Dimensions,
  } from "react-native";
  import Checkbox from "expo-checkbox";
  import React, { useState } from "react";
  import AntIcon from "react-native-vector-icons/AntDesign";
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  
  const Login1 = ({navigation}) => {
    return (
      <View style={style.container}>
        <ImageBackground
          style={style.image}
          resizeMode="stretch"
          source={require("../assets/ImgDesign/Login_signin/dia-diem-patagonia.jpg")}
        >
          <View style={style.obHeader}>
            <Image
              style={style.logoHeader}
              source={require("../assets/ImgDesign/tontravel-logo-zip-file/RemoveBg/logo.png")}
            ></Image>
          </View>
  
          <View style={style.loginFormIconContainer}>
            <Image
              style={style.loginFormIconAbsolute}
              source={require("../assets/ImgDesign/Login_signin/user_circle_interface_person-512.png")}
            ></Image>
          </View>
  
          <View style={style.loginFormContainer}>
            <View style={style.loginFormInner}>
              <View style={style.checkedIconContainer}>
                    <Image source = {require('../assets/ImgDesign/Login_signin/done_icon-removebg-preview.png')}
                    style = {{width: 125, height: 125}}
                    ></Image>
              </View>

              <View style={style.noticeTextContaier}>
                    <Text style={{width: '70%', height: '70%', fontSize: 22,textAlign: 'center', letterSpacing: 0.5}}>Password has been changed successfully</Text>
              </View>

              <View style={style.backToSignInContainer}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Login1')}
                >
                    <Text style={{fontSize: 18, letterSpacing: 0.75, fontWeight: 'bold', textDecorationLine: "underline"}}>Back to Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  export default Login1;
  
  const style = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    image: {
      height: screenHeight,
      width: screenWidth,
    },
    obHeader: {
      width: "100%",
      height: 150,
      // backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    logoHeader: {
      width: "70%",
      height: 150,
    },
    loginFormIconContainer: {
      width: "100%",
      height: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    },
    loginFormIconAbsolute: {
      width: "30%",
      height: 100,
      objectFit: "contain",
    },
    loginFormContainer: {
      width: "100%",
      height: 400,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      bottom: 50,
    },
    loginFormInner: {
      width: "80%",
      height: 400,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      display: "flex",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
    checkedIconContainer: {
        width: '100%',
        height: 125,
        top: 60,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    noticeTextContaier: {
        width: '100%',
        height: 100,
        top: 70,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    backToSignInContainer: {
        width: '100%',
        height: 50,
        top: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
  });
  