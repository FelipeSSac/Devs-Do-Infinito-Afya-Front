import React, { useCallback, useEffect, useState } from 'react';

import { GridContent } from './styles';

import { DataGrid, GridRowParams } from '@material-ui/data-grid';
import { columnsCo, columnsMain, IMainRow } from '../../assets/DataGridConfig';
import { Close } from '@material-ui/icons';
import { ClickAwayListener, Fab } from '@material-ui/core';

// import { api } from '../../service/api';
// import { toast } from 'react-toastify';

interface ISelectedData {
  attendance_time: string;
  attendance_date: string;
  attendance_value: string;
  attendance_status: string;
  FK_id_med_reg: string;
  FK_id_specialist: string;
  id_attendance: string;
}

const MainDataGrid: React.FC = () => {

  const [rowA, setRowA] = useState<IMainRow[]>([])
  const [rowB, setRowB] = useState<IMainRow[]>([])

  const [data, setData] = useState<ISelectedData>({} as ISelectedData)

  const [isLoadedMain, setIsLoadedMain] = useState<boolean>(false);
  const [isLoadedCo, setIsLoadedCo] = useState<boolean>(false);

  const [isSelected, setIsSelected] = useState<boolean>(false);

  // useEffect(() => {
  //   const today = new Date();
  //   const now = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-')
  //   setIsLoadedMain(true)
  //   api.get(`reports/attendanceDate/${now}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
  //     }
  //   }).then(
  //     response => {
  //       const datas = response.data
  //       for (let i = 0; i < datas.length; i++) {
  //         datas[i].id = datas[i].id_attendance
  //         datas[i].attendance_time = (new Date(datas[i].attendance_date).toLocaleTimeString('pt-BR')).slice(0, 5)
  //         datas[i].attendance_date = new Date(datas[i].attendance_date).toLocaleDateString('pt-BR')
  //       }
  //       setRowA(datas)
  //     }
  //   ).catch(err => { console.log(err) }).finally(() => {
  //     setIsLoadedMain(false)
  //   })
  //   setIsLoadedCo(true)
  //   api.get('attendance', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
  //     }
  //   }).then(
  //     response => {
  //       const datas = response.data
  //       for (let i = 0; i < datas.length; i++) {
  //         datas[i].attendance_time = (new Date(datas[i].attendance_date).toLocaleTimeString('pt-BR')).slice(0, 5)
  //         datas[i].attendance_date = new Date(datas[i].attendance_date).toLocaleDateString('pt-BR')
  //       }
  //       setRowB(datas)
  //     }
  //   ).catch(err => { console.log(err) }).finally(() => {
  //     setIsLoadedCo(false)
  //   })
  // }, [])

  // const handleCancel = useCallback(
  //   (e: React.MouseEvent<HTMLElement>) => {
  //     e.preventDefault();
  //     api.put('attendance', data, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
  //       }
  //     }).then(
  //       response => {
  //         toast.info('Consulta cancelada com sucesso!')
  //       }
  //     ).catch(err => toast.error('Ooops, algo deu errado!'))
  //   }, [data])

  return (
    <ClickAwayListener onClickAway={() => setIsSelected(false)}>
      <GridContent>
        {isSelected &&
          <Fab variant="extended" color="primary"
            // onClick={handleCancel}
            style={{
              color: '#fff',
              position: 'fixed',
              bottom: 40,
              left: 40,
            }}>
            <Close />
            Cancelar agendamento
          </Fab>}
        <section className="main-item">
          <h2>Agendamentos do dia</h2>
          <div>
            {isLoadedMain ? (
              <DataGrid className="grid" rows={rowA} columns={columnsMain} loading />
            ) : (
              <DataGrid className="grid" rows={rowA} columns={columnsMain} pageSize={14} disableMultipleSelection
                getRowClassName={(params: GridRowParams) => `value-${params.getValue(params.id, 'attendance_status')}`}
                onRowSelected={(value) => {
                  if (value.data.attendance_status === "Agendado") {
                    setIsSelected(value.isSelected)
                    console.log(value.data)
                    setData({
                      ...data,
                      attendance_time: value.data.attendance_time,
                      attendance_date: `${value.data.attendance_date.split("/")[2]}-${value.data.attendance_date.split("/")[1]}-${value.data.attendance_date.split("/")[0]}`,
                      attendance_value: value.data.attendance_value,
                      id_attendance: value.data.id,
                      attendance_status: "CANCELADO",
                      FK_id_specialist: value.data.FK_id_specialist,
                      FK_id_med_reg: value.data.FK_id_med_reg,
                    })
                  } else {
                    setIsSelected(false)
                  }
                }}
              />
            )}
          </div>
        </section>
        <section className="co-item">
          <h2>Todos agendamentos</h2>
          <div>
            {isLoadedCo ? (
              <DataGrid className="grid" rows={rowB} columns={columnsCo} loading />
            ) : (
              <DataGrid className="grid" rows={rowB} columns={columnsCo} pageSize={14}
                getRowClassName={(params: GridRowParams) => `value-${params.getValue(params.id, 'attendance_status')}`}
                onRowSelected={(value) => {
                  if (value.data.attendance_status === "Agendado") {
                    setIsSelected(value.isSelected)
                    setData({
                      ...data,
                      attendance_time: value.data.attendance_time,
                      attendance_date: `${value.data.attendance_date.split("/")[2]}-${value.data.attendance_date.split("/")[1]}-${value.data.attendance_date.split("/")[0]}`,
                      attendance_value: value.data.attendance_value,
                      id_attendance: value.data.id,
                      attendance_status: "CANCELADO",
                      FK_id_specialist: value.data.FK_id_specialist,
                      FK_id_med_reg: value.data.FK_id_med_reg,
                    })
                  } else {
                    setIsSelected(false)
                  }
                }}
              />
            )}
          </div>
        </section>
      </GridContent >
    </ClickAwayListener>

  );
}

export default MainDataGrid;