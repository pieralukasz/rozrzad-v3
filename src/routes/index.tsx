import React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
// import Dashboard from '../views/Dashboard/Dashboard';
// import Valve from '../views/Valve/Valve';
// import Cam from '../views/Cam/Cam';
// import Spring from '../views/Spring/Spring';
// import ValveOutlet from '../views/Valve/ValveOutlet';
// import ValveIntake from '../views/Valve/ValveIntake';
// import CamOutlet from '../views/Cam/CamOutlet';
// import CamIntake from '../views/Cam/CamIntake';
// import SpringOutlet from '../views/Spring/SpringOutlet';
// import SpringIntake from '../views/Spring/SpringIntake';
// import SpringParameters from '../components/Dashboard/SpringParameters/SpringParameters';

const element = () => <div>HELLO ROMAN</div>;
export interface Config extends RouteConfig {
  component:
    | React.ComponentType<RouteConfigComponentProps>
    | React.ComponentType;
}

const ROUTES: Config[] = [
  {
    path: '/',
    key: 'DASHBOARD',
    exact: true,
    component: element,
  },
  {
    path: '/index.html',
    key: 'DASHBOARD',
    exact: true,
    component: element,
  },
  {
    path: '/valve',
    key: 'VALVE',
    exact: false,
    component: element,
    routes: [
      {
        path: '/valve/outlet',
        key: 'OUTLET',
        exact: false,
        component: element,
      },
      {
        path: '/valve/intake',
        key: 'INTAKE',
        exact: false,
        component: element,
      },
    ],
  },
  {
    path: '/cam',
    key: 'CAM',
    exact: false,
    component: element,
    routes: [
      {
        path: '/cam/outlet',
        key: 'OUTLET',
        exact: false,
        component: element,
      },
      {
        path: '/cam/intake',
        key: 'INTAKE',
        exact: false,
        component: element,
      },
    ],
  },
  {
    path: '/spring',
    key: 'SPRING',
    exact: false,
    component: element,
    routes: [
      {
        path: '/spring/outlet',
        key: 'OUTLET',
        exact: false,
        component: element,
      },
      {
        path: '/spring/intake',
        key: 'INTAKE',
        exact: false,
        component: element,
      },
    ],
  },
  {
    path: '/spring-parameters',
    ket: 'SPRING-PARAMETERS',
    exact: false,
    component: element,
  },
];

export default ROUTES;
