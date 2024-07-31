import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text, bg, txt, bordercolor='transparent' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: bg, borderWidth:1, borderColor: bordercolor }]}
    >
      <Text style={[styles.text, { color: txt }]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});
export default CustomButton;
