'use client';
import { create } from "zustand";
export type Hero = {
    id: number;
    name: string;
    description: string;
    image: string;
};

type HeroControl = {
    page: number;
    limit: number;
    totalPage?: number;
};

type HerosStore = {
    heroControl: HeroControl;
    heros: Hero[];
    addGroupBacklog: Hero[];
    removeGroupBacklog: Hero[];
    heroGroups: Hero[];
    changes: boolean;
    setChanges: (satusChange: boolean) => void;
    setHeroControl: (heroControl: HeroControl) => void;
    addHeroGroup: (hero: Hero[]) => void;
    setNewHeroGroup: (hero: Hero[]) => void;
    addHeros: (heros: Hero[]) => void;
    addToGroupBacklog: (hero: Hero,selectedGroup? : number | undefined, handleError? : any) => void;
    removeToGroupBackLog: (hero: Hero) => void;
    addGroupFromHeros: () => void;
    removeHeroFromGroup: () => void;
    removeToBackLog: (hero: Hero, type: "add" | "remove") => void;
};

export const useHeroStore = create<HerosStore>((set) => ({
    heroControl: {
        page: 1,
        limit: 10,
        totalPage: 0,
    },
    heros: [],
    addGroupBacklog: [],
    removeGroupBacklog: [],
    heroGroups: [],
    changes: false,
    setChanges: (statusChange) => set(() => ({ changes: statusChange })),
    setHeroControl: (heroControl) =>
        set((state) => ({
            heroControl: {
                ...state.heroControl,
                ...heroControl,
            },
        })),
    addHeroGroup: (heros) =>
        set((state) => ({
            heroGroups: [...state.heroGroups, ...heros],
        })),
    setNewHeroGroup: (heros) =>
        set(() => ({
            heroGroups: heros,
        })),
    addHeros: (heros) =>
        set((state) => ({
            heros: remove([...heros], state.heroGroups),
        })),
        addToGroupBacklog: (hero, selectedGroup, handleError) =>
        set((state) => {
          if (selectedGroup === undefined) {
            handleError({ message: "Selecione um grupo primeiro", status: "error" });
            return state;
          }
          return {
            addGroupBacklog: [...state.addGroupBacklog, hero],
          };
        }),
    removeToGroupBackLog: (hero) =>
        set((state) => ({
            removeGroupBacklog: [...state.removeGroupBacklog, hero],
        })),
    addGroupFromHeros: () =>
        set((state) => ({
            heroGroups: [...state.heroGroups, ...state.addGroupBacklog],
            heros: remove(state.heros, state.addGroupBacklog),
            addGroupBacklog: [],
        })),
    removeHeroFromGroup: () =>
        set((state) => ({
            heros: [...state.heros, ...state.removeGroupBacklog],
            heroGroups: remove(state.heroGroups, state.removeGroupBacklog),
            removeGroupBacklog: [],
        })),
    removeToBackLog: (hero, type) =>
        set((state) => {
            if (type === "add") {
                return {
                    addGroupBacklog: remove(state.addGroupBacklog, hero),
                };
            } else {
                return {
                    removeGroupBacklog: remove(state.removeGroupBacklog, hero),
                };
            }
        }),
}));

function remove(array: Hero[], element: Hero | Hero[]): Hero[] {
    const elementsToRemove = Array.isArray(element) ? element : [element];
    return array.filter((el) => !elementsToRemove.some((e) => e.id === el.id));
}