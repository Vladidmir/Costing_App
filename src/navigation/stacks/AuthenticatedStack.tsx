import React from 'react';

import {Stack} from '../stacksList';

import {ExpensesOverview} from './ExpensesOverview';
import ManageExpense from '../../screens/ManageExpense';

export const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />

      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};
