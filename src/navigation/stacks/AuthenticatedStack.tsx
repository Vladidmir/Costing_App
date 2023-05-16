import React from 'react';

import {Button} from '../../components/ui/Button';
import {HomeScreen} from '../../screens/HomeScreen';

import {Stack} from '../stacksList';

import {Colors} from '../../constants/styles';
import {useAuth} from '../../hooks/useAuth';

export const AuthenticatedStack = () => {
  const {logout} = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerRight: ({tintColor}) => (
            <Button
              extraStyles={{borderColor: tintColor, borderWidth: 1}}
              onPress={logout}>
              Logout
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
