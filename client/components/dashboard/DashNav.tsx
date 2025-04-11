"use client";

import { loginBtn, Notificationbell, userDP } from '@/assets';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setNotificationData } from '@/store/slices';
import { User } from '@/interfaces';
import Link from 'next/link';
import axios from 'axios';
import { RootState } from '@/store/store';

function DashNav() {

    const [heading, setHeading] = useState('')
    const [notification, setNotification] = useState(false)
    const [user, setUser] = useState<User>({ email: '' });

    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();

    const notificationData = useSelector((state: RootState) => state.main.notificationData)

    useEffect(() => {
        const userData = localStorage.getItem('credentials');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        dispatch(setNotificationData([
            {
                title: "Notification title",
                message: "Improve and maintain heathy sleep routine",
                time: "5 min "
            },
            {
                title: "Notification title",
                message: "Improve and maintain heathy sleep routine",
                time: "5 min "
            },
            {
                title: "Notification title",
                message: "Improve and maintain heathy sleep routine",
                time: "5 min "
            },
            {
                title: "Notification title",
                message: "Improve and maintain heathy sleep routine",
                time: "5 min "
            },
        ]))
    }, []);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
                email: user.email
            })
            dispatch(setAlert({ message: res.data.message, type: 'success' }))

            localStorage.removeItem('credentials');
            setUser({ firstName: '', lastName: '', password: '', email: '' })
            console.log('click')
            setTimeout(() => router.push('/'), 1000);
        } catch (e: any) {
            console.log(e)
        }
        finally {
            setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })), 1200)
        }
    }

    return (
        <div className="pl-[19px] w-[100%] h-[56px] xlg:h-[68px] pr-8 py-3 bg-white border-b border-[#d0d0d0] justify-between items-center inline-flex gap-4">
            <h2 className="text-center text-black text-[22px] font-semibold font-popins leading-normal flex gap-2 items-center">{heading}</h2>
            <div className="justify-end items-center gap-5 flex">
                <div className="justify-start xlg:flex items-center gap-[25px] hidden">
                    <div className="xl:w-[375px] w-[100%] h-11 px-3 py-2.5 bg-white rounded border border-[#babdc1] justify-start items-center gap-3 flex">
                        <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                            <div className="w-5 h-5 relative" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M14.1523 13.0917L13.622 12.5613L12.5614 13.622L13.0917 14.1523L14.1523 13.0917ZM16.4697 17.5303C16.7626 17.8232 17.2375 17.8232 17.5304 17.5303C17.8232 17.2374 17.8232 16.7626 17.5304 16.4697L16.4697 17.5303ZM14.6944 9.22222C14.6944 12.2444 12.2444 14.6944 9.22222 14.6944V16.1944C13.0729 16.1944 16.1944 13.0729 16.1944 9.22222H14.6944ZM9.22222 14.6944C6.2 14.6944 3.75 12.2444 3.75 9.22222H2.25C2.25 13.0729 5.37157 16.1944 9.22222 16.1944V14.6944ZM3.75 9.22222C3.75 6.2 6.2 3.75 9.22222 3.75V2.25C5.37157 2.25 2.25 5.37157 2.25 9.22222H3.75ZM9.22222 3.75C12.2444 3.75 14.6944 6.2 14.6944 9.22222H16.1944C16.1944 5.37157 13.0729 2.25 9.22222 2.25V3.75ZM13.0917 14.1523L16.4697 17.5303L17.5304 16.4697L14.1523 13.0917L13.0917 14.1523Z" fill="#868C93" />
                                </svg>
                            </div>
                            <div className="justify-start w-fit items-center gap-0.5 flex">
                                <input type="text" className="text-[#868c93] w-[100%] border-none outline-none text-sm placeholder:text-sm placeholder:px-1 font-normal font-roboto leading-tight" name="query" id="query" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-start items-center gap-2 flex relative">
                    <div className="w-6 h-6 relative flex justify-center items-center" onClick={(e) => { e.stopPropagation(); setNotification(!notification) }}>
                        <div className="bg-[#FF3C3C] flex justify-center items-center absolute w-3 h-3 text-[8px] font-inter leading-[5px] text-white top-0.5 -right-0.5 rounded-[50%]">3</div>
                        <Image className="w-6 h-6" src={Notificationbell} alt="Notificationbell" />
                    </div>

                    {
                        user.email ?
                            <div className="group w-30 p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] relative">
                                {
                                    user.dp ?
                                        <div className="justify-start items-center gap-2 flex">
                                            <div className="text-center md:block hidden text-black text-sm font-medium font-popins leading-normal">{user.firstName} {user.lastName}</div>
                                            <div className="relative w-9 h-9 border border-white p-2 rounded-[50%] cursor-pointer overflow-hidden">
                                                <Image fill objectFit='cover' src={user.dp} alt="Login Button" />
                                            </div>
                                        </div>
                                        :
                                        <div className="relative w-9 h-9 border border-white p-2 rounded-[50%] cursor-pointer">
                                            <Image src={userDP} alt="Login Button" />
                                        </div>
                                }
                                <div className="group-hover:block hidden gap-1 p-1 z-[12] absolute top-[44px] h-fit -left-40 md:-left-16 w-[210px]">
                                    <div className="py-3">
                                        <div className="flex flex-col gap-2 items-start col-span-1 bg-white p-2" >
                                            <div className="w-full">
                                                <Link href="/" className="font-inter text-[14px] font-[400] leading-6 flex justify-between items-center p-2 hover:bg-[#0000002d] ">
                                                    <p>Back to Home</p>
                                                </Link>
                                                <div onClick={handleLogout} className="font-inter text-[14px] cursor-pointer font-[400] leading-6 flex justify-between items-center p-2 hover:bg-[#0000002d] ">
                                                    <p>Log out</p>
                                                    <Image src={loginBtn} alt="Login Button" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div className="relative w-[52px] h-[52px] flex justify-start cursor-pointer">
                                <Image src={loginBtn} alt="Login Button" onClick={() => router.push("/login")} />
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default DashNav
