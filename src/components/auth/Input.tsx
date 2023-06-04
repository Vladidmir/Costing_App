import React, {FC} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import {GlobalStyles} from '../../constants/styles';
const {primary100, error500, error50} = GlobalStyles.colors;

interface InputProps {
  label: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secure?: boolean;
  onUpdateValue: (value: string) => void;
  value: string;
  isInvalid?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel';
}

export const Input: FC<InputProps> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  autoCapitalize = 'none',
  autoComplete = 'off',
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: error50,
  },
});
