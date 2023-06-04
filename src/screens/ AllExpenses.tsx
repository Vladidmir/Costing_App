import React, {FC} from 'react';
import {useAppSelector} from '../store';

import ExpensesOutput from '../components/expenses/ExpensesOutput';

export const ALlExpenses: FC = () => {
  const {expenses} = useAppSelector(state => state.expensesReducer);

  return (
    <ExpensesOutput
      expenses={expenses}
      fallbackText="No registered expenses found!"
      periodName="Total"
    />
  );
};
