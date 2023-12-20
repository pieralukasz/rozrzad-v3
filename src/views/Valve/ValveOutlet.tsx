import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import ValveContainer from '../../components/Dashboard/Valve/ValveContainer';

export const OUTLET = 'OUTLET';

const ValveOutlet: React.FC = () => {
  return (
    <ValveContainer whichOne={OUTLET}>
      <BaseHeader>Obliczenia zaworu wylotowego</BaseHeader>
    </ValveContainer>
  );
};

export default ValveOutlet;
