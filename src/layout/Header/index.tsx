'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLogged, logout } = useAuth();

    function handleMenuClick() {
        setIsOpen((prevState) => !prevState);
    }

    function handleLogoutClick() {
        logout();
    }

    return (
        <div className="container m-auto flex items-center justify-between p-5">
            <Link href="/">
                <div className="relative h-[30px] w-[80px]">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
            </Link>

            {isLogged ? (
                <div
                    className="relative flex cursor-pointer gap-4 rounded-[40px] border border-lightGray p-2"
                    onClick={handleMenuClick}
                >
                    <div className="flex gap-4">
                        <AiOutlineMenu className="fill-gray" size={20} />
                        <FaUserCircle className="fill-gray" size={20} />
                    </div>
                    {isOpen && (
                        <div
                            className="absolute left-0 top-11 z-50 w-full rounded-[40px] bg-white p-2 text-center text-sm font-medium text-purple shadow-lg"
                            onClick={handleLogoutClick}
                        >
                            Logout
                        <div className="absolute right-0 top-11 z-50 w-[150px] rounded-md bg-white text-center text-sm font-medium text-purple shadow-lg outline outline-1 outline-lightGray">
                            <ul className="divide-y divide-lightGray text-start [&>li:hover]:bg-zinc-100 [&>li]:px-3 [&>li]:py-2">
                                <li>
                                    <button onClick={handleLogoutClick}>Sair</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <Link className="text-sm font-medium text-purple" href="/auth/login">
                    Login
                </Link>
            )}
        </div>
    );
}
