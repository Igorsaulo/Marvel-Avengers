'use client';
import './select.css'
import { useHeroGet } from "src/shared/queries/hero/get";
import { useGroupGet } from "src/shared/queries/group/get";
import CenterLayout from 'src/shared/layout/centerLayout';
import * as yup from 'yup';
import { useGroupPost, IReq } from 'src/shared/queries/group/post';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
    setShowModal: (show: boolean) => void;
    showModal: boolean;
}

const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required()
});

export function GroupModal({ setShowModal, showModal }: IProps) {
    const handleModal = () => {
        setShowModal(!showModal);
    };

    useHeroGet();
    useGroupGet();

    const { mutate: postMutate } = useGroupPost();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleMutate = (data: IReq) => {
        postMutate(data);
        setShowModal(!showModal);
        reset();
    };

    return (
        <>
            {showModal &&
                <div
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
                >
                    <CenterLayout>
                        <form className="bg-[#29292E] flex flex-col gap-2 p-5 w-[50vw] h-4/6  justify-between">
                            <fieldset className="flex flex-col gap-5 justify-between">
                                <div className="flex gap-2 justify-between items-center">
                                    <h1 className="text-2xl text-gray-50">Adicionar Grupo</h1>
                                    <button className="text-gray-50 text-lg" onClick={handleModal}>X</button>
                                </div>
                                <div className="flex flex-col gap-5 justify-center items-start text-gray-50">
                                    <label htmlFor="name">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name')}
                                        className="p-2 rounded-md bg-gray-50 w-full placeholder-gray-500 text-gray-800"
                                        placeholder="Adicione o nome do grupo"
                                    />
                                    <label htmlFor="description">
                                        Descrição
                                    </label>
                                    <textarea
                                        id="description"
                                        {...register('description')}
                                        className="p-2 rounded-md bg-gray-50 w-full placeholder-gray-500 text-gray-800"
                                        placeholder="Descrição"
                                    />
                                </div>
                                <div className="flex  text-gray-50 flex-col gap-2 justify-center items-center">
                                    <button className="bg-orange-500 w-full place-self-center p-2 rounded-md"
                                        onClick={handleSubmit(handleMutate)}
                                    >
                                        Criar Grupo
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </CenterLayout>
                </div>
            }
        </>
    );
}