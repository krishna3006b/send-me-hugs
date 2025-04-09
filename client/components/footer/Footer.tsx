import React from 'react';
import { logo } from '@/assets';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
    return (
        <footer className="mx-auto 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px]  pt-4 sm:pt-5 pb-[32px] md:pb-[12px] xss:pb-5 text-white flex justify-between flex-col md:flex-row  lg:gap-0 md:gap-10 ">
            <div className="footer-logo pb-[14px]">
                <Image src={logo} alt="Logo" />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 xlg:gap-10 md:gap-4 gap-10">
                <div className="flex flex-col gap-2 items-start col-span-1 " >
                    <h4 className="font-inter text-[14px] font-bold leading-6 px-[9px]">Fundraise for</h4>
                    <div className="">
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Medical</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Emergency</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Memorial</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Education</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-start col-span-1">
                    <h4 className="font-inter text-[14px] font-bold leading-6 px-[9px]">Learn more</h4>
                    <div className="">
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">How GoFundMe Works</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Why GoFundMe</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Common Questions</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Charity Fundraising</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-start col-span-1">
                    <h4 className="font-inter text-[14px] font-bold leading-6 px-[9px]">Resources</h4>
                    <div className="">
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Help center</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">Blog</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">GoFundMe Stories</Link>
                        <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-[rgba(255,255,255,0.60)] px-[9px] py-[5px] flex items-center">About</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default Footer;