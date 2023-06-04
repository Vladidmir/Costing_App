import React from 'react';

import {LoginScreen} from '../../screens/LoginScreen';
import {SignupScreen} from '../../screens/SignupScreen';

import {Stack} from '../stacksList';

import {GlobalStyles} from '../../constants/styles';
const {primary500, primary100} = GlobalStyles.colors;

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: primary100},
      }}>
      <Stack.Screen name="Signin" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
