import { useState, useEffect, useRef } from "react";
import { useAuth } from "../store/useAuth"

export function Navbar() {
    const { logout } = useAuth();
    const { profile } = useAuth();
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
    }

    const handleDropDown = () => {
        setDropdown(!dropdown)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdown(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <div
                ref={dropdownRef}
                className="absolute top-10 right-20 text-gray-50 bg-[#303030] pt-2 pb-2 pl-4 pr-4 rounded-lg cursor-pointer"
            >
                <div>
                    <p onClick={handleDropDown}>{profile.user}</p>
                </div>
                {dropdown && (
                    <>
                        <div className="h-[1px] bg-[#222222] w-full" />
                        <div className="text-gray-50 hover:text-[#141414]">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}