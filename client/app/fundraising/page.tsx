"use client";
import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { ImgFund } from '@/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Form1, Form2, Form3, Form4, Form5, Form6, Form7, Form8 } from '@/components';
import Image from 'next/image';
import { formData, User } from '@/interfaces';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/store/slices';
import { useRouter } from 'next/navigation';

function FundraisingForm() {
    const [user, setUser] = useState<User>({ email: '' })

    useEffect(() => {
        if (typeof window !== undefined) {
            const userData = localStorage.getItem('credentials');
            if (userData)
                setUser(JSON.parse(userData));
        }
    }, []);

    const [formData, setFormData] = useState<formData>({
        country: '',
        pincode: '',
        category: '',
        fundraisingFor: '',
        amount: 0,
        thumbnail: null,
        title: "",
        story: "",
    });

    const swiper = useRef<any>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement | HTMLSelectElement & { files?: FileList };

        if (type === 'file' && files) {
            setFormData((p) => ({ ...p, [name]: files[0], }));
        } else {
            setFormData(p => ({ ...p, [name]: value }));
        }
        // if (name === 'images') {
        //     setFormData(p => ({ ...p, images: files ? Array.from(files) : [] }));
        // }
    }

    const handleSubmit = async () => {
        if (formData.amount <= 0) {
            console.error('Total amount must be greater than 0');
            return;
        }

        if (!formData.thumbnail) {
            console.error('No thumbnail');
            return;
        }

        const data = new FormData();
        data.append("file", formData.thumbnail);
        data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
        data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string);

        try {
            const thumbnailResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, data);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising`, { ...formData, thumbnail: thumbnailResponse.data.secure_url, location: `${formData.pincode} - ${formData.country} `, email: user.email,walletAddress:user.walletAddress });
            console.log(res)

            dispatch(setAlert({ message: res.data.message, type: 'success' }))

            // setTimeout(() => router.push('/'), 1000);

            swiper?.current?.swiper?.slideNext()

        } catch (e) {
            //@ts-ignore
            dispatch(setAlert({ message: e.response.data.message, type: 'warning' }))
            console.log(e)
        }
        finally {
            setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })), 1200)
        }


    };

    return (
        <div className="fund-raising-form grid grid-cols-2 h-[100vh]">
            <div className="fund-raising-form-left h-[100%] hidden xlg:block">
                <Image className="bg-contain h-[100vh] w-[100%]" src={ImgFund} alt="Fundraising Form Plant Money Image" />
            </div>
            <div className="fund-raising-form-right col-span-2 xlg:col-span-1">
                <Swiper modules={[Navigation, Pagination, A11y]} allowTouchMove={false} slidesPerView="auto" className="swiper" ref={swiper}>
                    <SwiperSlide>
                        <Form1 swiper={swiper} formData={formData} handleChange={handleChange} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Form2 swiper={swiper} formData={formData} handleChange={handleChange} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Form3 swiper={swiper} formData={formData} handleChange={handleChange} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Form4 swiper={swiper} formData={formData} setFormData={setFormData} handleChange={handleChange} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Form5 swiper={swiper} formData={formData} handleChange={handleChange} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Form6 handleSubmit={handleSubmit} swiper={swiper} formData={formData} setFormData={setFormData} handleChange={handleChange} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Form7 />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Form8 />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default FundraisingForm;
