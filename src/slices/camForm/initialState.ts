import {
  CamEighthFormSchemaValue,
  CamFifthFormSchemaValue,
  CamFirstFormSchemaValue,
  CamFourthFormSchemaValue,
  CamSecondFormSchemaValue,
  CamSeventhFormSchemaValue,
  CamSixthFormSchemaValue,
  CamThirdFormSchemaValue,
} from '../../validator/cam/types';

export interface CamPropsState {
  firstForm: CamFirstFormSchemaValue;
  secondForm: CamSecondFormSchemaValue;
  thirdForm: CamThirdFormSchemaValue;
  fourthForm: CamFourthFormSchemaValue;
  fifthForm: CamFifthFormSchemaValue;
  sixForm: CamSixthFormSchemaValue;
  sevenForm: CamSeventhFormSchemaValue;
  eightForm: CamEighthFormSchemaValue;
}

export const initialState: CamPropsState = {
  firstForm: {
    katOtwarciaZaworuPrzedDMP: '',
    katZamknieciaZaworuPoDMP: '',
    srednicaCylindra: '',
    srednicaWaluRozrzadu: '',
    promienPodstawowyKrzywki: '',
    skokZaworu: '',
    przelozenieDzwigienki: '',
    promienLukuWierzcholkowego: '',
  },
  secondForm: {
    skokKrzywki: '',
    promienLukuBocznego: '',
    polozenieSrodkaLukuWierzcholkowego: '',
    wspolrzednePunktuGranicznegoE: '',
    wspolrzedneSrodkaPromieniaLukuR: '',
    wspolrzednePunktuGranicznegoF: '',
    wartoscKataDBF: '',
  },
  thirdForm: {
    predkoscObrotowaSilnika: '',
    liczbaSuwowSilnika: '',
  },
  fourthForm: {
    najwiekszePrzyspieszenieDodatnie: '',
    przyspieszenieWPunkcieF: '',
    przyspieszenieNaWierzcholkuKrzywki: '',
    ilorazPrzyspieszen: '',
    wskaznikWypelnieniaPolaWzniosow: '',
    wskaznikWypelnieniaPolaWzniosowDane: [],
  },
  fifthForm: {
    luzZaworu: '',
    luzKonstrukcyjnyKrzywki: '',
    katDlaLiniiPrzejsciowejDelta: '',
  },
  sixForm: {
    katDlaLiniiPrzejsciowejEpsylon: '',
    promienR1DlaLiniiPrzejsciowej: '',
    promienR2DlaLiniiPrzejsciowej: '',
  },
  sevenForm: {
    srednicaTalerzykaPopychacza: '',
    przesuniecieOsiPopychacza: '',
    szerokoscKrzywki: '',
  },
  eightForm: {
    minimalnaSrednicaPopychacza: '',
  },
};
