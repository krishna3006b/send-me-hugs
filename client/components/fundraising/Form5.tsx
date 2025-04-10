"use client";

import React from 'react';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import { useRouter } from 'next/navigation';
import FormNavbar from './FormNavbar';

function Step5({ swiper, formData, handleChange }: any) {
  const router = useRouter();

  const { title, story } = formData;

  return (
    <div className="flex create-popup-slide flex-col gap-3 justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
      <div className="flex flex-col gap-[44px]">
        <FormNavbar/>
        <p className="text-black text-[16px] font-bold leading-6 font-inter">4 of 5</p>
        <div className="flex flex-col gap-[43px]">
          <div className="flex flex-col gap-5 max-w-[415px]">
            <h2 className="text-black font-bold text-[21px] font-inter leading-[101%]">Tell us why you’re fundraising</h2>
          </div>
          <div className="form-group h-[64px] flex justify-end flex-col relative w-full">
            <input type="text" id="title" name="title" value={title} onChange={handleChange} placeholder="Donate to help..." className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 w-full px-1" />
            <label htmlFor="title" className="form-label bg-white text-[12px] font-[500]">Fundraiser title</label>
          </div>
          <div className="form-group h-[64px] flex justify-end flex-col relative w-full">
            <textarea id="story" name="story" value={story} onChange={handleChange} placeholder="Hi, my name is John and I’m fundraising for" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 w-full px-1" />
            <label htmlFor="story" className="form-label textarea-label bg-white text-[12px] font-[500]">Tell your story</label>
          </div>

        </div>
      </div>
      <div className="bottom-buttons flex justify-between items-center pt-5">
        <BackButton swiper={swiper} />
        <ContinueButton swiper={swiper} text="Review" disable={title && story ? false : true} />
      </div>
    </div>
  );
}

export default Step5;
