import React, { useEffect, useState } from 'react';
import BaseStepperTop from '../../Base/BaseStepperTop';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import BaseForm from '../../Base/Form/BaseForm';
import {
  camEighthFormSchemaIntake,
  camFifthFormSchemaIntake,
  camFirstFormSchemaIntake,
  camFourthFormSchemaIntake,
  camSecondFormSchemaIntake,
  camSeventhFormSchemaIntake,
  camSixthFormSchemaIntake,
  camThirdFormSchemaIntake,
} from '../../../validator/cam/intakeSchema';
import { INTAKE } from '../../../views/Cam/CamIntake';
import {
  camEighthFormSchemaOutlet,
  camFifthFormSchemaOutlet,
  camFirstFormSchemaOutlet,
  camFourthFormSchemaOutlet,
  camSecondFormSchemaOutlet,
  camSeventhFormSchemaOutlet,
  camSixthFormSchemaOutlet,
  camThirdFormSchemaOutlet,
} from '../../../validator/cam/outletSchema';
import { BaseFormControlType } from '../../../validator/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setFirstForm,
  setSecondForm,
  setThirdForm,
  setFourthForm,
  setFifthForm,
  setSixthForm,
  setSeventhForm,
  setEighthForm,
} from '../../../slices/camForm/camFormSlice';
import ValveResults from '../Valve/ValveResults';
// import { saveJSONFileIntoFolder } from '../../../utils/downloadFile';
import {
  CamFifthFormSchemaValue,
  CamFirstFormSchemaValue,
  CamFormSchemaType,
  CamSecondFormSchemaValue,
  CamSeventhFormSchemaValue,
  CamThirdFormSchemaValue,
} from '../../../validator/cam/types';
import {
  calculateAlpha,
  calculateEighthFormSchema,
  calculateFourthFormSchema,
  calculateSecondFormSchema,
  calculateSixthFormSchema,
  calculateSkokKrzywki,
} from './calculations';
import { initialState } from '../../../slices/camForm/initialState';
import { selectFile } from '../../../utils/selectFile';
import { useHistory } from 'react-router-dom';
import PoleWzniosuChart from './WzniosChart';

type CamContainerPropsX = {
  whichOne: string;
};

interface CamContainerProps extends CamContainerPropsX {
  children: React.ReactNode;
}

