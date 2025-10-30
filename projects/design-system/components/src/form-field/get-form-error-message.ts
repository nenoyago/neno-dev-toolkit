export function getFormErrorMessage(
  fieldName: string,
  validatorName: string,
  validatorValue?: Record<string, string>
): string {
  const message = typeof validatorValue === 'string' ? validatorValue : '';

  const config: { [key: string]: string } = {
    required: `${fieldName} é obrigatório.`,
    minlength: `${fieldName} precisa ter no mínimo ${validatorValue?.['requiredLength']} caracteres.`,
    maxlength: `${fieldName} precisa ter no máximo ${validatorValue?.['requiredLength']} caracteres.`,
    email: `Digite um ${fieldName.toLowerCase()} válido.`,
    invalidCharSpecial: `${fieldName} deve conter caracteres especiais.`,
    invalidCharLower: `${fieldName} deve conter letras minúsculas.`,
    invalidCharUpper: `${fieldName} deve conter letras maiúsculas.`,
    invalidCharNumber: `${fieldName} deve conter números.`,
    mismatch: `${fieldName} não confere.`,
    invalidDate: `${fieldName} é inválida.`,
    invalidDocument: `${fieldName} é inválido.`,
    invalidZipCode: `${fieldName} é inválido.`,
    asyncInvalidZipCode: `${fieldName} inválido ou não encontrado.`,
    atLeastOneValue: `Preencha com pelo menos um ${fieldName.toLowerCase()}.`,
    max: `${fieldName} deve ser menor ou igual a ${validatorValue?.['max']}.`,
    min: `${fieldName} deve ser maior ou igual a ${validatorValue?.['min']}.`,
    underAge: message || `Idade menor que ${validatorValue?.['minAge']} anos.`,
    aboveAge: message || `Idade superior a ${validatorValue?.['maxAge']} anos.`,
    invalidBirthday: message || 'Data de nascimento inválida.',
    alreadyExists: `${fieldName.toLocaleLowerCase()} já cadastrado.`
  };

  return config[validatorName] || ''; // Retorna uma string vazia se o validatorName não for encontrado.
}
