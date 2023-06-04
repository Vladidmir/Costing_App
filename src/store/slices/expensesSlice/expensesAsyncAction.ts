import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
import {IExpense} from './expensesSliceTypes';

import {BASE_URL} from '@env';

// export const BASE_URL = 'https://rn-auth-6b0f3-default-rtdb.firebaseio.com';

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => {
    try {
      const {data} = await axios.get<{[key: string]: IExpense}>(
        `${BASE_URL}/expenses.json`,
      );

      const expenses: IExpense[] = [];

      for (const key in data) {
        const expenseObj = {
          id: key,
          amount: data[key].amount,
          date: new Date(data[key].date),
          description: data[key].description,
        };
        expenses.push(expenseObj);
      }

      return expenses;
    } catch (error: any) {
      throw new Error('Failed to fetch expenses: ' + error.message);
    }
  },
);

export const deleteExpense = createAsyncThunk<string, string>(
  'expenses/deleteExpenses',
  async id => {
    await axios.delete(`${BASE_URL}/expenses/${id}.json`);
    return id;
  },
);

export const addExpense = createAsyncThunk<IExpense, IExpense>(
  'expenses/addExpenses',
  async expenseData => {
    const {data} = await axios.post<{name: string}>(
      `${BASE_URL}/expenses.json`,
      expenseData,
    );
    const id = data.name;
    const newItem: IExpense = {...expenseData, id};
    return newItem;
  },
);

export const updateExpense = createAsyncThunk<
  {id: string; data: Partial<IExpense>},
  {id: string; data: Partial<IExpense>}
>('expenses/updateExpense', async params => {
  const {id, data} = params;
  await axios.put(`${BASE_URL}/expenses/${id}.json`, data);
  return {id, data};
});
