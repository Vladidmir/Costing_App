import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import ExpenseItem from './ExpenseItem';

import {IExpense} from '../../store/slices/expensesSlice/expensesSliceTypes';

interface ExpensesListProps {
  expenses: IExpense[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({expenses}) => {
  const renderExpenseItem: ListRenderItem<IExpense> = ({item}) => {
    return <ExpenseItem {...item} />;
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id.toString()}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
