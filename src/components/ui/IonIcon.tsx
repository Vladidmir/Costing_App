import React, {FC} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IonIconButtonProps {
  name: string;
  size: number;
  color?: string;
  onPress?: () => void;
}

const IonIcon: FC<IonIconButtonProps> = ({
  name,
  size,
  color = 'white',
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && s.pressed}>
      <View style={s.buttonContainer}>
        <Icon name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IonIcon;

const s = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
