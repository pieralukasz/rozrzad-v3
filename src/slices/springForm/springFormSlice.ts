import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SpringFirstFormSchemaValue,
  SpringFourthFormSchemaValue,
  SpringSecondFormSchemaValue,
  SpringThirdFormSchemaValue,
} from '../../validator/spring/types';
import { initialState } from './initialState';

export const springFormSlice = createSlice({
  name: 'springIntakeForm',
  initialState,
  reducers: {
    setFirstForm: (
      state,
      action: PayloadAction<SpringFirstFormSchemaValue>
    ) => {
      state.firstForm = action.payload as SpringFirstFormSchemaValue;
    },
    clearFirstForm: state => {
      state.firstForm = initialState.firstForm as SpringFirstFormSchemaValue;
    },
    setSecondForm: (
      state,
      action: PayloadAction<SpringSecondFormSchemaValue>
    ) => {
      state.secondForm = action.payload as SpringSecondFormSchemaValue;
    },
    clearSecondForm: state => {
      state.secondForm = initialState.secondForm as SpringSecondFormSchemaValue;
    },
    setThirdForm: (
      state,
      action: PayloadAction<SpringThirdFormSchemaValue>
    ) => {
      state.thirdForm = action.payload as SpringThirdFormSchemaValue;
    },
    clearThirdForm: state => {
      state.thirdForm = initialState.thirdForm as SpringThirdFormSchemaValue;
    },
    setFourthForm: (
      state,
      action: PayloadAction<SpringFourthFormSchemaValue>
    ) => {
      state.fourthForm = action.payload as SpringFourthFormSchemaValue;
    },
    clearFourthForm: state => {
      state.fourthForm = initialState.fourthForm as SpringFourthFormSchemaValue;
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
  setFourthForm,
  clearFourthForm,
} = springFormSlice.actions;

export default springFormSlice.reducer;
