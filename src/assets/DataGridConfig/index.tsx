import { GridCellParams, GridColDef } from '@material-ui/data-grid';
import { Check, Close, Reorder } from '@material-ui/icons';
import { Box, Button } from '@material-ui/core';

export interface IRawRow {
  id_attendance: number | undefined,
  schedule_date: string,
  attendance_date: string,
  attendance_value: string,
  attendance_status: string,
  FK_id_med_reg: string,
  FK_id_specialist: string,
  id_med_reg: string,
  med_reg_date: string,
  FK_id_client: string,
  id_specialist: string,
  register: string,
  specialist_name: string,
  phone: string,
  cellphone: string,
  email: string,
  FK_id_address: string,
  FK_id_profession: string
}

export interface IMainRow {
  id: string | undefined,
  id_attendance: string | undefined,
  attendance_date: string,
  specialist_name: string,
  attendance_time: string,
  client_name: string,
  email_client: string,
  attendance_value: string,
  attendance_status: string,
  FK_id_med_reg: string,
  FK_id_specialist: string,
}
export interface IProRow {
  id: number | undefined,
  register: string,
  id_profession: string,
  name: string,
  email: string,
}

export interface IPatientRow {
  id: number | undefined,
  cpf: string,
  cellphone: string,
  name: string,
  email: string,
  id_med_reg: string,
}

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const columnsMain: GridColDef[] = [
  {
    field: 'client_name',
    headerName: 'Paciente',
    headerAlign: 'left',
    flex: 1.6
  },
  {
    field: 'specialist_name',
    headerName: 'Profissional',
    headerAlign: 'left',
    flex: 1.6
  },
  {
    field: 'attendance_value',
    headerName: 'Valor',
    headerAlign: 'left',
    flex: 1.2,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  },
  {
    field: 'attendance_status',
    headerName: 'Status',
    flex: 1.5,
    renderCell: (params: GridCellParams) => (
      <strong>
        {params.value === "Realizado" &&
          <Box clone>
            <Button
              variant="contained"
              className="done"
              startIcon={<Check />}
            >Realizado</Button>
          </Box>
        }
        {params.value === "Cancelado" &&
          <Box clone>
            <Button fullWidth
              variant="contained"
              className="canceled"
              startIcon={<Close />}
            >Cancelado</Button>
          </Box>
        }
        {params.value === "Agendado" &&
          <Box clone>
            <Button fullWidth
              variant="contained"
              className="scheduled"
              startIcon={<Reorder />}
            >Agendado</Button>
          </Box>
        }
      </strong>
    ),
  }
];

export const columnsCo: GridColDef[] = [
  {
    field: 'attendance_date',
    headerName: 'Data',
    flex: 1.3
  }, {
    field: 'client_name',
    headerName: 'Paciente',
    headerAlign: 'left',
    flex: 1.6
  },
  {
    field: 'specialist_name',
    headerName: 'Profissional',
    headerAlign: 'left',
    flex: 1.3
  },
  {
    field: 'attendance_value',
    headerName: 'Valor',
    headerAlign: 'left',
    flex: 1.3,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  },
  {
    field: 'cellphone_client',
    headerName: 'Celular do Paciente',
    flex: 2
  },
  {
    field: 'attendance_status',
    headerName: 'Status',
    flex: 1.5,
    renderCell: (params: GridCellParams) => (
      <strong>
        {params.value === "Realizado" &&
          <Box clone>
            <Button fullWidth
              variant="contained"
              className="done"
              startIcon={<Check />}
            >Realizado</Button>
          </Box>
        }
        {params.value === "Cancelado" &&
          <Box clone>
            <Button fullWidth
              variant="contained"
              className="canceled"
              startIcon={<Close />}
            >Cancelado</Button>
          </Box>
        }
        {params.value === "Agendado" &&
          <Box clone>
            <Button fullWidth
              variant="contained"
              className="scheduled"
              startIcon={<Reorder />}
            >Agendado</Button>
          </Box>
        }
      </strong>
    ),
  }
];

export const columnsPatient: GridColDef[] = [
  {
    field: 'cpf',
    headerName: 'N° de CPF',
    flex: 1.5
  },
  {
    field: 'name',
    headerName: 'Paciente',
    flex: 2
  },
  {
    field: 'cellphone',
    headerName: 'Telefone',
    headerAlign: 'left',
    flex: 2
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2
  }
];

export const columnsPro: GridColDef[] = [
  {
    field: 'register',
    headerName: 'N° de registro',
    flex: 1
  },
  {
    field: 'id_profession',
    headerName: 'Especialidade',
    flex: 2
  },
  {
    field: 'name',
    headerName: 'Profissional',
    headerAlign: 'left',
    flex: 2
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2
  }
];