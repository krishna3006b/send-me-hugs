import React from 'react';
import { discord, instagram, privacy, telegram, twitter, youtube } from '@/assets';
import Link from 'next/link';
import Image from 'next/image';

function FooterBottom() {
    return (
        <>
            <div className="mx-auto 2xl:px-[196px] lg:px-[32px] xl:px-[96px] px-[16px] min-h-[34px] flex justify-between text-white md:pb-3 pb-[22px] items-center flex-col md:flex-row gap-[22px]">
                <div className="font-inter text-[12px] font-[400] leading-6 flex items-center flex-col md:flex-row">
                    <span className="font-inter text-[12px] font-[400] leading-6 hidden xl:inline-block">© 2010-2024 GoFundMe</span>
                    <Link href="/" className="p-[5px_9px]">Terms</Link>
                    <Link href="/" className="p-[5px_9px]">Privacy</Link>
                    <Link href="/" className="p-[5px_9px]">Legal</Link>
                    <Link href="/" className="p-[5px_9px]">Accessibility Statement</Link>
                    <Image src={privacy} alt="Privacy" />
                </div>
                <div className="flex gap-5 items-center">
                    <p className="font-inter text-[14px] font-[400] leading-4">Follow us</p>
                    <div className="flex items-center gap-[13px]">
                        <Image src={discord} alt="Discord" />
                        <Image src={telegram} alt="telegram" />
                        <Image src={instagram} alt="instagram" />
                        <Image src={twitter} alt="twitter" />
                        <Image src={youtube} alt="youtube" />
                    </div>
                </div>
            </div>
            <span className="font-inter text-[12px] font-[400] leading-6 block xl:hidden text-white mx-auto w-fit pb-3">© 2010-2024 GoFundMe</span>
        </>
    );
}

export default FooterBottom;