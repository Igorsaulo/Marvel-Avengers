import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { backConnection } from '../../services/backConnection';
import { useAlertError } from '../../store/useAlertError';
import { useAuth } from '../../store/useAuth';
import { useHeroStore } from 'src/shared/store/useHeroStore';

interface IReq {
    page: number;
    limit: number;
}

function req({ page, limit }: IReq, access_token: string) {
    const offset = page * limit;

    return backConnection.get('/heros', {
        params: {
            offset,
            limit,
        },
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
}

export const useHeroGet = () => {
    const { access_token } = useAuth();
    const { handleError } = useAlertError();
    const { heroControl, setHeroControl } = useHeroStore();
    const { isLoading, isError, isSuccess, data, refetch, isFetching } = useQuery(
        'heroGet',
        () => req({ ...heroControl }, access_token),
        {
            staleTime: Infinity,
            onError: () => {
                handleError({
                    message: 'Erro ao carregar os heróis',
                    status: 'error',
                });
            },
        }
    );

    const { page, limit } = heroControl;
    useEffect(() => {
        refetch();
    }, [page, limit]);

    useEffect(() => {
        if (data?.data.heros) {
            useHeroStore.getState().addHeros(data.data.heros);
        }

        if (data?.data.totalPages) {
            setHeroControl({
                ...heroControl,
                totalPage: data.data.totalPages,
            });
        }

    }
        , [data]);

    return {
        isLoading,
        isError,
        isSuccess,
        isFetching,
        refetch,
        data: data ? data.data : undefined,
    };
};
