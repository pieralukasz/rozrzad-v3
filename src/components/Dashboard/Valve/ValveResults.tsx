import React, { useEffect, useState } from 'react';
import { BaseFormControlType } from '../../../validator/types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import styled from 'styled-components';
import { checkIfRIsOk } from '../Cam/calculations';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

type ValveResultsProps = {
  results: BaseFormControlType[];
};

const ValveResults: React.FC<ValveResultsProps> = ({ results }) => {
  const camForm = useAppSelector(state => state.camForm);

  function createData(name: string, value: string, unit: string) {
    return { name, value, unit };
  }

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const initial: { name: string; value: string; unit: string }[] = [];

    results.map(item => {
      if (item.visible === false) {
        return;
      }

      const D = '[' + item.formHelperText.split('[')[0].trim() + ']';

      initial.push(
        createData(
          `${item.inputLabel} ${D}`,
          item.value as string,
          `[${item.formHelperText.split('[')[1]}`
        )
      );
    });

    setRows(initial);
  }, []);

  const exceptions = () => {};

  return (
    <TableContainerStyle component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>Nazwa</TableCellHeader>
            <TableCellHeader align="center">Wartość</TableCellHeader>
            <TableCellHeader align="center">Jednostka</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.name}>
              <TableCellBody component="th" scope="row">
                {row.name}
                {row.name === 'Szerokość przylgni zaworowej [Sp]' ? (
                  parseFloat(row.value) < 0.8 || parseFloat(row.value) > 2 ? (
                    <TableWrongData>
                      Wartość musi być zgodna z PN-62/S-36506 (0.8 - 2){' '}
                    </TableWrongData>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                {row.name === 'Promień łuku bocznego [R]' ? (
                  checkIfRIsOk(
                    parseFloat(camForm.secondForm.promienLukuBocznego),
                    parseFloat(camForm.secondForm.skokKrzywki)
                  ) ? (
                    <TableWrongData>
                      Wartość musi być zgodna z R = (10 - 18)Hk
                    </TableWrongData>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
              </TableCellBody>
              <TableCellBody align="center">
                {row.value ? row.value : '---'}
              </TableCellBody>
              <TableCellBody align="center">{row.unit}</TableCellBody>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerStyle>
  );
};

const TableContainerStyle = styled(Paper)`
  width: 60% !important;
  background-color: #626654 !important;
  color: black !important;
`;

const TableCellHeader = styled(TableCell)`
  font-weight: bold !important;
  border-bottom: 2px solid white !important;
  padding: 8px !important;
`;

const TableCellBody = styled(TableCell)`
  font-weight: bold !important;
  padding: 6px 8px !important;
`;

const TableWrongData = styled.div`
  color: #e27272 !important;
`;

export default ValveResults;
