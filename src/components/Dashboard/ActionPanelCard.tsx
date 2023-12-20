import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DashboardAction } from './types';

interface ActionPanelCardProps extends DashboardAction {
  children: React.ReactNode;
}
const ActionPanelCard: React.FC<ActionPanelCardProps> = ({
  color,
  to,
  children,
}) => {
  return (
    <ActionPanelView to={to} color={color}>
      {children}
    </ActionPanelView>
  );
};

export default ActionPanelCard;

const ActionPanelView = styled(Link)`
  height: 100%;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  text-decoration: none;
  transition: 0.3s;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`;
