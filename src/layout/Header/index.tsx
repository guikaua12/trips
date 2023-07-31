'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useSession } from '@/hooks/useSession';
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user } = useSession();

    function handleMenuClick() {
        setIsOpen((prevState) => !prevState);
    }

    function handleLogoutClick() {
        localStorage.removeItem('session');
        localStorage.removeItem('user');
    }

    return (
        <div className="p-5 flex justify-between items-center">
            <div className="w-[150] h-[150]">
                <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </div>

            {isAuthenticated() ? (
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
