"use client";

import React from 'react';
import { FormLogo } from '@/assets';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Step7() {
    const router = useRouter();

    return (
        <div className="flex create-popup-slide flex-col justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
            <div className="">
                <div className="flex w-[100%] justify-between items-center h-[30px]">
                    <Image src={FormLogo} alt="SendMeHugs Form Logo" />
                </div>
            </div>
            <div className="flex create-popup-content flex-col gap-[30px] h-[calc(100vh_-_30px)] justify-center items-center">
                <div className="flex flex-col items-center gap-7">
                    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="56" viewBox="0 0 57 56" fill="none">
                        <path d="M12.1665 27.9987L23.8332 39.6654L44.8332 16.332" stroke="#13A95E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="font-inter text-black text-center text-[24px] font-bold leading-[100%]">Your fundraser is ready to share</p>
                </div>
                <div className="flex gap-[14px] w-[100%] sm:flex-row flex-col  items-center justify-center">
                    <p onClick={()=>router.push('/')} className="py-2 px-3 w-[100%] sm:w-[170px] text-[#298D7C] font-[500]  cursor-pointer leading-6 text-[16px] text-center font-popins border-[#298D7C] border-2 rounded-[36px] bg-[rgba(229,248,244,0.70)]">Skip</p>
                    <p onClick={()=>router.push('/fundraisers')} className="py-2 px-3 w-[100%] sm:w-[170px] text-[#fff] font-[500]  leading-6 text-[16px] text-center font-popins rounded-[36px] bg-gradient-cyan cursor-pointer">Share</p>
                </div>
            </div>
        </div>
    );
}

export default Step7;