const CamContainer: React.FC<CamContainerProps> = ({ children, whichOne }) => {
  const steps = [
    'Podstawowe parametry krzywki',
    'Podstawowe parametry krzywki - Obliczenia',
    'Kinematyka krzywki',
    'Kinematyka krzywki - Obliczenia',
    'Część bierna krzywki',
    'Część bierna krzywki - Obliczenia',
    'Współpraca z płaskim popychaczem',
    'Współpraca z płaskim popychaczem - Obliczenia',
    'Wyniki',
  ];

  const [activeStep, setActiveStep] = useState<number>(0);

  const { handleSubmit, register } = useForm();

  let history = useHistory();

  const camForm = useAppSelector(state => state.camForm);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const onSubmit = (intakeValues: CamFormSchemaType) => {
    switch (activeStep) {
      case 0:
        dispatch(setFirstForm(intakeValues as CamFirstFormSchemaValue));

        const secondSchema = calculateSecondFormSchema(
          intakeValues as CamFirstFormSchemaValue
        );

        dispatch(setSecondForm(secondSchema));
        break;
      case 2:
        dispatch(setThirdForm(intakeValues as CamThirdFormSchemaValue));
        const firstForm = camForm.firstForm;

        const fourthSchema = calculateFourthFormSchema(
          firstForm,
          calculateSecondFormSchema(firstForm),
          intakeValues as CamThirdFormSchemaValue
        );

        dispatch(setFourthForm(fourthSchema));
        break;
      case 4:
        dispatch(setFifthForm(intakeValues as CamFifthFormSchemaValue));

        const sixthSchema = calculateSixthFormSchema(
          camForm.firstForm,
          calculateSecondFormSchema(camForm.firstForm),
          camForm.thirdForm,
          camForm.fourthForm,
          intakeValues as CamFifthFormSchemaValue
        );

        dispatch(setSixthForm(sixthSchema));
        break;

      case 6:
        dispatch(setSeventhForm(intakeValues as CamSeventhFormSchemaValue));

        const eighthSchema = calculateEighthFormSchema(
          camForm.firstForm,
          camForm.secondForm,
          intakeValues as CamSeventhFormSchemaValue
        );
        dispatch(setEighthForm(eighthSchema));
        break;
      default:
        break;
    }
    if (activeStep !== 8) {
      handleNext();
    } else {
      history.push('/');
    }
  };

  const getStepContent = (stepIndex: number) => {
    let returnSchema = [];
    switch (stepIndex) {
      case 0:
        if (whichOne === INTAKE) {
          returnSchema = checkIfStateExist(stepIndex, camFirstFormSchemaIntake);
          return (
            <BaseForm
              formSchema={camFirstFormSchemaIntake}
              register={register}
            />
          );
        } else {
          returnSchema = checkIfStateExist(stepIndex, camFirstFormSchemaOutlet);
          return (
            <BaseForm
              formSchema={camFirstFormSchemaOutlet}
              register={register}
            />
          );
        }
      case 1:
        if (whichOne === INTAKE) {
          const firstSchema = checkIfStateExist(
            stepIndex - 1,
            camFirstFormSchemaIntake
          );
          const secondSchema = checkIfStateExist(
            stepIndex,
            camSecondFormSchemaIntake
          );
          return <ValveResults results={[...firstSchema, ...secondSchema]} />;
        } else {
          const firstSchema = checkIfStateExist(
            stepIndex - 1,
            camFirstFormSchemaOutlet
          );
          const secondSchema = checkIfStateExist(
            stepIndex,
            camSecondFormSchemaOutlet
          );
          return <ValveResults results={[...firstSchema, ...secondSchema]} />;
        }
      case 2:
        if (whichOne === INTAKE) {
          returnSchema = checkIfStateExist(stepIndex, camThirdFormSchemaIntake);
          return (
            <BaseForm
              formSchema={camThirdFormSchemaIntake}
              register={register}
            />
          );
        } else {
          returnSchema = checkIfStateExist(stepIndex, camThirdFormSchemaOutlet);
          return (
            <BaseForm
              formSchema={camThirdFormSchemaOutlet}
              register={register}
            />
          );
        }
      case 3:
        if (whichOne === INTAKE) {
          const thirdSchema = checkIfStateExist(
            stepIndex - 1,
            camThirdFormSchemaIntake
          );
          const fourthSchema = checkIfStateExist(
            stepIndex,
            camFourthFormSchemaIntake
          );

          return (
            <>
              <ValveResults results={[...thirdSchema, ...fourthSchema]} />
              <PoleWzniosuChart points={fourthSchema[5].value} />
            </>
          );
        } else {
          const thirdSchema = checkIfStateExist(
            stepIndex - 1,
            camThirdFormSchemaOutlet
          );
          const fourthSchema = checkIfStateExist(
            stepIndex,
            camFourthFormSchemaOutlet
          );
          return <ValveResults results={[...thirdSchema, ...fourthSchema]} />;
        }
      case 4:
        if (whichOne === INTAKE) {
          returnSchema = checkIfStateExist(stepIndex, camFifthFormSchemaIntake);
          return (
            <BaseForm
              formSchema={camFifthFormSchemaIntake}
              register={register}
            />
          );
        } else {
          returnSchema = checkIfStateExist(stepIndex, camFifthFormSchemaOutlet);
          return (
            <BaseForm
              formSchema={camFifthFormSchemaOutlet}
              register={register}
            />
          );
        }
      case 5:
        if (whichOne === INTAKE) {
          const fifthForm = checkIfStateExist(
            stepIndex - 1,
            camFifthFormSchemaIntake
          );
          const sixthForm = checkIfStateExist(
            stepIndex,
            camSixthFormSchemaIntake
          );
          return <ValveResults results={[...fifthForm, ...sixthForm]} />;
        } else {
          const fifthForm = checkIfStateExist(
            stepIndex - 1,
            camFifthFormSchemaOutlet
          );
          const sixthForm = checkIfStateExist(
            stepIndex,
            camSixthFormSchemaOutlet
          );
          return <ValveResults results={[...fifthForm, ...sixthForm]} />;
        }
      case 6:
        if (whichOne === INTAKE) {
          returnSchema = checkIfStateExist(
            stepIndex,
            camSeventhFormSchemaIntake
          );
          return (
            <BaseForm
              formSchema={camSeventhFormSchemaIntake}
              register={register}
            />
          );
        } else {
          returnSchema = checkIfStateExist(
            stepIndex,
            camSeventhFormSchemaOutlet
          );
          return (
            <BaseForm
              formSchema={camSeventhFormSchemaOutlet}
              register={register}
            />
          );
        }
      case 7:
        if (whichOne === INTAKE) {
          const seventhForm = checkIfStateExist(
            stepIndex - 1,
            camSeventhFormSchemaIntake
          );
          const eighthForm = checkIfStateExist(
            stepIndex,
            camEighthFormSchemaIntake
          );
          return <ValveResults results={[...seventhForm, ...eighthForm]} />;
        } else {
          const seventhForm = checkIfStateExist(
            stepIndex - 1,
            camSeventhFormSchemaOutlet
          );
          const eighthForm = checkIfStateExist(
            stepIndex,
            camEighthFormSchemaOutlet
          );
          return <ValveResults results={[...seventhForm, ...eighthForm]} />;
        }
      case 8:
        if (whichOne === INTAKE) {
          const fourthSchema = checkIfStateExist(
            stepIndex,
            camFourthFormSchemaIntake
          );

          return (
            <>
              <ValveResults
                results={[
                  ...camFirstFormSchemaIntake,
                  ...camSecondFormSchemaIntake,
                  ...camThirdFormSchemaIntake,
                  ...camFourthFormSchemaIntake,
                  ...camFifthFormSchemaIntake,
                  ...camSixthFormSchemaIntake,
                  ...camSeventhFormSchemaIntake,
                  ...camEighthFormSchemaIntake,
                ]}
              />
              <PoleWzniosuChart points={fourthSchema[5].value} />
            </>
          );
        } else {
          return (
            <ValveResults
              results={[
                ...camFirstFormSchemaOutlet,
                ...camSecondFormSchemaOutlet,
                ...camThirdFormSchemaOutlet,
                ...camFourthFormSchemaOutlet,
                ...camFifthFormSchemaOutlet,
                ...camSixthFormSchemaOutlet,
                ...camSeventhFormSchemaOutlet,
                ...camEighthFormSchemaOutlet,
              ]}
            />
          );
        }
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
        return setNewValue(defaultSchema, camForm.firstForm);
      case 1:
        return setNewValue(defaultSchema, camForm.secondForm);
      case 2:
        return setNewValue(defaultSchema, camForm.thirdForm);
      case 3:
        return setNewValue(defaultSchema, camForm.fourthForm);
      case 4:
        return setNewValue(defaultSchema, camForm.fifthForm);
      case 5:
        return setNewValue(defaultSchema, camForm.sixForm);
      case 6:
        return setNewValue(defaultSchema, camForm.sevenForm);
      case 7:
        return setNewValue(defaultSchema, camForm.eightForm);
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
      // @ts-ignore
      newSchema[i].value = stateValue[defaultSchema[i].name] as string;
      // @ts-ignore
      if (newSchema[i].name === 'srednicaWaluRozrzadu') {
        const sC = (stateValue as CamFirstFormSchemaValue).srednicaCylindra;
        // newSchema[i].additionalHelperItem =
        //   sC.length > 0
        //     ? `Wartość zalecana: ${
        //         Math.round(parseFloat(sC) * 0.25 * 10) / 10
        //       } <= r <= ${Math.round(parseFloat(sC) * 0.3 * 10) / 10}`
        //     : 'Wprowadź średnice cylindra D.';
      } else if (newSchema[i].name === 'promienPodstawowyKrzywki') {
        const d = (stateValue as CamFirstFormSchemaValue).srednicaWaluRozrzadu;
        // newSchema[i].additionalHelperItem =
        //   d.length > 0
        //     ? `Wartość zalecana: ${
        //         Math.round((parseFloat(d) / 2 + 1.5) * 100) / 100
        //       } <= r <= ${Math.round(((parseFloat(d) / 2 + 3) * 100) / 100)}`
        //     : 'Wprowadź średnice wału rozrządu d.';
      } else if (newSchema[i].name === 'promienLukuWierzcholkowego') {
        const D = (stateValue as CamFirstFormSchemaValue).srednicaCylindra;

        const valueMin =
          Math.round(
            (parseFloat(D) * 0.02 < 1.5 ? 1.5 : parseFloat(D) * 0.02) * 10
          ) / 10;
        const valueMax = Math.round(parseFloat(D) * 0.08 * 10) / 10;

        newSchema[i].additionalHelperItem =
          D.length > 0
            ? `Wartość zalecana: ${valueMin} <= ro <= ${valueMax}`
            : 'Wprowadź średnice cylindra D.';
      } else if (newSchema[i].name === 'luzZaworu') {
        const D = camForm.firstForm.srednicaCylindra;

        const valueMin = Math.round(0.0015 * parseFloat(D) * 10) / 10 + 0.1;
        const valueMax = Math.round(0.004 * parseFloat(D) * 10) / 10 + 0.1;

        newSchema[
          i
        ].additionalHelperItem = `Wartość zalecana: ${valueMin} <= sz <= ${valueMax}`;
      } else if (newSchema[i].name === 'luzKonstrukcyjnyKrzywki') {
        const ix =
          1 / parseFloat(camForm.firstForm.przelozenieDzwigienki as string);

        const sz = (stateValue as CamFifthFormSchemaValue).luzZaworu;

        const sp = ix * parseFloat(sz);

        const valueMin = 1.2 * sp;
        const valueMax = 1.5 * sp;

        newSchema[i].additionalHelperItem =
          sz.length > 0
            ? `Wartość zalecana: ${Math.round(valueMin * 10) / 10} <= sz <= ${
                Math.round(valueMax * 10) / 10
              }`
            : 'Wprowadź wartośc luzu zaworu';
      } else if (newSchema[i].name === 'srednicaTalerzykaPopychacza') {
        const r = parseFloat(camForm.firstForm.promienPodstawowyKrzywki);
        const R = parseFloat(camForm.secondForm.promienLukuBocznego);
        const beta = parseFloat(camForm.secondForm.wartoscKataDBF);
        const alpha = calculateAlpha(
          camForm.firstForm.promienPodstawowyKrzywki,
          camForm.firstForm.promienLukuWierzcholkowego,
          camForm.secondForm.polozenieSrodkaLukuWierzcholkowego,
          camForm.firstForm.katOtwarciaZaworuPrzedDMP,
          camForm.firstForm.katZamknieciaZaworuPoDMP
        );

        const n = (R - r) * Math.sin(((beta - alpha.alpha) * Math.PI) / 180);

        const valueMin = 2.2 * n;
        const valueMax = 2.6 * n;

        newSchema[i].additionalHelperItem = `Wartość zalecana: ${
          Math.round(valueMin * 10) / 10
        } <= sz <= ${Math.round(valueMax * 10) / 10}`;
      } else if (newSchema[i].name === 'przesuniecieOsiPopychacza') {
        const dt = (stateValue as CamSeventhFormSchemaValue)
          .srednicaTalerzykaPopychacza;

        const valueMin = 0.04 * parseFloat(dt);
        const valueMax = 0.08 * parseFloat(dt);

        newSchema[i].additionalHelperItem =
          dt.length > 0
            ? `Wartość zalecana: ${Math.round(valueMin * 10) / 10} <= sz <= ${
                Math.round(valueMax * 10) / 10
              }`
            : 'Wprowadź wartośc średnicy talerzyka popychacza';
      } else if (newSchema[i].name === 'szerokoscKrzywki') {
        const dt = (stateValue as CamSeventhFormSchemaValue)
          .srednicaTalerzykaPopychacza;

        const valueMin = 0.4 * parseFloat(dt);
        const valueMax = 0.7 * parseFloat(dt);

        newSchema[i].additionalHelperItem =
          dt.length > 0
            ? `Wartość zalecana: ${Math.round(valueMin * 10) / 10} <= sz <= ${
                Math.round(valueMax * 10) / 10
              }`
            : 'Wprowadź wartośc średnicy talerzyka popychacza';
      }
    }

    return defaultSchema;
  };

  const saveFile = () => {
    let form = {};

    switch (activeStep) {
      case 1:
        form = {
          ...camForm.firstForm,
          ...camForm.secondForm,
        };
        break;
      case 3:
        form = {
          ...camForm.thirdForm,
          ...camForm.fourthForm,
        };
        break;
      case 5:
        form = {
          ...camForm.fifthForm,
          ...camForm.sixForm,
        };
        break;
      case 7:
        form = {
          ...camForm.sevenForm,
          ...camForm.eightForm,
        };
        break;
      case 8:
        form = {
          ...camForm.firstForm,
          ...camForm.secondForm,
          ...camForm.thirdForm,
          ...camForm.fourthForm,
          ...camForm.fifthForm,
          ...camForm.sixForm,
          ...camForm.sevenForm,
          ...camForm.eightForm,
        };
        break;
      default:
        break;
    }

    Object.keys(form).forEach(function (el) {
      // @ts-ignore
      if (
        el === 'wspolrzednePunktuGranicznegoE' ||
        el === 'wspolrzedneSrodkaPromieniaLukuR' ||
        el === 'wspolrzednePunktuGranicznegoF'
      ) {
        console.log('');
      } else {
        // @ts-ignore
        form[el] = parseFloat(form[el]);
      }
    });

    // saveJSONFileIntoFolder('Krzywka', form);
  };

  return (
    <CamIntakeView>
      {children}
      <BaseStepperTop activeStep={activeStep} steps={steps} color="#6e7c7c" />
      <ButtonContainer>
        {activeStep > 0 ? (
          <Button variant="outlined" onClick={handleBack}>
            Cofnij
          </Button>
        ) : (
          ''
        )}
        {activeStep % 2 === 1 || activeStep === 8 ? (
          <Button variant="outlined" onClick={() => saveFile()}>
            Pobierz dane
          </Button>
        ) : (
          ''
        )}
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {activeStep <= 7 ? 'Potwierdź' : 'Zakończ'}
        </Button>
      </ButtonContainer>
      <FormView onSubmit={handleSubmit(onSubmit)} key={activeStep}>
        {getStepContent(activeStep)}
      </FormView>
    </CamIntakeView>
  );
};

export default CamContainer;

const CamIntakeView = styled.div`
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
