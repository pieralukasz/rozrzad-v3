export const saveJSONFileIntoFolder = async (
  name: string,
  content: {
    wzniosZaworu?: string;
    naprezeniaWGrzybkuZaworu?: string;
    szerokoscPrzylgniZaworowej?: string;
    srednicaKanalu?: string;
    srednicaWewnetrznaPrzylgni?: string;
    srednicaZewnetrznaPrzylgni?: string;
    srednicaWewnetrznaGrzybkaZaworu?: string;
    srednicaZewnetrznaGrzybkaZaworu?: string;
    gruboscGrzybkaZaworu?: string;
    srednicaTloka?: string;
    skokTloka?: string;
    predkoscObrotowaSilnika?: string;
    sredniaPredkoscPrzeplywu?: string;
    srednicaTrzonkaZaworu?: string;
    maksymalneNadcisnienieWCylindrze?: string;
    liczbaZaworowNaCylinder?: string | undefined;
    katPochyleniaPrzylgniZaworowej?: string;
    silaWObliczanejSprezynieS1?: string;
    silaWObliczanejSprezynieS2?: string;
    stalaDrugiejSprezyny?: string;
    liczbaSuwowSilnika?: string;
    procentObciazeniaObliczanejSprezyny?: string;
    srednicaZewnetrznaSprezynyZWarKonstr?: string;
    materialSprezyny?: string;
    napiecieSprezynyPrzyZamknietymZaworze?: string;
    napiecieSprezynyPrzyOtwartymZaworze?: string;
    stalaSprezyny?: string;
    stosunekSilSprezynyDoSilBezwlandWPktF?: string;
    stosunekSilSprezynyDoSilBezwlandWPktW?: string;
    przyspieszenieWPunkcieGranicznymF?: string;
    przyspieszenieNaWierzcholkuKrzywkiW?: string;
    polozenieSrodkaLukuWierzcholkowego?: string;
    pochyleniePromieniaRKrzywkiWPktF?: string;
    promienLukuWierzcholkowego?: string;
    promienPodstawowyKrzywki?: string;
    srednicaZewnetrznaStozkaZaworu?: string | undefined;
    skokZaworu?: string;
    masyZastepczeZredukowaneNaOsZaworu?: string;
    wspolczynnikDociskuZaworu?: string;
    przelozenieDzwigniZaworowej?: string;
    stosunekSilSprezynyDoSilBezwladnosci?: string;
    stosunekSilWSprezynie?: string;
  }
) => {
  try {
      console.log('content', content);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      const result = await window.electronAPI.saveJsonFile(content);

      console.log(result)
    if (!result.success) {
      console.error('Failed to save file.');
    }
  } catch (err) {
    console.error(err);
  }
};
