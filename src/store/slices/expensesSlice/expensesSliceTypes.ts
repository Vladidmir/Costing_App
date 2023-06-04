export interface IExpense {
  id: string;
  amount: number;
  date: Date;
  description: string;
}

export interface IExpensesState {
  expenses: IExpense[];
  status: 'loading' | 'success' | 'error';
}
