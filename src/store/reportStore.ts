import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// CORREÇÃO: Usando o tipo 'PersonalReport' que é o nosso padrão final.
import type { PersonalReport, BirthInput } from '../domain/types';

interface ReportState {
  input: BirthInput | null;
  report: PersonalReport | null;
  setReport: (report: PersonalReport, input: BirthInput) => void;
  clearReport: () => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      input: null,
      report: null,
      
      setReport: (report, input) => {
        set({ report, input });
      },

      clearReport: () => set({ report: null, input: null }),
    }),
    {
      name: 'arcan-report-storage', // Nome da chave no localStorage
    }
  )
);