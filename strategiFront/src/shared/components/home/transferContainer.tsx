'use client';
import './select.css'
import { TransferControll } from "./transferControll";
import { Transfer } from "./transfer";
import { useHeroStore } from 'src/shared/store/useHeroStore'
import { useGroupStore } from "src/shared/store/useGroupStore";
import { TransferPagination } from "./trnasferPagination";
import { useHeroGet } from "src/shared/queries/hero/get";
import { useGroupGet } from "src/shared/queries/group/get";
import { GroupHeader } from './groupHeader';
import { useState } from 'react';
import { backConnection } from 'src/shared/services/backConnection';
import { useAuth } from 'src/shared/store/useAuth';
import { useProfile } from 'src/shared/queries/auth/profile';
import { useAlertError } from 'src/shared/store/useAlertError';
import { GroupModal } from './groupModal';

export function TransferContainer() {
    const [showModal, setShowModal] = useState(false);
    const { access_token } = useAuth();
    const { data } = useProfile();
    const {
        addGroupFromHeros,
        removeHeroFromGroup,
        heroGroups,
        heros,
        heroControl,
        changes,
        setChanges,
        addToGroupBacklog,
        removeToGroupBackLog,
        setHeroControl,
    } = useHeroStore();

    const { groups, setSelectedGroup, selectedGroup } = useGroupStore();

    const handleModal = () => {
        setShowModal(!showModal);
    };

    useHeroGet();
    useGroupGet();

    const { handleError } = useAlertError();

    const handlePut = async () => {
        const group = getGroup(selectedGroup || 0, groups);
        const groupData = {
            id: group?.id,
            name: group?.name,
            description: group?.description,
            user: data?.id,
            heros: heroGroups
        }

        handleError({
            message: "Salvando grupo",
            status: "load"
        })

        try {

            await backConnection.put(`/group/${group?.id}`, groupData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            handleError({
                message: "Grupo salvo com sucesso",
                status: "success"
            })
        } catch (error) {
            handleError({
                message: "Erro ao salvar grupo",
                status: "error"
            })
        }
        setChanges(false)
    };

    return (
        <>
            <div className='text-gray-400 flex justify-end mr-10 gap-2'>
                {changes && (
                    <button
                        className='ml-5 bg-[#E05E00] text-gray-50 pr-2 pl-2 pt-1 pb-1 rounded-sm'
                        onClick={handlePut}
                    >
                        Salvar
                    </button>
                )}
                <button onClick={handleModal}>+ Novo Grupo</button>
            </div>
            <GroupModal
            setShowModal={setShowModal}
            showModal={showModal}
            />
            <div className="p-8 bg justify-between flex">
                <Transfer
                    heros={heros}
                    unselectedStoreFunction={addToGroupBacklog}
                    type={'add'}
                    pagination={
                        <TransferPagination
                            paginationFunction={(page, limit) => setHeroControl({ ...heroControl, page, limit })}
                            control={heroControl}
                        />
                    }
                    transferHeader={addHeader()}
                />
                <TransferControll transferForward={addGroupFromHeros} transferReverse={removeHeroFromGroup} />
                <Transfer
                    heros={heroGroups}
                    unselectedStoreFunction={removeToGroupBackLog}
                    transferHeader={GroupHeader(groups, setSelectedGroup)}
                    type={'remove'} />
            </div>
        </>
    );
}

const addHeader = () => {
    return (
        <div className="w-full justify-center flex p-1">
            <p>Heróis</p>
        </div>
    )
}
const getGroup = (id: number, groups: any[]) => {
    return groups.find((group) => group.id === id);
}