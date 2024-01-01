import { create } from "zustand";

export type Group = {
    id: number;
    name: string;
    description: string;
};

type GroupStore = {
    groups: Group[];
    selectedGroup: number | undefined;
    addGroup: (group: Group) => void;
    removeGroup: (group: Group) => void;
    resetGroup: () => void;
    setSelectedGroup: (id: number) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
    groups: [],
    selectedGroup: undefined,
    addGroup: (group) =>
        set((state) => ({
            groups: filterGroup(state.groups, group.id).length > 0 ? state.groups : [...state.groups, group],
        })),
    setSelectedGroup: (id) =>
        set(() => ({
            selectedGroup: id,
        })),
    removeGroup: (group) =>
        set((state) => ({
            groups: state.groups.filter((item) => item.id !== group.id),
        })),
    resetGroup: () =>
        set(() => ({
            groups: [],
        })),
}));

const filterGroup = (groups: Group[], id: number) => {
    return groups.filter((group) => group.id === id);
}