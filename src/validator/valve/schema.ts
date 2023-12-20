import { BaseFormControlType } from '../types';

export const valveFirstFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Średnica tłoka',
    formHelperText: 'D [mm]',
    name: 'srednicaTloka',
    required: true,
  },
  {
    inputLabel: 'Skok tłoka',
    formHelperText: 'S [mm]',
    name: 'skokTloka',
    required: true,
  },
  {
    inputLabel: 'Prędkość obrotowa silnika',
    formHelperText: 'n [obr/min]',
    name: 'predkoscObrotowaSilnika',
    required: true,
  },
  {
    inputLabel: 'Średnia prędkość przepływu',
    formHelperText: 'Wsr [m/s]',
    name: 'sredniaPredkoscPrzeplywu',
    required: true,
  },
  {
    inputLabel: 'Średnica trzonka zaworu',
    formHelperText: 'd [mm]',
    name: 'srednicaTrzonkaZaworu',
    required: true,
    value: '10',
  },
  {
    inputLabel: 'Maksymalne nadciśnienie w cylindrze',
    formHelperText: 'pmax [MPa]',
    name: 'maksymalneNadcisnienieWCylindrze',
    required: true,
  },
  {
    inputLabel: 'Liczba zaworów na cylinder',
    formHelperText: 'n [-]',
    name: 'liczbaZaworowNaCylinder',
    required: false,
  },
  {
    inputLabel: 'Kąt pochylenia przylgni zaworowej',
    formHelperText: 'alfa [deg]',
    name: 'katPochyleniaPrzylgniZaworowej',
    required: true,
    value: '45',
    step: 15,
    min: 45,
    max: 60,
    additionalHelperItem: 'Wartość zalecana: 45 lub 60 stopni',
  },
];

export const valveSecondFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Średnica kanału',
    formHelperText: 'Dk [mm]',
    name: 'srednicaKanalu',
    required: true,
    disabled: true,
  },
  {
    inputLabel: 'Średnica wewnętrzna przylgni',
    formHelperText: 'Dwp [mm]',
    name: 'srednicaWewnetrznaPrzylgni',
    required: true,
    autoFocus: true,
  },
  {
    inputLabel: 'Średnica zewnętrzna przylgni',
    formHelperText: 'Dzp [mm]',
    name: 'srednicaZewnetrznaPrzylgni',
    required: true,
  },
  {
    inputLabel: 'Średnica wewnętrzna grzybka zaworu',
    formHelperText: 'Dwz [mm]',
    name: 'srednicaWewnetrznaGrzybkaZaworu',
    required: true,
  },
  {
    inputLabel: 'Średnica zewnętrzna grzybka zaworu',
    formHelperText: 'Dzz [mm]',
    name: 'srednicaZewnetrznaGrzybkaZaworu',
    required: true,
  },
  {
    inputLabel: 'Grubość grzybka zaworu',
    formHelperText: 'Gg [mm]',
    name: 'gruboscGrzybkaZaworu',
    required: true,
  },
];

export const valveThirdFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Wznios zaworu',
    formHelperText: 'Hz [mm]',
    name: 'wzniosZaworu',
    required: true,
  },
  {
    inputLabel: 'Naprężenia w grzybku zaworu',
    formHelperText: 'sigma [MPa]',
    name: 'naprezeniaWGrzybkuZaworu',
    required: true,
  },
  {
    inputLabel: 'Szerokość przylgni zaworowej',
    formHelperText: 'Sp [mm]',
    name: 'szerokoscPrzylgniZaworowej',
    required: true,
  },
];
