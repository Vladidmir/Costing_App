import {View, StyleSheet, Text} from 'react-native';

import React from 'react';
import ExpenseInput from './ExpenseInput';
import {Button} from '../ui/Button';
import {FlatButton} from '../ui/FlatButton';
import {IExpense} from '../../store/slices/expensesSlice/expensesSliceTypes';

import {getFormattedDate} from '../../utils/date';
import {GlobalStyles} from '../../constants/styles';

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: IExpense) => Promise<void>;
  submitButtonLabel: string;
  defaultValues?: IExpense;
  isEditing: boolean;
}

interface InputValue {
  value: string;
  isValid: boolean;
}

interface InputsValue {
  amount: InputValue;
  date: InputValue;
  description: InputValue;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputsValue, setInputsValue] = React.useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  const inputChangedHandler = (
    inputIndentifier: keyof InputsValue,
    enteredValue: string,
  ) => {
    setInputsValue(currentInputsValue => {
      return {
        ...currentInputsValue,
        [inputIndentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const {amount, date, description} = inputsValue;

    const expenseData: IExpense = {
      amount: +amount.value,
      date: new Date(date.value),
      description: description.value,
      id: '',
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputsValue(currentValues => {
        const {amount, description, date} = currentValues;
        return {
          amount: {value: amount.value, isValid: amountIsValid},
          date: {value: date.value, isValid: dateIsValid},
          description: {
            value: description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsinValid =
    !inputsValue.amount.isValid ||
    !inputsValue.date.isValid ||
    !inputsValue.description.isValid;

  return (
    <View style={s.rootContainer}>
      <Text style={s.title}>Your Expense</Text>
      <View style={s.inputsRow}>
        <ExpenseInput
          label="Amount"
          style={s.rowInput}
          invalid={!inputsValue.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: enteredValue =>
              inputChangedHandler('amount', enteredValue),
            value: inputsValue.amount.value,
          }}
        />

        <ExpenseInput
          label="Date"
          style={s.rowInput}
          invalid={!inputsValue.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY--MM--DD',
            keyboardType: 'decimal-pad',
            maxLength: 10,
            onChangeText: enteredValue =>
              inputChangedHandler('date', enteredValue),
            value: inputsValue.date.value,
          }}
        />
      </View>

      <ExpenseInput
        label="Description"
        invalid={!inputsValue.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: enteredValue =>
            inputChangedHandler('description', enteredValue),
          value: inputsValue.description.value,
        }}
      />

      <View style={s.buttonsContainer}>
        <FlatButton onPress={onCancel}>Cencel</FlatButton>
        <Button extraStyles={s.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
      {formIsinValid && (
        <Text style={s.errorText}>
          Invalid input value - please check your entered data
        </Text>
      )}
    </View>
  );
};

const {error500} = GlobalStyles.colors;
const s = StyleSheet.create({
  rootContainer: {
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    textAlign: 'center',
    color: error500,
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },

  rowInput: {
    flex: 1,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    minWidth: 120,
  },
});
export default ExpenseForm;
