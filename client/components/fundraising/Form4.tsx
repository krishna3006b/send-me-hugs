"use client";

import React from 'react';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import { defImg, edit, trash } from '@/assets';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FormNavbar from './FormNavbar';

function Step4({ swiper, formData, setFormData, handleChange }: any) {

  const router = useRouter();

  const { thumbnail } = formData;

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    (document.getElementById("thumbnail") as HTMLInputElement).files = dataTransfer.files;
  };

  const clearThumbnail = () => {
    (document.getElementById("thumbnail") as HTMLInputElement).files = null
    setFormData((p: any) => ({ ...p, thumbnail: null }))
  }

  return (
    <div className="flex create-popup-slide flex-col justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
      <div className="flex flex-col gap-[44px]">
        <FormNavbar />
        <p className="text-black text-[16px] font-bold leading-6 font-inter">3 of 5</p>
        <div className="flex flex-col gap-[43px]">
          <div className="flex flex-col gap-5 max-w-[415px]">
            <h2 className="text-black font-bold text-[21px] font-inter leading-[101%]">Add a cover photo</h2>
            <p className="font-popins text-[14px] leading-6 text-[#676767]">Use clear and bright photo helps people connect to your fundraiser instantly.</p>
          </div>
          <div className="relative">

            <input type="file" className="z-[2] opacity-0 h-[360px] relative w-[100%] " id="thumbnail"
              accept="image/*"
              name="thumbnail"
              onChange={handleChange}
              onDragOver={handleDragOver}
              onDrop={handleDrop} />
            <div className="flex w-[100%] z-[1] absolute top-0">

              {
                !thumbnail ?
                  <label htmlFor="thumbnail" className="border-dashed border-2  w-[100%] h-[360px] border-gray-400 flex flex-col justify-center items-center gap-[39px]"              >
                    <Image src={defImg} alt="Default Image Icon" />
                    <p className="leading-6 text-[14px] font-popins text-[#676767] flex flex-wrap justify-center">
                      Drag or upload your photo here
                    </p>
                  </label> :
                  <div className="rounded-lg w-[100%] h-[360px] border-gray-400 flex flex-col justify-center items-center gap-[39px]">
                    <Image src={URL.createObjectURL(thumbnail)} fill objectFit='cover' className="rounded-lg bg-contain w-[100%] h-[100%]" alt="Preview Image" />
                  </div>
              }

            </div>
            {
              thumbnail && <div className="flex justify-between pt-2 px-1.5"><Image src={edit} alt='Edit' onClick={clearThumbnail} /><Image src={trash} alt='Trash' onClick={clearThumbnail} /></div>
            }
            {/* <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative">
              <p className="my-2 leading-6 text-[14px] font-popins text-[#676767] flex flex-wrap justify-center">OR</p>
              <div className="flex">
                <p className="text-[14px] leading-5 text-[#868C93] font-roboto bg-white w-[25px] text-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M11.7676 8.23047L8.23204 11.766" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8.61114 5.83466L10 4.44576C11.5342 2.91163 14.0215 2.91163 15.5556 4.44576V4.44576C17.0898 5.9799 17.0898 8.46722 15.5556 10.0014L14.1667 11.3903" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11.3889 14.1653L9.99996 15.5542C8.46583 17.0884 5.97851 17.0884 4.44437 15.5542V15.5542C2.91024 14.0201 2.91024 11.5328 4.44437 9.99865L5.83327 8.60975" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </p>
                <input type="text" name="youtube" onChange={handleChange} id="youtube" className="step-form-input" placeholder="Enter youtube link" />

                <label htmlFor="youtube" className="step-form-label left-[25px] w-[80%]">Add a youtube link</label>
              </div>

            </div> */}
          </div>

        </div>
      </div>
      <div className="bottom-buttons flex justify-between items-center pt-5">
        <BackButton swiper={swiper} />
        <ContinueButton swiper={swiper} disable={!thumbnail} />
      </div>
    </div>
  );
}

export default Step4;
