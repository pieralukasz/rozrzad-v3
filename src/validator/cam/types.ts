export type CamFirstFormSchemaValue = {
  katOtwarciaZaworuPrzedDMP: string;
  katZamknieciaZaworuPoDMP: string;
  srednicaCylindra: string;
  srednicaWaluRozrzadu: string;
  promienPodstawowyKrzywki: string;
  skokZaworu: string;
  przelozenieDzwigienki: string;
  promienLukuWierzcholkowego: string;
};

export type CamSecondFormSchemaValue = {
  skokKrzywki: string;
  promienLukuBocznego: string;
  polozenieSrodkaLukuWierzcholkowego: string;
  wspolrzednePunktuGranicznegoE: string;
  wspolrzedneSrodkaPromieniaLukuR: string;
  wspolrzednePunktuGranicznegoF: string;
  wartoscKataDBF: string;
};

export type CamThirdFormSchemaValue = {
  predkoscObrotowaSilnika: string;
  liczbaSuwowSilnika: string;
};

export type CamFourthFormSchemaValue = {
  najwiekszePrzyspieszenieDodatnie: string;
  przyspieszenieWPunkcieF: string;
  przyspieszenieNaWierzcholkuKrzywki: string;
  ilorazPrzyspieszen: string;
  wskaznikWypelnieniaPolaWzniosow: string;
  wskaznikWypelnieniaPolaWzniosowDane: any[];
};

export type CamFifthFormSchemaValue = {
  luzZaworu: string;
  luzKonstrukcyjnyKrzywki: string;
  katDlaLiniiPrzejsciowejDelta: string;
};

export type CamSixthFormSchemaValue = {
  katDlaLiniiPrzejsciowejEpsylon: string;
  promienR1DlaLiniiPrzejsciowej: string;
  promienR2DlaLiniiPrzejsciowej: string;
};

export type CamSeventhFormSchemaValue = {
  srednicaTalerzykaPopychacza: string;
  przesuniecieOsiPopychacza: string;
  szerokoscKrzywki: string;
};

export type CamEighthFormSchemaValue = {
  minimalnaSrednicaPopychacza: string;
};

export type CamFormSchemaValue = CamFirstFormSchemaValue &
  CamSecondFormSchemaValue &
  CamThirdFormSchemaValue &
  CamFourthFormSchemaValue &
  CamFifthFormSchemaValue &
  CamSixthFormSchemaValue &
  CamSeventhFormSchemaValue &
  CamEighthFormSchemaValue;

export type CamFormSchemaType =
  | CamFirstFormSchemaValue
  | CamSecondFormSchemaValue
  | CamThirdFormSchemaValue
  | CamFourthFormSchemaValue
  | CamFifthFormSchemaValue
  | CamSixthFormSchemaValue
  | CamSeventhFormSchemaValue
  | CamEighthFormSchemaValue
  | CamFormSchemaValue;
