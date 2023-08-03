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
        <div className="p-5 flex justify-between items-center">
            <div className="w-[80] h-[80]">
                <Image src="/logo.png" alt="Logo" width={80} height={80} />
            </div>

            {isLogged ? (
                <div
                    className="flex gap-4 relative rounded-[40px] border border-lightGray p-2 cursor-pointer"
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
