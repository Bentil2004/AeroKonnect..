import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const PopularDestinationScreen = ({ route }) => {
  const { destination } = route.params;
  const navigation = useNavigation();

  const onBookPressed = () => {
    navigation.navigate("Oneway");
  };

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.imageThumbnail} />
  );

  const renderActivity = ({ item }) => (
    <TouchableOpacity
      style={styles.activityContainer}
      onPress={() => navigation.navigate('ToDo', { activity: item })}
    >
      <Image source={{ uri: item.image }} style={styles.activityImage} />
      <View style={styles.activityTextContainer}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={styles.headerTitle}>Details Of destination</Text>
      </TouchableOpacity>

      <ScrollView>
        <Image source={{ uri: destination.photoUrl }} style={styles.image} />

        <View style={styles.top}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{destination.name}</Text>
            <Text style={styles.price}>${destination.price} for a flight</Text>
          </View>
          <TouchableOpacity style={styles.bookNowButton} onPress={onBookPressed}>
            <Text style={styles.bookNowText}>Book a flight</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.descriptiontext}>
          <Text style={styles.descriptionheader}>Description</Text>
          <Text style={styles.description}>{destination.description}</Text>
        </View>

        <Text style={styles.sectionTitle}>Pictures from the Place</Text>
        <FlatList
          data={destination.images}
          keyExtractor={(item, index) => `image-${index}`}
          renderItem={renderImage}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />

        <Text style={styles.sectionTitle}>Things to do on your visit</Text>
        <FlatList
          data={destination.todo}
          keyExtractor={(item, index) => `activity-${index}`}
          renderItem={renderActivity}
          vertical
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  descriptionContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#00527E",
  },
  bookNowButton: {
    backgroundColor: "#00527E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    top : 25,
    right : 0,
  },
  bookNowText: {
    color: "#ffffff",
    fontSize: 16,
  },
  descriptiontext: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  descriptionheader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
  imageThumbnail: {
    width: width * 0.6,
    height: 150,
    resizeMode: "cover",
    marginRight: 10,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  activityImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activityDescription: {
    fontSize: 14,
    color: "#666666",
  },
});

export default PopularDestinationScreen;
