import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditDetails from './EditDetails';
import { LinearGradient } from "expo-linear-gradient";

const ProfileDetails = ({ navigation }) => {
  const onProfileDetailsPressed = () => {
    navigation.navigate("ProfileDetails");
  };

  return (
    <View style={styles.container}>
       <LinearGradient style={styles.Testing} colors={['#00527E', '#83B4FD']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={15} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile Details</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate(EditDetails)}>
          <Text style={styles.editText}>Edit</Text>
          <Icon name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profilePicture}>
          <Text style={styles.profileInitials}>AD</Text>
        </View>
        <Text style={styles.greeting}>Hello, Ama</Text>
      </View>
      </LinearGradient>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>First Name: </Text> Ama
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Last Name: </Text> Doe
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date of Birth: </Text> 01/01/2000
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Phone Number: </Text> +233123456789
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Nationality: </Text> Ghanaian
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Email Address: </Text> Amaane91@email.com
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    backgroundColor: "#E0E6ED",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
   // backgroundColor: "#00527e",
    paddingHorizontal: 10,
    paddingVertical: 55,
   // borderBottomLeftRadius: 30,
    //borderBottomRightRadius: 30,
  },
  Testing:{
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  height: 463,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    marginRight: 5,
    fontSize: 16,
    color: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileInitials: {
    fontSize: 36,
    color: "#00527e",
  },
  greeting: {
    fontSize: 24,
    color: "#fff",
  },
  detailsContainer: {
    marginTop: -70,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 25,
    marginRight: 25
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
  },
});

export default ProfileDetails;
