import { create } from 'zustand';

export const useContractStore = create((set) => ({
  contractData: null,
  setContractData: (data) => set({ contractData: data }),
  clearContractData: () => set({ contractData: null })
}));
