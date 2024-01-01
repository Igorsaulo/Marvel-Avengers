import { useEffect, useState } from "react";
import { Hero } from "src/shared/store/useHeroStore";
import { useHeroStore } from "src/shared/store/useHeroStore";
import { useGroupStore } from "src/shared/store/useGroupStore";
import { useAlertError } from "src/shared/store/useAlertError";

interface TransferCardProps {
    unselectedStoreFunction: (hero: Hero, selectedGroup?: number | undefined, messageError?: any) => void;
    type: "add" | "remove";
    hero: Hero;
}

export function TransferCard({ unselectedStoreFunction, hero, type }: TransferCardProps) {
    const { removeToBackLog } = useHeroStore();
    const [selected, setSelected] = useState(false);
    const { selectedGroup } = useGroupStore();
    const { handleError } = useAlertError();
    const handleFunction = () => {
        selected ? removeToBackLog(hero, type) : unselectedStoreFunction(hero, selectedGroup, handleError);
        if (selectedGroup !== undefined) setSelected(!selected);
    };
    const borderColor = selected ? "#E05E00" : "transparent";

    useEffect(() => {
        setSelected(false);
    }
        , [hero]);

    return (
        <div
            className="bg-white bg-opacity-10 w-[98%] pt-2 pb-2 pl-5 pr-5 flex gap-5 items-center cursor-pointer"
            style={{ border: `1px solid ${borderColor}` }}
            onClick={handleFunction}
        >
            <div className="bg-white w-10 h-10 rounded-full">
                <img className="w-full h-full rounded-full" src={hero.image} alt={hero.name} />
            </div>
            <div>
                <p>{hero.name}</p>
            </div>
        </div>
    );
}
