"use client";

import { FormLogo } from '@/assets';
import { User } from '@/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function FormNavbar() {

    const router = useRouter();
    const [user, setUser] = useState<User>({ email: '' })

    useEffect(() => {
        if (typeof window !== undefined) {
            const userData = localStorage.getItem('credentials');
            if (userData)
                setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="create-popup-hide flex w-[100%] justify-between items-center h-[30px]">
            <Image src={FormLogo} alt="SendMeHugs Form Logo" />
            {
                !user.email &&
                <div className="leading-[30px] text-black font-inter text-[14px] font-bold cursor-pointer" onClick={() => router.push("/fundraising/signin")}>Sign In</div>
            }
        </div>
    )
}

export default FormNavbar
