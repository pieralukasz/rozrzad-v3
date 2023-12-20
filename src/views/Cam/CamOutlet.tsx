import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import CamContainer from '../../components/Dashboard/Cam/CamContainer';

const OUTLET = 'outlet';

const CamOutlet: React.FC = () => {
  return (
    <CamContainer whichOne={OUTLET}>
      <BaseHeader>Obliczenia krzywki harmonicznej (zawór wylotowy)</BaseHeader>
    </CamContainer>
  );
};

export default CamOutlet;
