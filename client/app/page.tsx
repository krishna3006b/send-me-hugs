"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Hero, Footer, FooterBottom, Navbar } from '@/components';
import { child, logo2, mchild, mmoney, money, si1, si2, si3, smh1, smh2, smh3, smh4, smh5, smh6, smh7, smh8, smh9 } from '@/assets';
import Image from 'next/image';
import axios from 'axios';
import Card from '@/components/cards/Card';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setFundraisings, setUserFundraisings } from '@/store/slices';
import { RootState } from '@/store/store';
import { User } from '@/interfaces';
import { setActiveFundraising } from '@/store/statisticSlice';

function Home() {

    const [navOpen, setNavOpen] = useState(false);

    const dispatch = useDispatch()
    const router = useRouter();

    const fundraisings = useSelector((state: RootState) => state.main.fundraisings)

    const fetchRaisings = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising`);

            dispatch(setFundraisings(res.data.raisings));
        } catch (e: any) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }))
            console.log(e)
        }

    }

    const [user, setUser] = useState<User>({ email: '', token: '' })

    const userFundRaisings = useSelector((state: RootState) => state.main.userFundRaisings)

    useEffect(() => {
        if (typeof window !== undefined) {
            const userData = localStorage.getItem('credentials');
            if (userData) {
                setUser(JSON.parse(userData));
                (async () => {
                    try {
                        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
                            headers: {
                                Authorization: JSON.parse(userData).token
                            }
                        });

                        if(res.data.fundraisings.length > 0 ){
                        dispatch(setUserFundraisings(res.data.fundraisings));
                        dispatch(setActiveFundraising(res.data.fundraisings[0]));
                        }

                    } catch (e: any) {
                        dispatch(setAlert({ message: e.response.data.message, type: "error" }))
                        console.log(e)
                    }
                })()
            }
        }

        window.scrollTo(0, 0);

        fetchRaisings()
    }, []);

    return (
        <>
            <div className={`home w-[100%] bg-dark-cyan overflow-x-hidden`}>

                <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
                <Hero />
                <div className="max-w-[1512px] mx-auto pt-[18px] sm:pt-[75px] 2xl:px-[156px] lg:px-[33px] xl:px-[96px] px-[16px] xlg:bg-[none] bg-[url(/src/assets/background-grad.png)] bg-cover">
                    <div className="flex flex-col gap-[32px] mx-auto max-w-[1200px text-white">
                        <div className="lg:w-[578px] mx-auto">
                            <h2 className="pb-2 font-lato sm:text-[36px] xss:text-[28px] text-[32px] font-[700] text-center">How to start a  SendMeHugs</h2>
                            <p className="font-inter text-[18px] font-[400] leading-[28px] text-center sm:text-left">Here is our 3 steps how to make Send me hugs work for you</p>
                        </div>
                        <div className="grid xlg:grid-cols-3 gap-5 sm:grid-cols-2">
                            <div className="p-[12px] gap-[12px] flex flex-col h-[416px] rounded-[8px] bg-[#325765]">
                                <Image src={si1} className="xlg:h-auto h-[179px]" alt="Our tools help create your fundraiser" />
                                <div className="p-[3px_8px] bg-[#5A8B9D] rounded-[4px] flex items-center justify-center w-fit font-[600] font-manrope text-[12px]">Step 1</div>
                                <div className="flex flex-col gap-[12px]">
                                    <p className="font-inter font-[700] text-[20px] max-w-[300px] leading-6">Our tools help create your fundraiser</p>
                                    <p className="font-inter font-[400] text-[14px] leading-[22px]">Click the ‘Start Send Me Hugs’ button to get started. You’ll be guided by prompts to add fundraiser details and set your goal, which can be changed anytime.</p>
                                </div>
                            </div>
                            <div className="p-[12px] gap-[12px] flex flex-col h-[416px] rounded-[8px] bg-[#325765]">
                                <Image src={si2} className="xlg:h-auto h-[179px]" alt="Share your fundraiser link to reach donors" />
                                <div className="p-[3px_8px] bg-[#5A8B9D] rounded-[4px] flex items-center justify-center w-fit font-[600] font-manrope text-[12px]">Step 2</div>
                                <div className="flex flex-col gap-[12px]">
                                    <p className="font-inter font-[700] text-[20px] max-w-[300px] leading-6">Share your fundraiser
                                        link to reach donors</p>
                                    <p className="font-inter font-[400] text-[14px] leading-[22px]">Once live, share your fundraiser link with friends and family to start gaining momentum. You’ll also find helpful resources for running your fundraiser in your Send Me Hugs dashboard.</p>
                                </div>
                            </div>
                            <div className="p-[12px] gap-[12px] flex flex-col h-[416px] rounded-[8px] bg-[#325765]">
                                <Image src={si3} className="xlg:h-auto h-[179px]" alt="Our tools help creat your fundraiser" />
                                <div className="p-[3px_8px] bg-[#5A8B9D] rounded-[4px] flex items-center justify-center w-fit font-[600] font-manrope text-[12px]">Step 3</div>
                                <div className="flex flex-col gap-[12px]">
                                    <p className="font-inter font-[700] text-[20px] max-w-[300px] leading-6">Our tools help create
                                        your fundraiser</p>
                                    <p className="font-inter font-[400] text-[14px] leading-[22px]">Add your bank information, or invite your intended recipient to add theirs, to securely start receiving funds. You don’t need to reach your fundraising goal to start receiving funds.</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => router.push('/fundraising')} className="px-3.5 py-2.5 bg-gradient-cyan bg-gradient-cyan-hover sm:mx-auto rounded-[36px]">Start Send Me Hugs</button>
                    </div>
                </div>
                <div className="my-[66px] w-[100%]">
                    <div className="mx-auto bg-white pt-[61px] px-4 pb-[90px] md:pb-[54px] 2xl:px-[128px] xl:px-[96px] sm:px-[44px]">
                        <div className="mx-auto flex gap-[70px] xl:gap-[37px] xl:max-w-[865px] md:flex-row flex-col items-center">
                            <Image className="aspect-square w-[158px] h-[158px]" src={logo2} alt="Logo SVG" />
                            <div className="flex flex-col gap-[23px] items-center md:items-start">
                                <h2 className="font-inter font-[700] text-black xl:text-[32px] text-[24px] xl:leading-[44px] leading-[30px] -tracking-[.8px] text-center md:text-start">Join the millions of people fundraising for a
                                    cause they care about on SendMeHugs</h2>
                                <button onClick={()=>router.push('/fundraising')} className="px-3.5 py-2.5 text-white bg-gradient-cyan bg-gradient-cyan-hover w-full sm:w-fit rounded-[36px]">Start Send Me Hugs</button>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="w-[100%] 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] text-white max-w-[1512px] mx-auto flex flex-col gap-[25px]">
                    <div className="flex flex-col gap-6">
                        <h2 className="font-inter font-[700] md:text-[32px] text-[24px] leading-[36px] text-start -tracking-[.64px]">Ongoing Fundraising</h2>
                        <div className="grid xl:grid-cols-3 gap-5 md:grid-cols-2">
                            {
                                fundraisings.filter((raising) => raising.role !== "NGO" && !raising.isCompleted)?.slice(0, 3).map((card, index) => <Card key={index} card={card} />)
                            }
                        </div>
                        <div onClick={() => router.push('/explore')} className="ml-auto flex py-2 px-3 gap-1.5 items-center">
                            <p className="font-popins text-[16px] font-[500] cursor-pointer">See All</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                <path d="M4.09961 8.9999L14.8996 8.9999M14.8996 8.9999L11.0812 5.3999M14.8996 8.9999L11.0812 12.5999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="font-inter font-[700] md:text-[32px] text-[24px] leading-[36px] -tracking-[.64px] text-start">NGO’s that you can donate</h2>
                        <div className="grid xl:grid-cols-3 gap-5 md:grid-cols-2">
                            {
                                fundraisings.filter((raising) => raising.role === "NGO" && !raising.isCompleted)?.slice(0, 3).map((card, index) => <Card key={index} card={card} />)
                            }
                        </div>
                        <div onClick={() => router.push('/explore')} className="ml-auto flex py-2 px-3 gap-1.5 items-center">
                            <p className="font-popins text-[16px] font-[500] cursor-pointer">See All</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                <path d="M4.09961 8.9999L14.8996 8.9999M14.8996 8.9999L11.0812 5.3999M14.8996 8.9999L11.0812 12.5999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
               
                <div className="max-w-[1512px] mx-auto mt-[66px] 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] grid gap-5 lg:grid-cols-2 text-white pb-[38px] sm:pb-[66px]">
                    <div className="relative min-h-[350px]">
                        <Image className="w-[100%] hidden sm:block" src={money} alt="Money" />
                        <Image className="w-[100%] sm:hidden" src={mmoney} alt="Money" />
                        <div className="mask absolute top-0 h-[100%] w-[100%] py-5 px-6 ">
                            <h2 className="font-inter font-[700] text-[28px] leading-[36px] sm:text-[36px] sm:leading-[48px] -tracking-[.8px] ">Asking for help feels big.</h2>
                            <h2 className="font-inter font-[700] text-[28px] leading-[36px] sm:text-[36px] sm:leading-[48px] -tracking-[.8px]" > Let’s start small.</h2>
                            <button onClick={()=>router.push('/fundraising')} className="bg-gradient-cyan bg-gradient-cyan-hover font-popins text-[16px] p-[10px_14px] mt-5 rounded-[36px] font-[500]">Start Send Me Hugs</button>
                        </div>
                    </div>
                    <div className="relative min-h-[350px]">
                        <Image className="w-[100%] hidden sm:block" src={child} alt="Child" />
                        <Image className="w-[100%] sm:hidden" src={mchild} alt="Child" />
                        <div className="mask absolute top-0 h-[100%] w-[100%] py-5 px-6 ">
                            <h2 className="font-inter font-[700] text-[28px] leading-[36px] sm:text-[36px] sm:leading-[48px] -tracking-[.8px] ">Still need help?</h2>
                            <h2 className="font-inter font-[700] text-[28px] leading-[36px] sm:text-[36px] sm:leading-[48px] -tracking-[.8px] ">We’re here for you.</h2>
                            <button className="bg-gradient-cyan bg-gradient-cyan-hover  font-popins text-[16px] p-[10px_14px] mt-5 rounded-[38px] font-[500]">Visit Help Center</button>
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
        </>
    );
}

export default Home;