import React, {useEffect} from 'react';
import './style/App.css';
import styled from 'styled-components';
import { Switch, useLocation, useHistory } from 'react-router-dom';
import routes from './routes';
import GenerateRouter from './routes/Router';
import { Button } from '@material-ui/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const App: React.FC = () => {
  let location = useLocation();
  let history = useHistory();

  const handleBack = () => {
    const locationPath = location.pathname.split('/');
    if (locationPath.length > 2) {
      history.push('/' + locationPath[locationPath.length - 2]);
    } else if (locationPath.length === 2) {
      history.push('/');
    }
  };

  useEffect(() => {
    history.push('/')
  }, []);

  return (
    <AppView>
      {location.pathname !== '/' && location.pathname !== '/index.html' ? (
        <BackButton variant="contained" onClick={() => handleBack()}>
          Powrót
        </BackButton>
      ) : (
        ''
      )}
      <Switch>
        {routes.map((route, i) => (
          <GenerateRouter key={i} {...route} />
        ))}
      </Switch>
    </AppView>
  );
};

export default App;

const AppView = styled.div`
  background-color: #282c34;
  width: 100vw;
  height: 100vh;
  color: white;
`;

const BackButton = styled(Button)`
  position: fixed !important;
  transform: translate(-2rem, -1rem);
  right: 2% !important;
  bottom: 2% !important;
`;
