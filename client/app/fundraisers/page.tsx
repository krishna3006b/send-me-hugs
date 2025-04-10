"use client";

import React, { useEffect, useState } from 'react';
import { fundPost1, fundPost2, fundPost3, Notificationbell, threeDot } from '@/assets';
import { useParams, useRouter } from 'next/navigation';
import { SideNav } from '@/components';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import DashNav from '@/components/dashboard/DashNav';
import { User } from '@/interfaces';
import axios from 'axios';
import { setAlert, setUserFundraisings } from '@/store/slices';
import { RootState } from '@/store/store';
import { setActiveFundraising } from '@/store/statisticSlice';
import Link from 'next/link';

function Dashboard() {

  const userFundRaisings = useSelector((state: RootState) => state.main.userFundRaisings)

  const [user, setUser] = useState<User>({ email: '', token: '' })

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

            if(res.data.fundraisings.length > 0 ){
              dispatch(setUserFundraisings(res.data?.fundraisings));
              dispatch(setActiveFundraising(res.data?.fundraisings[0]));
            }

          } catch (e: any) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }))
            console.log(e)
          }

        })()
      }
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-[100vh] flex bg-[#f2f2f2]">
      <SideNav />
      <div className="flex h-[100vh]  w-[100%] flex-col">
        <DashNav />
        <div className="justify-start overflow-auto  w-[100%] items-start gap-1 inline-flex xlg:p-4 md:p-3 p-2.5">
          <div className="w-[100%] flex-col justify-start items-start gap-3 xlg:gap-5 inline-flex md:pr-4 sm:pr-2 pr-0">
            <div className="self-stretch pl-5 pr-2.5 py-2.5 bg-white rounded-lg border border-[#d0d0d0] justify-between items-center inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <div className="text-[#4c545b] text-[11px] font-medium font-inter uppercase leading-tight">Sort by</div>
                <div className="md:px-1.5 px-0.5 py-0.5 bg-neutral-100 rounded-3xl justify-center items-center md:gap-1.5 gap-0.5 flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.8021 4.00191L10.8021 12.0019M10.8021 12.0019L12.8021 10.0019M10.8021 12.0019L8.80211 10.0019M3.20211 11.202L6.40211 11.2019M3.20212 8.00195L6.40212 8.00194M3.20214 4.80195L8.00214 4.80193" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-center text-neutral-700 text-xs font-medium font-inter leading-tight">Amount raised</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.68172 9.74533L7.68174 9.74531L7.67816 9.74097L5.43594 7.02421C5.36446 6.93404 5.31945 6.82573 5.306 6.71138C5.29243 6.596 5.31154 6.47913 5.36114 6.3741L5.3613 6.37417L5.36656 6.36222C5.40053 6.28515 5.45595 6.2195 5.52619 6.17311C5.59577 6.12715 5.67699 6.102 5.76032 6.10058L10.2432 6.10056C10.3265 6.10198 10.4077 6.12712 10.4773 6.17308C10.5476 6.21948 10.603 6.28512 10.6369 6.36219L10.6368 6.36226L10.6424 6.37407C10.692 6.47911 10.7111 6.59598 10.6975 6.71136C10.6841 6.8257 10.639 6.93402 10.5676 7.02418L8.3253 9.74097L8.32528 9.74095L8.32175 9.74532C8.28286 9.79353 8.23374 9.83247 8.17796 9.85932C8.12293 9.88581 8.06277 9.89988 8.00173 9.90056C7.9407 9.89988 7.88054 9.88581 7.82551 9.85932C7.76972 9.83247 7.7206 9.79354 7.68172 9.74533Z" fill="#737373" stroke="#737373" />
                  </svg>
                </div>
              </div>
              <Link href="/fundraising" className="h-8 md:h-9 px-2 py-1.5 cursor-pointer bg-gradient-to-b from-[#2dd6b4] to-[#21806f] rounded-[36px] justify-center items-center gap-1 flex">
                <div className="px-1 justify-start items-start gap-2.5 hidden md:flex">
                  <div className="text-center text-white text-sm font-medium font-popins leading-normal">Create New </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.99967 3.33398V12.6673M12.6663 8.00065H3.33301" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
            <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-3 xlg:gap-5 w-[100%]">
              {
                userFundRaisings.map((raising, idx) => <div key={idx} className="grow shrink basis-0 h-[258px] flex-col justify-start items-start gap-[22px] inline-flex">
                  <div className="self-stretch grow shrink basis-0 p-[18px] bg-white rounded-lg border border-[#d0d0d0] flex-col justify-between items-start flex">
                    <div className="self-stretch justify-between items-start inline-flex">
                      <div className="h-20 justify-start items-start gap-4 flex">
                        <div className="h-20 w-20 rounded-[50%] overflow-hidden relative">
                          <Image alt="thumbnail" fill layout='cover' className="" src={raising.thumbnail} />
                        </div>
                        <div className="flex-col justify-center items-start inline-flex">
                          <div className="text-[#565656] text-xs font-medium font-inter leading-normal">{raising.category}</div>
                          <div className="justify-start items-center gap-2 inline-flex">
                            <div className="text-cente text-black text-lg font-bold font-inter leading-normal">{raising.title}</div>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block">

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10Z" fill="black" />
                          <path d="M17 10C17 10.8284 16.3284 11.5 15.5 11.5C14.6716 11.5 14 10.8284 14 10C14 9.17157 14.6716 8.5 15.5 8.5C16.3284 8.5 17 9.17157 17 10Z" fill="black" />
                          <path d="M6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5C5.32843 8.5 6 9.17157 6 10Z" fill="black" />
                        </svg>
                      </div>
                    </div>
                    <div className="self-stretch justify-between items-center inline-flex">
                      <div className="w-[142px] flex-col justify-start items-start gap-0.5 inline-flex">
                        <div className="self-stretch h-6 flex-col justify-start items-start gap-[5px] flex">
                          <div className="text-center text-black text-xl font-semibold font-inter leading-normal">$ {raising.amount}</div>
                        </div>
                        <div className="self-stretch text-[#838383] text-xs font-medium font-inter leading-tight">{raising.createdAt!.toString().split("T")[0]}</div>
                      </div>
                      <div className="justify-start items-center gap-3 flex">
                        <div className="px-2 cursor-pointer py-1.5 bg-[#e5f8f4]/70 rounded-[36px] border-2 border-[#288d7c] justify-center items-center gap-1 flex" onClick={() => router.push(`/fundraisers/${raising.id}`)}>
                          <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-[#288d7c] text-sm font-medium font-popins leading-normal">Manage</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
