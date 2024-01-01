import { create } from 'zustand';

type InitialState = {
  message: string;
  open?: boolean;
  status: 'success' | 'error' | 'load';
};

type UseAlertError = {
  initialState: InitialState;
  handleError: (error: InitialState) => void;
  handleClose: () => void;
};

const initialState: InitialState = {
  message: '',
  open: false,
  status: 'load',
};

export const useAlertError = create<UseAlertError>(set => ({
  initialState,
  handleError: (error: InitialState) => {
    set(prev => ({
      ...prev,
      initialState: { ...error, open: true },
    }));
    setTimeout(() => {
      set(prev => ({
        ...prev,
        initialState,
      }));
    }, 3000);
  },
  handleClose: () => {
    set(prev => ({
      ...prev,
      initialState,
    }));
  },
}));
