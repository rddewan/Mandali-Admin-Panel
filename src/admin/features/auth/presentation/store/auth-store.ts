import { create } from "zustand";
import { AuthState } from "..";
import { LoginForm } from "../../../../common/types";
import { checkAuthState, loginApiService, logout } from "../../data";
import { createSelectors } from "../../../../../core";

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (data: LoginForm) => {
    try {
      set({ isLoading: true, error: null });
      await loginApiService(data);
      set({ isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isAuthenticated: false, isLoading: false, error: errorMessage });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await logout();
      set({ isAuthenticated: false, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  checkAuthState: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await checkAuthState();
      set({
        isAuthenticated: response.isAuthenticated,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isAuthenticated: false, isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(useAuthStore);
