import {createSlice} from '@reduxjs/toolkit';

import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from './expensesAsyncAction';

import {IExpensesState} from './expensesSliceTypes';

const initialState: IExpensesState = {
  expenses: [],
  status: 'loading',
};

const orderSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //fetch
      .addCase(fetchExpenses.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.status = 'success';
      })
      .addCase(fetchExpenses.rejected, state => {
        state.expenses = [];
        state.status = 'error';
      })
      //delete
      .addCase(deleteExpense.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          item => item.id !== action.payload,
        );
        state.status = 'success';
      })
      .addCase(deleteExpense.rejected, state => {
        state.status = 'error';
      })
      //add
      .addCase(addExpense.pending, state => {
        state.status = 'loading';
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.status = 'success';
      })
      .addCase(addExpense.rejected, state => {
        state.status = 'error';
      })
      //update
      .addCase(updateExpense.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const updatableExpenseIndex = state.expenses.findIndex(
          expense => expense.id === action.payload.id,
        );
        const updatableExpense = state.expenses[updatableExpenseIndex];
        const updatedItem = {...updatableExpense, ...action.payload.data};

        state.expenses[updatableExpenseIndex] = updatedItem;
        state.status = 'success';
      })
      .addCase(updateExpense.rejected, state => {
        state.status = 'error';
      });
  },
});

const {reducer} = orderSlice;

export default reducer;
