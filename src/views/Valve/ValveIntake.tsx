import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import ValveContainer from '../../components/Dashboard/Valve/ValveContainer';

export const INTAKE = 'INTAKE';

const ValveIntake: React.FC = () => {
  return (
    <ValveContainer whichOne={INTAKE}>
      <BaseHeader>Obliczenia zaworu dolotowego</BaseHeader>
    </ValveContainer>
  );
};

export default ValveIntake;
