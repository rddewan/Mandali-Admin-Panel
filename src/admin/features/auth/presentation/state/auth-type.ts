import { LoginForm } from "../../../../common/types";


export type AuthState = {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (data: LoginForm) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthState: () => Promise<void>;
};

