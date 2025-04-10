"use client";

import React, { useEffect, useState } from 'react';
import { FormLogo } from '@/assets';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FormNavbar from './FormNavbar';

function Step1({ swiper, formData, handleChange }: any) {

    const router = useRouter();

    const { category, country, pincode } = formData

    return (
        <div className="flex create-popup-slide flex-col gap-3 justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
            <div className="">
                <FormNavbar />
                <div className="create-popup-content pt-[115px] flex flex-col gap-[43px] ">
                    <div className="flex flex-col gap-[21px]">
                        <h2 className="text-black font-bold text-[21px] font-inter">Where will the funds go?</h2>
                        <p className="text-[14px] leading-5 font-inter">Choose the location where you plan to withdraw your funds.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="relative max-w-[334px] w-[100%] h-[64px]">
                            <select name="country" value={formData.country} onChange={handleChange} className="relative w-[100%] outline-none border-b border-b-[#D0D2D5] h-[auto] py-2.5 placeholder:text-[14px] placeholder:leading-5 select-countries">
                                <option value="">Select Country</option>
                                <option value="IN">India</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className="form-group h-[64px] flex justify-end flex-col relative">
                            <input type="number" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Eg: 250005" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                            <label htmlFor="pincode" className="form-label bg-white text-[12px] font-[500]">Zip Code</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[21px]">
                        <p className="text-black font-[500] text-[16px] font-inter leading-5">What best describes why you&apos;re fundraising?</p>
                        <div className="flex flex-wrap gap-[11px]">
                            <input type="radio" className="hidden" id="project" name="category" value="Project" onChange={handleChange} />
                            <label htmlFor="project" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category == "Project" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Project</label>
                            <input type="radio" className="hidden" id="business" name="category" value="Business" onChange={handleChange} />
                            <label htmlFor="business" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Business" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Business</label>
                            <input type="radio" className="hidden" id="community" name="category" value="Community" onChange={handleChange} />
                            <label htmlFor="community" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Community" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Community</label>
                            <input type="radio" className="hidden" id="volunteer" name="category" value="Volunteer" onChange={handleChange} />
                            <label htmlFor="volunteer" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Volunteer" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Volunteer</label>
                            <input type="radio" className="hidden" id="environment" name="category" value="Environment" onChange={handleChange} />
                            <label htmlFor="environment" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Environment" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Environment</label>
                            <input type="radio" className="hidden" id="funerals&memorials" name="category" value="Funerals & Memorials" onChange={handleChange} />
                            <label htmlFor="funerals&memorials" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Funerals & Memorials" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Funerals & Memorials</label>
                            <input type="radio" className="hidden" id="ukraine-relief" name="category" value="Ukraine Relief" onChange={handleChange} />
                            <label htmlFor="ukraine-relief" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Ukraine Relief" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Ukraine Relief</label>
                            <input type="radio" className="hidden" id="events" name="category" value="Events" onChange={handleChange} />
                            <label htmlFor="events" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Events" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Events</label>
                            <input type="radio" className="hidden" id="monthly-bills" name="category" value="Monthly Bills" onChange={handleChange} />
                            <label htmlFor="monthly-bills" className={`py-1.5 gap-1 flex justify-center items-center w-fit rounded-[36px] font-popins text-[14px] text-center font-[500] leading-6 border border-[#6B6B6B] ${category === "Monthly Bills" ? "bg-[rgb(98,98,98)] text-white" : ""} px-2`}>Monthly Bills</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-buttons flex justify-between items-center pt-5">
                <BackButton onClick={() => swiper.current?.slidePrev()} />
                <ContinueButton swiper={swiper} disable={(country && pincode && category) ? false : true} />
            </div>
        </div>
    );
}

export default Step1;

