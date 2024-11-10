import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Countdown from '../Dialog/Countdown';

const SuperPromotionDialog = ({ isVisible, onClose }) => {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 23);
  targetDate.setMinutes(targetDate.getMinutes() + 59);
  targetDate.setSeconds(targetDate.getSeconds() + 59);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Happy Single Days 11/11!</Text>
        <Text style={styles.message}>You are a <Text style={{color: '#088F08'}}>new members</Text> who book any one service will get up to 60% discount on all items! Apply today only!</Text>
        <Countdown targetDate={targetDate} />
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Booking now!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default SuperPromotionDialog;
