'use client';
import './scrollBar.css'
import { Hero } from 'src/shared/store/useHeroStore';
import { TransferCard } from './transferCard';
import { ReactNode } from 'react';

interface TransferProps {
    unselectedStoreFunction: (hero: Hero) => void;
    type: "add" | "remove";
    heros: Hero[];
    pagination?: ReactNode;
    transferHeader: ReactNode;
}

export function Transfer(
    { unselectedStoreFunction, 
        heros, 
        type, 
        pagination ,
        transferHeader}
        : TransferProps) {
    return (
        <div className="bg-transparent h-full w-2/5 h-full gap-2 flex flex-col text-gray-50 relative">
            <div className="bg-white bg-opacity-10 w-full justify-center flex p-4">
                {transferHeader}
            </div>
            <div className="w-full overflow-y-scroll h-[48vh] flex flex-col gap-2 pb-10 z-0"
                style={{
                    scrollbarWidth: 'thin',
                }}
            >
                {
                    heros.map((hero, index) => (
                        <TransferCard
                            key={index}
                            hero={hero}
                            type={type}
                            unselectedStoreFunction={unselectedStoreFunction}
                        />
                    ))
                }
            </div>
            {pagination}
        </div>
    )
}