import React, {FC} from 'react';
import {getDateMinusDays} from '../utils/date';
import {useAppDispatch, useAppSelector} from '../store';
import {useEffect} from 'react';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import ExpensesOutput from '../components/expenses/ExpensesOutput';

import {fetchExpenses} from '../store/slices/expensesSlice/expensesAsyncAction';

const RecentExpenses: FC = () => {
  const dispatch = useAppDispatch();
  const {expenses, status} = useAppSelector(state => state.expensesReducer);
  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DayesAgo = getDateMinusDays(today, 7);
    return expense.date > date7DayesAgo && expense.date <= today;
  });

  if (status === 'loading') {
    return <LoadingOverlay />;
  }

  if (status === 'error') {
    return <ErrorOverlay onConfirm={() => {}} />;
  }

  return (
    <ExpensesOutput
      periodName="Last 7 Dayes"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
