import React, { useState, useCallback, FormEvent, useEffect } from 'react';

import { CPFInput, PhoneInput, ZipInput } from '../../MaskedInputs';
import { FormAddPatientContent } from './styles';

import { IPatientId, IZipContent } from '../../../assets/FormAddClientConfig';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { toast } from 'react-toastify';

import { api, apiAddress } from '../../../service/api';
import EnsureErrors from '../../../assets/EnsureErrors';

interface IError {
  name: string
  value: boolean;
  message: string;
}

const FormAddPatient: React.FC = () => {

  const [formDataContent, setFormDataContent] = useState<IPatientId>({} as IPatientId);
  const [formDataError, setFormDataError] = useState<IError[]>([
    { name: 'cpf', value: false, message: 'Número de CPF informado inválido' },
    { name: 'email', value: false, message: 'Entre com um email válido' },
    { name: 'zip', value: false, message: 'Verifique o CEP' },
    { name: 'uf', value: false, message: 'UF inválida' },
  ])

  const [ZipContent, setZipContent] = useState<IZipContent>({} as IZipContent);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    toast.info('Campos obrigatórios *')
  }, [])

  const patientSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errors = EnsureErrors(formDataContent.cpf, formDataContent.email, formDataContent.zip_code, formDataContent.uf, 'patient')
      if(errors.length < 1) {
        toast.success('Paciente cadastrado com sucesso!')
      } else {
        setFormDataError(prevState => 
          prevState.map(err => {
            return errors.includes(err.message) ? { ...err, value: true } : { ...err, value: false };
          })
        )
        errors.forEach(error => (
          toast.error(error)
        ))
      }      
    }, [formDataContent])

  const handleCPF = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      let data = e.currentTarget.value
      data = `${data.substr(0, 3)}${data.substr(4, 3)}${data.substr(8, 3)}${data.substr(12, 2)}`
      setFormDataContent({ ...formDataContent, cpf: data })
    }, [formDataContent])

  const handleZip = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setIsLoaded(true)
      apiAddress.get(`/${ZipContent.cep}/json`).then(
        response => {
          setFormDataContent({
            ...formDataContent,
            zip_code: `${response.data.cep.substr(0, 5)}${response.data.cep.substr(6, 3)}`,
            street: response.data.logradouro,
            district: response.data.bairro,
            locale: response.data.localidade,
            uf: response.data.uf
          })
        }
      ).catch(err => toast.error('Ooops, algo deu errado')).finally(() => {
        setIsLoaded(false)
      })
    }, [ZipContent, formDataContent])

  return (
    <FormAddPatientContent>
      <form onSubmit={patientSubmit}>
        <div className="form-field">
          <TextField 
            label="Nome" 
            color="primary" 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, name: e.target.value })}
          />
          <CPFInput 
            label="CPF" 
            color="primary" 
            error={formDataError[0].value} 
            // required
            onChange={handleCPF}
          />
          <TextField 
            label="Email" 
            color="primary" 
            error={formDataError[1].value} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, email: e.target.value })}
          />
          <PhoneInput label="Telefone" color="primary"
            onChange={e => setFormDataContent({ ...formDataContent, phone: e.target.value.replace(" ", "") })}
          />
          <PhoneInput label="Celular" color="primary"
            onChange={e => setFormDataContent({ ...formDataContent, cellphone: e.target.value.replace(" ", "") })}
          />
          <FormControl 
            color="primary" 
            // required
          >
            <InputLabel id="blood-patient" >Tipo Sanguíneo</InputLabel>
            <Select
              labelId="blood-patient"
              label="Tipo Sanguíneo"
              onChange={e => setFormDataContent({ ...formDataContent, blood_type: e.target.value })}
            >
              <MenuItem value='null'>
                <em>Escolha o tipo sanguíneo</em>
              </MenuItem>
              <MenuItem value='A+'>A+</MenuItem>
              <MenuItem value='A-'>A-</MenuItem>
              <MenuItem value='B+'>B+</MenuItem>
              <MenuItem value='B-'>B-</MenuItem>
              <MenuItem value='O+'>O+</MenuItem>
              <MenuItem value='O-'>O-</MenuItem>
              <MenuItem value='AB+'>AB+</MenuItem>
              <MenuItem value='AB-'>AB-</MenuItem>
            </Select>
          </FormControl>
          <div>
            <ZipInput 
              label="CEP" 
              color="primary" 
              error={formDataError[2].value} 
              // required
              onChange={e => setZipContent({ ...ZipContent, cep: e.target.value })}
            />
            {isLoaded ? (
              <Button id="check-address" variant="contained" color="primary" disableElevation disabled>Verificar</Button>
            ) : (
              <Button id="check-address" onClick={handleZip} variant="contained" color="primary" disableElevation>Verificar</Button>
            )}
          </div>
          <TextField label="Rua" color="primary" value={formDataContent.street} InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, street: e.target.value })}
          />
          <TextField label="Número" color="primary" value={formDataContent.number} InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, number: e.target.value })}
          />
          <TextField label="Bairro" color="primary" value={formDataContent.district} InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, district: e.target.value })}
          />
          <TextField label="Cidade" color="primary" value={formDataContent.locale} InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, locale: e.target.value })}
          />
          <TextField 
            label="Estado" 
            color="primary" 
            value={formDataContent.uf} 
            InputLabelProps={{ shrink: true }} 
            error={formDataError[3].value} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, uf: e.target.value })}
          />
        </div>
        {isLoaded ? (
          <Button variant="contained" color="primary" disabled fullWidth>
            <CircularProgress size="20px" />
          </Button>
        ) : (
          <Button variant="contained" type="submit" style={{ marginTop: 25 }} color="primary" fullWidth>Cadastrar Paciente</Button>
        )}
      </form>
    </FormAddPatientContent>
  );
}

export default FormAddPatient;