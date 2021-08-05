import React, { useEffect, useState } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  TextField
} from '@material-ui/core';

import { MedRecListContent } from './styles'
import { IAutoMedRec } from '../../../assets/FormAddClientConfig';
import { api } from '../../../service/api';
import { Autocomplete } from '@material-ui/lab';

interface IHistoric {
  id_historic: string,
  date_med_reg: string,
  time_med_reg: string,
  description: string,
  historicIsDeleted: string,
  FK_id_attendances: string
}

const MedRecList: React.FC = () => {

  const [patients, setPatients] = useState<IAutoMedRec[]>([])
  const [historic, setHistoric] = useState<IHistoric[]>([])

  const [fkId, setFkId] = useState<string | undefined>(" ");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // useEffect(() => {
  //   api.get('attendance', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
  //     }
  //   }).then(
  //     response => {
  //       setPatients(response.data)
  //     }
  //   ).catch(err => console.error(err))
  // }, [])

  // useEffect(() => {
  //   if (fkId !== " " || undefined) {
  //     setIsLoaded(false)
  //     api.get(`historic/${fkId}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
  //       }
  //     }).then(
  //       response => {
  //         setIsLoaded(true)
  //         setHistoric(response.data)
  //       }
  //     )
  //   }
  // }, [fkId])

  return (
    <MedRecListContent>
      <div id="box">
        <div className="item">
          <Autocomplete
            id="Patient-select"
            options={patients}
            fullWidth
            autoHighlight
            onChange={(e, value) => setFkId(value?.id)}
            getOptionLabel={(option) => option.client_name}
            groupBy={(option) => new Date(option.attendance_date).toLocaleDateString('pt-br')}
            renderInput={(params) => <TextField {...params} label="Selecione a consulta" variant="outlined" required />}
          />
        </div>
      </div>
      {isLoaded &&
        <div className="historic">
          <List className="item" subheader={<li />} style={{
            overflow: 'auto',
          }}>
            {historic.map((data: any, i: any) => (
              <li key={`section-${i}`} style={{ backgroundColor: 'inherit' }}>
                <ul style={{
                  backgroundColor: 'inherit',
                  padding: 0,
                }}>
                  <ListSubheader>{data.time_med_reg}</ListSubheader>
                  <ListItem key={data.time_med_reg}>
                    <ListItemText primary={data.description} />
                  </ListItem>
                </ul>
              </li>
            ))}
          </List>
        </div>}
    </MedRecListContent >
  );
}

export default MedRecList;