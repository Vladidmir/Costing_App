import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export const Stack = createNativeStackNavigator<RootStackParamList>();
export const BottomTabs = createBottomTabNavigator<ExpensesParamList>();

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  ExpensesOverview: undefined;
  ManageExpense: {expenseId: string};
};

export type ExpensesParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
  ManageExpense: {expenseId: string | unknown};
};
