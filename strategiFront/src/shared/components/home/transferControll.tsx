import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHeroStore } from 'src/shared/store/useHeroStore';
library.add(faChevronLeft);
library.add(faChevronRight);
import { useAlertError } from 'src/shared/store/useAlertError';

interface TransferControllProps {
    transferReverse: () => void;
    transferForward: () => void;
}

export function TransferControll(
    {
        transferReverse,
        transferForward
    }: TransferControllProps
) {
    const { setChanges, addGroupBacklog, removeGroupBacklog } = useHeroStore();
    const { handleError } = useAlertError();
    const handleReverse = () => {
        if(removeGroupBacklog.length === 0) return handleError({message: "Não há heróis para serem removidos", status: "error"})
        transferReverse();
        setChanges(true);
    }

    const handleForward = () => {
        if(addGroupBacklog.length === 0) return handleError({message: "Não há heróis para serem adicionados", status: "error"})
        setChanges(true);
        transferForward();
    }

    return (
        <div className=" w-2/5 h-[60vh] gap-10 flex flex-col text-gray-50 justify-center items-center">
            <div className='w-10 p-4 h-12 bg-[#303030] hover:bg-[#36363F] cursor-pointer flex justify-center rounded-lg'
                onClick={handleReverse}
            >
                <div className='w-5'>
                    <FontAwesomeIcon icon="chevron-left" />
                </div>
            </div>
            <div className='w-10 p-4 h-12 bg-[#303030] hover:bg-[#36363F] cursor-pointer flex justify-center rounded-lg'
                onClick={handleForward}
            >
                <div className='w-5'>
                    <FontAwesomeIcon icon="chevron-right" />
                </div>
            </div>
        </div>
    )
}