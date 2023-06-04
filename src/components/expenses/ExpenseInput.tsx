import React from 'react';
import {InputProps} from 'react-native-elements';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {GlobalStyles} from '../../constants/styles';

interface IExpenseInputProps {
  label: string;
  style?: ViewStyle;
  textInputConfig?: InputProps;
  invalid?: boolean;
}

const ExpenseInput: React.FC<IExpenseInputProps> = ({
  label,
  style,
  textInputConfig,
  invalid,
}) => {
  const inputStyles: TextStyle[] = [s.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(s.inputMultiline);
  }

  return (
    <View style={[s.rootContainer, style]}>
      <Text style={[s.label, invalid && s.invalidLabel]}>{label}</Text>
      <TextInput
        style={[inputStyles, invalid && s.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
};

export default ExpenseInput;

const {primary100, primary700, error500, error50} = GlobalStyles.colors;

const s = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 4,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: primary100,
    color: primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: error500,
  },
  invalidInput: {
    backgroundColor: error50,
  },
});
