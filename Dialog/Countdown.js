import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View style={styles.container}>
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>{timeLeft.hours || '00'}</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>{timeLeft.minutes || '00'}</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>{timeLeft.seconds || '00'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 2,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Countdown;
