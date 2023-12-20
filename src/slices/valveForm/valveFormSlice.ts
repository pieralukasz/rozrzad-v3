import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ValveFirstFormSchemaValue,
  ValveSecondFormSchemaValue,
  ValveThirdFormSchemaValue,
} from '../../validator/valve/types';
import { initialState } from './initialState';

export const valveFormSlice = createSlice({
  name: 'valveIntakeForm',
  initialState,
  reducers: {
    setFirstForm: (state, action: PayloadAction<ValveFirstFormSchemaValue>) => {
      state.firstForm = action.payload as ValveFirstFormSchemaValue;
    },
    clearFirstForm: state => {
      state.firstForm = initialState.firstForm as ValveFirstFormSchemaValue;
    },
    setSecondForm: (
      state,
      action: PayloadAction<ValveSecondFormSchemaValue>
    ) => {
      state.secondForm = action.payload as ValveSecondFormSchemaValue;
    },
    clearSecondForm: state => {
      state.secondForm = initialState.secondForm as ValveSecondFormSchemaValue;
    },
    setThirdForm: (state, action: PayloadAction<ValveThirdFormSchemaValue>) => {
      state.thirdForm = action.payload as ValveThirdFormSchemaValue;
    },
    clearThirdForm: state => {
      state.thirdForm = initialState.thirdForm as ValveThirdFormSchemaValue;
    },
  },
});

export const {
  setFirstForm,
  setSecondForm,
  clearFirstForm,
  clearSecondForm,
  setThirdForm,
  clearThirdForm,
} = valveFormSlice.actions;

export default valveFormSlice.reducer;
