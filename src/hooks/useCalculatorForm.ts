import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Nossos stores e utilidades
import { useReportStore } from '../store/reportStore';
import { useAuthStore } from '../store/authStore';
import { formFields } from '../utils/constants';
import { formatDate, formatTime } from '../utils/formatters';
import { createReport, calculateAnonymousReport } from '../services/reportService';
import type { BirthInput, Report } from '../domain/types';

// Opcional, mas ajuda na clareza: o tipo retornado pela API de criação de relatório
interface SavedReportRecord {
  id: string;
  createdAt: string;
  ownerId: string;
  content: Report;
}

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
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'dataNascimento') {
      formattedValue = formatDate(value);
    } else if (name === 'horaNascimento') {
      formattedValue = formatTime(value);
    }

    setInputValues(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    formFields.forEach(field => {
      if (!inputValues[field.name]?.trim()) {
        newErrors[field.name] = "Este campo é obrigatório.";
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

    try {
      const [day, month, year] = inputValues.dataNascimento.split('/');
      const isoDate = `${year}-${month}-${day}`;

      const inputData: BirthInput = {
        name: inputValues.nome,
        birthDate: isoDate,
        birthTime: inputValues.horaNascimento,
        birthPlace: inputValues.localNascimento,
      };

      let finalReport: Report;
      
      if (user) {
        console.log("Usuário logado. Salvando relatório...");
        const savedDbRecord = await createReport(inputData);
        
        // Verificamos se o retorno é um SavedReportRecord ou diretamente um Report
        if (savedDbRecord && 'content' in savedDbRecord && 'id' in savedDbRecord && 'createdAt' in savedDbRecord && 'ownerId' in savedDbRecord) {
            finalReport = (savedDbRecord as SavedReportRecord).content;
          } else {
            finalReport = savedDbRecord as Report;
          }

      } else {
        console.log("Usuário anônimo. Apenas calculando...");
        finalReport = await calculateAnonymousReport(inputData);
      }
      
      setReportInStore(finalReport, inputData);
      navigate('/resultado');

    } catch (error: any) {
      console.error("ERRO NO HANDLESUBMIT:", error);
      alert(error.message || 'Ocorreu um erro ao gerar seu relatório. Tente novamente.');
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