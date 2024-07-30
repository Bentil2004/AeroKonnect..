import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const images = [
  require("../../assets/Airplanemodel.jpg"),
  require("../../assets/images/CTEdit.png"),
  require("../../assets/AirlineBG.png"), 
];

const NextWelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onSkipPressed = () => {
    navigation.navigate('SignIn');
  };

  const onHomePressed = () => {
    navigation.navigate('BottomTab');
  };

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <Image source={item} style={styles.image} resizeMode="cover" />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
      />
      <View style={styles.upperTextContainer}>
        <Text style={styles.upperText}>
          AEROKONNECT{"\n"}
          <Text style={styles.slogan}>Seamless Travels, Boundless Horizons</Text>
        </Text>
      </View>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          Book. Fly. Enjoy. Discover new Destinations. Effortless reservations,{"\n"} 
          Tailored experiences just for you. Your Adventure Awaits!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSkipPressed}>
          <Text style={styles.buttonText}>Join Us Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHomePressed}>
          <Text style={styles.buttonText}>Go To Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === currentIndex ? '#00527E' : '#C0C0C0' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  image: {
    width,
    height: '100%',
  },
  upperTextContainer: {
    position: 'absolute',
    top: 50,
    left: '10%',
    width: '80%',
    borderRadius: 5,
  },
  upperText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#00527E',
    textAlign: 'center',
  },
  slogan: {
    fontSize: 16,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: '20%',
    left: '10%',
    width: '80%',
    borderRadius: 5,
  },
  bottomText: {
    textAlign: 'center',
    color: '#00527E',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#00527E',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default NextWelcomeScreen;
