import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderUserMenu from '@/app/components/HeaderUserMenu';
import { verifySession } from '@/services/users';
import { cookies } from 'next/headers';

export default async function Header() {
    const user = await verifySession(cookies().get('trips_token')?.value);

    return (
        <header className="container m-auto flex items-center justify-between border-b border-lightGray p-5">
            <Link href="/">
                <div className="relative h-[30px] w-[80px]">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
            </Link>

            <HeaderUserMenu isLogged={!!user} />
        </header>
    );
}
