import React from 'react';
import { FormLogo, fundLoader } from '@/assets';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Step8() {
    const router = useRouter();;
    return (
        <div className="flex create-popup-slide flex-col justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
            <div className="">
                <div className="flex w-[100%] justify-between items-center h-[30px]">
                    <Image src={FormLogo} alt="SendMeHugs Form Logo" />
                </div>
            </div>
            <div className="create-popup-content flex flex-col gap-[30px] h-[calc(100vh_-_30px)] justify-center items-center">
                <div className="flex flex-col items-center justify-center gap-7">
                    <Image src={fundLoader} alt="Loader..." />

                    <p className="font-inter text-black text-center text-[24px] font-bold leading-[100%]">Your verification is still in progress</p>
                </div>
                <div className="flex gap-[14px] w-[100%] sm:flex-row flex-col  items-center justify-center">
                    <p className="py-2 px-3 w-[100%] sm:w-[343px] text-[#fff] font-[500]  leading-6 text-[16px] text-center font-popins rounded-[36px] bg-gradient-cyan" onClick={() => router.push("/")}>Close</p>
                </div>
            </div>
        </div>
    );
}

export default Step8;