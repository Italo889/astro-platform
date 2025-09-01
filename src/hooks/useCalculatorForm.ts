import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportStore } from '../store/reportStore';
import { useAuthStore } from '../store/authStore';
import { formFields } from '../utils/constants';
import { formatDate, formatTime } from '../utils/formatters';
import { createAndSaveReport, calculateAnonymousReport } from '../services/reportService';
import type { CalculationInput } from '../services/reportService';
import type { PersonalReport, SavedReport, BirthInput } from '../domain/types';

interface UseCalculatorFormReturn {
  inputValues: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

export const useCalculatorForm = (): UseCalculatorFormReturn => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const setReportInStore = useReportStore((state) => state.setReport);
  const user = useAuthStore((state) => state.user);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // Usamos 'id' como identificador único do campo, que corresponde ao 'name' no estado.
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'dataNascimento') {
      formattedValue = formatDate(value);
    } else if (id === 'horaNascimento') {
      formattedValue = formatTime(value);
    }
    
    setInputValues(prev => ({ ...prev, [id]: formattedValue }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    // CORREÇÃO: A validação agora usa a propriedade 'id' e a flag 'required'
    // do nosso arquivo de constantes, tornando-o a única fonte da verdade.
    formFields.forEach(field => {
      if (field.required && !inputValues[field.id]?.trim()) {
        newErrors[field.id] = "Este campo é obrigatório.";
      }
    });

    if (inputValues.dataNascimento && !/^\d{2}\/\d{2}\/\d{4}$/.test(inputValues.dataNascimento)) {
      newErrors.dataNascimento = "Formato de data inválido. Use DD/MM/AAAA.";
    }

    if (inputValues.horaNascimento && !/^\d{2}:\d{2}$/.test(inputValues.horaNascimento)) {
      newErrors.horaNascimento = "Formato de hora inválido. Use HH:MM.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const [day, month, year] = inputValues.dataNascimento.split('/');
      const isoDate = `${year}-${month}-${day}`;

      // Os dados são montados para corresponder ao tipo CalculationInput do serviço
      const inputData: CalculationInput = {
        name: inputValues.nome,
        birthDate: isoDate,
        birthTime: inputValues.horaNascimento, 
        birthPlace: inputValues.localNascimento,
      };

      let reportResult: PersonalReport | SavedReport;
      
      if (user) {
        reportResult = await createAndSaveReport(inputData);
      } else {
        reportResult = await calculateAnonymousReport(inputData);
      }
      
      const finalReport = 'content' in reportResult ? reportResult.content as PersonalReport : reportResult;
      
      setReportInStore(finalReport, inputData as BirthInput); 
      navigate('/resultado');

    } catch (error: any) {
      console.error("ERRO NO HANDLESUBMIT:", error);
      setErrors({ root: error.message || 'Ocorreu um erro ao gerar seu relatório.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [inputValues, navigate, setReportInStore, user]);

  return {
    inputValues,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};