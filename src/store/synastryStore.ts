// src/store/synastryStore.ts (FRONT-END)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SynastryReport, BirthInput } from '../domain/types';

interface SynastryState {
  input1: BirthInput | null;
  input2: BirthInput | null;
  report: SynastryReport | null;
  setSynastryReport: (report: SynastryReport, input1: BirthInput, input2: BirthInput) => void;
}

export const useSynastryStore = create<SynastryState>()(
  persist(
    (set) => ({
      input1: null,
      input2: null,
      report: null,
      
      setSynastryReport: (report, input1, input2) => {
        set({ report, input1, input2 });
      },
    }),
    {
      name: 'arcan-synastry-storage',
    }
  )
);