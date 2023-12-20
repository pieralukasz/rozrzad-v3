import {
  ValveFirstFormSchemaValue,
  ValveSecondFormSchemaValue,
  ValveThirdFormSchemaValue,
} from '../../validator/valve/types';

export interface valvePropsState {
  firstForm: ValveFirstFormSchemaValue;
  secondForm: ValveSecondFormSchemaValue;
  thirdForm: ValveThirdFormSchemaValue;
}

export const initialState: valvePropsState = {
  firstForm: {
    srednicaTloka: '',
    skokTloka: '',
    predkoscObrotowaSilnika: '',
    sredniaPredkoscPrzeplywu: '',
    maksymalneNadcisnienieWCylindrze: '',
    srednicaTrzonkaZaworu: '10',
    liczbaZaworowNaCylinder: '',
    katPochyleniaPrzylgniZaworowej: '45',
  },
  secondForm: {
    srednicaKanalu: '',
    srednicaWewnetrznaPrzylgni: '',
    srednicaZewnetrznaPrzylgni: '',
    srednicaWewnetrznaGrzybkaZaworu: '',
    srednicaZewnetrznaGrzybkaZaworu: '',
    gruboscGrzybkaZaworu: '',
  },
  thirdForm: {
    wzniosZaworu: '',
    naprezeniaWGrzybkuZaworu: '',
    szerokoscPrzylgniZaworowej: '',
  },
};
