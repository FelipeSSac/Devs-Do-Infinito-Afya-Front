import React, { useEffect, useState } from 'react';

import { GridContent } from './styles';

import { DataGrid } from '@material-ui/data-grid';
import { columnsPatient, IPatientRow } from '../../../assets/DataGridConfig'

import { api } from '../../../service/api';

const PatientDataGrid: React.FC = () => {

  const [row, setRow] = useState<IPatientRow[]>([])

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true)
    api.get('patient').then(
      response => {
        const datas = response.data
        for (let i = 0; i < datas.length; i++) {
          datas[i].cpf = `${datas[i].cpf.substr(0, 3)}.${datas[i].cpf.substr(3, 3)}.${datas[i].cpf.substr(6, 2)}-${datas[i].cpf.substr(8, 3)}`;
        }
        setRow(datas)
      }
    ).catch(err => { console.log(err) }).finally(() => {
      setIsLoaded(false)
    })
  }, [])

  return (
    <GridContent>
      <section className="main-item">
        {isLoaded ?
          (
            <DataGrid className="grid" rows={row} columns={columnsPatient} pageSize={12} loading />
          ) : (
            <DataGrid className="grid" rows={row} columns={columnsPatient} pageSize={12} />
          )}

      </section>
    </GridContent>
  );
}

export default PatientDataGrid;