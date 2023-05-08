import React from 'react';

import {LoginScreen} from '../../screens/LoginScreen';
import {SignupScreen} from '../../screens/SignupScreen';

import {Stack} from '../stacksList';

import {Colors} from '../../constants/styles';

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Signin" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
