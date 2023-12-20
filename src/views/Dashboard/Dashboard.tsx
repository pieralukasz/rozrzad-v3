import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import ActionPanelCard from '../../components/Dashboard/ActionPanelCard';

const Dashboard: React.FC = () => {
  return (
    <DashboardView>
      <ActionPanelCard to="/valve" color="#92967d" name="Zawór">
        Zawór
      </ActionPanelCard>
      <ActionPanelCard to="/cam" color="#6e7c7c" name="Krzywka">
        Krzywka
      </ActionPanelCard>
      <ActionPanelCard to="/spring" color="#c8c6a7" name="Sprężyna">
        Sprężyna
      </ActionPanelCard>
      <ActionPanelCard
        to="/spring-parameters"
        color="#435560"
        name="Parametry Sprężyn"
      >
        Parametry Sprężyn
      </ActionPanelCard>
    </DashboardView>
  );
};

export default Dashboard;

const DashboardView = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;
