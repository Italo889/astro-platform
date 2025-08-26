import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Report, BirthInput } from '../domain/types';

// O import de 'computeReport' foi removido.

interface ReportState {
  input: BirthInput | null;
  report: Report | null;
  // Ação agora apenas define o estado com dados pré-calculados.
  setReport: (report: Report, input: BirthInput) => void;
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
      name: 'arcan-report-storage',
    }
  )
);