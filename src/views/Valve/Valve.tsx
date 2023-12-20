import React, { useEffect, useState } from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import GenerateRouter from '../../routes/Router';

const VALVE = 'valve';

const Valve: React.FC<any> = ({ route }) => {
  const history = useHistory();
  const location = useLocation();

  const [isValve, setValve] = useState('');

  useEffect(() => {
    if (location.pathname.split('/')[2]) {
      setValve(location.pathname.split('/')[2]);
    } else {
      setValve(VALVE);
    }
  }, [location]);

  const handleIntake = () => {
    history.push(`/${VALVE}/intake`);
  };

  const handleOutlet = () => {
    history.push(`/${VALVE}/outlet`);
  };

  return (
    <ValveView>
      {isValve === VALVE ? (
        <>
          <BaseHeader>Obliczenia zaworu:</BaseHeader>
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
    </ValveView>
  );
};

export default Valve;

const ValveView = styled.div`
  display: grid;
  grid-template-rows: 50px 0.8fr;
  height: 100%;
  background-color: #92967d;
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
