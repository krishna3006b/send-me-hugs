"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { reload, threeDot } from '@/assets';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { SideNav, TransactionsTable} from '@/components';
import DashNav from '@/components/dashboard/DashNav';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { Fundraising, User } from '@/interfaces';
import axios from 'axios';
import { setAlert, setUserFundraisings } from '@/store/slices';

function Statistics() {
    const [widhdraw, setWidhdraw] = useState(false)
    const [createPopup, setCreatePopup] = useState(false);
    const [opt, setOpt] = useState(-1);
    const [today, setToday] = useState(`${(new Date()).getUTCFullYear()}-${((new Date()).getUTCMonth() + 1).toString().padStart(2, '0')}-${((new Date()).getUTCDate()).toString().padStart(2, '0')}`)
    const [duration, setDuration] = useState("week");

    const notificationData = useSelector((state: RootState) => state.main.notificationData)
    const userFundRaisings = useSelector((state: RootState) => state.main.userFundRaisings)
    // const activeFundraising = useSelector((state: RootState) => state.statistics.activeFundraising)

    const [user, setUser] = useState<User>({ email: '', token: '' })
    const [activeFundraising, setActiveFundraising] = useState<Fundraising>({ email: "", title: "", story: "", thumbnail: "", amount: 0, amountDonated: 0, fundraisingFor: "", category: "", id: "", location: "", role: "" })
    const [generalIncome, setGeneralIncome] = useState(0)
    const [dailyIncome, setDailyIncome] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)

    const dispatch = useDispatch();
    const router = useRouter();

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

                        dispatch(setUserFundraisings(res.data.fundraisings));
                        setActiveFundraising(res.data.fundraisings[0]);
                        
                    } catch (e: any) {
                        dispatch(setAlert({ message: e.response.data.message, type: "error" }))
                    }

                })()
            }
        }

        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const todayDate = new Date();
        todayDate.setUTCHours(0, 0, 0, 0);
        const todayUTC = todayDate.getTime();

        let newGeneralIncome = 0, newDailyIncome = 0, newTotalIncome = 0;

        activeFundraising.donors?.forEach(don => {
            const donatedDate = new Date(don.donatedAt as Date);
            donatedDate.setUTCHours(0, 0, 0, 0);
            const donatedUTC = donatedDate.getTime();

            newTotalIncome += don.amount ?? 0;
            if (donatedUTC === todayUTC) newDailyIncome += don.amount ?? 0;

            if (duration === "week") {
                if (donatedUTC >= todayUTC - 7 * 24 * 60 * 60 * 1000) newGeneralIncome += don.amount ?? 0;
            } else if (duration === "month") {
                const oneMonthAgo = new Date(todayDate.setUTCMonth(todayDate.getUTCMonth(), 1));
                if (donatedUTC >= oneMonthAgo.getTime()) newGeneralIncome += don.amount ?? 0;
            } else if (duration === "year") {
                const oneYearAgo = new Date(todayDate.setUTCFullYear(todayDate.getUTCFullYear() - 1, 0, 1));
                if (donatedUTC >= oneYearAgo.getTime()) newGeneralIncome += don.amount ?? 0;
            }
        });

        setTotalIncome(newTotalIncome);
        setDailyIncome(newDailyIncome);
        setGeneralIncome(newGeneralIncome);
    }, [activeFundraising, duration]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setActiveFundraising(userFundRaisings.filter(raising => raising.id === e.target.value)[0]);
    }

    const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDuration(e.target.value);
    }


    return (
        <div className="h-[100vh] flex bg-[#f2f2f2]">
            <SideNav />
            <div className="flex h-[100vh] xlg:w-[calc(100vw_-_260px)] w-[calc(100vw_-_60px)] flex-col">
                <DashNav />
                <div className="justify-start overflow-auto  w-[100%] items-start gap-1 inline-flex xlg:p-4 md:p-3 p-2.5">
                    <div className=" w-[100%] flex-col justify-start items-start gap-5 inline-flex">

                        <select name="country" value={activeFundraising.id} onChange={handleChange} className="relative w-[20rem] px-2 outline-none border-b border-b-[#D0D2D5] h-[auto] py-2.5 placeholder:text-[14px] placeholder:leading-5 select-countries">
                            {
                                userFundRaisings.map(raising => (
                                    <option key={raising.id} value={raising.id}>{raising.title}</option>
                                ))
                            }
                        </select>

                        <div className="flex flex-col w-full gap-5" >
                            <div className="flex flex-col w-[100%] gap-5">
                                <div className="flex gap-12 w-[100%]">
                                    <div className="h-[228.50px]  w-[100%] p-5 bg-white rounded-lg border border-[#d0d0d0] flex-col justify-between items-start inline-flex">
                                        <div className="self-stretch justify-between items-center inline-flex">
                                            <div className="justify-start items-center gap-2 flex">
                                                <div className="text-center text-black text-xl font-semibold font-inter leading-normal">Total income</div>
                                                <div className="w-5 h-5 relative transition-all ease duration-[3000]" onClick={(e: any) => { e.target.classList.add('animate-spin'); setTimeout(() => e.target.classList.remove('animate-spin'), 1200) }} >
                                                    <Image src={reload} alt="Reload" />
                                                </div>
                                            </div>
                                            <div className="w-5 h-5 relative" >
                                                <Image src={threeDot} alt="threeDot" />

                                            </div>
                                        </div>
                                        <div className="self-stretch h-[60px] flex-col justify-end items-center flex">
                                            <div className="self-stretch justify-between items-end inline-flex">
                                                <div className="flex-col justify-start items-start gap-[5px] inline-flex">
                                                    <div className="text-center text-black text-3xl font-semibold font-inter leading-normal">${totalIncome.toFixed(2)}</div>
                                                </div>
                                            </div>
                                            {/* <div className="self-stretch gap-3 sm:justify-between sm:items-center sm:flex-row flex-col inline-flex">
                                                <div className="text-[#838383] text-sm font-medium font-inter leading-normal">{today}</div>
                                                <div className="px-2 py-1.5 bg-[#e5f8f4]/70 rounded-[36px] border-2 border-[#288d7c] justify-center items-center gap-1 flex">
                                                    <div className="px-1 justify-start cursor-pointer items-start gap-2.5 flex" onClick={() => setWidhdraw(true)}>
                                                        <div className="text-center text-[#288d7c] text-sm font-medium font-popins leading-normal">Withdraw Funds</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="h-[228.50px]  w-[100%] p-5 bg-white rounded-lg border border-[#d0d0d0] flex-col justify-between items-start inline-flex">
                                        <div className="self-stretch justify-between items-center inline-flex">
                                            <div className="justify-start items-center gap-2 flex">
                                                <div className="text-center text-black text-xl font-semibold font-inter leading-normal">Daily income</div>
                                                <div className="w-5 h-5 relative" >
                                                    <Image src={reload} alt="Reload" />

                                                </div>
                                            </div>
                                            <div className="w-5 h-5 relative" >
                                                <Image src={threeDot} alt="threeDot" />

                                            </div>
                                        </div>
                                        <div className="self-stretch h-[60px] flex-col justify-end items-center flex">
                                            <div className="self-stretch justify-between items-end inline-flex">
                                                <div className="text-[#838383] text-sm font-medium font-inter leading-normal">{today}</div>
                                            </div>
                                            <div className="self-stretch justify-between items-end inline-flex">
                                                <div className="flex-col justify-start items-start gap-[5px] inline-flex">
                                                    <div className="text-center text-black text-xl md:text-3xl font-semibold font-inter leading-normal">${dailyIncome.toFixed(2)}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex py-5 px-3 gap-3 xlg:gap-5 flex-col w-full bg-white rounded-lg border border-[#d0d0d0] ">
                                <div className="flex justify-between w-[100%]">
                                    <div className="flex justify-between w-[100%] flex-wrap gap-2.5">
                                        <div className="flex gap-2 items-center">
                                            <h2 className="text-black text-[20px] font-[600] leading-6 font-inter">Donation History</h2>
                                            <Image src={reload} alt="Reload" />
                                        </div>
                                        {/* <div className="flex gap-3 items-center">
                                            <select name="donation-duration" id="donation-duration" className="outline-none py-2 px-3 text-[14px] leading-5 border border-black rounded-[4px]">
                                                <option value="week" className=" py-2 px-3 " >This Week</option>
                                                <option value="week" className=" py-2 px-3 " >This Month</option>
                                                <option value="week" className=" py-2 px-3 " >This Year</option>
                                            </select>

                                        </div> */}
                                    </div>
                                    <div className="w-5 h-[41px] place-items-center grid relative" >
                                        <Image src={threeDot} alt="threeDot" />
                                    </div>
                                </div>
                                <TransactionsTable donors={activeFundraising.donors ?? []} />
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div>
    );
}

export default Statistics;