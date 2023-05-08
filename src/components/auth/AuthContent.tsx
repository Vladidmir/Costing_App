import React, {useState, FC} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {FlatButton} from '../ui/FlatButton';
import {AuthForm} from './AuthForm';

import {Colors} from '../../constants/styles';
import {RootStackParamList} from '../../navigation/stacksList';

interface ICredentials {
  email: string;
  password: string;
  confirmEmail: string;
  confirmPassword: string;
}

interface ICredentialsInvalid {
  email: boolean;
  password: boolean;
  confirmEmail: boolean;
  confirmPassword: boolean;
}

interface IAuthContent {
  isLogin: boolean;
  onAuthenticate: (credentials: ICredentials) => void;
}

export const AuthContent: FC<IAuthContent> = ({isLogin, onAuthenticate}) => {
  const [credentialsInvalid, setCredentialsInvalid] =
    useState<ICredentialsInvalid>({
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
    });

  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigate('Signup');
    } else {
      navigate('Signin');
    }
  }

  function submitHandler(credentials: ICredentials) {
    let {email, confirmEmail, password, confirmPassword} = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({
      email,
      password,
      confirmEmail: '',
      confirmPassword: '',
    });
  }
  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
