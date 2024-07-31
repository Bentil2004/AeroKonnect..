import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ToDoScreen = ({ route }) => {
  const { activity } = route.params;
  const navigation = useNavigation();

  const details = activity.details || [];

  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={styles.headerTitle}>{activity.title}</Text>
      </TouchableOpacity>
      
      <Image source={{ uri: activity.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <ScrollView>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.description}>{activity.description}</Text>
          {details.map((detail, index) => (
            <View key={index}>
              <Text style={styles.sectionTitle}>{detail.title}</Text>
              {detail.items.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
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
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  listItem: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default ToDoScreen;
