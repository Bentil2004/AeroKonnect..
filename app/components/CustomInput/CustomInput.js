import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  bordercolor,
  borderRadius,
  iconName,
}) => {
  return (
    <View style={[styles.inputContainer, { borderColor: bordercolor, borderRadius: Number(borderRadius) }]}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color="#7D7D7D" style={styles.icon} />
      </View>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});

export default CustomInput;
