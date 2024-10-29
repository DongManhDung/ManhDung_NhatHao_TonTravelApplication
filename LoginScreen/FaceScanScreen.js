import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Alert,
  } from "react-native";
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  import * as LocalAuthentication from 'expo-local-authentication';
  import React, { useEffect } from "react";
  
  const QrScanScreen = ({navigation}) => {
    
      //Nhập mật khẩu để xác thực thay cho faceID, Expo k hỗ trợ faceID
      useEffect(() => {
        const authenticate = async () => {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          if (!hasHardware) {
            Alert.alert('Your device does not support Face ID');
            navigation.goBack();
            return;
          }
    
          const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
          if (!supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
            Alert.alert('Your device does not support Face ID');
            navigation.goBack();
            return;
          }
    
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'FaceID',
          });
    
          if (result.success) {
            navigation.navigate('Home');
          } else {
            Alert.alert('Failed');
            navigation.goBack();
          }
        };
    
        authenticate();
      }, [navigation]);

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
              <View style={style.faceScanImg}>
                <Image
                  style={{ width: "65%", height: 200, objectFit: "contain", borderWidth: 0.5, borderColor: 'gray', borderRadius: 25 }}
                  source={require("../assets/ImgDesign/Login_signin/face_id_img.png")}
                ></Image>
              </View>
  
              <Text style={{position: 'absolute',bottom: 20,fontSize: 20}}>Face ID</Text>
            </View>
          </View>
  
        </ImageBackground>
      </View>
    );
  };
  
  export default QrScanScreen;
  
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
    faceScanImg: {
      width: '100%',
      height: 200,
      top: 80,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
  });
  