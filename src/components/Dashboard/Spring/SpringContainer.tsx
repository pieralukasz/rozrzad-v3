import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useForm } from 'react-hook-form';
import BaseForm from '../../Base/Form/BaseForm';
import { BaseFormControlType } from '../../../validator/types';
import {
  springFirstFormSchema,
  springSecondFormSchema,
  springThirdFormSchema,
  springFourthFormSchema,
} from '../../../validator/spring/schema';
import styled from 'styled-components';
import BaseStepperTop from '../../Base/BaseStepperTop';
import { Button } from '@material-ui/core';
import {
  setFirstForm,
  setSecondForm,
  setThirdForm,
  setFourthForm,
} from '../../../slices/springForm/springFormSlice';
import {
  SpringFormSchemaType,
  SpringFirstFormSchemaValue,
  SpringThirdFormSchemaValue,
} from '../../../validator/spring/types';

import {
  calculateFourthFormSchema,
  calculateSecondFormSchema,
} from './calculations';
import ValveResults from '../Valve/ValveResults';
// import { saveJSONFileIntoFolder } from '../../../utils/downloadFile';

type SpringContainerProps = {
  whichOne: string;
  children: React.ReactNode;
};


const SpringContainer: React.FC<SpringContainerProps> = ({
  children,
  whichOne,
}) => {
  const steps = [
    'Obliczenia wstępne sprężyny',
    'Obliczenia wstępne sprężyny - Obliczenia',
    'Obliczenia wytrzymałościowe sprężyny',
    'Obliczenia wytrzymałościowe sprężyny - Obliczenia',
    'Wyniki',
  ];

  const [activeStep, setActiveStep] = useState<number>(0);
  let history = useHistory();

  const springForm = useAppSelector(state => state.springForm);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const { handleSubmit, register } = useForm({});

  const onSubmit = (intakeValues: SpringFormSchemaType) => {
    switch (activeStep) {
      case 0:
        const secondSchema = calculateSecondFormSchema(
          intakeValues as SpringFirstFormSchemaValue
        );
        console.log(intakeValues);
        dispatch(setFirstForm(intakeValues as SpringFirstFormSchemaValue));
        dispatch(setSecondForm(secondSchema));
        break;
      case 2:
        const fourthSchema = calculateFourthFormSchema(
          springForm.firstForm,
          springForm.secondForm,
          intakeValues as SpringThirdFormSchemaValue
        );
        dispatch(setThirdForm(intakeValues as SpringThirdFormSchemaValue));
        dispatch(setFourthForm(fourthSchema));
        break;
      case 4:
        history.push('/');
        break;
      default:
        console.log('nothing');
        break;
    }

    handleNext();
  };

  const getStepContent = (stepIndex: number) => {
    let returnSchema = [];
    switch (stepIndex) {
      case 0:
        returnSchema = checkIfStateExist(stepIndex, springFirstFormSchema);
        return <BaseForm formSchema={returnSchema} register={register} />;
      case 1:
        const firstSchema = checkIfStateExist(0, springFirstFormSchema);
        const secondSchema = checkIfStateExist(1, springSecondFormSchema);
        return <ValveResults results={[...firstSchema, ...secondSchema]} />;
      case 2:
        returnSchema = checkIfStateExist(stepIndex, springThirdFormSchema);
        return <BaseForm formSchema={returnSchema} register={register} />;
      case 3:
        const thirdSchema = checkIfStateExist(2, springThirdFormSchema);
        const fourthSchema = checkIfStateExist(3, springFourthFormSchema);
        return <ValveResults results={[...thirdSchema, ...fourthSchema]} />;
      case 4:
        const first = checkIfStateExist(0, springFirstFormSchema);
        const two = checkIfStateExist(1, springSecondFormSchema);
        const three = checkIfStateExist(2, springThirdFormSchema);
        const four = checkIfStateExist(3, springFourthFormSchema);
        return <ValveResults results={[...first, ...two, ...three, ...four]} />;
      default:
        return <div>Unknown</div>;
    }
  };

  const checkIfStateExist = (
    numberForm: number,
    defaultSchema: BaseFormControlType[]
  ): BaseFormControlType[] => {
    switch (numberForm) {
      case 0:
        return setNewValue(defaultSchema, springForm.firstForm);
      case 1:
        return setNewValue(defaultSchema, springForm.secondForm);
      case 2:
        return setNewValue(defaultSchema, springForm.thirdForm);
      case 3:
        return setNewValue(defaultSchema, springForm.fourthForm);
      default:
        return defaultSchema;
    }
  };

  const setNewValue = (
    defaultSchema: BaseFormControlType[],
    stateValue: object
  ): BaseFormControlType[] => {
    let newSchema: BaseFormControlType[];
    newSchema = defaultSchema;

    for (let i = 0; i <= defaultSchema.length - 1; i++) {
      // @ts-ignore
      newSchema[i].value = stateValue[defaultSchema[i].name] as string;
    }
    return defaultSchema;
  };
  const saveFile = () => {
    let form = {
      ...springForm.firstForm,
      ...springForm.secondForm,
      ...springForm.thirdForm,
      ...springForm.fourthForm,
    };

    Object.keys(form).forEach(function (el) {
      // @ts-ignore
      form[el] = parseFloat(form[el]);
    });

    // saveJSONFileIntoFolder('Sprezyna', form);
  };

  return (
    <SpringIntakeView>
      {children}
      <BaseStepperTop activeStep={activeStep} steps={steps} color="#92967d" />
      <ButtonContainer>
        {activeStep > 0 ? (
          <Button variant="outlined" onClick={handleBack}>
            Cofnij
          </Button>
        ) : (
          ''
        )}
        {activeStep === 4 ? (
          <Button variant="outlined" onClick={() => saveFile()}>
            Pobierz dane
          </Button>
        ) : (
          ''
        )}
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {activeStep <= 4 ? 'Potwierdź' : 'Zakończ'}
        </Button>
      </ButtonContainer>
      <FormView onSubmit={handleSubmit(onSubmit)} key={activeStep}>
        {getStepContent(activeStep)}
      </FormView>
    </SpringIntakeView>
  );
};

const SpringIntakeView = styled.div`
  margin-bottom: 2rem;
`;

const FormView = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white !important;
  padding-bottom: 1rem;

  .MuiFormControl-root {
    width: 40% !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  button:nth-child(2),
  button:nth-child(3) {
    margin-left: 2rem;
  }
`;

export default SpringContainer;
