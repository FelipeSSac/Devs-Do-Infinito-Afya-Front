import React, { useState } from "react";

interface IError {
  name: string
  value: boolean;
  message: string;
}

type AllError = [
  IError,
  IError,
  IError,
  IError
]

export default function Teste () {
  const [formDataError, setFormDataError] = useState<IError[]>([
    { name: 'cpf', value: false, message: 'Número de CPF informado inválido.' },
    { name: 'email', value: false, message: 'Entre com um email válido' },
    { name: 'zip', value: false, message: 'CEP inválido' },
    { name: 'uf', value: false, message: 'UF inválida' },
  ])

  const patientSubmit = () => {
    setFormDataError(prevState => 
      prevState.map(err => {
        return err.message === 'Entre com um email válido' ? { ...err, value: !err.value } : err;
      })
    )
    console.log(formDataError)
  }

  return (
    <div>
      <button onClick={patientSubmit}>botao</button>
      <h1>teste</h1>
      <section>
        <hr />
        {formDataError.map(err => (
          <>
            <article>
              <h1>{err.name}</h1>
              <h2>{err.value ? 'true' : 'false'}</h2>
              <h3>{err.message}</h3>
            </article>
            <hr />
          </>
        ))}
      </section>
    </div>
  )
}