"use client";

import React, { useState } from 'react';
import ContinueButton from './ContinueButton';
import BackButton from './BackButton';
import { edit } from '@/assets';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FormNavbar from './FormNavbar';

function Step6({ swiper, formData, handleChange ,handleSubmit}: any) {
  const router = useRouter();

  const { country, pincode, category,  amount, thumbnail, title, story } = formData;

  const defaultLoc = `${pincode} - ${country}`

  const [checkedTitle, setCheckedTitle] = useState(false)
  const [checkedAmount, setCheckedAmount] = useState(false)
  const [checkedCategory, setCheckedCategory] = useState(false)
  const [checkedStory, setCheckedStory] = useState(false);

  return (
    <div className="flex create-popup-slide flex-col justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
      <div className="flex flex-col gap-[44px]">
        <FormNavbar />
        <p className="text-black text-[16px] font-bold leading-6 font-inter">5 of 5</p>
        <div className="flex flex-col gap-[43px]">
          <div className="flex flex-col gap-5">
            <h2 className="text-black font-bold text-[21px] font-inter leading-[101%]">You’re ready to start fundraising</h2>
            <p className="font-popins text-[14px] leading-6 text-[#676767]">Preview what your fundraiser will look like to donors or revise any details.</p>
          </div>
          <div className="flex flex-col gap-[43px]">
            <div className="w-[100%] h-[360px] rounded-lg relative">
              {thumbnail && <Image src={URL.createObjectURL(thumbnail)} fill objectFit='cover' className="w-[100%] h-[100%] rounded-lg" alt="" />}
            </div>
            <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative" onBlur={() => setCheckedTitle(false)}>
              <input type="text" id="title-2" className={`step-form-input ${!checkedTitle && "hidden"}`} defaultValue={title} onChange={handleChange} />
              <p className={`step-form-input ${checkedTitle && "hidden"}`}>{title}</p>
              <label htmlFor="title-2" className="step-form-label w-[80%]">Fundraiser title</label>
              <Image src={edit} alt='Edit' className="absolute right-0 bottom-2.5 text-[14px] leading-5 text-[#868C93] font-roboto bg-white w-[15px] text-right" onClick={() => swiper.current.swiper.slideTo(4)} />
            </div>
            <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative" onBlur={() => setCheckedAmount(false)}>
              <input type="number" id="amount-2" className={`step-form-input ${!checkedAmount && "hidden"}`} defaultValue={amount} onChange={handleChange} />
              <p className={`step-form-input ${checkedAmount && "hidden"}`}>$ {amount}</p>
              <label htmlFor="amount-2" className="step-form-label w-[80%]">Goal</label>
              <Image src={edit} alt='Edit' className="absolute right-0 bottom-2.5 text-[14px] leading-5 text-[#868C93] font-roboto bg-white w-[15px] text-right" onClick={() => swiper.current.swiper.slideTo(2)} />
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-[43px]">

              <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative">
                <input type="text" id="category-2" className={`step-form-input ${!checkedCategory && "hidden"}`} defaultValue={category} onChange={handleChange} />
                <p className={`step-form-input ${checkedCategory && "hidden"}`}>{category}</p>
                <label htmlFor="category-2" className="step-form-label w-[80%]">Category</label>
                <Image src={edit} alt='Edit' className="absolute right-0 bottom-2.5 text-[14px] leading-5 text-[#868C93] font-roboto bg-white w-[15px] text-right" onClick={() => swiper.current.swiper.slideTo(0)} />
              </div>

              <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative">
                <p className={`step-form-input`}>{defaultLoc}</p>
                <label htmlFor="location" className="step-form-label w-[80%]">Location</label>
                <Image src={edit} alt='Edit' className="absolute right-0 bottom-2.5 text-[14px] leading-5 text-[#868C93] font-roboto bg-white w-[15px] text-right" onClick={() => swiper.current.swiper.slideTo(0)} />
              </div>

            </div>
            <div className="w-[100%] min-h-[64px] step-form-div flex justify-between flex-col relative">
              <label htmlFor="story-2" className="w-[100%] font-roboto text-[14px] font-[500] leading-5 text-[#686F78]">Story</label>
              <textarea id="story-2" className={`step-form-input ${!checkedStory && "hidden"}`} defaultValue={story} onChange={handleChange} />
              <p className={`step-form-input ${checkedStory && "hidden"}`}>{story}</p>
              <Image src={edit} alt='Edit' className="absolute right-0 top-2.5 text-[14px] leading-5 text-[#868C93] font-roboto bg-white w-[15px] text-right" onClick={() => swiper.current.swiper.slideTo(4)} />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-buttons flex justify-between items-center pt-5">
        <BackButton swiper={swiper} text="Preview" />
        <ContinueButton swiper={swiper} text="Verify To Launch" handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Step6;
