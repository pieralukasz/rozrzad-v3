import React, { useEffect, useState } from 'react';
import BaseStepperTop from '../../Base/BaseStepperTop';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearSecondForm,
  setFirstForm,
  setSecondForm,
  setThirdForm,
} from '../../../slices/valveForm/valveFormSlice';
import { useForm } from 'react-hook-form';
import {
  ValveFirstFormSchemaValue,
  ValveFormSchemaType,
  ValveSecondFormSchemaValue,
} from '../../../validator/valve/types';
import { initialState } from '../../../slices/valveForm/initialState';
import {
  calculateNaprezeniaWGrzybkuZaworu,
  calculateSrednicaKanalu,
  calculateSzerokoscPrzylgniZaworowej,
  calculateWzniosZaworu,
} from './calculations';
import {
  valveFirstFormSchema,
  valveSecondFormSchema,
  valveThirdFormSchema,
} from '../../../validator/valve/schema';
import BaseForm from '../../Base/Form/BaseForm';
import ValveResults from './ValveResults';
import { BaseFormControlType } from '../../../validator/types';
// import { saveJSONFileIntoFolder } from '../../../utils/downloadFile';
import { useHistory } from 'react-router-dom';

type ValueContainerProps = {
  whichOne: string;
};

interface ValveContainerProps extends ValueContainerProps{
  children: React.ReactNode;
}

