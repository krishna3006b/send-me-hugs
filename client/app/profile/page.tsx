"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { attach_file, avatarCam, dArrow2, defAvatar, trash2 } from '@/assets';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '@/store/slices';
import { SideNav } from '@/components';
import Image from 'next/image';
import { User } from '@/interfaces';
import { useRouter } from 'next/navigation';
import DashNav from '@/components/dashboard/DashNav';
import { RootState } from '@/store/store';
import axios from 'axios';

function Profile() {

    const notificationData = useSelector((state: RootState) => state.main.notificationData)

    const [formData, setFormData] = useState<User>({ firstName: '', lastName: '', email: '', password: '', location: '', walletAddress: '', dp: '' });

    const [errors, setErrors] = useState<User>({ firstName: '', lastName: '', email: '', password: '', location: '', walletAddress: '', dp: '' });

    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState<User>({ email: '', token: '' })
    const [editable, setEditable] = useState<boolean>(false)

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
                    } catch (e: any) {
                        dispatch(setAlert({ message: e.response.data.message, type: "error" }))
                    }
                })()
            }
        }

        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editable) return;
        const { name, value } = e.target;
        setUser({...user,[name]:value})
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' })
    };

    const validateForm = () => {
        const newErrors: User = { firstName: '', lastName: '', email: '', password: '', location: '', walletAddress: '', dp: '' };
        if (!formData.firstName) newErrors.firstName = 'Field is required';
        if (!formData.lastName) newErrors.lastName = 'Field is required';
        if (!formData.location) newErrors.lastName = 'Field is required';
        if (!formData.walletAddress) newErrors.lastName = 'Field is required';
        if (!formData.email) {
            newErrors.email = 'Field is required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be more than 8 characters';
        }

        setErrors(newErrors);

        return Object.values(newErrors).filter((data: string) => data).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, formData)

                // dispatch(setAlert({ message: res.data.message, type: 'success' }))

                // localStorage.setItem('credentials',JSON.stringify(res.data.user));

                // setTimeout(() => router.push('/'), 1000);

                console.log(formData);

            } catch (e) {
                //@ts-ignore
                dispatch(setAlert({ message: e.response.data.message, type: 'warning' }))
            }
            finally {
                setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })), 1200)
            }
        }
    };

    const [deleteAccount, setDeleteAccount] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    return (
        <div className="h-[100vh] flex bg-[#f2f2f2]">
            <SideNav />
            <div className="flex h-[100vh] xlg:w-[calc(100vw_-_260px)] w-[calc(100vw_-_60px)] flex-col">
                <DashNav />
                <div className="justify-start overflow-auto  w-[100%] items-start gap-1 inline-flex xlg:p-4 md:p-3 p-2.5">
                    <div className=" w-[100%] flex-col justify-start items-start gap-5 inline-flex">
                        <div className="flex max-w-[724px] w-full p-5 flex-col  border rounded-lg border-[#D0D0D0] bg-white ">
                            <div className="flex flex-col gap-6">
                                <h3 className="text-[20px] font-[600] font-inter leading-7 text-[#2C2F32]">Personal Information</h3>
                                <div className="flex flex-col gap-[44px]">
                                    <div className="relative w-fit">
                                        <Image src={defAvatar} alt="Default Avatar" />
                                        <Image src={avatarCam} alt="Avatar Camera" className="absolute -right-1 -bottom-1" />
                                    </div>
                                    <div className="flex md:gap-0 gap-[21px] flex-col w-full">
                                        <div className="grid grid-rows-2 gap-[21px]">
                                            <div className="grid md:grid-cols-2  gap-[21px]">
                                                <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative">
                                                    <input type="text" name="firstName" disabled={!editable} value={user.firstName} onChange={handleChange} id="firstName" className="step-form-input bg-transparent" placeholder="Adam" />
                                                    <label htmlFor="firstName" className="step-form-label text-[12px]">First Name</label>
                                                    {errors.firstName && <p className="text-red-500 text-xs absolute -bottom-5">{errors.firstName}</p>}
                                                </div>
                                                <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative">
                                                    <input type="text" name="lastName" disabled={!editable} value={user.lastName} onChange={handleChange} id="lastName" className="step-form-input bg-transparent" placeholder="Adam" />
                                                    <label htmlFor="lastName" className="step-form-label text-[12px]">Last Name</label>
                                                    {errors.lastName && <p className="text-red-500 text-xs absolute -bottom-5">{errors.lastName}</p>}
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2  gap-[21px]">
                                                <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative">
                                                    <input type="email" name="email" disabled={!editable} value={user.email} onChange={handleChange} id="email" className="step-form-input bg-transparent" placeholder="Email Address" />
                                                    <label htmlFor="email" className="step-form-label text-[12px]">Email Address</label>
                                                    {errors.email && <p className="text-red-500 text-xs absolute -bottom-5">{errors.email}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-end items-center pt-5">
                                <p onClick={() => setEditable(true)} className="px-3 sm:w-fit w-full py-1.5 bg-[#e4f7f4]/70 rounded-[36px] border-2 border-[#288d7c] text-[#288d7c] text-sm font-medium font-popins">
                                    Edit
                                </p>
                            </div>
                        </div>
                        <div className="flex max-w-[724px] w-full p-5 flex-col  border rounded-lg border-[#D0D0D0] bg-white gap-5">
                            <div className="self-stretch h-[116px] flex-col justify-start items-start gap-6 flex">
                                <div className="text-center text-[#2c2f32] text-xl font-semibold font-inter leading-7">Wallet Address</div>
                                <div className="self-stretch h-16 pl-3 flex-col justify-start items-start gap-11 flex">
                                    <div className="w-[100%] h-[64px] step-form-div flex justify-end flex-col relative">
                                        <input type="text" name="walletAddress" id="walletAddress" value={user.walletAddress} className="step-form-input" placeholder="305102d93353a9e0b7664382dd84f087858199a0" />
                                        <label htmlFor="walletAddress" className="step-form-label text-[12px]">Wallet Address</label>
                                        {errors.walletAddress && <p className="text-red-500 text-xs absolute -bottom-5">{errors.walletAddress}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-end items-center pt-">
                                <p onClick={() => setEditable(true)} className="px-3 sm:w-fit w-full py-1.5 bg-[#e4f7f4]/70 rounded-[36px] border-2 border-[#288d7c] text-[#288d7c] text-sm font-medium font-popins">
                                    Edit
                                </p>
                            </div>
                        </div>
                        {/* <div className="flex max-w-[724px] w-full p-5 flex-col  border rounded-lg border-[#D0D0D0] bg-white gap-5">
                            <div className="self-stretch h-[116px] flex-col justify-start items-start gap-6 flex">
                                <div className="text-center text-[#2c2f32] text-xl font-semibold font-inter leading-7">Password</div>
                                <div className="self-stretch h-16 pl-3 flex-col justify-start items-start gap-11 flex">
                                    <div className="w-[100%] max-w-[306px] h-[64px] step-form-div flex justify-end flex-col relative">
                                        <input type="password" name="password" id="password" className="step-form-input" placeholder=".........." />
                                        <label htmlFor="password" className="step-form-label text-[12px]">Password</label>
                                        {errors.password && <p className="text-red-500 text-xs absolute -bottom-5">{errors.password}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch  w-full h-9 flex-col justify-end items-end gap-2.5 flex">
                                <div className="px-2 sm:w-fit w-full cursor-pointer py-1.5 bg-[#e4f7f4]/70 rounded-[36px] border-2 border-[#288d7c]  justify-center items-center gap-1 inline-flex" onClick={() => setEditPassword(!editPassword)}>
                                    <div className="px-1 justify-start items-start gap-2.5 flex">
                                        <div className="text-center text-[#288d7c] text-sm font-medium font-popins leading-normal">Edit</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="flex max-w-[724px] w-full p-5 flex-col  border rounded-lg border-[#D0D0D0] bg-white gap-5">
                            <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                                <div className="self-stretch justify-between items-end inline-flex">
                                    <div className="max-w-[415px] flex-col justify-start items-start gap-[13px] inline-flex">
                                        <div className="max-w-[211px]"><span className="text-black text-xl font-semibold font-['Inter'] leading-tight">Certificates</span><span className="text-black text-sm font-normal font-['Inter'] leading-[14.14px]"> (NGO’s)</span></div>
                                        <div className="max-w-[415px] text-[#676767] text-sm font-normal font-['Poppins'] leading-normal">Upload certificates which help donators to understand your needs...</div>
                                    </div>
                                </div>
                                <div className="justify-start items-start gap-5 flex flex-wrap">
                                    <div className="md:w-[124px] md:h-[124px] w-[112px] h-[112px] flex justify-center items-center bg-[#efefef] rounded">
                                        <Image src={trash2} alt="Trash 2" />
                                    </div>
                                    <div className="md:w-[124px] md:h-[124px] w-[112px] h-[112px] bg-[#efefef] rounded" />
                                    <div className="md:w-[124px] md:h-[124px] w-[112px] h-[112px] bg-[#efefef] rounded" />
                                    <div className="md:w-[124px] md:h-[124px] w-[112px] h-[112px] rounded border border-[#818181] border-dashed flex-col justify-center items-center gap-2 inline-flex">
                                        <div className="w-6 h-6 relative">
                                            <Image src={attach_file} alt="Attach File" />
                                        </div>
                                        <div className="text-center text-[#676767] text-xs font-normal font-['Poppins'] leading-normal">Attach File</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="flex max-w-[724px] w-full p-5 flex-col  border rounded-lg border-[#D0D0D0] bg-white gap-5">
                            <div className="self-stretch justify-between items-center inline-flex">
                                <div className="text-center text-black text-xl font-semibold font-popins leading-normal">Delete Account</div>

                            </div>
                            <div className="self-stretch justify-between md:flex-row flex-col md:gap-0 gap-[34px] md:items-center flex">
                                <div className="text-[#6d6d6d] text-sm font-normal font-roboto leading-tight">NOTE: All your data would be deleted</div>
                                <div className="px-2 py-1.5 cursor-pointer rounded-[36px] border-2 border-[#ff4f49] justify-center items-center gap-1 flex" onClick={() => setDeleteAccount(!deleteAccount)}>
                                    <div className="px-1 justify-start items-start gap-2.5 flex">
                                        <div className="text-center text-[#ff4f49] text-sm font-medium font-popins leading-normal">Delete Account</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;