import React, {FC, ReactNode} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface IFlatButtonProps {
  children: ReactNode;
  onPress: () => void;
}

export const FlatButton: FC<IFlatButtonProps> = ({children, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

import {GlobalStyles} from '../../constants/styles';
const {primary100} = GlobalStyles.colors;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: primary100,
  },
});
