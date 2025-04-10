"use client";

import React, { useEffect, useState } from 'react';
import ContinueButton from './ContinueButton';
import BackButton from './BackButton';
import { useRouter } from 'next/navigation';
import FormNavbar from './FormNavbar';

function Step3({ swiper, formData, handleChange }:any) {

    const router = useRouter();
    
    const {amount} = formData;

    return (
        <div className="flex create-popup-slide flex-col gap-3 justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
            <div className="flex flex-col gap-[44px]">
               
                <FormNavbar/>
                <p className="text-black text-[16px] font-bold leading-6 font-inter">2 of 5</p>
                <div className="flex flex-col gap-[43px]">
                    <div className="flex flex-col gap-5 max-w-[415px]">
                        <h2 className="text-black font-bold text-[21px] font-inter leading-[101%]">How much would you like to rise?</h2>
                        <p className="font-popins text-[14px] leading-6 text-[#676767]">Fundraisers like yours typically aim to raise $13,000 or more.
                            Based on goals for similar fundraisers</p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="form-group h-[64px] flex justify-end flex-col relative">
                            <input type="number" id="amount" name="amount" value={amount>0?amount:''} onChange={handleChange} placeholder="Enter amount" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                            <label htmlFor="amount" className="form-label bg-white text-[12px] font-[500]">Enter amount</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-buttons flex justify-between items-center pt-5">
                <BackButton swiper={swiper} />
                <ContinueButton swiper={swiper} disable={amount ? false : true} />
            </div>
        </div>
    );
}

export default Step3;