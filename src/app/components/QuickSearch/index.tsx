import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import QuickSearchItem from '@/components/QuickSearchItem';
import { LiaBuildingSolid } from 'react-icons/lia';

export default function QuickSearch() {
    return (
        <div className="container m-auto flex flex-col items-center p-4 text-gray">
            <SectionTitle className="mb-3">Tente pesquisar por</SectionTitle>
            <ul className="flex w-full justify-between">
                <li>
                    <QuickSearchItem icon={<LiaBuildingSolid size={30}></LiaBuildingSolid>}>Resorts</QuickSearchItem>
                </li>
                <li>
                    <QuickSearchItem icon={<LiaBuildingSolid size={30}></LiaBuildingSolid>}>Chalés</QuickSearchItem>
                </li>
                <li>
                    <QuickSearchItem icon={<LiaBuildingSolid size={30}></LiaBuildingSolid>}>Pousadas</QuickSearchItem>
                </li>
                <li>
                    <QuickSearchItem icon={<LiaBuildingSolid size={30}></LiaBuildingSolid>}>Fazendas</QuickSearchItem>
                </li>
            </ul>
        </div>
    );
}
