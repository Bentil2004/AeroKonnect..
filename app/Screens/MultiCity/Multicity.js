import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "react-native-elements";

const MultiCity = ({ navigation }) => {
  const [addFlight, setAddFlight] = useState([]);
  const [count, setCount] = useState(3);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");

  const swapContent = () => {
    const temp = input1;
    setInput1(input2);
    setInput2(temp);
  };

  const oneway = () => {
    navigation.navigate("Oneway");
  };

  const roundTrip = () => {
    navigation.navigate("Home");
  };

  const Flight = () => {
    setCount(count + 1);

    setAddFlight((moreFlight) => [
      ...moreFlight,
      <View style={styles.box2} key={count}>
        <TouchableOpacity onPress={swapContent} style={styles.swapButton}>
          <Image source={require("../../assets/und.png")} style={styles.swapIcon} />
        </TouchableOpacity>
        <Text style={styles.text1}>Flight {count}</Text>
        <TextInput
          style={styles.textinputA}
          placeholder="From"
          value={input5}
          onChangeText={(text) => setInput5(text)}
        />
        <TextInput
          style={styles.textinputB}
          placeholder="To"
          value={input6}
          onChangeText={(text) => setInput6(text)}
        />
        <TextInput
          textContentType="date"
          style={styles.textinputC}
          placeholder="Departure"
        />
      </View>,
    ]);
  };

  const searchFlights = async () => {
    try {
      const response = await fetch("https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=PARI&cabinClass=economy", {
        method: "GET",
        headers: {
          "x-rapidapi-key": "8d96448f6cmsh6976762dedf920ap10a7afjsn1d21cf7179c8",
          "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
        },
      });
      const data = await response.json();
      console.log(data);
      navigation.navigate("AvailableFlight", { flights: data });
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.top}>
          <TouchableOpacity>
            <Text style={styles.backButton} onPress={() => navigation.navigate("BottomTab")}>
              ←
            </Text>
          </TouchableOpacity>
          <Text style={styles.book}>Book your flight</Text>
        </View>
        <View style={styles.mainbut}>
          <Button
            buttonStyle={{ backgroundColor: "#E4EAF1", padding: 5 }}
            onPress={oneway}
            titleStyle={{ bottom: 1, color: "#434343" }}
            title="One-Way"
          />
          <Button
            buttonStyle={{ backgroundColor: "#E4EAF1", padding: 5 }}
            onPress={roundTrip}
            titleStyle={{ bottom: 1, color: "#434343" }}
            title="Round-Trip"
          />
          <Button
            buttonStyle={{
              backgroundColor: "#00527E",
              borderRadius: 8,
              padding: 5,
              width: 111,
            }}
            onPress={MultiCity}
            titleStyle={{ bottom: 1, color: "#fff" }}
            title="Multi-City"
          />
        </View>
        <View style={styles.container2}>
          <ScrollView>
            <View style={styles.row2}>
              <TextInput style={styles.textinput1} placeholder="Passenger" />
              <TextInput style={styles.textinput2} placeholder="Cabin Class" />
            </View>
            <View style={styles.box1}>
              <TouchableOpacity onPress={swapContent} style={styles.swapButton}>
                <Image source={require("../../assets/und.png")} style={styles.swapIcon} />
              </TouchableOpacity>
              <Text style={styles.text1}>Flight 1</Text>
              <TextInput
                style={styles.textinputA}
                placeholder="From"
                value={input1}
                onChangeText={(text) => setInput1(text)}
              />
              <TextInput
                style={styles.textinputB}
                placeholder="To"
                value={input2}
                onChangeText={(text) => setInput2(text)}
              />
              <TextInput style={styles.textinputC} placeholder="Departure " />
            </View>
            <View style={styles.box2}>
              <TouchableOpacity onPress={swapContent} style={styles.swapButton}>
                <Image source={require("../../assets/und.png")} style={styles.swapIcon} />
              </TouchableOpacity>
              <Text style={styles.text2}>Flight 2</Text>
              <TextInput
                style={styles.textinputA}
                placeholder="From"
                value={input3}
                onChangeText={(text) => setInput3(text)}
              />
              <TextInput
                style={styles.textinputB}
                placeholder="To"
                value={input4}
                onChangeText={(text) => setInput4(text)}
              />
              <TextInput
                textContentType="date"
                style={styles.textinputC}
                placeholder="Departure"
              />
            </View>
            {addFlight}
            <View style={styles.butt}>
              <Button
                buttonStyle={{
                  backgroundColor: "",
                  width: 193,
                  height: 50,
                  borderColor: "#83B4FD",
                  borderRadius: 10,
                  borderWidth: 2,
                  border: 1,
                }}
                onPress={Flight}
                titleStyle={{ color: "#83B4FD" }}
                title={"+    Add another flight"}
              />
            </View>
            <View style={styles.row3}>
              <Button
                buttonStyle={{ backgroundColor: "#00527E", borderRadius: 5, height: 49 }}
                title="Search Flight"
                onPress={searchFlights}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topback: {
    height: 29,
    width: 29,
  },
  book: {
    fontSize: 18,
    color: "#434343",
  },
  backButton: {
    left: 10,
    fontSize: 29,
    color: "black",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    gap: 98,
    alignItems: "center",
    top: "20%",
    left: "2%",
  },
  container2: {
    display: "flex",
    flexDirection: "column",
    marginTop: 23,
  },
  butt: {
    marginTop: 40,
    left: 20,
  },
  text2: {
    fontWeight: "bold",
    right: "36%",
    fontSize: 20,
    bottom: 5,
    marginTop: 40,
    marginBottom: 5,
  },
  box1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -55,
  },
  box2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  textinputA: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "90%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
  },
  textinputB: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "90%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    top: 10,
  },
  textinputC: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "90%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    top: 20,
  },
  row2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 50,
    marginTop: 50,
    left: 5,
  },
  textinput1: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "43%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    right: 10,
  },
  textinput2: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "45%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    right: 3,
  },
  row3: {
    width: "90%",
    marginTop: 20,
    left: 20,
    marginBottom: 400,
  },
  Ama: {
    fontWeight: "bold",
    color: "#434343",
  },
  GO: {
    fontSize: 24,
    fontWeight: "bold",
  },
  column: {
    marginTop: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "black",
    paddingLeft: "7%",
  },
  mainbut: {
    border: 1,
    height: 50,
    marginLeft: 20,
    width: "90%",
    backgroundColor: "#E4EAF1",
    borderRadius: 12,
    marginTop: "25%",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
  },
  swapButton: {
    position: "absolute",
    zIndex: 1,
    //backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
    bottom: 70,
  },
  swapIcon: {
    width: 30,
    height: 30,
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    right: "36%",
    marginTop: 40,
    marginBottom: 5,
  },
});

export default MultiCity;
