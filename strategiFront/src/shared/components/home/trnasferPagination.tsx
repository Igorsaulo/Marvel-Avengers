import { ReactNode, useEffect } from "react";

interface TransferPaginationProps {
    paginationFunction: (page: number, limit: number) => void;
    control: {
        page: number;
        limit: number;
        totalPage?: number;
    };
}

export function TransferPagination({ paginationFunction, control }: TransferPaginationProps) {
    const { page, limit, totalPage } = control;

    const handleNextPage = () => {
        if (page < (totalPage || 1)) {
            paginationFunction(page + 1, limit);
        }
    }

    const handlePrevPage = () => {
        if (page > 1) {
            paginationFunction(page - 1, limit);
        }
    }

    const handleLimit = (limit: number) => {
        paginationFunction(1, limit);
    }

    const renderPageButtons = () => {
        const startPage = Math.floor((page - 1) / 5) * 5 + 1;
        const maxButtons = Math.min(5, typeof totalPage === 'number' ? totalPage : 1);

        return Array.from({ length: maxButtons }).map((_, index) => {
            const pageNumber = startPage + index;
            return (
                pageNumber + 1 <= (totalPage || 1) && (
                    <button
                        key={pageNumber}
                        className={`text-gray-50 h-7 w-7 justify-center items-center flex ${pageNumber === page ? 'bg-[#E05E00]' : 'bg-[#303030]'}`}
                        onClick={() => paginationFunction(pageNumber, limit)}
                    >
                        {pageNumber}
                    </button>
                )
            );
        });
    }

    return (
        <div className="bg-[#191919] mr-10 w-[95.5%] max-w-[95.5%] pt-2 pb-2 pl-5 flex gap-2 items-center h-10 absolute bottom-0 z-30 justify-end">
            <div className="flex gap-2">
                <select
                    className="bg-[#303030] text-gray-50 h-7 w-15"
                    onChange={(e) => handleLimit(parseInt(e.target.value))}
                >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="flex gap-2">
                <button className="bg-[#303030] text-gray-50 h-7 w-7 justify-center items-center flex" onClick={handlePrevPage}> &lt; </button>
                {renderPageButtons()}
                <button className="bg-[#303030] text-gray-50 h-7 w-7 justify-center items-center flex" onClick={handleNextPage}> &gt; </button>
            </div>
        </div>
    );
}
