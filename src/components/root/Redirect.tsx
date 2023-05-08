import React, {FC, useContext} from 'react';

import {AuthContext} from '../../context/auth-context';
import {AuthStack} from '../../navigation/stacks/AuthStack';
import {AuthenticatedStack} from '../../navigation/stacks/AuthenticatedStack';
import {NavigationContainer} from '@react-navigation/native';

export const Redirect: FC = () => {
  const {isAuth} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <>{!isAuth ? <AuthStack /> : <AuthenticatedStack />}</>
    </NavigationContainer>
  );
};
