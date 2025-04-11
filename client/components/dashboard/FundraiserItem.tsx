import React, { ChangeEvent, useEffect, useState } from 'react';
import { attach_file, defImg, edit, fundCoverPhoto, trash, trash2 } from '@/assets';
import Link from 'next/link';
import Image from 'next/image';
import { Fundraising, User } from '@/interfaces';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { setAlert } from '@/store/slices';
import axios from 'axios';

function FundraiserItem({ setDeletePopup }: { setDeletePopup: (data: boolean) => void }) {
    const [user, setUser] = useState<User>({ email: '' });
    const [fundraising, setFundraising] = useState<Fundraising>({
        email: "",
        title: "",
        story: "",
        thumbnail: "",
        amount: 0,
        amountDonated: 0,
        fundraisingFor: "",
        category: "",
        id: "",
        location: "",
        role: ""
    });

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = localStorage.getItem('credentials');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        window.scrollTo(0, 0);
        fetchRaising();
    }, []);

    const fetchRaising = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising/${id}`);
            setFundraising(res.data.raising);
        } catch (e: any) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }));
            console.error(e);
        }
    };

    const updateRaising = async () => {
        if (fundraising.amount <= 0) {
            console.error('Total amount must be greater than 0');
            return;
        }

        if (!fundraising.thumbnail) {
            console.error('No thumbnail');
            return;
        }

        const data = new FormData();
        try {
            if (typeof fundraising.thumbnail !== 'string') {
                data.append("file", fundraising.thumbnail);
                data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
                data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string);

                const thumbnailResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, data);
                const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising/${id}`, {
                    ...fundraising,
                    thumbnail: thumbnailResponse.data.secure_url,
                    email: user.email
                });

                setFundraising(res.data.raising);
            } else {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising/${id}`, fundraising);
            }
            dispatch(setAlert({ message: 'Raising Updated successfully', type: "error" }));
        } catch (e: any) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }));
            console.error(e.response.data);
        } finally {
            setTimeout(() => dispatch(setAlert({ message: '', type: "error" })), 1200);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement | HTMLSelectElement & { files?: FileList };

        if (type === 'file' && files) {
            setFundraising((p) => ({ ...p, [name]: files[0] }));
        } else {
            setFundraising((p) => ({ ...p, [name]: value }));
        }
    };

    const clearThumbnail = () => {
        setFundraising((p: any) => ({ ...p, thumbnail: null }));
        const thumbnailInput = document.getElementById("thumbnail") as HTMLInputElement;
        if (thumbnailInput) {
            thumbnailInput.value = '';
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const thumbnailInput = document.getElementById("thumbnail") as HTMLInputElement;
        if (thumbnailInput) {
            thumbnailInput.files = dataTransfer.files;
        }
    };


    return (
        <>
            <div className="justify-start overflow-auto flex-col  w-[100%] items-start gap-1 inline-flex xlg:p-4 md:p-3 p-2.5">
                <div className="pb-[14px]">
                    <Link href="/fundraisers" className="py-1.5 px-2 flex justify-center items-center gap-1 rounded-[36px] text-[#298D7C] text-center font-popins text-[14px] leading-6 font-[500]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.8002 7.99981L3.2002 7.9998M3.2002 7.9998L6.59431 11.1998M3.2002 7.9998L6.59431 4.7998" stroke="#298D7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>Back to fundraisers</p>
                    </Link>
                </div>
                <div className="max-w-[793px] w-[100%] xlg:p-4 md:p-3 p-2.5 bg-white rounded-lg border border-[#d0d0d0] flex-col justify-start items-start gap-5 inline-flex">
                    <div className="self-stretch h- rounded-lg flex-col justify-center items-center gap-3 flex">
                        <div className="h-auto xs:h-[35vw] xl:h-[400px] w-full relative overflow-hidden rounded-lg">
                        {
                            !fundraising.thumbnail ? (
                                <>
                                <input type="file" className="z-[2] opacity-0 h-[0px] bg-red-600 relative w-full" id="thumbnail"
                                    accept="image/*" name="thumbnail" onChange={handleChange}
                                    onDragOver={handleDragOver} onDrop={handleDrop} />
                                <label htmlFor="thumbnail" className="border-dashed border-2 w-full h-[360px] border-gray-400 flex flex-col justify-center items-center gap-[39px]">
                                    <Image src={defImg} alt="Default Image Icon" />
                                    <p className="leading-6 text-[14px] font-popins text-[#676767] flex flex-wrap justify-center">Drag or upload your photo here</p>
                                </label>
                                </>
                            ) : (
                                <label htmlFor="thumbnail" className="w-full h-full flex flex-col justify-center items-center gap-[39px] p-2 m-2">
                                    <Image src={typeof fundraising.thumbnail === 'string' ? fundraising.thumbnail : URL.createObjectURL(fundraising.thumbnail)} fill layout='cover' alt="Thumbnail" />
                                    <p className="leading-6 text-[14px] font-popins text-[#676767] flex flex-wrap justify-center">Drag or upload your photo here</p>
                                </label>
                            )
                        }
                        </div>
                        <div className="self-stretch px-1.5 justify-between items-start inline-flex">
                            <div className="w-5 h-5 relative">
                                <Image src={trash} alt="Trash" onClick={clearThumbnail} />
                            </div>
                            <div className="w-5 h-5 relative">
                                <Image src={edit} alt="Edit" onClick={clearThumbnail} />
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                        <div className="w-[100%] h-[64px] step-form-div flex justify-between flex-col relative hover:border-[#F8A754]">
                            <label htmlFor="title" className="w-[100%] font-roboto text-[14px] font-[500] leading-5 text-[#686F78]">Fundraiser title</label>
                            <input type="text" name="title" value={fundraising.title} onChange={handleChange} id="title" className="border-none outline-none font-roboto text-[14px] font-[400] leading-5 text-[#393D42] placeholder:text-[#868C93]" placeholder="Save rivers from plastic.." />
                        </div>
                        <div className="w-[100%] h-[64px] step-form-div flex justify-between flex-col relative hover:border-[#F8A754]">
                            <label htmlFor="amount" className="w-[100%] font-roboto text-[14px] font-[500] leading-5 text-[#686F78]">Goal</label>
                            <input type="text" name="amount" value={fundraising.amount} onChange={handleChange} id="amount" className="border-none outline-none font-roboto text-[14px] font-[400] leading-5 text-[#393D42] placeholder:text-[#868C93]" placeholder="$ 20" />
                        </div>
                        <div className="grid grid-cols-2 xl:gap-[43px] md:gap-6 gap-4 w-full">
                            <div className="w-[100%] h-[64px] step-form-div flex justify-between flex-col relative hover:border-[#F8A754]">
                                <label htmlFor="category" className="w-[100%] font-roboto text-[14px] font-[500] leading-5 text-[#686F78]">Category</label>
                                <input type="text" name="category" value={fundraising.category} onChange={handleChange} id="category" className="border-none outline-none font-roboto text-[14px] font-[400] leading-5 text-[#393D42] placeholder:text-[#868C93]" placeholder="Save rivers from plastic.." />
                            </div>
                            {/* yaha pe country or pincode ka combination uthana hai */}
                            <div className="w-[100%] h-[64px] step-form-div flex justify-between flex-col relative hover:border-[#F8A754]">
                                <label htmlFor="location" className="w-[100%] font-roboto text-[14px] font-[500] leading-5 text-[#686F78]">Location</label>
                                <input type="text" name="location" value={fundraising.location} onChange={handleChange} id="location" className="border-none outline-none font-roboto text-[14px] font-[400] leading-5 text-[#393D42] placeholder:text-[#868C93]" placeholder="2564 - Glenquire NSW" />
                            </div>
                        </div>
                        <div className="w-[100%] min-h-[64px] step-form-div flex justify-between flex-col relative hover:border-[#F8A754]">
                            <label htmlFor="story" className="w-[100%] font-roboto text-[14px] font-[500] leading-5 text-[#686F78]">Story</label>
                            <textarea rows={3} name="story" value={fundraising.story} onChange={handleChange} id="story" placeholder="Passionate chess student with 3 years of experience in competitive play. Currently rated 1800, specializing in strategic openings and endgames. Active in local chess clubs and online tournaments, always eager to learn and improve. Future grandmaster in the making!" className={`max-w-[586px] step-form-input`} />
                            <Image src={edit} alt='Edit' className="mr-5 absolute right-0 top-2.5 w-5 h-5" />
                        </div>
                        {/* <div className="flex max-w-[724px] w-full flex-col bg-white gap-5">
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
                                    <div className="md:w-[124px] md:h-[124px] w-[112px] h-[112px] rounded border-dashed border border-[#818181] flex-col justify-center items-center gap-2 inline-flex">
                                        <div className="w-6 h-6 relative">
                                            <Image src={attach_file} alt="Attach File" />
                                        </div>
                                        <div className="text-center text-[#676767] text-xs font-normal font-['Poppins'] leading-normal">Attach File</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="self-stretch w-full justify-end items-end gap-3 inline-flex">
                            <button onClick={updateRaising} className="px-2 py-1.5 sm:w-fit w-full bg-[#e5f8f4]/70 rounded-[36px] border-2 border-[#288d7c] justify-center items-center gap-1 flex">
                                <div className="justify-start items-start gap-2.5 flex">
                                    <div className="text-center text-[#288d7c] text-sm font-medium font-['Poppins'] leading-normal">Save changes</div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="self-stretch h-px bg-[#d9d9d9]" />
                    <div className="self-stretch justify-between items-center inline-flex">
                        <div className="text-center text-black text-base font-semibold font-['Poppins'] leading-normal">Delete Fundraiser</div>
                        <div className="w-5 h-5 relative" />
                    </div>
                    <div className="sm:flex-row flex-col sm:justify-between gap-5 w-full sm:items-center inline-flex">
                        <div className="text-[#6d6d6d] text-sm font-normal font-roboto leading-tight">NOTE: All your data according this fundraising ...</div>
                        <div className="px-2 py-1.5 rounded-[36px] border-2 cursor-pointer border-[#ff4f49] justify-center items-center gap-1 flex" onClick={() => setDeletePopup(true)}>
                            <div className="px-1 justify-start items-start gap-2.5 flex">
                                <div className="text-center text-[#ff4f49] text-sm font-medium font-['Poppins'] leading-normal">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default FundraiserItem;