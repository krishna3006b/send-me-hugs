"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import {  Footer, FooterBottom, Navbar } from '@/components';
import axios from 'axios';
import Card from '@/components/cards/Card';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setFundraisings } from '@/store/slices';
import { RootState } from '@/store/store';

function Home() {

    const dispatch = useDispatch()
    const router = useRouter();

    const [navOpen, setNavOpen] = useState(false);
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

    useEffect(() => {
        window.scrollTo(0, 0);

        fetchRaisings()
    }, [])

    return (
        <>
            <div className={`h-screen overflow-y-auto w-[100%] bg-dark-cyan overflow-x-hidden`}>

                <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
                <div className="min-h-screen">

                    {
                        fundraisings.filter(item => !item.isCompleted).length > 0 &&
                        <div className=" pt-16 w-[100%] p-[10px_16px] sm:p-[10px_32px] xl:p-[15px_96px] 2xl:p-[15px_156px] text-white max-w-[1512px] mx-auto flex flex-col gap-[25px]">
                            <div className="flex flex-col gap-6">
                                <h2 className="font-inter font-[700] md:text-[32px] text-[24px] leading-[36px] text-start -tracking-[.64px]">Active Fundraising</h2>
                                <div className="grid xl:grid-cols-3 gap-5 md:grid-cols-2">
                                    {
                                        fundraisings.filter(item => item.amount > item.amountDonated)?.map((card, index) => <Card key={index} card={card} />)
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    {
                        fundraisings.filter(item => item.isCompleted).length > 0 &&
                        <div className="my-16 w-[100%] p-[10px_16px] sm:p-[10px_32px] xl:p-[15px_96px] 2xl:p-[15px_156px] text-white max-w-[1512px] mx-auto flex flex-col gap-[25px]">
                            <div className="flex flex-col gap-6">
                                <h2 className="font-inter font-[700] md:text-[32px] text-[24px] leading-[36px] text-start -tracking-[.64px]">Completed Fundraising</h2>
                                <div className="grid xl:grid-cols-3 gap-5 md:grid-cols-2">
                                    {
                                        fundraisings.filter(item => item.isCompleted)?.map((card, index) => <Card key={index} card={card} />)
                                    }
                                </div>
                            </div>
                        </div>
                    }

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