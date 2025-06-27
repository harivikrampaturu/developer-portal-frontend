import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login, clearError, selectAuthLoading, selectAuthError } from '@/store/auth';
import type { AppDispatch } from '@/store';
import { ROUTES } from '@/constants/routes';

interface LoginCredentials {
    email: string;
    password: string;
}

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const handleLogin = async (credentials: LoginCredentials) => {
        const result = await dispatch(login(credentials));
        debugger;
        if (login.fulfilled.match(result)) {
            router.push(ROUTES.DASHBOARD);
        }
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

    return {
        loading,
        error,
        handleLogin,
        handleClearError
    };
};
