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
  import { LinearGradient } from "expo-linear-gradient";
  import React, { useState, useRef, useEffect } from "react";
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;
  import { Audio } from 'expo-av';
  import { useFocusEffect, useNavigationState } from '@react-navigation/native';
  
  const OnBoarding = ({navigation}) => {
  
    const sound = React.useRef(new Audio.Sound());
    // const navigationState = useNavigationState(state => state);
  
  
    useEffect(() => {
      const loadSound = async () => {
        try { 
          // Yêu cầu quyền
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
          });
          // Load tệp nhạc từ thư mục assets
          await sound.current.loadAsync(require('../assets/music/Onboarding Sound Effect.mp3'),
          {
            shouldPlay: false,
            initialPositionMillis: 0, 
            progressUpdateIntervalMillis: 100,
          }
        );
          // Tự động phát nhạc khi load xong
          await sound.current.playAsync(); 
        } catch (error) {
          console.log('Error loading or playing sound:', error);
        }
      };
  
      loadSound();
      return () => {
        // Giải phóng tài nguyên khi component bị unmount
        sound.current.unloadAsync();
      };
    }, []);
  
    useFocusEffect(
      React.useCallback(() => {
        // const currentRoute = navigationState.routes[navigationState.index].name; // Lấy tên trang hiện tại
        // if (currentRoute === 'Login1') {  // Chỉ dừng nhạc nếu chuyển đến trang DetailScreen
        //   sound.current.stopAsync();
        // }
        return () => {
          // Bạn có thể thêm các logic khác khi component bị unfocus
          sound.current.stopAsync();
        };
      }, [])
    );
  
  
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
      <ScrollView showsVerticalScrollIndicator={false} >
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
  
          <View style={style.textHeaderContainer}>
              <Text style = {style.textHeader}><Text style={style.changeColorText}>Explore</Text> The World Around You</Text>
          </View>
  
          <View style={style.textHeaderContainer}>
              <Text style = {style.textSubHeader}>Every journey has secret destinations that even travelers can't expect</Text>
          </View>
  
          <View style={style.travelButton}>
              <TouchableOpacity style={style.button}
              onPress={() => navigation.navigate('OnBoarding2')}
              
              >
                  <Text style={style.textButton}>Travel now <AntIcon size={20} name= 'arrowright'></AntIcon></Text>
              </TouchableOpacity>
          </View>
          
  
        </LinearGradient>
      </View>
      </ScrollView>
    );
  };
  
  export default OnBoarding;
  
  
  
  const style = StyleSheet.create({
    obContainer: {
      width: "100%",
      height: 850,
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
      borderColor: 'gray',
      borderStyle: 'solid',
      borderRadius: 50,
      backgroundColor: "#97E1F0",
      position: 'relative',
      top: 10
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
    textHeaderContainer: {
      width: '100%',
      height: 100,
      // borderWidth: 1,
      // textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: "relative",
      bottom: 20,
    },
    textHeader: {
      width: '85%',
      fontSize: 40,
      // borderWidth: 1,
      letterSpacing: 1,
      fontWeight: '450'
    },
    changeColorText: {
      color: '#00B4D8'
    }
    ,textSubHeader: {
      fontSize: 18,
      width: '85%',
      letterSpacing: 0.5,
      position: "relative",
      bottom: 20,
    },
    travelButton: {
      width: '100%',
      height: 70,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '90%',
      height: 70,
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: '#0077B6',
      shadowColor: '#00B4D8',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.45,
      shadowRadius: 1,
    },
    textButton: {
      fontSize: 28, 
      width: '100%', 
      height: '100%',
      textAlign: 'center',
      top: 15,
      color: '#fff',
     
    }
  });
  