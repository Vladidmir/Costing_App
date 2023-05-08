import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../constants/styles';

export const HomeScreen: FC = () => {
  return (
    <View style={styles.home}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: Colors.primary500,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
