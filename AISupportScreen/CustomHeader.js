import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Left side: 40% - Circular Icon */}
      <View style={styles.leftContainer}>
        <Image 
          source={require('../assets/ImgDesign/AISupportScreen/Yuta.png')}
          style={styles.icon} 
        />
      </View>

      {/* Right side: 60% - Text content */}
      <View style={styles.rightContainer}>
        <Text style={styles.yutaText}>Yuta</Text>
        <Text style={styles.supportText}>Dedicated Support</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: 80,
      width: '100%',
      backgroundColor: '#DCE5E7',
      paddingVertical: 3
    },
    leftContainer: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    rightContainer: {
      width: '70%',
      justifyContent: 'center',
      height: 40
    },
    yutaText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    supportText: {
      fontSize: 13,
      color: '#555',
    },
  });
  
  export default CustomHeader;