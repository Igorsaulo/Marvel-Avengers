'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "./loading";
import { useAlertError } from "../store/useAlertError";

library.add(faCircleCheck);
library.add(faCircleExclamation);

export function Status() {
    const { initialState } = useAlertError();
    const { message, status } = initialState
    const statusInfo = {
        error: {
            color: "customRed",
            icon: faCircleExclamation
        },
        success: {
            color: 'customGreen',
            icon: faCircleCheck
        },
        load: {
            color: 'customOrange',
            icon: <Loading />
        }
    };

    return (
        <div className={`absolute bottom-5 left-[5vw] bg-[#303030] w-[30vw] p-2 rounded-md flex justify-between`}>
            <div className={`text-${statusInfo[status].color}`}>
                <p>{message}</p>
            </div>
            <div className="h-5">
                {status === 'load' ? (
                    statusInfo[status].icon
                ) : (
                    <p> <FontAwesomeIcon className={`text-[${statusInfo[status].color}]`} icon={statusInfo[status].icon} /></p>
                )}
            </div>
        </div>
    );
}
