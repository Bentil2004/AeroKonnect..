import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

const CustomImageButton = ({ text, onPress, imageSource, bgColor, txtColor, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: bgColor }, style]}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <Text style={[styles.text, { color: txtColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    width: 37,
    height: 37,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default CustomImageButton;

