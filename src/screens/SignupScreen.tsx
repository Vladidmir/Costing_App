import React from 'react';
import {Text} from 'react-native';

import {AuthContent} from '../components/auth/AuthContent';
import {useAuth} from '../hooks/useAuth';

export const SignupScreen = () => {
  const {sigupHandler, isLoadingUser} = useAuth();

  if (isLoadingUser) {
    return <Text>Creating user..."</Text>;
  }

  return <AuthContent onAuthenticate={sigupHandler} isLogin={false} />;
};
