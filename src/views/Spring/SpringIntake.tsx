import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import SpringContainer from '../../components/Dashboard/Spring/SpringContainer';

const INTAKE = 'INTAKE';

const SpringIntake: React.FC = () => {
  return (
    <SpringContainer whichOne={INTAKE}>
      <BaseHeader>Obliczenia sprężyny zaworu dolotowego</BaseHeader>
    </SpringContainer>
  );
};

export default SpringIntake;
