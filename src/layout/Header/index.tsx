import React from 'react';
import Image from 'next/image';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
    return (
        <div className="p-5 flex justify-between items-center">
            <div className="w-[150] h-[150]">
                <Image src="/logo.png" alt="Logo" width={150} height={150}></Image>
            </div>

            <div className="flex gap-4 rounded-[40px] border border-lightGray p-2 cursor-pointer">
                <AiOutlineMenu className="fill-gray" size={20} />
                <FaUserCircle className="fill-gray" size={20} />
            </div>
        </div>
    );
}
