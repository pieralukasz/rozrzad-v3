import { BaseFormControlType } from '../types';

export const springFirstFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Przyspieszenie w punkcie granicznym F',
    formHelperText: 'aF [m/s^2]',
    name: 'przyspieszenieWPunkcieGranicznymF',
    required: true,
  },
  {
    inputLabel: 'Przyspieszenie na wierzchołku krzywki W',
    formHelperText: 'aW [m/s^2]',
    name: 'przyspieszenieNaWierzcholkuKrzywkiW',
    required: true,
  },
  {
    inputLabel: 'Położenie środka łuku wierzchołkowego',
    formHelperText: 'A [mm]',
    name: 'polozenieSrodkaLukuWierzcholkowego',
    required: true,
  },
  {
    inputLabel: 'Pochylenie promienia R krzywki w pkt. F',
    formHelperText: 'beta [deg]',
    name: 'pochyleniePromieniaRKrzywkiWPktF',
    required: true,
  },
  {
    inputLabel: 'Promień łuku wierzchołkowego',
    formHelperText: 'ro [mm]',
    name: 'promienLukuWierzcholkowego',
    required: true,
  },
  {
    inputLabel: 'Promień podstawowy krzywki',
    formHelperText: 'r [mm]',
    name: 'promienPodstawowyKrzywki',
    required: true,
  },
  {
    inputLabel: 'Średnica zewnętrzna stożka zaworu',
    formHelperText: 'dz [mm]',
    name: 'srednicaZewnetrznaStozkaZaworu',
    required: false,
  },
  {
    inputLabel: 'Skok zaworu',
    formHelperText: 'Hz [mm]',
    name: 'skokZaworu',
    required: true,
  },
  {
    inputLabel: 'Masy zastępcze zredukowane na oś zaworu',
    formHelperText: 'Mz [kg]',
    name: 'masyZastepczeZredukowaneNaOsZaworu',
    required: true,
  },
  {
    inputLabel: 'Współczynnik docisku zaworu',
    formHelperText: 'dp [kPa]',
    name: 'wspolczynnikDociskuZaworu',
    required: true,
  },
  {
    inputLabel: 'Przełożenie dźwigni zaworowej',
    formHelperText: 'ez/ep [-]',
    name: 'przelozenieDzwigniZaworowej',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił sprężyny do sił bezwładnosci',
    formHelperText: 'S2/Pm [-]',
    name: 'stosunekSilSprezynyDoSilBezwladnosci',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił sprężyny S1 do S2',
    formHelperText: 'S2/S1 [-]',
    name: 'stosunekSilWSprezynie',
    required: true,
  },
];

export const springSecondFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Napięcie sprężyny przy zamkniętym zaworze',
    formHelperText: 'S1 [N]',
    name: 'napiecieSprezynyPrzyZamknietymZaworze',
    required: true,
  },
  {
    inputLabel: 'Napięcie sprężyny przy otwartym zaworze',
    formHelperText: 'S2 [N]',
    name: 'napiecieSprezynyPrzyOtwartymZaworze',
    required: true,
  },
  {
    inputLabel: 'Stała sprężyny',
    formHelperText: 'C [N/mm]',
    name: 'stalaSprezyny',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił sprężyny do sił bezwładn. w pkt. F',
    formHelperText: 'sF [N]',
    name: 'stosunekSilSprezynyDoSilBezwlandWPktF',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił sprężyny do sił bezwładn. w pkt. W',
    formHelperText: 'SsW [N]',
    name: 'stosunekSilSprezynyDoSilBezwlandWPktW',
    required: true,
  },
];

export const springThirdFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Predkość obrotowa silnika',
    formHelperText: 'n [obr/min]',
    name: 'predkoscObrotowaSilnika',
    required: true,
  },
  {
    inputLabel: 'Liczba suwów silnika',
    formHelperText: 'tau [-]',
    name: 'liczbaSuwowSilnika',
    required: true,
  },
  {
    inputLabel: 'Procent obciążenia obliczanej sprężyny',
    formHelperText: '[%]',
    name: 'procentObciazeniaObliczanejSprezyny',
    required: true,
  },
  {
    inputLabel: 'Średnica zewnętrzna spręzyny z war. konstr.',
    formHelperText: 'Dz [mm]',
    name: 'srednicaZewnetrznaSprezynyZWarKonstr',
    required: true,
  },
  {
    inputLabel: 'Wytrzymałości materiału',
    formHelperText: 'Rm [MPa]',
    name: 'wytrzymaloscMaterialu',
    required: true,
  },
  {
    inputLabel: 'Materiał sprężyny',
    formHelperText: '[-]',
    name: 'materialSprezyny',
    required: true,
    min: 1,
    max: 4,
    additionalHelperItem:
      '1. drut stalowy, walcowany o podwyższonej wytrzymałości \n ' +
      '2. drut stalowy, przeciągany o podwyższonej wytrzymałości \n' +
      '3. drut stalowy, walcowany o wysokiej wytrzymałości \n' +
      '4. drut stalowy, przeciągany o wysokiej wytrzymałości',
  },
];

export const springFourthFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Siła w obliczanej sprężynie',
    formHelperText: 'S1 [N]',
    name: 'silaWObliczanejSprezynieS1',
    required: true,
  },
  {
    inputLabel: 'Siła w obliczanej sprężynie',
    formHelperText: 'S2 [N]',
    name: 'silaWObliczanejSprezynieS2',
    required: true,
  },
  {
    inputLabel: 'Stała obliczanej sprężyny',
    formHelperText: 'C [N/mm]',
    name: 'stalaDrugiejSprezyny',
    required: true,
  },
];
