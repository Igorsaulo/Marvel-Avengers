import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { backConnection } from '../../services/backConnection';
import { useAlertError } from '../../store/useAlertError';
import { useAuth } from '../../store/useAuth';
import { useHeroStore } from 'src/shared/store/useHeroStore';
import { useGroupStore } from 'src/shared/store/useGroupStore';

interface IReq {
    groupId?: number;
}

function req({ groupId }: IReq, access_token: string) {

    return backConnection.get('/groups', {
        params: {
            groupId
        },
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
}

export const useGroupGet = () => {
    const { access_token } = useAuth();
    const { handleError } = useAlertError();
    const { setNewHeroGroup, heroGroups, heros } = useHeroStore();
    const { addGroup, groups, selectedGroup } = useGroupStore();
    const { isLoading, isError, isSuccess, data, refetch, isFetching } = useQuery(
        'groupGet',
        () => selectedGroup ? req({ groupId: selectedGroup }, access_token) : req({}, access_token),
        {
            staleTime: Infinity,
            onError: () => {
                handleError({
                    message: 'Erro ao carregar sugestões',
                    status: 'error',
                });
            },
            onSuccess: (response) => {
                const data = response.data;
                if (data && data.groups) {
                    data.groups.forEach((group: any) => {
                        const { id, name, description, heros } = group;
                        addGroup({
                            id,
                            name,
                            description,
                        });
                        if (id === selectedGroup) {
                            setNewHeroGroup(heros);
                        }
                    });
                }
            }

        }
    );

    useEffect(() => {
        refetch();
    }
        , [selectedGroup]);

    return {
        isLoading,
        isError,
        isSuccess,
        isFetching,
        refetch,
        data: data ? data.data : undefined,
    };
};