import React, {ReactNode, FC} from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';

import {Colors} from '../../constants/styles';

interface IButtonProps {
  children: ReactNode;
  onPress: () => void;
  extraStyles?: ViewStyle | ViewStyle[];
}

export const Button: FC<IButtonProps> = ({children, onPress, extraStyles}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        ...(extraStyles
          ? Array.isArray(extraStyles)
            ? extraStyles
            : [extraStyles]
          : []),
      ]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
