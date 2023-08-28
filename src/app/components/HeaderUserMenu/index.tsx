'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import OutsideClickDetector from '@/hooks/useOutsideClick';
import Link from 'next/link';

type HeaderUserMenuProps = {
    isLogged: boolean;
};

export default function HeaderUserMenu({ isLogged: defaultIsLogged }: HeaderUserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(defaultIsLogged);
    const { logout, user } = useAuth();
    const { push } = useRouter();

    useEffect(() => {
        setIsLogged(!!user);
    }, [user]);

    const handleMenuClick = () => setIsOpen((prevState) => !prevState);

    const handleOutsideClick = () => setIsOpen(false);

    const handleLogoutClick = () => {
        console.log('handleLogoutClick');
        logout();
    };
    const handleMyTripsClick = () => push('/client/orders');

    return (
        <>
            {isLogged ? (
                <div
                    className="relative cursor-pointer rounded-[40px] border border-lightGray p-2"
                    onClick={handleMenuClick}
                >
                    <div className="flex gap-4">
                        <AiOutlineMenu className="fill-gray" size={20} />
                        <FaUserCircle className="fill-gray" size={20} />
                    </div>
                    {isOpen && (
                        <OutsideClickDetector callback={handleOutsideClick}>
                            <div className="absolute right-0 top-11 z-50 w-[150px] rounded-md bg-white text-center text-sm font-medium text-purple shadow-lg outline outline-1 outline-lightGray">
                                <ul className="divide-y divide-lightGray text-start [&>li>button:hover]:bg-zinc-100 [&>li>button]:w-full [&>li>button]:px-3 [&>li>button]:py-2">
                                    <li>
                                        <button onClick={handleMyTripsClick}>Minhas viagens</button>
                                    </li>
                                    <li>
                                        <button onClick={handleLogoutClick}>Sair</button>
                                    </li>
                                </ul>
                            </div>
                        </OutsideClickDetector>
                    )}
                </div>
            ) : (
                <Link className="text-sm font-medium text-purple" href="/auth/login">
                    Login
                </Link>
            )}
        </>
    );
}
