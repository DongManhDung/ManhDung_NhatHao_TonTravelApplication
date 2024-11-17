import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Image,
    View,
    Dimensions,
    Alert,
  } from "react-native";
  import React, { useState, useEffect, useRef } from "react";
  import AntIcon from "react-native-vector-icons/AntDesign";
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  import Feather from "react-native-vector-icons/Feather";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Audio } from 'expo-av';
  import ConfettiCannon from 'react-native-confetti-cannon';
  import { apiRequest } from "../Service/ApiService";

  const Login = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const confettiRef = useRef(null);
    const confettiRef2 = useRef(null);

    const playSound = async () => {
      const sound = new Audio.Sound();
      try{
        await sound.loadAsync(require('../assets/music/login_success_sound.mp3'));
        await sound.playAsync();
      }catch (error) {
        console.error('ERROR playing sound: ', error);
      }
    };


  
    const goToHome = async () => {
      if(username === '' || password === '') {
        Alert.alert("🔴 Error",'Please enter username or password!');
        navigation.navigate('Login1');
      } 
      else{
        try{
          // 10.10.88.77 /login POST username, password
          const response = await apiRequest('/login', 'POST', { username, password });

          if(response.ok){
            Alert.alert("🟢 Success",`Login successfully. Welcome ${username}!`);
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('username', username);
            await playSound();
            // Kích hoạt hiệu ứng pháo hoa 
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
                navigation.navigate('Home', { username });
            }, 4000);
          } else {
            Alert.alert("🔴 Error",'Username or password not correct!' );
            navigation.navigate('Login1');
          }
        }
        catch (error) {
            console.error('ERROR: ', error);
        }
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
              <View style={style.loginFormGroup}>
                <View style={style.loginFormInputText}>
                  <AntIcon name="user" size={35}></AntIcon>
                  <TextInput
                    placeholder={"Username"}
                    editable
                    style={style.textInput}
                    value={username}
                    onChangeText={text => setUsername(text)}
                  ></TextInput>
                </View>
  
                <View style={style.loginFormInputText}>
                  <AntIcon name="lock" size={35}></AntIcon>
                  <TextInput
                    secureTextEntry={!showPassword}
                    placeholder={"Password"}
                    editable
                    style={style.textInput}
                    value={password}
                    onChangeText={text => setPassword(text)}
                  ></TextInput>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? 'eye-off' : 'eye'} size={35} style={{ position:'absolute',left: 0 }}></Feather>
                  </TouchableOpacity>
                </View>
              </View>
  
              <View style={style.forgotPassContainer}>
                <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}
                >
                  <Text style={style.textForgotPass}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
  
              <View style={style.signInButton}>
                <View style={style.signInGroup}>
                  <TouchableOpacity
                  onPress={goToHome}
                    style={{
                      backgroundColor: "#00B4D8",
                      borderRadius: 5,
                      left: 10,
                    }}
                  >
                    <Text style={style.textSignIn}>Sign In</Text>
                  </TouchableOpacity>

                  

                  <TouchableOpacity
                  onPress={() => navigation.navigate('FaceScanScreen')}
                  >
                    <Image
                      style={style.faceIdImage}
                      source={require("../assets/ImgDesign/Login_signin/face_id_img.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
  
              <View style={style.signUpContainer}>
                <View style={style.signUpGroup}>
                  <Text style={style.textSignUp}>Don't have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    <Text
                      style={[style.textSignUp, { left: 20, fontWeight: "500", textDecorationLine: "underline" }]}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
  
            </View>
          </View>
        </ImageBackground>
        {showConfetti && ( 
          <>
            <ConfettiCannon 
              ref={confettiRef} 
              count={150} 
              origin={{ x: 0, y: 0 }} 
              fadeOut 
            />

            <ConfettiCannon 
              ref={confettiRef2} 
              count={150} 
              origin={{ x: screenWidth, y:0 }} 
              fadeOut 
            />
          </>
          )}
      </View>
    );
  };
  
  export default Login;
  
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
      height: 50,
      // backgroundColor: 'gray',
      borderBottomWidth: 1,
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      paddingLeft: 0,
      paddingTop: 10,
    },
    textInput: {
      fontSize: 20,
      letterSpacing: 0.75,
      marginLeft: 10,
      width: "70%",
    },
    forgotPassContainer: {
      width: "100%",
      height: 50,
      // backgroundColor: "rgba(255, 255, 255, 0.7)",
      top: 50,
    },
    textForgotPass: {
      fontSize: 17,
      color: "#0077B6",
      textAlign: "right",
      paddingTop: 15,
      letterSpacing: 1,
      right: 30,
      textDecorationLine: "underline",
    },
  
    signInButton: {
      width: "100%",
      height: 60,
      top: 50,
    },
    signInGroup: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
  
    textSignIn: {
      width: 200,
      height: "100%",
      fontSize: 22,
      color: "#000",
      textAlign: "center",
      paddingTop: 15,
      letterSpacing: 1,
    },
    faceIdImage: {
      width: 50,
      height: "100%",
      objectFit: 'contain'
    },
  
    signUpContainer: {
      width: "100%",
      height: 40,
      top: 70,
      // backgroundColor: "rgba(255, 255, 255, 0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    signUpGroup: {
      width: "80%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    textSignUp: {
      fontSize: 17,
    },
  });
  