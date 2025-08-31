export const formFields = [
  {
    id: 'nome', // Usando 'id' como o nome do campo
    label: 'Nome Completo',
    type: 'text',
    placeholder: 'Seu nome de batismo',
    required: true, // <-- Esta propriedade é usada para a validação
  },
  {
    id: 'dataNascimento',
    label: 'Data de Nascimento',
    type: 'text',
    placeholder: 'DD/MM/AAAA',
    required: true,
  },
  {
    id: 'horaNascimento',
    label: 'Hora de Nascimento (HH:MM)',
    type: 'text',
    placeholder: 'Ex: 14:30',
    required: true,
  },
  {
    id: 'localNascimento',
    label: 'Local de Nascimento',
    type: 'text',
    placeholder: 'Cidade, Estado (Ex: Rio de Janeiro, RJ)',
    required: true,
  }
];