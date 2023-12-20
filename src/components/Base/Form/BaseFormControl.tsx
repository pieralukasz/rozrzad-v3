import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import { BaseFormControlType } from '../../../validator/types';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ValveSecondFormSchemaValue } from '../../../validator/valve/types';
import { setSecondForm } from '../../../slices/valveForm/valveFormSlice';
import {
  setFirstForm,
  setFifthForm,
  setSeventhForm,
} from '../../../slices/camForm/camFormSlice';
import {
  CamFifthFormSchemaValue,
  CamFirstFormSchemaValue,
  CamSeventhFormSchemaValue,
} from '../../../validator/cam/types';
import { useLocation } from 'react-router-dom';

interface BaseFormControlProps extends BaseFormControlType {
  count: number;
  reference: any;
}

const BaseFormControl: React.FC<BaseFormControlProps> = ({
  inputLabel,
  count,
  formHelperText,
  reference,
  name,
  value,
  disabled,
  additionalHelperItem,
  autoFocus,
  step,
  min,
  max,
}) => {
  const valveIntakeForm = useAppSelector(state => state.valveIntakeForm);
  const camForm = useAppSelector(state => state.camForm);
  const dispatch = useAppDispatch();

  let location = useLocation();

  const passValue = (value: string) => {
    switch (location.pathname.split('/')[1]) {
      case 'valve':
        const valveSecondForm = JSON.parse(
          JSON.stringify(valveIntakeForm.secondForm)
        ) as ValveSecondFormSchemaValue;

        // @ts-ignore
        valveSecondForm[name] = value;

        dispatch(setSecondForm(valveSecondForm));
        break;
      case 'cam':
        const camFirstForm = JSON.parse(
          JSON.stringify(camForm.firstForm)
        ) as CamFirstFormSchemaValue;

        // @ts-ignore
        camFirstForm[name] = value;

        const camFifthForm = JSON.parse(
          JSON.stringify(camForm.fifthForm)
        ) as CamFifthFormSchemaValue;

        // @ts-ignore
        camFifthForm[name] = value;

        const camSeventhForm = JSON.parse(
          JSON.stringify(camForm.sevenForm)
        ) as CamSeventhFormSchemaValue;

        // @ts-ignore
        camSeventhForm[name] = value;

        dispatch(setFirstForm(camFirstForm));
        dispatch(setFifthForm(camFifthForm));
        dispatch(setSeventhForm(camSeventhForm));
        break;
      default:
        break;
    }
  };

  const setInputValue = (e: any) => {
    passValue(e.target.value);
  };

  return (
    <FormControlView>
      <InputLabel htmlFor={inputLabel}>
        {count !== undefined ? `${count + 1}` : ''}. {inputLabel}
      </InputLabel>
      <Input
        color="primary"
        id={inputLabel}
        name={name}
        type="number"
        autoFocus={autoFocus !== undefined ? autoFocus : count === 0}
        inputRef={reference}
        inputProps={{
          max: max !== undefined ? max : Infinity,
          step: step !== undefined ? step : 1,
        }}
        key={`${name}-${count}`}
        defaultValue={value !== undefined ? value : undefined}
        disabled={disabled !== undefined ? disabled : false}
        onChange={setInputValue}
      />
      <FormHelperText>{formHelperText}</FormHelperText>
      {additionalHelperItem !== undefined ? (
        <AdditionalFormHelperText>
          {additionalHelperItem}
        </AdditionalFormHelperText>
      ) : (
        ''
      )}
    </FormControlView>
  );
};

const FormControlView = styled(FormControl)`
  min-width: 340px !important;
  margin: 0.25rem !important;

  .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }

  .MuiFormLabel-root {
    color: white;
    font-weight: bold;
  }

  .MuiFormHelperText-root {
    color: white;
  }

  .MuiInputBase-input {
    color: #fff59b; // Mindaro
    font-weight: bold;
  }
`;

const AdditionalFormHelperText = styled(FormHelperText)`
  color: rgba(0, 0, 0, 0.54) !important;
  font-weight: bold !important;
`;

const AdditionalButton = styled(Button)`
  color: #1e3af3 !important;
`;

export default BaseFormControl;
