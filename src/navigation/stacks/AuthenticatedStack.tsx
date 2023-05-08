import React, {useContext} from 'react';

import {Button} from '../../components/ui/Button';
import {HomeScreen} from '../../screens/HomeScreen';

import {AuthContext} from '../../context/auth-context';
import {Stack} from '../stacksList';

import {Colors} from '../../constants/styles';

export const AuthenticatedStack = () => {
  const {logout} = useContext(AuthContext);
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
