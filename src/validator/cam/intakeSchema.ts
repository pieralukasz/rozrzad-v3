import { BaseFormControlType } from '../types';
import BaseForm from "../../components/Base/Form/BaseForm";
import BaseFormControl from '../../components/Base/Form/BaseFormControl';

export const camFirstFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Kąt otwarcia zaworu przed DMP',
    formHelperText: 'kat_O [deg]',
    name: 'katOtwarciaZaworuPrzedDMP',
    required: true,
    min: -10,
    max: 30,
    additionalHelperItem: 'Wartość zalecana: -10 <= kat_O <= 30',
  },
  {
    inputLabel: 'Kąt zamknięcia zaworu po DMP',
    formHelperText: 'kat_Z [deg]',
    name: 'katZamknieciaZaworuPoDMP',
    required: true,
    min: 25,
    max: 60,
    additionalHelperItem: 'Wartość zalecana: 25 <= kat_Z <= 60',
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
  },
  {
    inputLabel: 'Skok zaworu',
    formHelperText: 'Hz [mm]',
    name: 'skokZaworu',
    required: true,
  },
  {
    inputLabel: 'Przełożenie dźwigienki',
    formHelperText: 'ez / ep = Hz / Hk [-]',
    name: 'przelozenieDzwigienki',
    required: false,
    min: 1,
    max: 1.7,
    additionalHelperItem: 'Wartość zalecana: 1.0 <= Hz/Hk <= 1.7',
  },
  {
    inputLabel: 'Promień łuku wierzchołkowego',
    formHelperText: 'ro [mm]',
    name: 'promienLukuWierzcholkowego',
    required: true,
  },
];

export const camSecondFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Skok krzywki',
    formHelperText: 'Hk [mm]',
    name: 'skokKrzywki',
    required: true,
  },
  {
    inputLabel: 'Promień łuku bocznego',
    formHelperText: 'R [mm]',
    name: 'promienLukuBocznego',
    required: true,
  },
  {
    inputLabel: 'Położenie środka łuku wierzchołkowego',
    formHelperText: 'A [mm]',
    name: 'polozenieSrodkaLukuWierzcholkowego',
    required: true,
  },
  {
    inputLabel: 'Współrzędne punktu granicznego E',
    formHelperText: 'xE, yE [mm]',
    name: 'wspolrzednePunktuGranicznegoE',
    required: true,
  },
  {
    inputLabel: 'Współrzędne środka promienia łuku R',
    formHelperText: 'xB, yB [mm]',
    name: 'wspolrzedneSrodkaPromieniaLukuR',
    required: true,
  },
  {
    inputLabel: 'Współrzędne punktu granicznego F',
    formHelperText: 'xF, yF [mm]',
    name: 'wspolrzednePunktuGranicznegoF',
    required: true,
  },
  {
    inputLabel: 'Wartość kąta DBF',
    formHelperText: 'beta [deg]',
    name: 'wartoscKataDBF',
    required: true,
  },
];

export const camThirdFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Prędkość obrotowa silnika',
    formHelperText: 'n [obr/min]',
    name: 'predkoscObrotowaSilnika',
    required: true,
  },
  {
    inputLabel: 'Liczba suwów silnika',
    formHelperText: 'tau [-]',
    name: 'liczbaSuwowSilnika',
    required: true,
    additionalHelperItem: '(2 lub 4)',
  },
];

export const camFourthFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Największe przyspieszenie dodatnie E',
    formHelperText: 'amax [m/s^2]',
    name: 'najwiekszePrzyspieszenieDodatnie',
    required: true,
  },
  {
    inputLabel: 'Przyspieszenie w punkcie F',
    formHelperText: 'amin1 [m/s^2]',
    name: 'przyspieszenieWPunkcieF',
    required: true,
  },
  {
    inputLabel: 'Przyspieszenie na wierzchołku krzywki W',
    formHelperText: 'amin [m/s^2]',
    name: 'przyspieszenieNaWierzcholkuKrzywki',
    required: true,
  },
  {
    inputLabel: 'Iloraz przyspieszen',
    formHelperText: 'I amax/amin1 [-]',
    name: 'ilorazPrzyspieszen',
    required: true,
  },
  {
    inputLabel: 'Wskaźnik wypełnienia pola wzniosów',
    formHelperText: 'wyp [-]',
    name: 'wskaznikWypelnieniaPolaWzniosow',
    required: true,
  },
  {
    inputLabel: 'Wskaźnik wypełnienia pola wzniosów Dane',
    formHelperText: '',
    name: 'wskaznikWypelnieniaPolaWzniosowDane',
    required: true,
    visible: false,
  },
];

export const camFifthFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Luz zaworowy',
    formHelperText: 'sz [mm]',
    name: 'luzZaworu',
    required: true,
  },
  {
    inputLabel: 'Luz konstrukcyjny krzywki',
    formHelperText: 'sk [mm]',
    name: 'luzKonstrukcyjnyKrzywki',
    required: true,
  },
  {
    inputLabel: 'Kąt dla linii przejściowej',
    formHelperText: 'delta [deg]',
    name: 'katDlaLiniiPrzejsciowejDelta',
    required: true,
  },
];

export const camSixthFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Kąt dla linii przejściowej',
    formHelperText: 'epsylon [deg]',
    name: 'katDlaLiniiPrzejsciowejEpsylon',
    required: true,
  },
  {
    inputLabel: 'Promień r1 dla linii przejściowej',
    formHelperText: 'r1 [mm]',
    name: 'promienR1DlaLiniiPrzejsciowej',
    required: true,
  },
  {
    inputLabel: 'Promień r2 dla linii przejściowej',
    formHelperText: 'r2 [mm]',
    name: 'promienR2DlaLiniiPrzejsciowej',
    required: true,
  },
];

export const camSeventhFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Średnica talerzyka popychacza',
    formHelperText: 'dt [mm]',
    name: 'srednicaTalerzykaPopychacza',
    required: true,
  },
  {
    inputLabel: 'Przesunięcie osi popychacza',
    formHelperText: 'e [mm]',
    name: 'przesuniecieOsiPopychacza',
    required: true,
  },
  {
    inputLabel: 'Szerokość krzywki',
    formHelperText: 'a [mm]',
    name: 'szerokoscKrzywki',
    required: true,
  },
];

export const camEighthFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Minimalna średnica popychacza',
    formHelperText: 'dtmin [mm]',
    name: 'minimalnaSrednicaPopychacza',
    required: true,
  },
];
