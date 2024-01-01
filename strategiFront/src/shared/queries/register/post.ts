'use client';
import { useMutation } from 'react-query';
import { backConnection } from 'src/shared/services/backConnection';
import { useAlertError } from '../../store/useAlertError';

type IReq = {
  user: string;
  password: string;
};

async function req(data: IReq) {
  return backConnection.post(`/users/`, {
    user: data.user,
    password: data.password,
  });
}

export const useRegister = () => {
  const { handleError } = useAlertError();
  const { isLoading, isError, isSuccess, mutate, data } = useMutation(
    (data: IReq) => req(data),
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
          message: error.response.data.message,
          status: 'error',
        });
      },
    }
  );

  if (isSuccess) {
    sessionStorage.setItem('accessToken', data?.data?.access_token);
    window.location.reload();
  }

  return {
    isLoading,
    isError,
    isSuccess,
    mutate,
  };
};
