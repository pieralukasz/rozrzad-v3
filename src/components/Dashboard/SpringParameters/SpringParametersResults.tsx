import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import styled from 'styled-components';
import springParameters from '../../../utils/springParameters';

const Rm = 1570;

const SpringParametersResults: React.FC = () => {
  const springForm = useAppSelector(state => state.springForm);
  const [parameters, setParameters] = useState([]);

  const getGohner = useCallback((dd: number) => {
    const thresholds = [
      0.08,
      0.09,
      0.1,
      0.11,
      0.12,
      0.13,
      0.14,
      0.15,
      0.16,
      0.17,
      0.18,
      0.19,
      0.2,
      0.21,
      0.22,
      0.23,
      0.24,
      0.25,
      0.26,
      0.27,
      0.28,
      0.29,
      0.3,
      0.31,
      0.32,
      0.33,
      0.34,
      0.35,
    ];
    const values = [
      1.092,
      1.106,
      1.12,
      1.135,
      1.149,
      1.164,
      1.179,
      1.195,
      1.211,
      1.227,
      1.243,
      1.26,
      1.277,
      1.294,
      1.311,
      1.328,
      1.345,
      1.363,
      1.381,
      1.399,
      1.418,
      1.437,
      1.456,
      1.475,
      1.495,
      1.515,
      1.535,
      1.555,
    ];

    for (let i = 0; i < thresholds.length; i++) {
      if (dd <= thresholds[i]) {
        return values[i];
      }
    }
    return 1.555; // wartość domyślna dla wartości większych niż 0.35
  }, []);

  const calculateTau2 = useCallback(
    (gohner: number, D: number, S2: number, d: number) => {
      return Math.abs((gohner * 2.55 * D * S2) / Math.pow(d, 3));
    },
    []
  );

  const calculateDd = useCallback((D: number, d: number) => {
    return Math.round((d / D) * 1000) / 1000;
  }, []);

  const calculatenm = useCallback((tau: number) => {
    return (0.58 * Rm) / tau;
  }, []);

  const calculateC = useCallback((s1: number, s2: number, Hzd: number) => {
    return Math.round(((s2 - s1) / Hzd) * 10) / 10;
  }, []);

  const calculateIcz = useCallback((d: number, c: number, D: number) => {
    const icz = (81500 * Math.pow(d, 4)) / (8 * c * Math.pow(D, 3));
    const r = icz % 0.5;

    if (r < 0.5) {
      return icz - r;
    } else {
      return icz + r;
    }
  }, []);

  const calculateL1 = useCallback((d: number, icz: number, Hzd: number) => {
    return (
      Math.ceil(((icz + 1.5) * d + (icz + 0.5) * (d * 0.3) + Hzd) * 10) / 10
    );
  }, []);

  const calculateL0 = useCallback((L1: number, S1: number, c: number) => {
    return L1 + S1 / c;
  }, []);

  const calculateS3orT3 = useCallback(
    (S2orT2: number, Lo: number, L2: number, L3: number) => {
      return (S2orT2 * (Lo - L3)) / (Lo - L2);
    },
    []
  );

  const calculateLd = useCallback((D: number, icz: number) => {
    return Math.PI * D * (icz + 2.5);
  }, []);

  const calculateMasaSprezyny = useCallback(
    (dlugoscLd: number, D: number, d: number) => {
      return (
        (dlugoscLd - Math.PI * D) * (Math.PI / 4) * d * d * 7850 * 0.000000001
      );
    },
    []
  );

  const calculateNs = useCallback((d: number, icz: number, D: number) => {
    return (
      ((d / 2) *
        Math.PI *
        icz *
        D *
        D *
        Math.sqrt((81500 * 1000000) / (2 * 7850))) /
      100000
    );
  }, []);

  const calculateNr = useCallback((predkoscObrotowaSilnika: number) => {
    return predkoscObrotowaSilnika / 120;
  }, []);

  const calculateWytrzymaloscSprezynowa = useCallback(
    (dlugoscLd: number, D: number, d: number) => {
      return (
        (dlugoscLd - Math.PI * D) * (Math.PI / 4) * d * d * 7850 * 0.000000001
      );
    },
    []
  );

  const prepareAllParameters = () => {
    const ar = [];

    const {
      przyspieszenieNaWierzcholkuKrzywkiW,
      masyZastepczeZredukowaneNaOsZaworu,
      przelozenieDzwigniZaworowej,
      promienLukuWierzcholkowego,
      stosunekSilWSprezynie,
      skokZaworu,
    } = springForm.firstForm;

    const {
      predkoscObrotowaSilnika,
      materialSprezyny,
      wytrzymaloscMaterialu,
    } = springForm.thirdForm;

    const dD = 3.5 / 37;

    const Pm =
      Math.round(
        +przyspieszenieNaWierzcholkuKrzywkiW *
          +masyZastepczeZredukowaneNaOsZaworu *
          +przelozenieDzwigniZaworowej *
          1000
      ) / 1000;

    let Dd = calculateDd(
      +springForm.thirdForm.srednicaZewnetrznaSprezynyZWarKonstr,
      +promienLukuWierzcholkowego
    );

    let count = 0;

    while (Dd <= 0.35) {
      const obj: any = {};
      springParameters.map(item => {
        obj[item.value] = '';
      });

      const srednicaPodzialowa =
        Number(springForm.thirdForm.srednicaZewnetrznaSprezynyZWarKonstr) -
        (count + 1);

      const omega =
        (2 * Math.PI * +springForm.thirdForm.predkoscObrotowaSilnika) / 60;

      const nr =
        +springForm.thirdForm.liczbaSuwowSilnika === 4 ? omega / 2 : omega;

      // stałe wartości`
      obj.srednicaDrutu = String(Number(promienLukuWierzcholkowego).toFixed(3));
      obj.srednicaPodzialowa = srednicaPodzialowa.toFixed(3);
      obj.silaS2 = Math.abs(
        +Number(springForm.fourthForm.silaWObliczanejSprezynieS2).toFixed(3)
      );

      obj.dD = calculateDd(
        +srednicaPodzialowa,
        +promienLukuWierzcholkowego
      ).toFixed(3);

      obj.silaS1 = Math.abs(
        +(
          +springForm.secondForm.napiecieSprezynyPrzyOtwartymZaworze /
          (+stosunekSilWSprezynie + (Math.random() * 3) / 10)
        ).toFixed(3)
      );

      const tau2 = calculateTau2(
        getGohner(+obj.dD),
        srednicaPodzialowa,
        +springForm.secondForm.napiecieSprezynyPrzyOtwartymZaworze,
        +promienLukuWierzcholkowego
      );

      obj.wspolczynniknm2 = calculatenm(tau2).toFixed(3);

      obj.stalaSprezyny = calculateC(+obj.silaS1, +obj.silaS2, +skokZaworu);

      obj.liczbaZwojowCzynnych = calculateIcz(
        +obj.srednicaDrutu,
        +obj.stalaSprezyny,
        +obj.srednicaPodzialowa
      );

      obj.dlugoscL1 = calculateL1(
        +obj.liczbaZwojowCzynnych,
        +obj.srednicaDrutu,
        +skokZaworu
      );

      obj.dlugoscLo = calculateL0(
        +obj.dlugoscL1,
        +obj.silaS1,
        +obj.stalaSprezyny
      ).toFixed(2);

      obj.dlugoscL2 = (+obj.dlugoscL1 - +skokZaworu).toFixed(2);

      obj.dlugoscL3 = (
        (+obj.liczbaZwojowCzynnych + 1.5) *
        +obj.srednicaDrutu
      ).toFixed(2);

      obj.silaS3 = calculateS3orT3(
        +obj.silaS2,
        +obj.dlugoscLo,
        +obj.dlugoscL2,
        +obj.dlugoscL3
      ).toFixed(3);

      obj.wspolczynniknm3 = calculatenm(
        calculateS3orT3(tau2, +obj.dlugoscLo, +obj.dlugoscL2, +obj.dlugoscL3)
      ).toFixed(3);

      obj.dlugoscLd = calculateLd(
        +obj.srednicaPodzialowa,
        +obj.liczbaZwojowCzynnych
      ).toFixed(3);

      obj.masaSprezyny = calculateMasaSprezyny(
        +obj.dlugoscLd,
        +obj.srednicaPodzialowa,
        +promienLukuWierzcholkowego
      ).toFixed(3);

      obj.czestotliwoscDrgan = calculateNs(
        +promienLukuWierzcholkowego,
        obj.liczbaZwojowCzynnych,
        +obj.srednicaPodzialowa
      ).toFixed(3);

      const nR = calculateNr(+predkoscObrotowaSilnika);

      obj.ksr = (obj.czestotliwoscDrgan / nR).toFixed(3);

      const naprężenieMinimalne =
        tau2 *
        (+obj.silaS1 /
          +springForm.secondForm.napiecieSprezynyPrzyOtwartymZaworze);

      const naprężenieŚrednie = (tau2 + naprężenieMinimalne) / 2;

      let amplitudaNaprezenia = 0;

      const tau3 = calculateS3orT3(
        +tau2,
        +obj.dlugoscLo,
        +obj.dlugoscL2,
        +obj.dlugoscL3
      );

      amplitudaNaprezenia = (tau2 - naprężenieMinimalne) / 2;

      const Zgo = 0.45 * +wytrzymaloscMaterialu;
      const Zso = 0.6 * Zgo;
      const Zsj = 1.1 * Zgo;

      const ak = 1.1 + 1.2 * (Dd - 0.06667);

      const gamma = 1;

      let betaP =
        materialSprezyny === '1'
          ? 1
          : materialSprezyny === '2'
          ? 1.1
          : materialSprezyny === '3'
          ? 1.5
          : 1.7;

      const beta = ak * betaP;

      const top = Zso + 2 * naprężenieŚrednie * 0.46;
      const bottom = beta * amplitudaNaprezenia + naprężenieŚrednie;

      const xs = (((top / bottom) * 1000) / 1000).toFixed(3);

      obj.wspolczynnikxs = xs;

      ar.push(obj);
      count++;
      Dd = +obj.dD;
    }

    setParameters(ar as any);
  };

  useEffect(() => {
    prepareAllParameters();
    console.log(springParameters);
  }, []);

  return (
    <>
      {parameters.map((value, count) => (
        <ParameterContainer
          key={count}
          style={{ marginLeft: count === 0 ? 300 : 30 }}
        >
          {springParameters.map((item, index) => (
            <ParameterItem key={`${count}_${item.value}`}>
              <span>{value[item.value] !== '' ? value[item.value] : '-'}</span>
            </ParameterItem>
          ))}
        </ParameterContainer>
      ))}
    </>
  );
};

export default SpringParametersResults;

const ParameterContainer = styled.ul`
  min-width: 150px;
  height: calc(70% + 50px);
  border: 2px solid white;
  list-style: none;
  padding: 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:first-child {
    margin-left: 300px;
  }
`;

const ParameterItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;
