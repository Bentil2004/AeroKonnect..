import { StyleSheet, Image, View } from 'react-native';
import React, { useEffect } from 'react';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('NextWelcome');
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/AeroKonnect22.png')}
        style={styles.AeroKonnect}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  AeroKonnect: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});
