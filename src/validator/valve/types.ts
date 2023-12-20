export type ValveFirstFormSchemaValue = {
  srednicaTloka: string;
  skokTloka: string;
  predkoscObrotowaSilnika: string;
  sredniaPredkoscPrzeplywu: string;
  srednicaTrzonkaZaworu: string;
  maksymalneNadcisnienieWCylindrze: string;
  liczbaZaworowNaCylinder?: string;
  katPochyleniaPrzylgniZaworowej: string;
};

export type ValveSecondFormSchemaValue = {
  srednicaKanalu: string;
  srednicaWewnetrznaPrzylgni: string;
  srednicaZewnetrznaPrzylgni: string;
  srednicaWewnetrznaGrzybkaZaworu: string;
  srednicaZewnetrznaGrzybkaZaworu: string;
  gruboscGrzybkaZaworu: string;
};

export type ValveThirdFormSchemaValue = {
  wzniosZaworu: string;
  naprezeniaWGrzybkuZaworu: string;
  szerokoscPrzylgniZaworowej: string;
};

export type ValveFormSchemaValue = ValveFirstFormSchemaValue &
  ValveSecondFormSchemaValue &
  ValveThirdFormSchemaValue;

export type ValveFormSchemaType =
  | ValveFirstFormSchemaValue
  | ValveSecondFormSchemaValue
  | ValveThirdFormSchemaValue
  | ValveFormSchemaValue;
