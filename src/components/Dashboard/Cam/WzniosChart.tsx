import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Scatter } from 'react-chartjs-2';
import {Button} from "@material-ui/core";
import {saveWzniosResults} from "../../../utils/saveWzniosResults";

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Wskaźnik wypełnienia pola wzniosów',
    },
  },
  scales: {
    x: {
      min: 10,
      max: 180,
    },
  },
};

type PoleWzniosuChartProps = {
  points: any;
};

const PoleWzniosuChart: React.FC<PoleWzniosuChartProps> = ({ points }) => {

  const data = useMemo(
    () => ({
      datasets: [
        {
          type: 'line',
          fill: true,
          label: 'h',
          data: points[0],
          interaction: {
            intersect: false,
          },
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.3,
        },
        {
          type: 'line',
          fill: false,
          label: 'w',
          data: points[1],
          interaction: {
            intersect: false,
          },
          borderColor: 'rgb(144,235,53)',
          backgroundColor: 'rgba(144,235,53,0.69)',
          tension: 0.3,
        },
        {
          type: 'line',
          fill: true,
          label: 'a',
          data: points[2],
          interaction: {
            intersect: false,
          },
          borderColor: 'rgb(235,53,53)',
          backgroundColor: 'rgba(235,53,53,0.72)',
          tension: 0.3,
        },
      ],
    }),
    []
  );

  const reducedPoints = useMemo(() => {
    return {
      h: points[0].filter((_: any, i: number) => i % 2 === 0),
      v: points[1].filter((_: any, i: number) => i % 2 === 0),
      a: points[2].filter((_: any, i: number) => i % 2 === 0),
    }
  }, [points])



  return (
    <ChartView>
      <Scatter style={{ padding: 12 }} options={options} data={data as any} />
      <ButtonCon>
        <Button variant="contained" onClick={() => saveWzniosResults("wznios-zaworu", reducedPoints)}>
          Pobierz wyniki
        </Button>
      </ButtonCon>

    </ChartView>
  );
};

export default PoleWzniosuChart;

const ChartView = styled('div')`
  height: 100%;
  width: 60% !important;
  margin-top: 20px;
  margin-bottom: 100px;
  background-color: white;
  border-radius: 4px;
`;

const ButtonCon = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
