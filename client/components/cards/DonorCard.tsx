import Image from 'next/image';
import React from 'react';

function DonorCard({ donor }: { donor: any }) {

    return (
        <div className="flex gap-[17px] pb-3 border-b border-white">
            <div className="h-12 relative w-12 rounded-[50%] overflow-hidden ">
                <Image className="h-fit" src={donor.user.dp} fill layout='cover' alt="" />
            </div>
            <div className="">
                <p className="font-inter text-[14px] font-[500] leading-5 capitalize">{donor.user.email}</p>
                <p className="font-inter text-[13.5px] leading-5 italic">{donor.user.walletAddress}</p>
                <p className="font-inter text-[13px] leading-5 pt-2">{donor.amount}</p>
            </div>
        </div>
    );
}

export default DonorCard;