const ValveContainer: React.FC<ValveContainerProps> = ({
  children,
  whichOne,
}) => {
  const steps = ['Wstępne dane', 'Obliczenia wstępne', 'Podsumowanie wyników'];

  const [activeStep, setActiveStep] = useState<number>(0);
  const [srednicaKanalu, setSrednicaKanalu] = useState<string>('0');

  const history = useHistory();

  const valveIntakeForm = useAppSelector(state => state.valveIntakeForm);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      dispatch(clearSecondForm());
    }
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const { handleSubmit, register } = useForm();
  const onSubmit = (intakeValues: ValveFormSchemaType) => {
    switch (activeStep) {
      case 0:
        // eslint-disable-next-line no-case-declarations
        const initialSecondForm = JSON.parse(
          JSON.stringify(initialState.secondForm)
        );

        // eslint-disable-next-line no-case-declarations
        const sK = calculateSrednicaKanalu(
          intakeValues as ValveFirstFormSchemaValue
        ) as string;

        initialSecondForm.srednicaKanalu = `${sK}`;
        setSrednicaKanalu(sK);

        dispatch(setSecondForm(initialSecondForm));
        dispatch(setFirstForm(intakeValues as ValveFirstFormSchemaValue));
        break;
      case 1:
        // eslint-disable-next-line no-case-declarations
        const results = intakeValues as ValveSecondFormSchemaValue;
        results.srednicaKanalu = srednicaKanalu;

        // eslint-disable-next-line no-case-declarations
        const thirdForm = JSON.parse(JSON.stringify(initialState.thirdForm));

        // eslint-disable-next-line no-case-declarations
        const firstForm = valveIntakeForm.firstForm;

        thirdForm.naprezeniaWGrzybkuZaworu = `${
          Math.round(
            parseFloat(
              calculateNaprezeniaWGrzybkuZaworu(firstForm, results, whichOne)
            ) * 10
          ) / 10
        }`;

        thirdForm.szerokoscPrzylgniZaworowej = `${
          Math.round(
            parseFloat(
              calculateSzerokoscPrzylgniZaworowej(firstForm, results)
            ) * 10
          ) / 10
        }`;

        thirdForm.wzniosZaworu = `${
          Math.round(
            parseFloat(calculateWzniosZaworu(firstForm, results)) * 10
          ) / 10
        }`;

        dispatch(setThirdForm(thirdForm));
        dispatch(setSecondForm(results as ValveSecondFormSchemaValue));
        break;
      case 2:
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
        returnSchema = checkIfStateExist(stepIndex, valveFirstFormSchema);
        return <BaseForm formSchema={returnSchema} register={register} />;
      case 1:
        returnSchema = checkIfStateExist(stepIndex, valveSecondFormSchema);
        return <BaseForm formSchema={returnSchema} register={register} />;
      case 2:
        // eslint-disable-next-line no-case-declarations
        const firstSchema = checkIfStateExist(0, valveFirstFormSchema);
        // eslint-disable-next-line no-case-declarations
        const secondSchema = checkIfStateExist(1, valveSecondFormSchema);
        // eslint-disable-next-line no-case-declarations
        const thirdSchema = checkIfStateExist(2, valveThirdFormSchema);

        return (
          <ValveResults
            results={[...firstSchema, ...secondSchema, ...thirdSchema]}
          />
        );
      default:
        return <div>Unknown</div>;
    }
  };

  const checkIfStateExist = (
    numberForm: number,
    defaultSchema: BaseFormControlType[]
  ): BaseFormControlType[] => {

    if (valveIntakeForm?.firstForm === undefined) {
      return defaultSchema;
    }

    switch (numberForm) {
      case 0:
        return setNewValue(defaultSchema, valveIntakeForm.firstForm);
      case 1:
        return setNewValue(defaultSchema, valveIntakeForm.secondForm);
      case 2:
        return setNewValue(defaultSchema, valveIntakeForm.thirdForm);
      default:
        return defaultSchema;
    }
  };

  const setNewValue = (
    defaultSchema: BaseFormControlType[],
    stateValue: object
  ): BaseFormControlType[] => {
    const newSchema = defaultSchema;

    for (let i = 0; i <= defaultSchema.length - 1; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newSchema[i].value = stateValue[defaultSchema[i].name] as string;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (newSchema[i].name === 'srednicaWewnetrznaPrzylgni') {
        const sK = (stateValue as ValveSecondFormSchemaValue).srednicaKanalu;
        newSchema[i].additionalHelperItem = `Wartość zalecana: ${sK} < Dwp < ${
          parseFloat(sK) + 1
        }`;
      } else if (newSchema[i].name === 'srednicaZewnetrznaPrzylgni') {
        const swp = (stateValue as ValveSecondFormSchemaValue)
          .srednicaWewnetrznaPrzylgni;
        newSchema[i].additionalHelperItem =
          swp !== ''
            ? `Wartość zalecana: ${
                Math.round(parseFloat(swp) * 1.05 * 10) / 10
              } < Dzp < ${Math.round(parseFloat(swp) * 1.1 * 10) / 10}`
            : 'Podaj wartość średnicy wewnętrznej przylgni';
      } else if (newSchema[i].name === 'srednicaWewnetrznaGrzybkaZaworu') {
        const sK = (stateValue as ValveSecondFormSchemaValue).srednicaKanalu;
        newSchema[i].additionalHelperItem = `Wartość zalecana: ${
          parseFloat(sK) - 1
        } < Dwz < ${sK}`;
      } else if (newSchema[i].name === 'srednicaZewnetrznaGrzybkaZaworu') {
        const szp = (stateValue as ValveSecondFormSchemaValue)
          .srednicaZewnetrznaPrzylgni;
        newSchema[i].additionalHelperItem =
          szp !== ''
            ? `Wartość zalecana: ${parseFloat(szp) + 1} < Dzz < ${
                parseFloat(szp) + 2
              }`
            : 'Podaj wartość średnicy zewnętrznej przylgni';
      } else if (newSchema[i].name === 'gruboscGrzybkaZaworu') {
        const swg = (stateValue as ValveSecondFormSchemaValue)
          .srednicaWewnetrznaGrzybkaZaworu;
        const szg = (stateValue as ValveSecondFormSchemaValue)
          .srednicaZewnetrznaGrzybkaZaworu;

        const calculate = (parseFloat(szg) - 0.95 * parseFloat(swg)) / 2;
        newSchema[i].additionalHelperItem =
          (swg && szg) !== ''
            ? `Wartość zalecana: ${
                Math.round((calculate + 1) * 10) / 10
              } < Gg < ${Math.round((calculate + 2) * 10) / 10}`
            : 'Podaj średnice grzybka zaworu';
      }
    }
    return newSchema;
  };

  const saveFile = () => {
    const form = {
      ...valveIntakeForm.firstForm,
      ...valveIntakeForm.secondForm,
      ...valveIntakeForm.thirdForm,
    };

    Object.keys(form).forEach(function (el) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      form[el] = parseFloat(form[el]);
    });

    // saveJSONFileIntoFolder('Zawór', form);
  };

  return (
    <ValveIntakeView>
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
        {activeStep === 2 ? (
          <Button variant="outlined" onClick={() => saveFile()}>
            Pobierz dane
          </Button>
        ) : (
          ''
        )}
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {activeStep <= 1 ? 'Potwierdź' : 'Zakończ'}
        </Button>
      </ButtonContainer>
      <FormView onSubmit={handleSubmit(onSubmit)}>
        {getStepContent(activeStep)}
      </FormView>
    </ValveIntakeView>
  );
};

const ValveIntakeView = styled.div`
  margin-bottom: 2rem;
`;

const FormView = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white !important;
  padding-bottom: 1rem;
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

export default ValveContainer;
