import React, { useEffect, useState } from 'react';
import CamContainer from '../../components/Dashboard/Cam/CamContainer';
import styled from 'styled-components';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import BaseHeader from '../../components/Base/BaseHeader';
import { Button } from '@material-ui/core';
import GenerateRouter from '../../routes/Router';

const CAM = 'cam';

const Cam: React.FC<any> = ({ route }) => {
  const history = useHistory();
  const location = useLocation();

  const [isCam, setCam] = useState('');

  useEffect(() => {
    if (location.pathname.split('/')[2]) {
      setCam(location.pathname.split('/')[2]);
    } else {
      setCam(CAM);
    }
  }, [location]);

  const handleIntake = () => {
    history.push(`/${CAM}/intake`);
  };

  const handleOutlet = () => {
    history.push(`/${CAM}/outlet`);
  };

  return (
    <CamView>
      {isCam === CAM ? (
        <>
          <BaseHeader>Obliczenia krzywki zaworu</BaseHeader>
          <ButtonCon>
            <Button variant="contained" onClick={() => handleIntake()}>
              dolotowego
            </Button>
            <Button variant="contained" onClick={() => handleOutlet()}>
              wylotowego
            </Button>
          </ButtonCon>
        </>
      ) : (
        ''
      )}
      <Switch>
        {route.map((route: any, i: any) => (
          <GenerateRouter key={i} {...route} />
        ))}
      </Switch>
    </CamView>
  );
};

const CamView = styled.div`
  display: grid;
  grid-template-rows: 50px 0.8fr;
  height: 100%;
  background-color: #6e7c7c;
  overflow-y: scroll;
`;

const ButtonCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button:first-child {
    margin-bottom: 1rem;
  }
`;

export default Cam;
