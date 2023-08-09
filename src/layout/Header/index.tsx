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
                    <AiOutlineMenu className="fill-gray" size={20} />
                    <FaUserCircle className="fill-gray" size={20} />
                    {isOpen && (
                        <div
                            className="absolute rounded-[40px] top-11 left-0 w-full text-purple font-medium text-sm text-center shadow-lg p-2"
                            onClick={handleLogoutClick}
                        >
                            Logout
                        </div>
                    )}
                </div>
            ) : (
                <Link className="text-purple font-medium text-sm" href="/auth/login">
                    Login
                </Link>
            )}
        </div>
    );
}
