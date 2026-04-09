import { create } from 'zustand';

export const useLangStore = create((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}));
