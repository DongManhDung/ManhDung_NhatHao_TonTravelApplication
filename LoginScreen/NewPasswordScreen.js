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
import React, { useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import Feather from "react-native-vector-icons/Feather";
import  apiRequest  from "../Service/ApiService";

const Login1 = ({ navigation, route }) => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPasword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    const { email } = route.params;
    const regexPassword = /^[a-zA-Z0-9]{5,20}$/;
    if (password !== confirmPassword) {
      Alert.alert("🔴 Error", "Password is not match", [
        { text: "OK", onPress: () => navigation.navigate("NewPasswordScreen", { email }) },
      ]);
    } else if (password === "" || confirmPassword === "") {
      Alert.alert("🔴 Error", "Password or PasswordConfirm is not empty", [
        { text: "OK", onPress: () => navigation.navigate("NewPasswordScreen", { email }) },
      ]);
    } else if (!regexPassword.test(password)) {
      Alert.alert("🔴 Error", "Password must contain a-z, A-Z, 0-9, 5 - 20 characters max", [
        { text: "OK", onPress: () => navigation.navigate("NewPasswordScreen", { email }) },
      ]);
    } else {
      try { 
        //10.10.88.77 /changePassword POST email, password
        const response = await apiRequest('/changePassword', 'POST', { email, password });
  
        // Thử phân tích cú pháp JSON
        try {
          if (response.success) {
            Alert.alert("🟢 Success", "Password updated successfully.", [
              { text: "OK", onPress: () => navigation.navigate("NoticePasswordChanged") },
            ]);
          } else {
            Alert.alert("Error", "Failed to update password.");
          }
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          Alert.alert("Error", "Failed to parse server response.");
        }
  
      } catch (error) {
        console.error('Error:', error);
        Alert.alert("Error", "Failed to update password.");
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
                <Text style={{ fontSize: 20, letterSpacing: 0.5 }}>
                  NEW PASSWORD
                </Text>
                <TextInput
                  placeholder={"Password"}
                  editable
                  secureTextEntry={!showPassword}
                  style={style.textInput}
                  value={password}
                  onChangeText={setPassword}
                ></TextInput>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? 'eye-off' : 'eye'} size={35} style={{ position:'absolute',right: 0, top: -25 }}></Feather>
                </TouchableOpacity>
              </View>

              <View style={style.loginFormInputText}>
                <Text style={{ fontSize: 20, letterSpacing: 0.5 }}>
                  CONFIRM
                </Text>
                <TextInput
                  placeholder={"Password confirm"}
                  editable
                  secureTextEntry={!showConfirmPasword}
                  style={style.textInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                ></TextInput>
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPasword)}>
                    <Feather name={showConfirmPasword ? 'eye-off' : 'eye'} size={35} style={{ position:'absolute',right: 0, top: -25 }}></Feather>
                  </TouchableOpacity>
              </View>
            </View>

            <View style={style.signUpContainer}>
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={handleChangePassword}
              >
                <Text style={[style.textSignUp]}>Change My Password</Text>
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
  loginFormGroup: {
    width: "100%",
    height: 250,
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
    width: "80%",
  },
  signUpContainer: {
    width: "80%",
    height: 40,
    top: 60,
    backgroundColor: "#00B4D8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textSignUp: {
    fontSize: 17,
    letterSpacing: 0.75,
    textAlign: "center",
  },
});
