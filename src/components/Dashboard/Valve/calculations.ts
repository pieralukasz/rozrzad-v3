import {
  ValveFirstFormSchemaValue,
  ValveSecondFormSchemaValue,
} from '../../../validator/valve/types';

export const calculatePolePrzekrojuPoprzecznego = (
  firstFormSchema: ValveFirstFormSchemaValue
): number => {
  const {
    skokTloka,
    predkoscObrotowaSilnika,
    srednicaTloka,
    sredniaPredkoscPrzeplywu,
    liczbaZaworowNaCylinder,
  } = firstFormSchema;

  // średnia prędkość tłoka
  const csr = (2 * (+skokTloka * +predkoscObrotowaSilnika)) / 60000;

  const promienTloka = parseFloat(srednicaTloka) / 2;

  // najmniejsze pole przekroju poprzecznego kanalu
  // f = (r * r * pi * csr) / (wsr / n)
  return (
    (Math.pow(promienTloka, 2) * Math.PI * csr) /
    parseFloat(sredniaPredkoscPrzeplywu) /
    parseFloat(liczbaZaworowNaCylinder as string)
  );
};

export const calculateSrednicaKanalu = (
  firstFormSchema: ValveFirstFormSchemaValue
): number | string => {
  const { srednicaTrzonkaZaworu } = firstFormSchema;

  const f = calculatePolePrzekrojuPoprzecznego(firstFormSchema);

  // średnica kanału
  const Dk = Math.round(
    Math.sqrt(
      (4 * f) / Math.PI + Math.pow(parseFloat(srednicaTrzonkaZaworu), 2)
    )
  );

  return Dk.toString();
};

export const calculateNaprezeniaWGrzybkuZaworu = (
  firstFormSchema: ValveFirstFormSchemaValue,
  secondFormSchema: ValveSecondFormSchemaValue,
  whichOne: string
): string => {
  const { maksymalneNadcisnienieWCylindrze } = firstFormSchema;

  const {
    srednicaWewnetrznaPrzylgni,
    srednicaZewnetrznaPrzylgni,
    gruboscGrzybkaZaworu,
  } = secondFormSchema;

  // sredni promien podparcia zaworu
  const r =
    (parseFloat(srednicaWewnetrznaPrzylgni) +
      parseFloat(srednicaZewnetrznaPrzylgni)) /
    4;

  // obliczeniowa grubosc grzybka
  const ogg = 1.3 * parseFloat(gruboscGrzybkaZaworu);

  const cal = r / ogg;

  const sigma = cal * cal * parseFloat(maksymalneNadcisnienieWCylindrze);

  return sigma.toString();
};

export const calculateSzerokoscPrzylgniZaworowej = (
  firstFormSchema: ValveFirstFormSchemaValue,
  secondFormSchema: ValveSecondFormSchemaValue
) => {
  const { katPochyleniaPrzylgniZaworowej } = firstFormSchema;

  const {
    srednicaWewnetrznaPrzylgni,
    srednicaZewnetrznaPrzylgni,
  } = secondFormSchema;

  const s =
    (parseFloat(srednicaZewnetrznaPrzylgni) -
      parseFloat(srednicaWewnetrznaPrzylgni)) /
    (2 *
      Math.sin((parseFloat(katPochyleniaPrzylgniZaworowej) * Math.PI) / 180));

  return s.toString();
};

export const calculateDelta = (
  Da: number,
  f: number,
  alpha: number
): number => {
  let result: number;

  switch (alpha) {
    case 45:
      const delta45 = Math.pow(2.22 * Da, 2) + 44 * f;
      result = Math.round(((Math.sqrt(delta45) - 2.22 * Da) / 22) * 10) / 10;
      break;
    case 60:
      const delta60 = Math.pow(2.72 * Da, 2) + 4.71104 * f;
      result =
        Math.round(((Math.sqrt(delta60) - 2.72 * Da) / 2.35552) * 10) / 10;
      break;
    default:
      result = 0;
      break;
  }

  return result;
};

export const calculateWhenMore = (
  Da: number,
  Dc: number,
  f: number,
  alpha: number
) => {
  const l = (2 * f) / (Math.PI * (Da + Dc));

  let result: number;
  let difference = Dc - Da;

  console.log(alpha);

  const getAwkwardFormula = (value: number) => {
    return (
      Math.round(
        difference / value +
          Math.sqrt(Math.pow(l, 2) - Math.pow(difference / 2, 2)) * 10
      ) / 10
    );
  };

  switch (alpha) {
    case 45:
      result = getAwkwardFormula(5);
      break;
    case 60:
      result = getAwkwardFormula(3.464);
      break;
    default:
      result = 0;
      break;
  }

  return result + 1;
};

export const calculateWzniosZaworu = (
  firstFormSchema: ValveFirstFormSchemaValue,
  secondFormSchema: ValveSecondFormSchemaValue
): string => {
  const { katPochyleniaPrzylgniZaworowej } = firstFormSchema;
  const {
    // Dc
    srednicaZewnetrznaPrzylgni,
    // Da
    srednicaWewnetrznaGrzybkaZaworu,
  } = secondFormSchema;

  const f =
    Math.round(calculatePolePrzekrojuPoprzecznego(firstFormSchema) * 10) / 10;

  // wznios zaworu graniczny

  console.log(f);

  let hgr: number;
  //
  switch (katPochyleniaPrzylgniZaworowej) {
    case '45':
      hgr =
        Math.round(
          (parseFloat(srednicaZewnetrznaPrzylgni) -
            parseFloat(srednicaWewnetrznaGrzybkaZaworu)) *
            10
        ) / 10;
      break;
    case '60':
      hgr =
        Math.round(
          ((parseFloat(srednicaZewnetrznaPrzylgni) -
            parseFloat(srednicaWewnetrznaGrzybkaZaworu)) /
            0.866) *
            10
        ) / 10;
      break;
    default:
      hgr = 0;
      break;
  }

  const x = calculateDelta(
    parseFloat(srednicaWewnetrznaGrzybkaZaworu),
    f,
    parseFloat(katPochyleniaPrzylgniZaworowej)
  );

  const result =
    x > hgr
      ? calculateWhenMore(
          parseFloat(srednicaZewnetrznaPrzylgni),
          parseFloat(srednicaWewnetrznaGrzybkaZaworu),
          f,
          parseInt(katPochyleniaPrzylgniZaworowej)
        )
      : x;

  return result.toString();
};
