// src/hooks/useSynastryForm.ts

import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSynastryStore } from '../store/synastryStore';
import { formatDate } from '../utils/formatters';
import { calculateSynastry } from '../services/synastryService';
import type { BirthInput } from '../domain/types';

type PersonData = Record<string, string>;

export const useSynastryForm = () => {
  const [person1Values, setPerson1Values] = useState<PersonData>({});
  const [person2Values, setPerson2Values] = useState<PersonData>({});
  const [errors, setErrors] = useState<{ person1: PersonData, person2: PersonData }>({ person1: {}, person2: {} });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const setSynastryReport = useSynastryStore(state => state.setSynastryReport);

  const handleInputChange = useCallback((person: 'person1' | 'person2', e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const setter = person === 'person1' ? setPerson1Values : setPerson2Values;
    
    let formattedValue = value;
    if (name === 'dataNascimento') {
      formattedValue = formatDate(value);
    }

    setter(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[person][name]) {
      setErrors(prev => ({ ...prev, [person]: { ...prev[person], [name]: '' } }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    // (A lógica de validação completa será adicionada aqui no futuro)
    
    setIsSubmitting(true);

    try {
      // Função auxiliar para formatar os dados de cada pessoa
      const formatInput = (values: PersonData): BirthInput => {
        const [day, month, year] = values.dataNascimento.split('/');
        return {
          name: values.nome,
          birthDate: `${year}-${month}-${day}`,
          birthTime: values.horaDeNascimento || '00:00',
          birthPlace: values.cidadeNascimento
        };
      };

      const input1 = formatInput(person1Values);
      const input2 = formatInput(person2Values);

      // 1. Chama a API do back-end através do nosso serviço
      const newReport = await calculateSynastry(input1, input2);

      // 2. Salva o resultado no store do Zustand
      setSynastryReport(newReport, input1, input2);

      // 3. Navega para a página de resultados da Sinastria
      navigate('/sinastria/resultado');

    } catch (error: any) {
      console.error("Erro ao calcular sinastria:", error);
      alert(error.message || 'Não foi possível analisar a conexão. Verifique os dados e tente novamente.');
      setIsSubmitting(false);
    }
  }, [person1Values, person2Values, navigate, setSynastryReport]);

  return {
    person1Values,
    person2Values,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};