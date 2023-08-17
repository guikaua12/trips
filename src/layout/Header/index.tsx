'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import OutsideClickDetector from '@/hooks/useOutsideClick';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLogged, logout } = useAuth();
    const { push } = useRouter();

    const handleMenuClick = () => setIsOpen((prevState) => !prevState);

    const handleOutsideClick = () => setIsOpen(false);

    const handleLogoutClick = () => logout();
    const handleMyTripsClick = () => push('/client/orders');

    return (
        <header className="container m-auto flex items-center justify-between border-b border-lightGray p-5">
            <Link href="/">
                <div className="relative h-[30px] w-[80px]">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
            </Link>

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
                                <ul className="divide-y divide-lightGray text-start [&>li:hover]:bg-zinc-100 [&>li]:px-3 [&>li]:py-2">
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
        </header>
    );
}
