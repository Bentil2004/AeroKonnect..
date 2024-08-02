import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const screens = [
  {
    image: require("../../assets/images/CTEdit.png"),
    upperText: "AEROKONNECT\nSeamless Travels, Boundless Horizons",
    bottomText:
      "Book. Fly. Enjoy. Discover new Destinations. Effortless reservations, Tailored experiences just for you. Your Adventure Awaits!",
  },
  {
    image: require("../../assets/He.jpg"),
    upperText: "Explore the World\nwith Comfort",
    bottomText:
      "We bring you closer to your dream destinations with unparalleled comfort and ease.",
  },
  {
    image: require("../../assets/She.jpg"),
    upperText: "Unmatched Luxury\nin Every Journey",
    bottomText:
      "Stroll through charming streets, savor exquisite cuisine, and marvel at iconic landmarks.",
  },
];

const NextWelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % screens.length;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const onSkipPressed = () => {
    navigation.navigate("SignIn");
  };

  const onHomePressed = () => {
    navigation.navigate("BottomTab");
  };

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.upperText}>{item.upperText}</Text>
        <Text style={styles.bottomText}>{item.bottomText}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#0000", "#0000"]} style={styles.container}>
      <FlatList
        data={screens}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSkipPressed}>
          <Text style={styles.buttonText}>Join Us Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHomePressed}>
          <Text style={styles.buttonText}>Go To Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.indicatorContainer}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: index === currentIndex ? "#00527E" : "#C0C0C0",
              },
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 0,
  },
  slide: {
    width,
    height,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "55%",
    backgroundColor: "blue",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  textContainer: {
    position: "absolute",
    top: "60%",
    width: "90%",
    alignItems: "center",
  },
  upperText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#00527E",
    textAlign: "center",
    marginBottom: 10,
  },
  bottomText: {
    textAlign: "center",
    color: "#00527E",
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "5%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    left: "10%",
  },
  button: {
    backgroundColor: "#00527E",
    padding: 12,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: "2%",
    flexDirection: "row",
    alignSelf: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 5,
    margin: 5,
  },
});

export default NextWelcomeScreen;
