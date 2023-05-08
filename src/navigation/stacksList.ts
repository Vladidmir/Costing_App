import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
};
