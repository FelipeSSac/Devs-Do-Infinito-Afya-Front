import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import { Button, CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { IAutoMedRec } from '../../../assets/FormAddClientConfig';
import { api } from '../../../service/api';

import { FormMRContent } from './styles';
import { toast } from 'react-toastify';

interface IMedRec {
  FK_id_attendances: string | undefined;
  description: string;
}

interface IData {
  attendance_time: string | undefined;
  attendance_date: string | undefined;
  attendance_value: string | undefined;
  attendance_status: string | undefined;
  FK_id_med_reg: string | undefined;
  FK_id_specialist: string | undefined;
  id_attendance: string | undefined;
}

const FormAddMedRecords: React.FC = () => {

  const [patients, setPatients] = useState<IAutoMedRec[]>([])
  const [formMedRec, setFormMedRec] = useState<IMedRec>({} as IMedRec)

  const [data, setData] = useState<IData>({} as IData)

  const [isLoaded, setIsLoaded] = useState<boolean>(false);


  // useEffect(() => {
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
  //       setPatients(datas)
  //     }
  //   ).catch(err => console.error(err))
  // }, [])

  // const medRecSubmit = useCallback(
  //   (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setIsLoaded(true)
  //     api.put('attendance', data, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
  //       }
  //     })
  //     api.post('historic', formMedRec, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
  //       }
  //     }).then(
  //       response => {
  //         toast.success('Sucesso no cadastro!')
  //       }
  //     ).catch(err => toast.error('Ooops algo deu errado, tente novamente mais tarde')).finally(() => setIsLoaded(false))
  //   }, [data, formMedRec])

  return (
    <FormMRContent>
      <form 
        // onSubmit={medRecSubmit}
      >
        <div id="box">
          <Autocomplete
            id="Patient-select"
            options={patients}
            fullWidth
            autoHighlight
            onChange={(e, value) => {
              setFormMedRec({ ...formMedRec, FK_id_attendances: value?.id })
              setData({
                ...data,
                attendance_time: value?.attendance_time,
                attendance_date: `${value?.attendance_date.split("/")[2]}-${value?.attendance_date.split("/")[1]}-${value?.attendance_date.split("/")[0]}`,
                attendance_value: value?.attendance_value,
                attendance_status: "REALIZADO",
                FK_id_specialist: value?.FK_id_specialist,
                FK_id_med_reg: value?.FK_id_med_reg,
                id_attendance: value?.id
              })
            }}
            getOptionLabel={(option) => option.client_name}
            groupBy={(option) => option.attendance_date}
            renderInput={(params) => <TextField {...params} label="Selecione a consulta (nome de paciente)" variant="outlined" required />}
          />
          <TextField
            id="outlined-textarea"
            className="row2"
            label="Adicionar ao Histórico do paciente"
            style={{ height: 270 }}
            onChange={e => setFormMedRec({ ...formMedRec, description: e.target.value })}
            multiline
            rowsMax={14}
            variant="outlined"
          />
          {isLoaded ? (
            <Button variant="contained" style={{ height: 55, width: 300 }} color="primary" disabled>
              <CircularProgress size="20px" />
            </Button>
          ) : (
            <Button variant="contained" style={{ height: 55, width: 300 }} color="primary" type="submit">Adicionar</Button>
          )}
        </div>
      </form>
    </FormMRContent>
  );
}

export default FormAddMedRecords;