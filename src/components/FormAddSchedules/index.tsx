import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import { IProfessional, IPatient } from '../../assets/FormAddClientConfig';

import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@material-ui/core';

import { api } from '../../service/api';

import { FormAddSchedulesContent } from './styles';
import { Autocomplete } from '@material-ui/lab';
// import { toast } from 'react-toastify';

interface ISchedule {
  attendance_date: string;
  attendance_time: string;
  attendance_value: string;
  FK_id_med_reg: string | undefined;
  FK_id_specialist: string | undefined;
}

const FormAddSchedules: React.FC = () => {

  const [formSchedule, setFormSchedule] = useState<ISchedule>({} as ISchedule)

  const [professionals, setProfessionals] = useState<IProfessional[]>([])

  const [patients, setPatients] = useState<IPatient[]>([])

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    api.get('specialist').then(
      response => {
        setProfessionals(response.data)
      }
    ).catch(err => console.error(err))
    api.get('patient').then(
      response => {
        setPatients(response.data)
      }
    ).catch(err => console.error(err))
  }, [])

  const ScheduleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.debug(formSchedule);
      // setIsLoaded(true)
      // api.post('attendance', formSchedule, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
      //   }
      // }).then(
      //   response => {
      //     toast.success('Sucesso no cadastro!')
      //   }
      // ).catch(err => console.log(err.response)).finally(() => {
      //   setIsLoaded(false)
      // })
    }, [formSchedule])

  return (
    <FormAddSchedulesContent>
      <h2>Agendar Consulta</h2>
      <form onSubmit={ScheduleSubmit}>
        <div id="box">
          <Autocomplete
            id="Patient-select"
            options={patients}
            autoHighlight
            style={{ height: 55 }}
            onChange={(e, value) => setFormSchedule({ ...formSchedule, FK_id_med_reg: value?.id })}
            renderOption={(option) => (
              <React.Fragment>
                {option.name} ({option.cpf.substr(0, 3)}.{option.cpf.substr(3, 3)}.{option.cpf.substr(6, 2)}-{option.cpf.substr(8, 3)})
              </React.Fragment>
            )}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Selecione o paciente" variant="outlined" required />}
          />
          <Autocomplete
            id="Pro-select"
            options={professionals}
            autoHighlight
            style={{ height: 55 }}
            groupBy={(option) => option.id_profession}
            onChange={(e, value) => setFormSchedule({ ...formSchedule, FK_id_specialist: value?.id })}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Selecione o Especialista" variant="outlined" required />}
          />
          <TextField
            id="date"
            label="Data"
            type="date"
            className="row2"
            variant="outlined"
            onChange={e => setFormSchedule({ ...formSchedule, attendance_date: e.target.value })}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="time"
            label="Horário"
            type="time"
            className="row2"
            variant="outlined"
            onChange={e => setFormSchedule({ ...formSchedule, attendance_time: e.target.value })}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl variant="outlined" className="row2" required>
            <InputLabel htmlFor="outlined-adornment-amount">Valor da consulta</InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-amount"
              onChange={e => setFormSchedule({ ...formSchedule, attendance_value: e.target.value })}
              style={{ width: '100%' }}
              inputProps={{ min: 0 }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={140}
            />
          </FormControl>

          <div className="row3">
            {isLoaded ? (
              <Button variant="contained" style={{ height: 55, width: 300 }} color="primary">
                <CircularProgress size="20px" />
              </Button>
            ) : (
              <Button variant="contained" style={{ height: 55, width: 300 }} color="primary" type="submit">Cadastrar Consulta</Button>
            )}
          </div>
        </div>
      </form>
    </FormAddSchedulesContent >
  );

}

export default FormAddSchedules;