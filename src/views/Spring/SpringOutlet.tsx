import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import SpringContainer from '../../components/Dashboard/Spring/SpringContainer';

const OUTLET = 'OUTLET';

const SpringOutlet: React.FC = () => {
  return (
    <SpringContainer whichOne={OUTLET}>
      <BaseHeader>Obliczenia sprężyny zaworu wylotowego</BaseHeader>
    </SpringContainer>
  );
};

export default SpringOutlet;
