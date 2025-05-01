import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export const AnimatedLoader = () => {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../../assets/animations/loader.json')} // Update with your animation path
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', // Position it absolutely to cover the full screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(95, 185, 250, 0.9)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Ensure it's on top of other UI elements
  },
  lottie: {
    width: width * 0.6,
    height: width * 0.6,
  },
});
