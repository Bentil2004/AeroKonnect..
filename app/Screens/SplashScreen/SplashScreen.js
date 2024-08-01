import { StyleSheet, Image, View, Text, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

const SplashScreen = ({ navigation }) => {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const letters = 'A e r o K o n n e c t'.split('');

  const letterAnimations = letters.map((_, index) => {
    const opacity = new Animated.Value(0);
    const translateY = new Animated.Value(50);

    return { opacity, translateY };
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const logoAnimation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 80,
        useNativeDriver: true,
      }),
    ]);

    logoAnimation.start(() => {
      Animated.sequence([
        Animated.delay(500), 
        Animated.parallel(
          letters.map((_, index) => {
            return Animated.timing(letterAnimations[index].opacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.ease,
            });
          })
        ),
        Animated.parallel(
          letters.map((_, index) => {
            return Animated.timing(letterAnimations[index].translateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.ease,
            });
          })
        )
      ]).start();

      const overlayTimer = setTimeout(() => {
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          navigation.replace('NextWelcome');
        });
      }, 2000);

      return () => clearTimeout(overlayTimer);
    });

    return () => {
    };
  }, [glowAnim, fadeAnim, scaleAnim, overlayAnim, letterAnimations, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/AeroKonnect22.png')}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
      <View style={styles.appNameContainer}>
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.letter,
              {
                opacity: letterAnimations[index].opacity,
                transform: [{ translateY: letterAnimations[index].translateY }],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayAnim,
          },
        ]}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    width: '120%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  appNameContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '35%',
  },
  letter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00527e',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: '#00527e',
  },
});
