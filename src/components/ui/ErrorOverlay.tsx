import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from './Button';
import {GlobalStyles} from '../../constants/styles';

interface IErrorOverlayProps {
  message?: string;
  onConfirm: () => void;
}

const ErrorOverlay: React.FC<IErrorOverlayProps> = ({message, onConfirm}) => {
  return (
    <View style={s.rootContainer}>
      <Text style={[s.text, s.title]}>An error occurred!</Text>
      <Text style={s.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

const {primary700} = GlobalStyles.colors;
const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary700,
    padding: 24,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ErrorOverlay;
