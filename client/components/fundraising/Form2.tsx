"use client";

import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import { useRouter } from 'next/navigation';
import FormNavbar from './FormNavbar';

function Step2({ swiper, formData, handleChange }: any) {

    const router = useRouter();

    const { fundraisingFor } = formData;

    return (
        <div className="create-popup-slide flex flex-col gap-3 justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
            <div className="flex flex-col gap-[44px]">
            <FormNavbar/>
                <p className="text-black text-[16px] font-bold leading-6 font-inter">1 of 5</p>
                <div className="flex flex-col gap-[43px]">
                    <h2 className="text-black font-bold text-[21px] font-inter leading-[65.5%]">Who are you fundraising for?</h2>
                    <div className="flex flex-col gap-5">
                        <input checked={fundraisingFor === "yourself"} type="radio" name="fundraisingFor" className="hidden" id="yourself" value="yourself" onChange={handleChange} />
                        <label htmlFor="yourself" className={`pt-2 pb-3 rounded-lg border-[#D0D0D0] border  ${fundraisingFor == "yourself" ? "outline-2 outline outline-[#D0D0D0]" : ""}`}>
                            <div className="max-w-[329px] flex flex-col justify-center gap-1.5 px-[11px]">
                                <p className="text-black text-[16px]  font-bold leading-6 font-inter">Yourself</p>
                                <p className="text-black font-inter text-[14px] leading-5">Funds are delivered to your bank account for your own use</p>
                            </div>
                        </label>
                        <input checked={fundraisingFor === "Someone else"} type="radio" name="fundraisingFor" className="hidden" id="someone-else" value="Someone else" onChange={handleChange} />
                        <label htmlFor="someone-else" className={`pt-2 pb-3 rounded-lg border-[#D0D0D0] border  ${fundraisingFor == "Someone else" ? "outline-2 outline outline-[#D0D0D0]" : ""}`}>
                            <div className="max-w-[329px] flex flex-col justify-center gap-1.5 px-[11px]">
                                <p className="text-black text-[16px]  font-bold leading-6 font-inter">Someone else</p>
                                <p className="text-black font-inter text-[14px] leading-5">You’ll invite a beneficiary to receive funds or distribute them yourself</p>
                            </div>
                        </label>
                        <input checked={fundraisingFor === "charity"} type="radio" name="fundraisingFor" className="hidden" id="charity" value="charity" onChange={handleChange} />
                        <label htmlFor="charity" className={`pt-2 pb-3 rounded-lg border-[#D0D0D0] border  ${fundraisingFor == "charity" ? "outline-2 outline outline-[#D0D0D0]" : ""}`}>
                            <div className="max-w-[329px] flex flex-col justify-center gap-1.5 px-[11px]">
                                <p className="text-black text-[16px]  font-bold leading-6 font-inter">Charity</p>
                                <p className="text-black font-inter text-[14px] leading-5">Funds are delivered to your chosen nonprofit for you</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="bottom-buttons flex justify-between items-center pt-5">
                <BackButton swiper={swiper} />
                <ContinueButton swiper={swiper} disable={fundraisingFor ? false : true} />
            </div>
        </div>
    );
}

export default Step2;