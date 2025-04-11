import React, { useEffect } from 'react';
import { cross, FormLogo, sideNav1, smileLogo } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSideNavOpen } from '@/store/slices';
import { RootState } from '@/store/store';

function SideNav() {

    const pathname = usePathname();
    const dispatch = useDispatch();
    const sideNavOpen = useSelector((state: RootState) => state.main.sideNavOpen)

    const isActiveLink = (path: string) => pathname === path;

    useEffect(() => {

        const notificationDropdown = (e: any) => {
            if (!document.querySelector('.side-nav')?.contains(e.target as Node)) {
                dispatch(setSideNavOpen(false))
            }
        }

        document.addEventListener('click', notificationDropdown)

        return () => document.removeEventListener('click', notificationDropdown)

    }, [sideNavOpen, dispatch])

    return (
        <div className={`side-nav xlg:w-[260px] w-[59px] min-h-[100vh] h-[100%] pb-5 bg-white border-r border-[#d0d0d0] flex-col gap-[22px] flex ${sideNavOpen ? "left-0" : "-left-[100%] md:left-0 md:static"}`} >
            <div className="xlg:h-[68px] h-[56px] xlg:px-4 px-3 xlg:py-5 py-2.5 border-b border-[#d0d0d0] items-start gap-2.5 flex justify-between" >
                <Link href="/">
                    <Image className="xlg:block hidden" src={FormLogo} alt="Image Fund" />
                </Link>
                <Link href="/">
                    <Image src={smileLogo} alt="Close Nav" className="xlg:hidden h-[35px] w-[35px]" onClick={() => dispatch(setSideNavOpen(false))} />
                </Link>
            </div>
            <div className="h-[310px] xlg:px-3 px-[7px] flex-col justify-start items-start gap-5 flex">
                <Link href="/fundraisers" className={`group self-stretch rounded justify-start items-center gap-2 inline-flex border ${isActiveLink('/fundraisers') ? `border-[#D0D0D0] text-black p-[12px_13px]` : 'border-transparent p-[12px_13px] text-[#ababab]'}`}>
                    <div className="w-5 h-5 relative" >
                        <svg className="fill-black" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V8.33333C2.5 8.77536 2.67559 9.19928 2.98816 9.51184C3.30072 9.8244 3.72464 10 4.16667 10H7.5C7.94203 10 8.36595 9.8244 8.67851 9.51184C8.99107 9.19928 9.16667 8.77536 9.16667 8.33333V4.16667C9.16667 3.72464 8.99107 3.30072 8.67851 2.98816C8.36595 2.67559 7.94203 2.5 7.5 2.5ZM4.16667 8.33333V4.16667H7.5V8.33333H4.16667Z" />
                            <path d="M15.8333 2.5H12.5C12.058 2.5 11.634 2.67559 11.3215 2.98816C11.0089 3.30072 10.8333 3.72464 10.8333 4.16667V6.66667C10.8333 7.10869 11.0089 7.53262 11.3215 7.84518C11.634 8.15774 12.058 8.33333 12.5 8.33333H15.8333C16.2754 8.33333 16.6993 8.15774 17.0118 7.84518C17.3244 7.53262 17.5 7.10869 17.5 6.66667V4.16667C17.5 3.72464 17.3244 3.30072 17.0118 2.98816C16.6993 2.67559 16.2754 2.5 15.8333 2.5ZM12.5 6.66667V4.16667H15.8333V6.66667H12.5Z" />
                            <path d="M7.5 11.6667H4.16667C3.72464 11.6667 3.30072 11.8423 2.98816 12.1548C2.67559 12.4674 2.5 12.8913 2.5 13.3333V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H7.5C7.94203 17.5 8.36595 17.3244 8.67851 17.0118C8.99107 16.6993 9.16667 16.2754 9.16667 15.8333V13.3333C9.16667 12.8913 8.99107 12.4674 8.67851 12.1548C8.36595 11.8423 7.94203 11.6667 7.5 11.6667ZM4.16667 15.8333V13.3333H7.5V15.8333H4.16667Z" />
                            <path d="M15.8333 10H12.5C12.058 10 11.634 10.1756 11.3215 10.4882C11.0089 10.8007 10.8333 11.2246 10.8333 11.6667V15.8333C10.8333 16.2754 11.0089 16.6993 11.3215 17.0118C11.634 17.3244 12.058 17.5 12.5 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V11.6667C17.5 11.2246 17.3244 10.8007 17.0118 10.4882C16.6993 10.1756 16.2754 10 15.8333 10ZM12.5 15.8333V11.6667H15.8333V15.8333H12.5Z" />
                        </svg>
                        {/* <Image src={sideNav1} alt="svg" /> */}
                    </div>
                    <div className="px-2 py-1.5 justify-center items-center gap-1 xlg:flex hidden">
                        <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-sm font-medium font-inter leading-normal">Fundraisers</div>
                        </div>
                    </div>
                </Link>
                <Link href="/statistics" className={`group self-stretch rounded justify-start items-center gap-5 inline-flex border ${isActiveLink('/statistics') ? `border-[#D0D0D0] text-black p-[12px_13px]` : 'border-transparent p-[12px_13px] text-[#ababab]'}`}>
                    <div className="w-5 h-5 relative" >
                        <svg className="fill-black" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.65 5.97877C17.6579 5.9207 17.6579 5.86184 17.65 5.80377C17.6428 5.75484 17.6288 5.70716 17.6084 5.6621C17.5863 5.62138 17.5613 5.58238 17.5334 5.54544C17.5017 5.49273 17.4623 5.44499 17.4167 5.40377L17.3167 5.34544C17.2686 5.30957 17.2152 5.28145 17.1584 5.2621H16.9917C16.9409 5.21293 16.8816 5.1734 16.8167 5.14544H12.65C12.429 5.14544 12.2171 5.23323 12.0608 5.38951C11.9045 5.54579 11.8167 5.75776 11.8167 5.97877C11.8167 6.19978 11.9045 6.41175 12.0608 6.56803C12.2171 6.72431 12.429 6.8121 12.65 6.8121H15.0084L11.4326 10.1454L9.41071 8.64947C9.2402 8.54805 9.03909 8.5108 8.84356 8.54441C8.64804 8.57801 8.47091 8.68027 8.34404 8.8328L4.60634 12.6546C4.53617 12.7388 4.48331 12.836 4.45077 12.9407C4.41823 13.0453 4.40666 13.1554 4.41673 13.2645C4.42679 13.3737 4.45829 13.4798 4.50941 13.5767C4.56054 13.6737 4.63029 13.7596 4.71467 13.8296C4.8646 13.9538 5.0533 14.0216 5.24801 14.0212C5.37043 14.0214 5.4914 13.9946 5.6023 13.9428C5.71321 13.8909 5.81132 13.8153 5.88967 13.7212L9.16904 10.4495L11.1493 11.9371C11.318 12.0372 11.5167 12.0745 11.7103 12.0425C11.9039 12.0105 12.08 11.9112 12.2076 11.7621L15.9834 8.22877V10.1454C15.9834 10.3665 16.0712 10.5784 16.2274 10.7347C16.3837 10.891 16.5957 10.9788 16.8167 10.9788C17.0377 10.9788 17.2497 10.891 17.4059 10.7347C17.5622 10.5784 17.65 10.3665 17.65 10.1454V5.97877Z" />
                            <path d="M18.75 17.9167C18.75 18.3769 18.3769 18.75 17.9167 18.75H1.25V2.08333C1.25 1.6231 1.6231 1.25 2.08333 1.25C2.54357 1.25 2.91667 1.6231 2.91667 2.08333L2.91667 17.0833H17.9167C18.3769 17.0833 18.75 17.4564 18.75 17.9167Z" />
                        </svg>
                    </div>
                    <div className="text-center text-sm font-medium font-inter leading-normal">Statistics</div>
                </Link>
                <Link href="/fundraisers" className={`group self-stretch rounded justify-start items-center gap-5 inline-flex border ${isActiveLink('/transfers') ? `border-[#D0D0D0] text-black p-[12px_13px]` : 'border-transparent p-[12px_13px] text-[#ababab]'}`}>
                    <div className="w-5 h-5 relative" >
                        <svg className="fill-black stroke-black" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6.32302 15V5M6.32302 5L4 7.95504M6.32302 5L8.64604 7.95504M13.677 5V15M13.677 15L11.354 12.045M13.677 15L16 12.045" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-center text-sm font-medium font-inter leading-normal">Transfers</div>
                </Link>
                <Link href="/profile" className={`group self-stretch rounded justify-start items-center gap-5 inline-flex border ${isActiveLink('/profile') ? `border-[#D0D0D0] text-black p-[12px_13px]` : 'border-transparent p-[12px_13px] text-[#ababab]'}`}>
                    <div className="w-5 h-5 relative" >
                        <svg className="fill-black" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.0029 9.16653C10.6623 9.16653 11.307 8.97098 11.8553 8.60461C12.4036 8.23824 12.831 7.7175 13.0833 7.10825C13.3357 6.499 13.4017 5.82859 13.2731 5.18181C13.1444 4.53503 12.8269 3.94093 12.3606 3.47462C11.8943 3.00832 11.3001 2.69077 10.6534 2.56211C10.0066 2.43346 9.33618 2.49949 8.72693 2.75185C8.11768 3.00421 7.59694 3.43157 7.23057 3.97988C6.8642 4.5282 6.66865 5.17284 6.66865 5.83229C6.66865 6.71659 7.01993 7.56466 7.64523 8.18995C8.27052 8.81525 9.11859 9.16653 10.0029 9.16653ZM10.0029 4.16517C10.3326 4.16517 10.6549 4.26294 10.9291 4.44613C11.2032 4.62931 11.4169 4.88968 11.5431 5.19431C11.6693 5.49894 11.7023 5.83414 11.638 6.15753C11.5737 6.48092 11.4149 6.77797 11.1817 7.01112C10.9486 7.24427 10.6515 7.40305 10.3281 7.46738C10.0047 7.5317 9.66954 7.49869 9.36491 7.37251C9.06028 7.24633 8.79992 7.03265 8.61673 6.75849C8.43354 6.48433 8.33577 6.16201 8.33577 5.83229C8.33577 5.39014 8.51141 4.9661 8.82406 4.65346C9.1367 4.34081 9.56074 4.16517 10.0029 4.16517Z" />
                            <path d="M10.0029 10.8336C8.45537 10.8336 6.97124 11.4484 5.87698 12.5427C4.78272 13.6369 4.16797 15.1211 4.16797 16.6686C4.16797 16.8896 4.25579 17.1017 4.41211 17.258C4.56844 17.4143 4.78045 17.5021 5.00153 17.5021C5.2226 17.5021 5.43462 17.4143 5.59094 17.258C5.74727 17.1017 5.83509 16.8896 5.83509 16.6686C5.83509 15.5632 6.2742 14.5031 7.05581 13.7215C7.83742 12.9399 8.89752 12.5008 10.0029 12.5008C11.1083 12.5008 12.1684 12.9399 12.95 13.7215C13.7316 14.5031 14.1707 15.5632 14.1707 16.6686C14.1707 16.8896 14.2585 17.1017 14.4148 17.258C14.5712 17.4143 14.7832 17.5021 15.0043 17.5021C15.2253 17.5021 15.4373 17.4143 15.5937 17.258C15.75 17.1017 15.8378 16.8896 15.8378 16.6686C15.8378 15.1211 15.2231 13.6369 14.1288 12.5427C13.0345 11.4484 11.5504 10.8336 10.0029 10.8336Z" />
                        </svg>
                    </div>
                    <div className="px-2 py-1.5 justify-center items-center gap-1 xlg:flex hidden">
                        <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-sm font-medium font-inter leading-normal">Profile</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SideNav;