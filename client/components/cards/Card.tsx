import React from 'react';
import { facebook, instagram, twitter } from '@/assets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fundraising } from '@/interfaces';

function Card({ card }: { card: Fundraising }) {

    const router = useRouter();

    return (
        <div onClick={() => router.push(`/donation/${card.id}`)} className={`flex flex-col p-3 gap-[27px] text-white font-inter bg-[rgba(50,87,101,0.50)] rounded-[8px] `}>
            <div className="h-full flex flex-col gap-3">
                <div className="relative h-[130px] w-full">
                    <Image fill layout='cover' className="w-full" src={card.thumbnail} alt={card.title} />
                </div>
                <h3 className="font-[700] text-[20px] line-clamp-1 leading-8">{card.title}</h3>
                <p className="font-[400] text-[14px] line-clamp-2">{card.story}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="py-2 px-3 flex justify-center items-center font-popins text-[16px] bg-[#648997] font-[500] gap-[6px] rounded-[36px] w-fit hover:cursor-pointer">Donate</div>
                <div className="font-inter text-[14px] font-[500] flex justify-center items-center gap-5">
                    <p className="hover:cursor-pointer">Share</p>
                    <div className="flex justify-center items-center gap-[13px]">
                        <Image src={instagram} alt="Instagram Icon" />
                        <Image src={twitter} alt="Twitter Icon" />
                        <Image src={facebook} alt="Facebook Icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;