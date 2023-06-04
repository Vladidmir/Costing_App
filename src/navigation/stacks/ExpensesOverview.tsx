import React from 'react';
import {BottomTabs} from '../stacksList';
import RecentExpenses from '../../screens/RecentExpenses';
import {ALlExpenses} from '../../screens/ AllExpenses';
import IonIcon from '../../components/ui/IonIcon';

import {useNavigation, NavigationProp} from '@react-navigation/native';

import {GlobalStyles} from '../../constants/styles';
const {primary500, accent500} = GlobalStyles.colors;

import {ExpensesParamList} from '../stacksList';
import {useAuth} from '../../hooks/useAuth';

export const ExpensesOverview = () => {
  const {navigate} = useNavigation<NavigationProp<ExpensesParamList>>();
  const {logout} = useAuth();
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: primary500},
        tabBarActiveTintColor: accent500,
        headerRight: ({tintColor}) => (
          <IonIcon
            name="add-circle-outline"
            size={25}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
        headerLeft: ({tintColor}) => (
          <IonIcon
            name="exit-outline"
            size={25}
            color={tintColor}
            onPress={logout}
          />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color}) => (
            <IonIcon
              onPress={() => {
                navigate('RecentExpenses');
              }}
              color={color}
              name="calendar-outline"
              size={25}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={ALlExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color}) => (
            <IonIcon
              onPress={() => {
                navigate('AllExpenses');
              }}
              color={color}
              name="wallet-outline"
              size={25}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};
