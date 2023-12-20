import { BaseFormControlType } from '../types';
import {
  camEighthFormSchemaIntake,
  camFifthFormSchemaIntake,
  camFourthFormSchemaIntake,
  camSecondFormSchemaIntake,
  camSeventhFormSchemaIntake,
  camSixthFormSchemaIntake,
  camThirdFormSchemaIntake,
} from './intakeSchema';

export const camFirstFormSchemaOutlet: BaseFormControlType[] = [
  {
    inputLabel: 'Kąt otwarcia zaworu przed DMP',
    formHelperText: 'kat_O [deg]',
    name: 'katOtwarciaZaworuPrzedDMP',
    required: true,
    min: 30,
    max: 70,
    additionalHelperItem: 'Wartość zalecana: 30 <= kat_O <= 70',
  },
  {
    inputLabel: 'Kąt zamknięcia zaworu po DMP',
    formHelperText: 'kat_Z [deg]',
    name: 'katZamknieciaZaworuPoDMP',
    required: true,
    min: 5,
    max: 25,
    additionalHelperItem: 'Wartość zalecana: 5 <= kat_Z <= 25',
  },
  {
    inputLabel: 'Średnica cylindra',
    formHelperText: 'D [mm]',
    name: 'srednicaCylindra',
    required: true,
  },
  {
    inputLabel: 'Średnica wału rozrządu',
    formHelperText: 'd [mm]',
    name: 'srednicaWaluRozrzadu',
    required: true,
  },
  {
    inputLabel: 'Promień podstawowy krzywki',
    formHelperText: 'r [mm]',
    name: 'promienPodstawowyKrzywki',
    required: true,
    additionalHelperItem: '',
  },
  {
    inputLabel: 'Skok zaworu',
    formHelperText: 'Hz [mm]',
    name: 'skokZaworu',
    required: true,
    min: 1,
    max: 1.7,
  },
  {
    inputLabel: 'Przełożenie dźwigienki',
    formHelperText: 'ez / ep = Hz / Hk [-]',
    name: 'przelozenieDzwigienki',
    required: false,
    additionalHelperItem: 'Wartość zalecana: 1.0 <= Hz/Hk <= 1.7',
  },
  {
    inputLabel: 'Promień łuku wierzchołkowego',
    formHelperText: 'ro [mm]',
    name: 'promienLukuWierzcholkowego',
    required: true,
  },
];

export const camSecondFormSchemaOutlet = camSecondFormSchemaIntake;

export const camThirdFormSchemaOutlet = camThirdFormSchemaIntake;

export const camFourthFormSchemaOutlet = camFourthFormSchemaIntake;

export const camFifthFormSchemaOutlet = camFifthFormSchemaIntake;

export const camSixthFormSchemaOutlet = camSixthFormSchemaIntake;

export const camSeventhFormSchemaOutlet = camSeventhFormSchemaIntake;

export const camEighthFormSchemaOutlet = camEighthFormSchemaIntake;
