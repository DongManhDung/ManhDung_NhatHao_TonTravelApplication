import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Image,
    View,
    Dimensions,
    Keyboard,
    Alert
  } from "react-native";
  import Checkbox from "expo-checkbox";
  import React, { useState, useRef, useEffect } from "react";
  import AntIcon from "react-native-vector-icons/AntDesign";
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  
  const Login1 = ({navigation, route}) => {
    const [code, setCode] = useState(['', '', '', '']);

    useEffect(() => {
      if (code.join("").length === 4) {
          verifyCode();
      }
  }, [code]);
  
    const input1 = useRef(null);
    const input2 = useRef(null);
    const input3 = useRef(null);
    const input4 = useRef(null);

    const { email } = route.params;
    

    const handleChangeText = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Chuyển ô
        if (text) {
        switch (index) {
          case 0:
            input2.current.focus();
            break;

          case 1:
            input3.current.focus();
            break;

          case 2:
            input4.current.focus();
            break;

          case 3: 
            Keyboard.dismiss();
            break;

          default:
            break;
        }
      }
      else {
        // Xóa thì quay lại
        switch (index) {
            case 1:
                input1.current.focus();
            break;
            
            case 2:
                input2.current.focus();
            break;

            case 3:
                input3.current.focus();
            break;

            default:
            break;
        }
      }
    };

    const getInputStyle = (index) => {
        return code[index] ? style.inputFilled : style.input;
      };

      const verifyCode = async () => { 
        
        const otp = code.join("").toString(); 

        if (otp.length < 4) return;

        console.log(otp)

        try { 
          const response = await fetch('http://10.10.88.77:3000/verify-otp', 
            { 
              method: 'POST', 
              headers: { 
                'Content-Type': 'application/json', 
              }, 
              body: JSON.stringify({ email, otp }), 
            }); 
            
            const data = await response.json(); 
            
            if (response.status === 200) { 
              navigation.navigate('NewPasswordScreen'); 
            } else if (response.status === 400) { 
              Alert.alert('Invalid OTP', data.message); 
            }
            else {
              Alert.alert('Error', 'Failed to verify OTP.');
            }
          } catch (error) { 
            console.error(error);
            Alert.alert('Error', 'Failed to verify OTP.'); 
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
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: "center",
                    letterSpacing: 0.95,
                  }}
                >
                  Verify Code
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: 90,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={style.noticeResetPassword}>
                    An email has been sent to {email}
                  </Text>
                  <Text style={[style.noticeResetPassword, { color: "gray" }]}>
                    Enter this verification code on your Email address to confirm
                  </Text>
                </View>
              </View>
  
              <View style={style.loginFormGroup}>
                <View style={style.verifyCodeContainer}>
                  <View style={style.verifyCodeGroup}>
                    <TextInput
                      style={getInputStyle(0)}
                      inputMode="numeric"
                      maxLength = {1}
                      editable
                      ref={input1}
                      onChangeText={(text) => handleChangeText(text, 0)}
                      keyboardType="numeric"
                      value={code[0]}
                    ></TextInput>
                  </View>
  
                  <View style={style.verifyCodeGroup}>
                    <TextInput
                    style={getInputStyle(1)}
                    inputMode="numeric"
                    maxLength = {1}
                    editable
                    keyboardType="numeric"
                    ref={input2}
                    onChangeText={(text) => handleChangeText(text, 1)}
                    value={code[1]}
                    ></TextInput>
                  </View>
  
                  <View
                    style={[
                      style.verifyCodeGroup,
                    ]}
                  >
                    <TextInput
                    style={getInputStyle(2)}
                    inputMode="numeric"
                    maxLength = {1}
                    editable
                    keyboardType="numeric"
                    ref={input3}
                    onChangeText={(text) => handleChangeText(text, 2)}
                    value={code[2]}
                    ></TextInput>
                  </View>
  
                  <View
                    style={[
                      style.verifyCodeGroup,
                    ]}
                  >
                    <TextInput
                    style={getInputStyle(3)}
                    inputMode="numeric"
                    maxLength = {1}
                    editable
                    keyboardType="numeric"
                    ref={input4}
                    onChangeText={(text) => handleChangeText(text, 3)}
                    value={code[3]}
                    ></TextInput>
                  </View>
                </View>
              </View>
  
              <View style={style.resendCodeContainer}>
                  <TouchableOpacity>
                      <Text style={{fontSize: 16, fontWeight: '600', letterSpacing: 0.5}}>Resend Code</Text>
                  </TouchableOpacity>
              </View>
  
              <View style={style.signUpContainer}>
                <TouchableOpacity style={{ width: "100%" }}
                onPress={verifyCode}
                >
                  <Text style={[style.textSignUp]}>Verify</Text>
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
    input: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        fontSize: 30,
    },
    inputFilled: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "#00B4D8", 
    },
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
      top: 60,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "center",
      flexDirection: "column",
    },
    noticeResetPassword: {
      fontSize: 16,
      width: "80%",
      height: 50,
      letterSpacing: 0.5,
      lineHeight: "18px",
      left: 30,
    },
    loginFormGroup: {
      width: "100%",
      height: 100,
      flexDirection: "column",
      // borderWidth: 1,
      top: 70,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    verifyCodeContainer: {
      width: "80%",
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      columnGap: "10%",
    },
    verifyCodeGroup: {
      width: "22%",
      height: 50,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "#90E0EF",
      borderColor: "gray",
      borderWidth: 1,
    },
    resendCodeContainer: {
      width: "80%",
      height: 20,
      top: 65,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: 10
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
      top: 90,
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
      top: 100,
      justifyContent: "flex-end",
      alignItems: "center",
      flexDirection: "row",
    },
  });
  