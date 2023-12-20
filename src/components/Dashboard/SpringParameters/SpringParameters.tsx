import React, { useEffect, useState } from 'react';
import BaseHeader from '../../Base/BaseHeader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '@material-ui/core';
// import { selectFile } from '../../../utils/selectFile';
import {
  setFirstForm,
  setSecondForm,
  setThirdForm,
  setFourthForm,
} from '../../../slices/springForm/springFormSlice';
import styled from 'styled-components';
import {
  SpringFirstFormSchemaValue,
  SpringFourthFormSchemaValue,
  SpringSecondFormSchemaValue,
  SpringThirdFormSchemaValue,
} from '../../../validator/spring/types';
import { useHistory } from 'react-router-dom';
import SpringParametersDetails from './SpringParametersDetails';
import SpringParametersResults from './SpringParametersResults';

const SpringParameters: React.FC = () => {
  const springForm = useAppSelector(state => state.springForm);
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [dateProvided, setDateProvided] = useState<boolean>(false);

  const getJSON = async () => {
    // await selectFile().then(async x => {
    //   const obj: any = {};
    //
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   Object.keys(x).forEach(item => (obj[item] = x[item].toString()));
    //
    //   const firstForm: any = {};
    //   Object.keys(springForm.firstForm).forEach(
    //     item => (firstForm[item] = obj[item])
    //   );
    //
    //   const secondForm: any = {};
    //   Object.keys(springForm.secondForm).forEach(
    //     item => (secondForm[item] = obj[item])
    //   );
    //
    //   const thirdForm: any = {};
    //   Object.keys(springForm.thirdForm).forEach(
    //     item => (thirdForm[item] = obj[item])
    //   );
    //
    //   const fourthForm: any = {};
    //   Object.keys(springForm.fourthForm).forEach(
    //     item => (fourthForm[item] = obj[item])
    //   );
    //
    //   await dispatch(setFirstForm(firstForm as SpringFirstFormSchemaValue));
    //   await dispatch(setSecondForm(secondForm as SpringSecondFormSchemaValue));
    //   await dispatch(setThirdForm(thirdForm as SpringThirdFormSchemaValue));
    //   await dispatch(setFourthForm(fourthForm as SpringFourthFormSchemaValue));
    //
    //   setDateProvided(true);
    // });
  };

  useEffect(() => {
    if (
      springForm.firstForm.stosunekSilSprezynyDoSilBezwladnosci &&
      springForm.secondForm.stosunekSilSprezynyDoSilBezwlandWPktW &&
      springForm.thirdForm.materialSprezyny &&
      springForm.fourthForm.stalaDrugiejSprezyny
    ) {
      setDateProvided(true);
    }
  }, [history.location]);

  return (
    <>
      <BaseHeader>Parametry Sprężyn</BaseHeader>
      <ParametersContainer>
        {dateProvided ? (
          <>
            <SpringParametersDetails />
            <SpringParametersResults />
          </>
        ) : (
          <Button variant="contained" onClick={getJSON}>
            Wczytaj dane
          </Button>
        )}
      </ParametersContainer>
    </>
  );
};

export default SpringParameters;

const ParametersContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 95%;
  overflow-x: scroll;
  padding-right: 30px;
`;
