import React, {useState, useContext} from 'react';
import {Alert, Text} from 'react-native';

import {AuthContent} from '../components/auth/AuthContent';

import {AuthContext} from '../context/auth-context';
import {createUser} from '../services/auth';

export const SignupScreen = () => {
  const {authenticate} = useContext(AuthContext);
  const [isLoadingUser, setLoadingUser] = useState(false);

  async function sigupHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      setLoadingUser(true);
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create, user please check your input and try again later.',
      );
      setLoadingUser(false);
    }
  }

  if (isLoadingUser) {
    return <Text>Creating user..."</Text>;
  }

  return <AuthContent onAuthenticate={sigupHandler} isLogin={false} />;
};
