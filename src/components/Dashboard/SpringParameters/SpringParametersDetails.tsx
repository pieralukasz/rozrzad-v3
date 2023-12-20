import React from 'react';
import styled from 'styled-components';
import springParameters from '../../../utils/springParameters';

const SpringParametersDetails: React.FC = () => {
  return (
    <DetailsContainer>
      {springParameters.map((item, index) => (
        <DetailsItem key={`${item}_${index}`}>
          <span style={{ fontWeight: 'bold' }}>{item.name}</span>
          <span>[{item.unit}]</span>
        </DetailsItem>
      ))}
    </DetailsContainer>
  );
};

export default SpringParametersDetails;

const DetailsContainer = styled.ul`
  position: fixed;
  min-width: 250px;
  height: calc(70% + 10px);
  border-right: 2px solid white;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  list-style: none;
  padding: 12px;
  border-radius: 0 6px 6px 0;
  background-color: #282c34;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DetailsItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;
