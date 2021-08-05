import React, { useCallback, useEffect, useState } from 'react';

import { FormEditProfessionContent } from './styles';

import { Button, TextField, CircularProgress } from '@material-ui/core';

import { api } from '../../service/api';
import { IProfession } from '../../assets/FormAddClientConfig';
import { Autocomplete } from '@material-ui/lab';
import { toast } from 'react-toastify';

interface IProForm {
  profession_name: string;
  id_profession: string | unknown;
}
interface IProName {
  name: string;
}

const FormEditProfessions: React.FC = () => {

  const [formPro, setFormPro] = useState<IProForm>({} as IProForm);

  const [professionName, setProfessionName] = useState<IProName>({} as IProName)

  const [profession, setProfession] = useState<IProfession[]>([])

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    api.get('professions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
      }
    }).then(
      response => {
        setProfession(response.data)
      }
    ).catch(err => {
      console.error(err)
    })
  }, [profession])

  const ProfessionNewSubmit = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setIsLoaded(true)
      api.post('professions', professionName).then(
        response => {
          toast.success('Profissão cadastrada com sucesso!')
        }
      ).catch(err => toast.error('Ooops, algo deu errado!')).finally(() => {
        setIsLoaded(false)
      })
    }, [professionName])


  const ProfessionEditSubmit = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setIsLoaded(true)
      api.put(`professions/${formPro.id_profession}`, 
        { "name":formPro.profession_name }
      ).then(
        response => {
          toast.success('Profissão editada com sucesso!')
        }
      ).catch(err => {
        toast.error('Ooops, algo deu errado!')
        console.debug(err)
      }).finally(() => {
        setIsLoaded(false)
      })
    }, [formPro])

  return (
    <FormEditProfessionContent>
      <h2>Definir Profissões</h2>
      <form>
        <div id="box">
          <section>
            <TextField label="Definir nova profissão" color="primary" variant="outlined" required
              onChange={e => setProfessionName({ name: e.target.value })}
            />
            {isLoaded ? (
              <Button className="btn" variant="contained" color="primary" disabled>
                <CircularProgress size="20px" />
              </Button>
            ) : (
              <Button className="btn" variant="contained" color="primary" onClick={ProfessionNewSubmit}>
                Cadastrar nova profissão
              </Button>
            )}
          </section>
          <section>
            <Autocomplete
              id="Profession-select"
              options={profession}
              autoHighlight
              style={{ height: 55 }}
              onChange={(e, value) => setFormPro({ ...formPro, id_profession: value?.id })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Selecione a profissão" variant="outlined" required />}
            />
            <TextField label="Definir profissão" color="primary" variant="outlined" required
              onChange={e => setFormPro({ ...formPro, profession_name: e.target.value })}
            />
            {isLoaded ? (
              <Button className="btn" variant="contained" color="primary" disabled>
                <CircularProgress size="20px" />
              </Button>
            ) : (
              <Button className="btn" variant="contained" color="primary" onClick={ProfessionEditSubmit}>
                Editar profissão
              </Button>
            )}
          </section>
        </div>
      </form>
    </FormEditProfessionContent>
  );
}

export default FormEditProfessions;