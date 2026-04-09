import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userId, password) => {
    // Mock authentication for hackathon
    if (userId === '1234' && password === '1234') {
      set({ isAuthenticated: true, user: { id: userId, name: 'Administrator' } });
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Use 1234 / 1234' };
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  }
}));
