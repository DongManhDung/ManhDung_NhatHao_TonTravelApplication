import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuIconWithBounce = ({ onPress }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current; // Animation value for bounce
  let intervalRef = useRef(null); // Ref to store interval ID

  useEffect(() => {
    const bounceIcon = () => {
      // Bouncing animation for the menu icon
      Animated.sequence([
        // Bounce up
        Animated.spring(bounceAnim, {
          toValue: 1.2, // Scale up
          friction: 4,  // Slightly lower friction for quicker bounce
          tension: 120, // Slightly higher tension for faster bounce
          useNativeDriver: true,
        }),
        // Bounce down
        Animated.spring(bounceAnim, {
          toValue: 1, // Scale back to normal
          friction: 4,
          tension: 120,
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Run the bounce animation every 4 seconds to make it quicker
    intervalRef.current = setInterval(bounceIcon, 500);

    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      {/* Animated Menu Icon */}
      <Animated.View style={[styles.menuIcon, { transform: [{ scale: bounceAnim }] }]}>
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons name="menu" size={30} color="black" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center align the menu icon
    position: 'relative',
  },
  menuIcon: {
    marginRight: 10,
  },
});

export default MenuIconWithBounce;
