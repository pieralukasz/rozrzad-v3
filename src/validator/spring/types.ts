export type SpringFirstFormSchemaValue = {
  przyspieszenieWPunkcieGranicznymF: string;
  przyspieszenieNaWierzcholkuKrzywkiW: string;
  polozenieSrodkaLukuWierzcholkowego: string;
  pochyleniePromieniaRKrzywkiWPktF: string;
  promienLukuWierzcholkowego: string;
  promienPodstawowyKrzywki: string;
  srednicaZewnetrznaStozkaZaworu?: string;
  skokZaworu: string;
  masyZastepczeZredukowaneNaOsZaworu: string;
  wspolczynnikDociskuZaworu: string;
  przelozenieDzwigniZaworowej: string;
  stosunekSilSprezynyDoSilBezwladnosci: string;
  stosunekSilWSprezynie: string;
};

export type SpringSecondFormSchemaValue = {
  napiecieSprezynyPrzyZamknietymZaworze: string;
  napiecieSprezynyPrzyOtwartymZaworze: string;
  stalaSprezyny: string;
  stosunekSilSprezynyDoSilBezwlandWPktF: string;
  stosunekSilSprezynyDoSilBezwlandWPktW: string;
};

export type SpringThirdFormSchemaValue = {
  predkoscObrotowaSilnika: string;
  liczbaSuwowSilnika: string;
  procentObciazeniaObliczanejSprezyny: string;
  srednicaZewnetrznaSprezynyZWarKonstr: string;
  wytrzymaloscMaterialu: string;
  materialSprezyny: string;
};

export type SpringFourthFormSchemaValue = {
  silaWObliczanejSprezynieS1: string;
  silaWObliczanejSprezynieS2: string;
  stalaDrugiejSprezyny: string;
};

export type SpringFormSchemaValue = SpringFirstFormSchemaValue &
  SpringSecondFormSchemaValue &
  SpringThirdFormSchemaValue &
  SpringFourthFormSchemaValue;

export type SpringFormSchemaType =
  | SpringFirstFormSchemaValue
  | SpringSecondFormSchemaValue
  | SpringThirdFormSchemaValue
  | SpringFourthFormSchemaValue
  | SpringFormSchemaValue;
