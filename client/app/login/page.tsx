"use client";

import React, { ChangeEvent, useState } from 'react';
import { plant } from '@/assets';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { LoginData } from '@/interfaces';
import { setAlert } from '@/store/slices';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

function Login() {

    const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });

    const [errors, setErrors] = useState({ email: '', password: '' });

    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' })
    };

    const validateForm = () => {
        const newErrors: LoginData = { email: '', password: '' };
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
                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, formData)
                dispatch(setAlert({ message: res.data.message, type: 'success' }))

                localStorage.setItem('credentials', JSON.stringify(res.data.user));

                setTimeout(() => router.push('/'), 1000);
                console.log(res)

            } catch (e: any) {
                dispatch(setAlert({ message: e.response.data.message, type: 'warning' }))
            }
            finally {
                setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })), 1200)
            }
        }
    };

    return (
        <>
            <div className="max-w-[1512px] mx-auto grid xl:grid-cols-2 md:h-[100vh] min-h-[100vh] items-center">
                <div className="flex justify-center items-center">
                    <div className="xs:max-w-[450px] xl:min-h-[511px] p-5 xss:px-2.5 md:pt-[52px] sm:px-[55.5px] md:pb-[33px] text-black">
                        <div className="flex flex-col gap-[21px]" >
                            <div className="">
                                <h3 className="text-black text-center font-inter text-[21px] leading-[13px] font-bold pb-[13px]">Great to see you again</h3>
                                <p className="font-inter text-[14px] font-[400] leading-5 text-center max-w-[260px] mx-auto">Sign in to manage fundraisers, donations & more</p>
                            </div>
                            <div className="gap-3 flex flex-col">
                                <div className="grid grid-cols-2 gap-3 mx-auto xss:grid-cols-1">
                                    <div className="flex py-1.5 px-3 gap-1.5 rounded bg-[#79858A] w-fit">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <g clipPath="url(#clip0_88_1530)">
                                                <path opacity="0.8" d="M11.4038 4.36578C10.5778 3.57798 9.4755 3.1488 8.33495 3.16644C6.24788 3.16644 4.47533 4.57447 3.84332 6.47048C3.50821 7.46405 3.50821 8.53995 3.84332 9.53351L3.84625 9.53353C4.4812 11.4266 6.25081 12.8346 8.33789 12.8346C9.41525 12.8346 10.3402 12.5591 11.057 12.0724V12.0704C11.9006 11.5119 12.4768 10.6329 12.6561 9.63937H8.33496V6.55872H15.8808C15.9749 7.09372 16.019 7.64047 16.019 8.18429C16.019 10.6175 15.1494 12.6747 13.6363 14.068L13.6379 14.0693C12.3122 15.2921 10.4926 16.0005 8.33495 16.0005C5.31015 16.0005 2.54403 14.2956 1.18595 11.5942C0.0512947 9.33365 0.0512966 6.67039 1.18596 4.40988C2.54403 1.70549 5.31015 0.000539111 8.33495 0.000539111C10.3221 -0.0229773 12.2416 0.72367 13.6879 2.08174L11.4038 4.36578Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_88_1530">
                                                    <rect width="16" height="16" fill="white" transform="translate(0.174805)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className="font-inter text-[12px] leading-5font-[500] text-white">Log In With Google</p>
                                    </div>
                                    <div className="flex py-1.5 px-3 gap-1.5 rounded bg-[#79858A] w-fit">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path opacity="0.8" d="M14.1322 12.0963C13.9104 12.6087 13.6478 13.0804 13.3437 13.514C12.929 14.1052 12.5895 14.5144 12.3279 14.7416C11.9223 15.1146 11.4878 15.3057 11.0224 15.3165C10.6884 15.3165 10.2855 15.2215 9.81653 15.0286C9.34603 14.8367 8.91365 14.7416 8.5183 14.7416C8.10366 14.7416 7.65897 14.8367 7.18331 15.0286C6.70693 15.2215 6.32317 15.322 6.02975 15.3319C5.58352 15.3509 5.13874 15.1545 4.69477 14.7416C4.4114 14.4945 4.05697 14.0708 3.63237 13.4706C3.17682 12.8296 2.80229 12.0863 2.50887 11.2389C2.19464 10.3237 2.03711 9.43736 2.03711 8.57929C2.03711 7.59639 2.2495 6.74864 2.67491 6.03824C3.00924 5.46761 3.45403 5.01748 4.01071 4.68704C4.56739 4.3566 5.16888 4.18821 5.81664 4.17744C6.17107 4.17744 6.63587 4.28707 7.21346 4.50254C7.78943 4.71873 8.15925 4.82836 8.32139 4.82836C8.44261 4.82836 8.85345 4.70017 9.54991 4.4446C10.2085 4.20758 10.7644 4.10945 11.2198 4.1481C12.4537 4.24769 13.3808 4.73412 13.9973 5.61047C12.8937 6.27914 12.3478 7.2157 12.3587 8.41715C12.3686 9.35298 12.7081 10.1317 13.3753 10.7501C13.6777 11.0371 14.0154 11.2589 14.3911 11.4164C14.3096 11.6527 14.2236 11.879 14.1322 12.0963V12.0963ZM11.3022 0.959921C11.3022 1.69342 11.0342 2.37829 10.5 3.0122C9.85546 3.76579 9.0758 4.20125 8.23032 4.13253C8.21954 4.04453 8.2133 3.95192 8.2133 3.8546C8.2133 3.15044 8.51984 2.39685 9.06421 1.78069C9.33598 1.46871 9.68164 1.20931 10.1008 1.00238C10.5191 0.798538 10.9147 0.685808 11.2868 0.666504C11.2976 0.764561 11.3022 0.862625 11.3022 0.959911V0.959921Z" fill="white" />
                                        </svg>
                                        <p className="font-inter text-[12px] leading-5font-[500] text-white">Log In With Apple</p>
                                    </div>
                                </div>
                                <div className="mx-auto  flex  gap-[13px] items-center">
                                    <div className="sm:mx-auto  flex  gap-[13px] items-center justify-center">
                                        <div className="h-[1px] w-[128px] xss:w-[30%] bg-[#CDCDCD]"></div>
                                        <p className="text-[#A3A3A3] text-[12px]">OR</p>
                                        <div className="h-[1px] w-[128px] xss:w-[30%] bg-[#CDCDCD]"></div>
                                    </div>
                                </div>
                                <div className="form-group h-[64px] flex justify-end flex-col relative">
                                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="adam_smith@hotmail.com" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                    {errors.email && <p className="text-red-500 text-xs absolute -bottom-5">{errors.email}</p>}
                                    <label htmlFor="email" className="form-label bg-white text-[12px] font-[500]">Email</label>
                                </div>
                                <div className="form-group h-[64px] flex justify-end flex-col relative">
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder=".........." className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                    {errors.password && <p className="text-red-500 text-xs absolute -bottom-5">{errors.password}</p>}
                                    <label htmlFor="password" className="form-label bg-white text-[12px] font-[500]">Password</label>
                                </div>
                                <div className="ml-auto">
                                    <Link href="/login" className="text-[#05192E] text-right font-[500] leading-7 text-[12px] font-ibm ">Forgot password?</Link>
                                </div>
                                <div className="flex flex-col gap-[7px]">
                                    <button onClick={handleSubmit} className="bg-gradient-cyan bg-gradient-cyan-hover text-white font-[500] font-popins text-[16px] p-[10px_14px] rounded-[36px]">Log In</button>
                                    <Link href="/signup" className="text-black font-bold font-inter leading-7 text-center    ">Create Account</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="hidden xl:block ml-auto">
                    <Image src={plant} className="md:h-[100vh]" alt="Plant Image" />
                </div>
            </div>
        </>
    );
}

export default Login;