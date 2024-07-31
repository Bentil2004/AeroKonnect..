import React, { useState } from "react";
import {Text,View,StyleSheet,SafeAreaView, ScrollView,ImageBackground,} from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";


const SignInScreen = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigation = useNavigation();

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  const onLogInPressed = () => {
    navigation.navigate("LogIn");
  };



  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/AirlineBG.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
            Welcome to AeroKonnect!{"\n"}
            Your Adventure Begins Here!{"\n"}
            Book flights in seconds{"\n"}
            Manage your trips effortlessly{"\n"}
            AeroKonnect - Seamless {"\n"}
            travels,boundless horizons.. Ready to take off?
            </Text>
          </View>

          <View style={styles.root}>
            <CustomButton
              text="Sign up"
              onPress={onSignUpPressed}
              bg={"#00527e"}
              txt={"white"}
            />

            <CustomButton
              text="Log In"
              onPress={onLogInPressed}
              bg={"transparent"}
              bordercolor="#00527e"
              txt={"#00527e"}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  textContainer: {
    marginTop: '35%',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    fontSize:20,
    color: '#00527E',
  },
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    paddingBottom: '40%',
  },
});

export default SignInScreen;
