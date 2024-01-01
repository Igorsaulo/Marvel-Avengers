'use client';
import { useMutation } from 'react-query';
import { backConnection } from 'src/shared/services/backConnection';
import { useAlertError } from '../../store/useAlertError';
import { useAuth } from '../../store/useAuth';
import { useGroupGet } from './get';

export type IReq = {
    name: string;
    description: string;
};

async function req(data: IReq, access_token: string) {
    return backConnection.post(`/groups/`, {
        name: data.name,
        description: data.description,
    }, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
}

export const useGroupPost = () => {
    const { handleError } = useAlertError();
    const { access_token } = useAuth();
    const { refetch } = useGroupGet();
    const { isLoading, isError, isSuccess, mutate, data } = useMutation(
        (data: IReq) => req(data, access_token),
        {
            onMutate: () => {
                handleError({
                    message: 'Registrando...',
                    status: 'load',
                });
            }
            ,
            onSuccess: () => {
                handleError({
                    message: 'Registrado com sucesso',
                    status: 'success',
                });
            },
            onError: (error: any) => {
                handleError({
                    message: error.message,
                    status: 'error',
                });
            },
        }
    );

    if (isSuccess) {
       window.location.reload();
    }
    return {
        isLoading,
        isError,
        isSuccess,
        mutate,
    };
};
