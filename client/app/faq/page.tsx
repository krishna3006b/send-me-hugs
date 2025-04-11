"use client";

import { darrow, uarrow } from "@/assets";
import { Footer, FooterBottom, Navbar } from "@/components";
import Image from "next/image";
import { useState } from "react";

function FaqPage() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <div className={`w-[100%] relative max-w-[100vw] bg-dark-cyan min-h-screen flex flex-col justify-between`}>
                <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
                <div className="faq-background-circle-design"></div>
                <div className="background-circle-design1 faq-design1"></div>
                <div className="max-w-[1512px] relative z-[2] text-white 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] py-6">
                    <div className="max-w-[895px]">
                        <h2 className="font-lato font-[700] pb-[28px] text-[32px] leading-[40px] md:text-start -tracking-[.64px]">
                            Frequently Asked Questions
                        </h2>
                        <Faq />
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
        </>
    );
}

export default FaqPage;

const faq = [
    {
        ques: "Is it okay to raise money for myself?",
        ans: "Yes, millions of people have started a fundraiser on GoFundMe for themselves or their family amidst a financial crisis. Rebuilding and recovering after a natural disaster, unexpected bills, and many more emergency use cases find support through crowdfunding.",
    },
    {
        ques: "Can I create a fundraiser for someone else and have the funds go directly to them?",
        ans: "Yes, you can create a fundraiser on behalf of someone else and transfer the funds directly to their account.",
    },
    {
        ques: "Can I create a fundraiser for a charity or nonprofit?",
        ans: "Yes, GoFundMe allows fundraisers for registered charities and nonprofits.",
    },
    {
        ques: "How can I share and promote my fundraiser?",
        ans: "You can share your fundraiser via social media, email, and personal networks to maximize reach and support.",
    },
    {
        ques: "In what countries can I start a fundraiser?",
        ans: "GoFundMe supports fundraisers in multiple countries. Please check the official site for the latest list of supported locations.",
    },
]

function Faq() {

    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    return (
        <div className="w-full flex flex-col gap-3">
            {faq.map((item, idx) => (
                <div className="grid gap-[10px] grid-cols-1 transition-all duration-300 ease-in-out py-2 border-b border-b-white" key={idx}>
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}>
                        <p className="font-inter text-[16px] font-[600] max-w-[90%]">{item.ques}</p>
                        <div className="ml-3 w-[20px] h-[20px]">
                            <Image src={idx === activeIndex ? uarrow : darrow} alt={"chevron"} />
                        </div>
                    </div>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${idx === activeIndex ? "max-h-40" : "max-h-0"}`}>
                        <p className="font-sans text-[14px] text-[rgba(255,255,255,0.70)] font-[400]">{item.ans}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
