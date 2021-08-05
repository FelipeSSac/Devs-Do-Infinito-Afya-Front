const EnsureErrors = (cpf: string, email: string, zip:string, uf: string, type:string , register:string = '') => {
  let errors: string[] = [];

  if(!cpf) errors.push('Número de CPF informado inválido')
  else {
    if(cpf.length !== 11) errors.push('Número de CPF informado inválido')
  }

  if(!email) errors.push('Entre com um email válido')
  else {
    if(!email.split('@')) errors.push('Entre com um email válido')
  }

  if(!zip) errors.push('Verifique o CEP')

  if(!uf) errors.push('UF inválido')
  else {
    if(uf.length !== 2) errors.push('UF inválido')
  }

  if(type === 'patient') return errors
  else{
    if(!register) errors.push('Número de registro inválido')

    return errors
  }
}

export default EnsureErrors;