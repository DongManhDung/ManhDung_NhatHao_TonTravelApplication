import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
    Dimensions,
    ScrollView,
    Image,
  } from "react-native";
  import AntIcon from "react-native-vector-icons/AntDesign";
  import EntypoIcon from "react-native-vector-icons/Entypo"
  import IonIcon from "react-native-vector-icons/Ionicons"
  import { LinearGradient } from "expo-linear-gradient";
  import React, { useState, useRef, useEffect } from "react";
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;
  
  const OnBoarding2 = ({navigation}) => {
    
  
    const images = [
      require("../assets/ImgDesign/OnBoarding Screen/slide1.jpg"),
      require("../assets/ImgDesign/OnBoarding Screen/slide2.jpg"),
      require("../assets/ImgDesign/OnBoarding Screen/slide3.jpg"),
      require("../assets/ImgDesign/OnBoarding Screen/slide4.jpg"),
    ];
  
    const [imgActive, setImgActive] = useState(0);
  
    onchange = (nativeEvent) => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide != imgActive) {
          setImgActive(slide);
        }
      }
    };
  
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        scrollViewRef.current?.scrollTo({ x: nextIndex * WIDTH, animated: true });
        setCurrentIndex(nextIndex);
      }, 3000); // Change image every 3 seconds
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, [currentIndex, images.length]);
  
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.obContainer}>
        <LinearGradient
          style={style.obContainer}
          colors={["#97E1F0", "#CAF0F8"]}
          location={[0.25, 0.5]}
        >
          <View style={style.obHeader}>
            <Image
              style={style.logoHeader}
              source={require("../assets/ImgDesign/tontravel-logo-zip-file/RemoveBg/logo.png")}
            ></Image>
          </View>
  
          <View style={style.imgSlider}>
            <View style={style.imgSliderContainer}>
              <ScrollView
                onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={style.wrap}
                ref={scrollViewRef}
              >
                {images.map((e, index) => (
                  <Image
                    key={e}
                    resizeMode="stretch"
                    style={[style.wrap, style.imgItemFix]}
                    source={e}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
  
          <View style={style.wrapDotContainer}>
            <View style={style.wrapDot}>
              {images.map((e, index) => (
                <Text
                  key={e}
                  style={imgActive == index ? style.dotActive : style.dot}
                >
                  &#x25cf;
                </Text>
              ))}
            </View>
          </View>
      <View>
          <View style={[style.btnContainer]}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Login1')}
            >
              <Text style={style.textBtn}>
                Sign in <Text style={{ fontWeight: "600" }}>with T-Member</Text>
              </Text>
            </TouchableOpacity>
          </View>
  
          <View style={[style.btnContainer,style.whiteBackground]}>
            <TouchableOpacity>
            
              <Text style={[style.textBtn,{color: '#000', fontWeight: '0'}]}>
                  
                 Sign in with Facebook</Text>
                 <EntypoIcon style={{position: 'absolute',left: 20, top: 10}} name='facebook-with-circle' size={30} color='#176ae6'></EntypoIcon>   
            </TouchableOpacity>
          </View>
  
          <View style={[style.btnContainer,style.whiteBackground]}>
            <TouchableOpacity>
            
              <Text style={[style.textBtn,{color: '#000', fontWeight: '0'}]}>
                  
                 Sign in with App Store</Text>
                 <EntypoIcon style={{position: 'absolute',left: 20, top: 10}} name='app-store' color='grey'  size={30}></EntypoIcon>   
            </TouchableOpacity>
          </View>
  
          <View style={style.textFooter}>
              <Text style={{fontSize: 16, textAlign: 'center', letterSpacing: 0.15, paddingLeft: 10, paddingRight: 10}}>By creating an account or signing in, you agree to our 
                   <Text style={{fontWeight: 'bold'}}> Terms of Service </Text>
                  and 
                  <Text style={{fontWeight: 'bold'}}> Privacy Policy </Text></Text>
          </View>
  
      </View>
        </LinearGradient>
      </View>
      </ScrollView>
    );
  };
  
  export default OnBoarding2;
  
  const style = StyleSheet.create({
    obContainer: {
      
      flex: 1,
      flexDirection: "column",
    },
    obHeader: {
      width: "100%",
      height: 180,
      // backgroundColor: "black",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    logoHeader: {
      width: "70%",
      height: 150,
    },
    imgSlider: {
      width: "100%",
      height: 300,
      bottom: 40,
    },
    imgSliderContainer: {
      width: "100%",
      height: 300,
    },
    wrap: {
      width: WIDTH,
      height: HEIGHT * 0.36,
      // backgroundColor: 'black'
      // borderWidth: 1,
    },
    imgItemFix: {
      objectFit: "cover",
    },
    wrapDotContainer: {
      width: "100%",
      height: 40,
      textAlign: "center",
      alignItems: "center",
      position: "relative",
      bottom: 35,
    },
    wrapDot: {
      width: "35%",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      borderWidth: 0.25,
      borderColor: "gray",
      borderStyle: "solid",
      borderRadius: 50,
      backgroundColor: "#97E1F0",
      position: "relative",
      top: 10,
    },
    dotActive: {
      fontSize: 20,
      margin: 3,
      color: "black",
    },
    dot: {
      fontSize: 20,
      margin: 3,
      color: "#D9D9D9",
    },
    btnContainer: {
      width: "90%",
      left: 20,
      height: 50,
      bottom: 15,
      justifyContent: "center",
      borderRadius: 20,
      backgroundColor: "#0077B6",
      shadowColor: "#00B4D8",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.45,
      shadowRadius: 1,
      marginVertical: 15
    },
    textBtn: {
      width: "100%",
      height: 50,
      paddingTop: 10,
      textAlign: "center",
      fontSize: 24,
      color: "#fff",
      fontWeight: "300",
      letterSpacing: 0.55
    },
    whiteBackground: {
      backgroundColor: '#fff'
    },
    textFooter: {
      width: '100%',
      height: 50
      // ,backgroundColor: 'red'
    }
  });
  