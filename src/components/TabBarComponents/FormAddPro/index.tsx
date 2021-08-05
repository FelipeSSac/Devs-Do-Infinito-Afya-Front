import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import { CPFInput, PhoneInput, ZipInput } from '../../MaskedInputs';
import { FormAddProContent } from './styles';

import { IProfession, IProId, IZipContent } from '../../../assets/FormAddClientConfig';

import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';

import { api, apiAddress } from '../../../service/api';
import EnsureErrors from '../../../assets/EnsureErrors';

interface IError {
  value: boolean;
  message: string;
}

const FormAddPro: React.FC = () => {

  const [pros, setPros] = useState<IProfession[]>([])

  const [formDataContent, setFormDataContent] = useState<IProId>({} as IProId);
  const [formDataError, setFormDataError] = useState<IError[]>([
      { value: false, message: 'Número de CPF informado inválido' },
      { value: false, message: 'Número de registro inválido' },
      { value: false, message: 'Entre com um email válido' },
      { value: false, message: 'Verifique o CEP' },
      { value: false, message: 'UF inválido' },
  ])

  const [ZipContent, setZipContent] = useState<IZipContent>({} as IZipContent);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    toast.info('Campos obrigatórios *')
    api.get('professions').then(
      response => {
        setPros(response.data)
      }
    ).catch(err => {
      console.error(err)
    })
  }, [])

  const proSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errors = EnsureErrors(formDataContent.cpf, formDataContent.email, formDataContent.zip_code, formDataContent.uf, 'pro', formDataContent.register)
      if(errors.length < 1) {
        setFormDataError(prevState => 
          prevState.map(err => {
            return { ...err, value: false };
          })
        )
        setIsLoaded(true)
        api.post('specialist', formDataContent).then(
          response => {
            toast.success('Profissional cadastrado com sucesso!')
          }
        ).catch(err => {
        }).finally(() => {
          setIsLoaded(false)
        })
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
      ).catch(err => { toast.error('Ooops, algo deu errado') }).finally(() => {
        setIsLoaded(false)
      })
    }, [ZipContent, formDataContent])

  return (
    <FormAddProContent>
      <form onSubmit={proSubmit} >
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
            type="number" 
            label="Número de registro" 
            color="primary" 
            error={formDataError[1].value} 
            // required 
            inputProps={{ min: 0 }}
            onChange={e => setFormDataContent({ ...formDataContent, register: e.target.value })}
          />
          <TextField 
            label="Email" 
            color="primary" 
            // required 
            error={formDataError[2].value}
            onChange={e => setFormDataContent({ ...formDataContent, email: e.target.value })}
          />
          <div id="phone-box">
            <PhoneInput 
              label="Telefone" 
              color="primary"
              onChange={e => setFormDataContent({ ...formDataContent, phone: e.target.value.replace(" ", "") })}
            />
            <PhoneInput 
              label="Celular" 
              color="primary"
              onChange={e => setFormDataContent({ ...formDataContent, cellphone: e.target.value.replace(" ", "") })}
            />
          </div>

          <FormControl 
            color="primary" 
            // required
          >
            <InputLabel id="profession" >Profissão</InputLabel>
            <Select
              labelId="profession"
              label="Profissão"
              defaultValue={-1}
              onChange={e => setFormDataContent({ ...formDataContent, id_profession: e.target.value })}
            >
              <MenuItem value='null'>
                <em>Escolha a profissão</em>
              </MenuItem>
              {pros.map((pro, i) => <MenuItem key={i} value={pro?.name}>{pro?.name}</MenuItem>)}
            </Select>
          </FormControl>
          <div id="zip-box">
            <ZipInput 
              label="CEP" 
              color="primary" 
              error={formDataError[3].value} 
              // required
              onChange={e => setZipContent({ ...ZipContent, cep: e.target.value })}
            />
            {isLoaded ? (
              <Button 
                id="check-address" 
                variant="contained" 
                color="primary" 
                disableElevation 
                disabled
              >
                Verificar
              </Button>
            ) : (
              <Button 
                id="check-address" 
                onClick={handleZip} 
                variant="contained" 
                color="primary" 
                disableElevation
              >
                Verificar
              </Button>
            )}
          </div>
          <TextField 
            label="Rua" 
            color="primary" 
            value={formDataContent.street} 
            InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, street: e.target.value })}
          />
          <TextField 
            label="Número" 
            color="primary" 
            value={formDataContent.number} 
            InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, number: e.target.value })}
          />
          <TextField 
            label="Bairro" 
            color="primary" 
            value={formDataContent.district} 
            InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, district: e.target.value })}
          />
          <TextField 
            label="Cidade" 
            color="primary" 
            value={formDataContent.locale} 
            InputLabelProps={{ shrink: true }} 
            // required
            onChange={e => setFormDataContent({ ...formDataContent, locale: e.target.value })}
          />
          <TextField 
            label="Estado" 
            color="primary" 
            value={formDataContent.uf} 
            error={formDataError[4].value} 
            // required 
            InputLabelProps={{ shrink: true }}
            onChange={e => setFormDataContent({ ...formDataContent, uf: e.target.value })}
          />
        </div>
        {isLoaded ? (
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            disabled 
            fullWidth
          >
            <CircularProgress size="20px" />
          </Button>
        ) : (
          <Button 
            type="submit" 
            variant="contained" 
            style={{ marginTop: 25 }} 
            color="primary" 
            fullWidth
          >
            Cadastrar Profissional
          </Button>
        )}
      </form>
    </FormAddProContent >
  );
}

export default FormAddPro;