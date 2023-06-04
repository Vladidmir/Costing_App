import React, {FC} from 'react';
import {useAppSelector, useAppDispatch} from '../store';
import {StyleSheet, View} from 'react-native';

import ExpenseForm from '../components/expenses/ExpenseForm';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {Button} from '../components/ui/Button';
import {IExpense} from '../store/slices/expensesSlice/expensesSliceTypes';

import {ExpensesParamList} from '../navigation/stacksList';
interface IManageExpense
  extends NativeStackScreenProps<ExpensesParamList, 'ManageExpense'> {}
import {
  deleteExpense,
  updateExpense,
  addExpense,
} from '../store/slices/expensesSlice/expensesAsyncAction';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const ManageExpense: FC<IManageExpense> = ({route, navigation}) => {
  const {expenses, status} = useAppSelector(state => state.expensesReducer);
  const dispatch = useAppDispatch();

  let expenseId: string | unknown = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenses.find(expense => expense.id === expenseId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [expenseId, isEditing, navigation]);

  const deleteExpenseHandler = async () => {
    if (typeof expenseId === 'string') {
      dispatch(deleteExpense(expenseId));
    }
    navigation.goBack();
  };
  const cencelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: IExpense) => {
    if (isEditing) {
      if (typeof expenseId === 'string') {
        dispatch(updateExpense({id: expenseId, data: expenseData}));
      }
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  };

  const spinner = status === 'loading' && <LoadingOverlay />;
  const errorMessage = status === 'error' && (
    <ErrorOverlay onConfirm={() => {}} />
  );

  return (
    <>
      {errorMessage}
      <View style={s.rootContainer}>
        <ExpenseForm
          onCancel={cencelHandler}
          submitButtonLabel={isEditing ? 'Update' : 'Add'}
          onSubmit={confirmHandler}
          isEditing={isEditing}
          defaultValues={selectedExpense}
        />
        {isEditing && (
          <View style={s.deleteContainer}>
            <Button onPress={deleteExpenseHandler}>delete</Button>
            {spinner}
          </View>
        )}
      </View>
    </>
  );
};

import {GlobalStyles} from '../constants/styles';
const {primary800, primary200} = GlobalStyles.colors;

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: primary800,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    minWidth: 120,
  },

  deleteContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: primary200,
  },
});

export default ManageExpense;
