import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Image,
    View,
    Dimensions,
    Alert
  } from "react-native";
  import Checkbox from "expo-checkbox";
  import React, { useState } from "react";
  import AntIcon from "react-native-vector-icons/AntDesign";
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  import { apiRequest } from "../Service/ApiService";
  
  const ResetPassword = ({navigation}) => {
    const [email, setEmail] = useState("");


    const sendRecoveryMail = async () => {
      try {
        // 10.10.88.77 /recoverPassword POST email
        const response = await apiRequest('/recoverPassword', 'POST', { email });
        
        if(response.status == 200){
          Alert.alert("🟢 Success",`Recovery email sent to ${email}!`);
          navigation.navigate('VerifyCodeScreen', { email });
        }else if(response.status == 404){
          Alert.alert("🔴 Error",`Cannot find email ${email}!`);
          navigation.navigate('ResetPassword');
        }
        else{
          Alert.alert("🔴 Error",`Cannot send recovery email to ${email}!`);
          navigation.navigate('ResetPassword');
        };
      } catch (error) {
        console.error('ERROR: ', error);
      }

    };

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
              <View style={style.resetPassHeader}>
                <Text style={{ fontSize: 22, textAlign: "center",letterSpacing: 0.95 }}>
                  Reset Password
                </Text>
                <View style={{ width: "100%" }}>
                  <Text style={style.noticeResetPassword}>
                    Please enter your Email address that you used to register, and
                    we will send you an email with a link to reset your password.
                  </Text>
                </View>
              </View>
  
              <View style={style.loginFormGroup}>
                <View style={style.loginFormInputText}>
                  <Text style={{ fontSize: 20, letterSpacing: 0.5 }}>E-MAIL</Text>
                  <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    editable
                    style={style.textInput}
                    placeholder="Enter your email"
                  ></TextInput>
                </View>
              </View>
  
              <View style={style.signUpContainer}>
                <TouchableOpacity style={{ width: "100%" }}
                onPress={sendRecoveryMail}
                >
                  <Text style={[style.textSignUp]}>Reset My Password</Text>
                </TouchableOpacity>
              </View>
  
              <View style={style.signInContainer}>
                <Text style={{ fontSize: 17, letterSpacing: 0.75, right: 10 }}>
                  Return to
                </Text>
                <TouchableOpacity
                onPress={() => navigation.navigate('Login1')}
                >
                  <Text
                    style={[
                      style.textSignUp,
                      {
                        fontWeight: "600",
                        textDecorationLine: "underline",
                        left: 0,
                      },
                    ]}
                  >
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  export default ResetPassword;
  
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
      height: 500,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      bottom: 50,
    },
    loginFormInner: {
      width: "80%",
      height: 500,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      display: "flex",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
    },
    resetPassHeader: {
      width: "100%",
      height: 130,
      // backgroundColor: "rgba(0, 0, 0, 0.1)",
      top: 60,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
  
    },
    noticeResetPassword: {
      fontSize: 15,
      width: "95%",
      height: 80,
      letterSpacing: 0.5,
      lineHeight: "18px",
      paddingLeft: 15,
      textAlign: "justify",
      color: 'gray',
    },
    loginFormGroup: {
      width: "100%",
      height: 150,
      // backgroundColor: 'red',
      flexDirection: "column",
      // borderWidth: 1,
      top: 60,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    loginFormInputText: {
      width: "80%",
      height: 65,
      // backgroundColor: 'gray',
      borderBottomWidth: 1,
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      paddingLeft: 0,
      paddingTop: 10,
    },
    textInput: {
      fontSize: 15,
      letterSpacing: 0.75,
      top: 10,
      color: "gray",
    },
  
    signUpContainer: {
      width: "80%",
      height: 40,
      top: 40,
      backgroundColor: "#00B4D8",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
    textSignUp: {
      fontSize: 17,
      letterSpacing: 1,
      textAlign: "center",
    },
    signInContainer: {
      width: "80%",
      height: 40,
      top: 40,
      justifyContent: "flex-end",
      alignItems: "center",
      flexDirection: "row",
    },
  });
  