'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { Header } from './header';
import { HeaderProps } from './header';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { useAuth } from '../store/useAuth';
import * as yup from 'yup';
import { UseMutateFunction } from 'react-query';
import { AxiosResponse } from 'axios';

export interface Field {
    name: string;
    label: string;
    type: string;
}

export interface alternativeProps {
    message: string;
    link: string;
    menssageLink: string;
}

interface FormProps {
    fields: Field[];
    headerProps?: HeaderProps;
    buttonMessage: string;
    alternativeProps?: alternativeProps;
    schema: yup.ObjectSchema<any>;
    mutate:
    UseMutateFunction<AxiosResponse<any, any>, any, any, void>
    | ((data: any) => Promise<any>);
}


export default function Form({
    fields,
    headerProps,
    buttonMessage,
    alternativeProps,
    schema,
    mutate
}: FormProps) {
    const { access_token } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors  },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (access_token) {
            redirect('/home');
        }
    }, [access_token]);

    const onSubmit = async (data: any) => {
        if (data) {
            mutate(data);
        }
    };

    return (
        <form className="bg-black bg-opacity-50 flex flex-col gap-2 p-16 w-1/3 min-h-4/6 rounded-xl justify-between">
            <fieldset className="flex flex-col gap-4 justify-between">
                {headerProps && (
                    <Header
                        logo={headerProps.logo}
                        title={headerProps.title}
                        alt={headerProps.alt}
                    />
                )}
                <div className="flex flex-col gap-2 justify-center items-center">
                    {fields.map(field => (
                        <div key={field.name}>
                            <input
                                type={field.type}
                                id={field.name}
                                className="p-2 rounded-md bg-gray-50 w-56 placeholder-gray-800 block"
                                placeholder={field.label}
                                {...register(field.name)}
                            />
                            <p className="text-red-500 text-sm">
                                {/* @ts-ignore */}
                                {errors[field.name]?.message}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex  text-gray-50 flex-col gap-2 justify-center items-center">
                    <button className="bg-orange-500 w-56 place-self-center p-2 rounded-md"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {buttonMessage}
                    </button>
                    {alternativeProps && (
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <span className="text-sm text-gray-50">
                                {alternativeProps.message}
                            </span>
                            <Link href={alternativeProps.link}>
                                {alternativeProps.menssageLink}
                            </Link>
                        </div>
                    )}
                </div>
            </fieldset>
        </form>
    )
}