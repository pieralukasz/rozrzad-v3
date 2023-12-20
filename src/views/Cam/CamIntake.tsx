import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import ValveContainer from '../../components/Dashboard/Valve/ValveContainer';
import CamContainer from '../../components/Dashboard/Cam/CamContainer';

export const INTAKE = 'INTAKE';

const CamIntake: React.FC = () => {
  return (
    <CamContainer whichOne={INTAKE}>
      <BaseHeader>Obliczenia krzywki harmonicznej (zawór dolotowy)</BaseHeader>
    </CamContainer>
  );
};

export default CamIntake;
