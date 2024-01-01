'use-client';
import { create } from 'zustand';

export interface IProfile {
    id: string | null;
    user: string | null;
}

type UseAuthProps = {
    access_token: string;
    profile: IProfile;
    login: (token: string) => void;
    logout: () => void;
    setProfile: (dataProfile: IProfile) => void;
};

const getInitialToken = () => {
    return typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') || '' : '';
};

const profile: IProfile = {
    user: null,
    id: null,
};

export const useAuth = create<UseAuthProps>(set => ({
    profile,
    access_token: getInitialToken(),
    login: token => {
        set(state => {
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('accessToken', token);
            }
            return { ...state, access_token: token };
        });
    },
    logout: () => {
        set(state => {
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('accessToken');
            }
            return { ...state, access_token: '' };
        });
    },
    setProfile: dataProfile => {
        set(state => ({
            ...state,
            profile: dataProfile,
        }));
    },
}));
