"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormLogo, ImgFund } from '@/assets';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SignUpData } from '@/interfaces';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/store/slices';
import axios from 'axios';

function FundraisingSignIn() {

    const [formData, setFormData] = useState<SignUpData>({ firstName: '', lastName: '', email: '', password: '', cPassword: '',walletAddress:'' });

    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', cPassword: '' });
    const [passwordStrength, setPasswordStrength] = useState('Poor');

    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' })
    };

    const validateForm = () => {
        const newErrors: SignUpData = { firstName: '', lastName: '', email: '', password: '', cPassword: '',walletAddress:'' };
        if (!formData.firstName) newErrors.firstName = 'Field is required';
        if (!formData.walletAddress) newErrors.walletAddress = 'Field is required';
        if (!formData.lastName) newErrors.lastName = 'Field is required';
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
        if (!formData.cPassword) {
            newErrors.cPassword = 'Password is required';
        } else if (formData.cPassword !== formData.password) {
            newErrors.cPassword = "Confirm password doesn't match with password";
        }

        setErrors(newErrors);

        return Object.values(newErrors).filter((data: string) => data).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, formData)

                dispatch(setAlert({ message: res.data.message, type: 'success' }))

                console.log(res)

                localStorage.setItem('credentials',JSON.stringify(res.data.user));

                setTimeout(() => router.push('/fundraising'), 1000);
                
            } catch (e) {
                console.log(e)
                //@ts-ignore
                dispatch(setAlert({ message: e.response.data.message, type: 'warning' }))
            }
            finally{
                setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })),1200)
            }
        }
    };

    useEffect(() => {
        if (formData.password) {
            setPasswordStrength(formData.password.length < 8 ? 'Poor' : 'Strong');
        } else {
            setPasswordStrength('Poor');
        }
    }, [formData.password]);

    return (
        <div className="fund-raising-form grid grid-cols-2 h-[100vh]">
            <div className="fund-raising-form-left h-[100%] hidden xlg:block">
                <Image className="bg-contain h-[100vh] w-[100%]" src={ImgFund} alt="Fundraising Form Plant Money Image" />
            </div>
            <div className="fund-raising-form-right col-span-2 xlg:col-span-1" >
                <div className="flex flex-col justify-between w-[100%] max-h-[100vh] h-[100vh] overflow-y-auto lg:p-[44px] sm:p-8 py-6 px-4">
                    <div className="">
                        <div className="flex w-[100%] justify-between items-center h-[30px]">
                            <Image src={FormLogo} alt="SendMeHugs Form Logo" />
                            <div className="leading-[30px] text-black font-inter text-[14px] font-bold cursor-pointer">Sign In</div>
                        </div>
                        <div className="pt-[115px] flex flex-col gap-[43px] ">
                            <div className="flex flex-col gap-[21px]">
                                <h2 className="text-black font-bold text-[21px] font-inter leading-[124%]">Create an account to save and continue</h2>
                                <p className="text-[14px] leading-5 font-inter">Fill in your account details</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                                    <div className="form-group h-[64px] flex justify-end flex-col relative">
                                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Adam" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                        <label htmlFor="firstName" className="form-label bg-white text-[12px] font-[500]">First Name</label>
                                        {errors.firstName && <p className="text-red-500 text-xs absolute -bottom-5">{errors.firstName}</p>}
                                    </div>
                                    <div className="form-group h-[64px] flex justify-end flex-col relative">
                                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Adam" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                        <label htmlFor="lastName" className="form-label bg-white text-[12px] font-[500]">Last Name</label>
                                        {errors.lastName && <p className="text-red-500 text-xs absolute -bottom-5">{errors.lastName}</p>}
                                    </div>
                                </div>
                                <div className="form-group h-[64px] flex justify-end flex-col relative">
                                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="adam_smith@hotmail.com" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                    {errors.email && <p className="text-red-500 text-xs absolute -bottom-5">{errors.email}</p>}
                                    <label htmlFor="email" className="form-label bg-white text-[12px] font-[500]">Email</label>
                                </div>
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                                    <div className="form-group h-[64px] flex justify-end flex-col relative">
                                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder=".........." className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                        {errors.password && <p className="text-red-500 text-xs absolute -bottom-5">{errors.password}</p>}
                                        <label htmlFor="password" className="form-label bg-white text-[12px] font-[500]">Password</label>
                                    </div>
                                    <div className="form-group h-[64px] flex justify-end flex-col relative">
                                        <input type="password" id="cPassword" name="cPassword" value={formData.cPassword} onChange={handleChange} placeholder=".........." className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                        {errors.cPassword && <p className="text-red-500 text-xs absolute -bottom-5">{errors.cPassword}</p>}
                                        <label htmlFor="cPassword" className="form-label bg-white text-[12px] font-[500]">Confirm Password</label>
                                    </div>
                                </div>
                                <div className="flex gap-[9px] flex-col mt-4">
                                    <p className="text-[12px] font-[400] font-inter leading-4 text-[#737373]">Must be at least 8 characters and have one of each: uppercase letters, symbols, and numbers.</p>
                                    <div className="max-w-[336px]">
                                        {
                                        passwordStrength === 'Poor' ?
                                            <>
                                                <div className="grid grid-cols-10">
                                                    <span className="h-1.5 bg-[#ff2b2b] rounded-l-[5px]"></span>
                                                    <span className="h-1.5 bg-[#ff2b2b] col-span-4"></span>
                                                    <span className="h-1.5 rounded-r-[5px] bg-gray-200"></span>
                                                </div>
                                                <div className="font-inter text-[11px] font-[400] leading-5 text-[#737373] h5">

                                                    <span className="text-[#a31010] font-bold">Poor</span>
                                                    <span className="text-[14px]"> - </span>
                                                    <span className="">An Insecure password.</span>
                                                </div>
                                            </>
                                            : <>
                                                <div className="grid grid-cols-10">
                                                    <span className="h-1.5 bg-[#59A310] rounded-l-[5px]"></span>
                                                    <span className="h-1.5 bg-[#59A310] col-span-8"></span>
                                                    <span className="h-1.5 rounded-r-[5px] bg-gray-200"></span>
                                                </div>
                                                <div className="font-inter text-[11px] font-[400] leading-5 text-[#737373] h5">
                                                    <span className="text-[#59A310] font-bold">Strong</span>
                                                    <span className="text-[14px]"> - </span>
                                                    <span className="">A secure password.</span>
                                                </div>
                                            </>
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="text-black font-inter leading-5 text-[14px] ">
                                    By clicking the Sign Up button below, you agree to the SendmeHugs <span className="underline">Terms of Service</span> and acknowledge the <span className="underline">Privacy Notice</span>
                                </div>
                                <div className="flex justify-end itc pt-7">
                                    <button onClick={handleSubmit} className="py-2 px-3 w-fit text-[#fff] font-[500]  leading-6 text-[16px] text-center font-popins rounded-[36px] bg-gradient-cyan cursor-pointer">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FundraisingSignIn;