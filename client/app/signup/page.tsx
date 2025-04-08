"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { logo, plant } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { SignUpData } from '@/interfaces';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/store/slices';
import { useRouter } from 'next/navigation';

function Signin() {
    const [formData, setFormData] = useState<SignUpData>({ firstName: '', lastName: '', email: '', password: '', cPassword: '',walletAddress:'' });

    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', cPassword: '',walletAddress:'' });
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
        if (!formData.lastName) newErrors.lastName = 'Field is required';
        if (!formData.walletAddress) newErrors.walletAddress = 'Field is required';
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

                localStorage.setItem('credentials',JSON.stringify(res.data.user));

                setTimeout(() => router.push('/'), 1000);
                
            } catch (e) {
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
        <div className="max-w-[1512px] mx-auto grid xl:grid-cols-2 h-[100vh] md:h-[100vh]">
            <div className="flex justify-center h-[100%] overflow-y-scroll scrollable-content">
                <div className="sm:max-w-[450px] xl:min-h-[511px] p-5 xss:px-2.5 md:pt-[52px] sm:px-[55.5px] md:pb-[33px] text-black">
                    <div className="flex flex-col gap-[21px]">
                        <div className="">
                            <h3 className="text-black text-center font-inter text-[21px] leading-[13px] font-bold pb-[13px]">Create an account</h3>
                            <p className="font-inter text-[14px] font-[400] leading-5 text-center max-w-[309px] mx-auto">Create your account to start fundraising, donations & more</p>
                        </div>
                        <div className="gap-3 flex flex-col">
                            <div className="grid grid-cols-2 gap-3 xss:grid-cols-1">
                                <div className="flex py-1.5 px-3 gap-1.5 ml-auto xss:mr-auto rounded bg-[#79858A] w-fit">
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
                                <div className="flex py-1.5 px-3 gap-1.5 mr-auto xss:ml-auto rounded bg-[#79858A] w-fit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path opacity="0.8" d="M14.1322 12.0963C13.9104 12.6087 13.6478 13.0804 13.3437 13.514C12.929 14.1052 12.5895 14.5144 12.3279 14.7416C11.9223 15.1146 11.4878 15.3057 11.0224 15.3165C10.6884 15.3165 10.2855 15.2215 9.81653 15.0286C9.34603 14.8367 8.91365 14.7416 8.5183 14.7416C8.10366 14.7416 7.65897 14.8367 7.18331 15.0286C6.70693 15.2215 6.32317 15.322 6.02975 15.3319C5.58352 15.3509 5.13874 15.1545 4.69477 14.7416C4.4114 14.4945 4.05697 14.0708 3.63237 13.4706C3.17682 12.8296 2.80229 12.0863 2.50887 11.2389C2.19464 10.3237 2.03711 9.43736 2.03711 8.57929C2.03711 7.59639 2.2495 6.74864 2.67491 6.03824C3.00924 5.46761 3.45403 5.01748 4.01071 4.68704C4.56739 4.3566 5.16888 4.18821 5.81664 4.17744C6.17107 4.17744 6.63587 4.28707 7.21346 4.50254C7.78943 4.71873 8.15925 4.82836 8.32139 4.82836C8.44261 4.82836 8.85345 4.70017 9.55318 4.44161C10.1417 4.22542 10.6706 4.13479 11.1381 4.16971C12.3254 4.25871 13.2201 4.75223 13.8222 5.65057C12.994 6.14534 12.5808 6.87634 12.5808 7.84381C12.5808 8.74817 12.8916 9.48249 13.512 10.0497C14.0035 10.5017 14.5723 10.7434 15.2188 10.7749C15.1052 11.243 14.8583 11.722 14.475 12.2135L14.1322 12.0963ZM10.8481 1.92422C10.761 2.5926 10.5124 3.26856 10.1021 3.95213C9.69173 4.63489 9.18216 5.13049 8.57337 5.43892C8.27305 5.60458 7.9323 5.7286 7.55113 5.8111C7.74829 5.06545 7.99794 4.36408 8.30007 3.70667C8.60121 3.05064 9.03704 2.38714 9.60725 1.7163C9.98842 1.258 10.3452 0.920701 10.6768 0.705395C10.9056 0.564802 11.1406 0.447614 11.3808 0.353825C11.1537 0.796706 10.9812 1.36111 10.8481 1.92422Z" fill="white" />
                                    </svg>
                                    <p className="font-inter text-[12px] leading-5 font-[500] text-white">Log In With Apple</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <hr className="border w-[90px] border-[#79858A] h-[1px]" />
                                <p className="px-2.5">Or</p>
                                <hr className="border w-[90px] border-[#79858A] h-[1px]" />
                            </div>
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
                            <div className="form-group h-[64px] flex justify-end flex-col relative">
                                <input type="text" id="walletAddress" name="walletAddress" value={formData.walletAddress} onChange={handleChange} placeholder="0x91D87CBE73a3a6c220d8c2e90eE28690B28e234a" className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                <label htmlFor="walletAddress" className="form-label bg-white text-[12px] font-[500]">Wallet Address</label>
                                {errors.walletAddress && <p className="text-red-500 text-xs absolute -bottom-5">{errors.walletAddress}</p>}
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
                            <div className="form-group h-[64px] flex justify-end flex-col relative">
                                <input type="password" id="cPassword" name="cPassword" value={formData.cPassword} onChange={handleChange} placeholder=".........." className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                {errors.cPassword && <p className="text-red-500 text-xs absolute -bottom-5">{errors.cPassword}</p>}
                                <label htmlFor="cPassword" className="form-label bg-white text-[12px] font-[500]">Confirm Password</label>
                            </div>
                            <div className="flex gap-[9px] flex-col mt-4">
                                <p className="text-[12px] font-[400] font-inter leading-4">Must be at least 8 characters and have one of each: uppercase letters, symbols, and numbers.</p>
                                <div className="">
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
                            <div className="flex flex-col gap-[7px]">
                                <button onClick={handleSubmit} className="bg-gradient-cyan bg-gradient-cyan-hover text-white font-[500] font-popins text-[16px] p-[10px_14px] rounded-[36px]">Create Account</button>
                                <Link href="/login" className="text-black font-bold font-inter leading-7 text-center    ">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden xl:block ml-auto relative ">
                <Image src={plant} className="h-full w-full object-cover" alt="Plant Image" />
                <div className="absolute h-[100%] w-[100%] top-0 right-0 flex flex-col gap-[11px] pt-[42px] pl-[32px]">
                    <div className="">
                        <Image src={logo} alt="Logo" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-white font-inter leading-[44px] font-bold text-[25px]">Unleash Your Potential for Success</h2>
                        <p className="text-white font-inter leading-[20px] text-[14px] ">Raise funds online for medical emergencies and social causes</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Signin;
