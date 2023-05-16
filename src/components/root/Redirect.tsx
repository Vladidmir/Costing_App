import React, {FC} from 'react';
import {AuthStack} from '../../navigation/stacks/AuthStack';
import {AuthenticatedStack} from '../../navigation/stacks/AuthenticatedStack';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../../hooks/useAuth';

export const Redirect: FC = () => {
  const {isAuth} = useAuth();
  return (
    <NavigationContainer>
      <>{!isAuth ? <AuthStack /> : <AuthenticatedStack />}</>
    </NavigationContainer>
  );
};
