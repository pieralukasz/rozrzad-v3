import React, { useEffect, useState } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BaseHeader from '../../components/Base/BaseHeader';
import { Button, Checkbox } from '@material-ui/core';
import GenerateRouter from '../../routes/Router';

const SPRING = 'spring';

const Spring: React.FC<any> = ({ route }) => {
  const history = useHistory();
  const location = useLocation();

  const [isSpring, setSpring] = useState('');
  const [isDual, setIsDual] = useState(false);

  useEffect(() => {
    if (location.pathname.split('/')[2]) {
      setSpring(location.pathname.split('/')[2]);
    } else {
      setSpring(SPRING);
    }
  }, [location]);

  const handleIntake = () => {
    history.push(`/${SPRING}/intake`);
  };

  const handleOutlet = () => {
    history.push(`/${SPRING}/outlet`);
  };

  return (
    <SpringView>
      {isSpring === SPRING ? (
        <>
          <BaseHeader>Obliczenia sprężyny zaworu:</BaseHeader>

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
    </SpringView>
  );
};

const SpringView = styled.div`
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

const CheckboxCon = styled.div`
  margin-top: 12px;
`;

export default Spring;
