"use client";

import { aImg, aImg2, aImg3, darkLogo, networkDesign } from '@/assets';
import { Footer, FooterBottom, Navbar } from '@/components';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function About() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div>
            <div className={`w-[100%] bg-dark-cyan `}>
                <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
                <div className="mx-auto text-white ">
                    <div className=" pb-6 w-[100%] relative h-[100%]">
                        <Image className="hidden xl:block w-[100%]" src={aImg} alt="About Image" />
                        <Image className="hidden sm:block xl:hidden w-[100%]" src={aImg2} alt="About Image" />
                        <Image className="block sm:hidden w-[100%]" src={aImg3} alt="About Image" />
                    </div>
                    <div className=" 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] pt-6 ">

                        <div className="flex flex-col gap-[14px] text-center pb-[48px] relative">
                            <h2 className="font-lato font-[700] text-[32px] leading-[40px]">About Us</h2>
                            <p className="text-[14px] font-[500] leading-6 font-inter">There’s a part of every one of us that dreams of a better world. That spark of inspiration to help a person, fix a neighborhood, or even change a nation. At Send me hugs, we empower both individuals and nonprofits to turn compassion into action. Because that is how change happens.
                                With fundraising for all, we are creating the giving layer of the internet: a space where individuals, teams, organizations, and nonprofits can champion causes that matter and raise money to make a lasting difference. Through Send me hugs, people and organizations have the tools they need to share their cause far and wide and harness the power of generosity. We are transforming the way people give and changing lives—are you ready to join us?</p>
                            <Image className="absolute bottom-0 h-[calc(100%_+_24px)] right-0" src={networkDesign} alt="Network Design" />
                        </div>
                    </div>
                </div>
                <div className="py-[77px] xlg:px-[44px] md:px-8 px-4 xl:gap-[236px] xlg:gap-[96px] md:flex-row flex-col gap-[48px] flex bg-white justify-center items-center">
                    <div className="">
                        <Image src={darkLogo} alt="logo" />
                    </div>
                    <div className="text-[14px] text-black font-[500] md:text-left text-center leading-6 font-inter max-w-[440px]">
                        Launched in 2023, Send me hugs plans to become world’s first blockchain based social fundraising platform. With over $9 billion raised from more than 120 million donations, we’re on a mission to help people <span className="underline">fundraise</span> for personal, business, and charitable causes.
                    </div>
                </div>
                <div className="py-[48px] xlg:px-[44px] md:px-8 px-4 flex-col flex items-center gap-[64px] text-white">
                    <div className="flex-col flex items-center gap-8">
                        <div className="">
                            <h2 className="font-lato font-[700] text-[36px] leading-[46px] text-center">About Us</h2>
                            <p className="pt-2 font-inter text-center leading-7">Here is our 3 benefits to choose us</p>
                        </div>
                        <div className="max-w-[1200px] grid grid-cols-1 xlg:grid-cols-3 gap-5">
                            <div className="bg-[#325765] p-3 rounded-[8px] flex flex-col gap-3">
                                <h4 className="text-[20px] font-[700] leading-6 font-inter">Our tools help create your fundraiser</h4>
                                <p className="text-[14px] font-[400] leading-6 font-inter">Our Trust & Safety team works around the clock to ensure your safety and protect against fraud. We also provide the industry’s first and only donor protection guarantee. </p>
                            </div>
                            <div className="bg-[#325765] p-3 rounded-[8px] flex flex-col gap-3">
                                <h4 className="text-[20px] font-[700] leading-6 font-inter">Share your fundraiser
                                    link to reach donors</h4>
                                <p className="text-[14px] font-[400] leading-6 font-inter">We’ve helped families and communities get back on their feet quickly. In just the first 30 days following Hurricane Harvey, GoFundMe delivered over $27 million directly to people affected by the storm.</p>
                            </div>
                            <div className="bg-[#325765] p-3 rounded-[8px] flex flex-col gap-3">
                                <h4 className="text-[20px] font-[700] leading-6 font-inter">Our tools help create
                                    your fundraiser</h4>
                                <p className="text-[14px] font-[400] leading-6 font-inter">GoFundMe helps you easily share your story far and wide over email, text, and social media to rally support for your cause. In addition, we have a dedicated team looking for great stories to amplify and share with the media and our community. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[rgba(53,85,92,0.30)]">
                    <Footer />
                    <div className="px-4 md:px-0 my-3">
                        <div className="h-[1px] w-[100%] bg-[#D9D9D9]"></div>
                    </div>
                    <FooterBottom />
                </div>
            </div>
        </div>
    );
}

export default About;