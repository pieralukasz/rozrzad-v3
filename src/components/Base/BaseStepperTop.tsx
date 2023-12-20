import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

interface BaseStepperTopProps {
  steps: string[];
  activeStep: number;
  color: string;
}

const BaseStepperTop: React.FC<BaseStepperTopProps> = ({
  steps,
  activeStep,
  color,
}) => {
  return (
    <StepperContainer activeStep={activeStep} alternativeLabel color={color}>
      {steps.map(label => (
        <StepContainer key={label}>
          <StepLabelContainer>{label}</StepLabelContainer>
        </StepContainer>
      ))}
    </StepperContainer>
  );
};

const StepperContainer = styled(Stepper)`
  background-color: ${props => props.color} !important;
  padding-bottom: 0 !important;
`;

const StepContainer = styled(Step)`
  font-weight: bold !important;
`;

const StepLabelContainer = styled(StepLabel)`
  font-weight: bold;

  .MuiStepLabel-label {
    font-weight: bold !important;
  }
`;

export default BaseStepperTop;
