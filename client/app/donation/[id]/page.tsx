"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Navbar, Footer, FooterBottom, DonorCard } from '@/components';
import { cross, facebook, graph, graph2, graph3, instagram, pay1, pay2, pay3, pay4, pay5, pay6, twitter } from '@/assets';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { setAlert } from '@/store/slices';
import axios from 'axios';
import { Fundraising, User } from '@/interfaces';
import { RootState } from '@/store/store';
import contractABI from '@/utils/contractrAbi.json'
import Web3 from 'web3';

const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const ContractAbi: any = contractABI;

function Help() {
    const [navOpen, setNavOpen] = useState(false);
    const [tab, setTab] = useState("story");
    const [fundraising, setFundraising] = useState<Fundraising>({ email: "", title: "", story: "", thumbnail: "", amount: 0, amountDonated: 0, fundraisingFor: "", category: "", id: "", location: "", role: "", })
    const [donateModal, setDonateModal] = useState(false)
    const [web3, setWeb3] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState("");
    const [donationAmount, setDonationAmount] = useState<number>(0);
    const [ethDonationAmount, setethDonationAmount] = useState('');
    const [donationEvent, setDonationEvent] = useState('success');
    const [transactionHash, setTransactionHash] = useState('');
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<User>({ email: '' });
    const router = useRouter()

    const walletAddress = useSelector((state: RootState) => state.wallet.walletAddress)

    useEffect(() => {
        if (typeof window !== undefined) {
            const userData = localStorage.getItem('credentials');
            if (userData)
                setUser(JSON.parse(userData));
        }
    }, []);

    const dispatch = useDispatch();
    const { id } = useParams();

    const fetchRaising = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising/${id}`);
            setFundraising(res.data.raising)
        } catch (e: any) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }));
            console.log(e)
        } finally{
            setLoading(false)
        }
    }

    const handleDonate = async () => {
        if (contract && fundraising.walletAddress && fundraising.id) {
            try {
                const transactionReceipt = await contract.methods
                    .donate(fundraising.walletAddress, fundraising.id)
                    .send({
                        from: account,
                        value: web3.utils.toWei(ethDonationAmount, "ether"),
                    });

                const transactionHash = transactionReceipt.transactionHash;

                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising/${id}`, {
                    email: user.email,
                    amount: donationAmount,
                    transactionHash
                });

                setFundraising(res.data.raising)
                setTransactionHash(transactionHash)
                setDonationEvent('success');

            } catch (error) {
                console.error("Error during donation:", error);
                setDonationEvent('fail')
            }
        } else {
            alert("Please fill in all fields correctly.");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)

        fetchRaising();

        if ((window as any).ethereum) {
            const web3Instance = new Web3((window as any).ethereum);
            setWeb3(web3Instance);

            const contractInstance = new web3Instance.eth.Contract(ContractAbi, ContractAddress);
            setContract(contractInstance);

            (window as any).ethereum.request({ method: "eth_requestAccounts" }).then((accounts: any) => {
                setAccount(accounts[0]);
            });
        } else {
            dispatch(setAlert({message:'Please install MetaMask to use this application.',type:'warning'}))
            setTimeout(() => {
                dispatch(setAlert({message:'',type:'warning'}))
            }, 1200);
        }

    }, [])

    useEffect(() => {
        setethDonationAmount(donationAmount ? (donationAmount / 2800).toFixed(5) : '')
    }, [donationAmount])

    useEffect(() => {
        let donateEvent = (e: any) => {
            if (!document.querySelector('.donate-modal')?.contains(e.target as Node)) {
                setDonateModal(false)
                setDonationEvent('')
            }
        }

        document.addEventListener('click', donateEvent)

        return () => document.removeEventListener('click', donateEvent)

    }, [donateModal])

    return (
        <div className={`w-[100%] min-h-screen bg-dark-cyan overflow-x-hidden relative`}>
            <div className="faq-background-circle-design"></div>
            <div className="background-circle-design1 faq-design1"></div>

            <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />

            {
                donateModal &&
                <div className="w-[100vw] z-[100] h-[100vh] flex justify-center items-center fixed top-0 bg-black/40 z-99">
                    <div className="popup-animation donate-modal max-w-[666px] w-[90%] h-[399px] p-3 bg-white flex-col justify-start items-end gap-[77px] inline-flex">
                        <div onClick={() => setDonateModal(false)} className="w-6 h-6 relative">
                            <Image src={cross} alt="Cancel" />
                        </div>
                        {
                            !transactionHash ?
                                <div className="self-stretch py-[17px] flex-col justify-start items-center gap-4 flex">
                                    <div className="self-stretch h-[60px] flex-col justify-start items-center gap-3 flex">
                                        <div className="self-stretch opacity-90 text-center text-[#112230] text-xl font-bold font-inter leading-7">How much would you like to donate?</div>
                                        <div className="self-stretch text-center text-[#6d6d6d] text-sm font-normal font-roboto leading-tight">1 Eth ~ 2800$</div>
                                    </div>
                                    <div className="self-stretch justify-center gap-10 flex flex-col items-center">
                                        <div className="bg-white h-14 flex justify-between gap-3 p-2 relative">
                                            <div className="form-group h-[64px] flex justify-end flex-col relative">
                                                <input type="number" id="ethAmount" onChange={(e: ChangeEvent<HTMLInputElement>) => setDonationAmount(Number(e.target.value))} placeholder="" className="cursor-text form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                                <label htmlFor="ethAmount" className="form-label bg-white text-[12px] font-[500]">Amount in USD</label>
                                            </div>
                                            <div className="form-group h-[64px] flex justify-end flex-col relative">
                                                <input type="number" id="ethAmount" readOnly value={ethDonationAmount} placeholder="" className="cursor-text form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                                <label htmlFor="ethAmount" className="form-label bg-white text-[12px] font-[500]">Amount in Ethereum</label>
                                            </div>
                                        </div>
                                        <button disabled={!user.email} onClick={handleDonate} className='w- bg-gradient-cyan bg-gradient-cyan-hover text-white p-[6px_8px] text-[14px] rounded-[36px]'>Donate</button>
                                    </div>
                                </div> :
                                donationEvent === 'success' ?
                                    <div className="self-stretch h-[174px] py-[17px] flex-col justify-start items-center gap-11 flex">
                                        <div className="self-stretch h-[60px] flex-col justify-start items-center gap-3 flex">
                                            <div className="self-stretch opacity-90 text-center text-[#112230] text-xl font-bold font-inter leading-7">Donation Successful</div>
                                            <div className="self-stretch text-center text-[#6d6d6d] text-sm font-normal font-roboto leading-tight">Transaction Hash :
                                                <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target='_blank' className='hover:underline'> ljegukguijhj{transactionHash}</a>
                                            </div>
                                        </div>
                                        <div className="self-stretch justify-center gap-3 flex flex-col items-center">
                                            <Link href="/" className='w- bg-gradient-cyan bg-gradient-cyan-hover text-white p-[6px_8px] text-[14px] rounded-[36px]'>Thanks for donation</Link>
                                        </div>
                                    </div> :
                                    <div className="self-stretch h-[174px] py-[17px] flex-col justify-start items-center gap-11 flex">
                                        <div className="self-stretch h-[60px] flex-col justify-start items-center gap-3 flex">
                                            <div className="self-stretch opacity-90 text-center text-[#112230] text-xl font-bold font-inter leading-7">Donation Failure</div>
                                        </div>
                                        <div className="self-stretch justify-center gap-3 flex flex-col items-center">
                                            <Link href="/" className='w- bg-gradient-cyan bg-gradient-cyan-hover text-white p-[6px_8px] text-[14px] rounded-[36px]'>Try again later</Link>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
            }

            {
                loading ?
                    <div className='w-full h-[80vh] flex items-center justify-center '>
                        <div className="w-10 h-10 border-4 border-t-transparent animate-spin border-[#27A38A] rounded-full"></div>
                    </div> :
                    <>
                        <div className="flex gap-2.5 md:gap-[21px] bg-white h-fit flex-col md:flex-row justify-between items-center py-1.5 xl:h-[70px] 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] 2xl:hidden relative z-[2]">

                            <div className="flex  w-[100%] md:w-auto gap-[20px] items-center xss:justify-center xss:flex-wrap ">
                                <div className="flex xss:gap-2 gap-[18px] items-center  xss:flex-wrap justify-center">
                                    <div className="flex text-black items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                            <path d="M24.7502 9.9C24.7502 9.54638 24.6053 9.20724 24.3474 8.95719C24.0896 8.70714 23.7398 8.56667 23.3752 8.56667L12.3752 8.5C12.0105 8.5 11.6608 8.64048 11.4029 8.89052C11.145 9.14057 11.0002 9.47971 11.0002 9.83333C11.0002 10.187 11.145 10.5261 11.4029 10.7761C11.6608 11.0262 12.0105 11.1667 12.3752 11.1667H20.0202L8.64891 22.22C8.52003 22.344 8.41774 22.4914 8.34793 22.6539C8.27813 22.8164 8.24219 22.9907 8.24219 23.1667C8.24219 23.3427 8.27813 23.517 8.34793 23.6794C8.41774 23.8419 8.52003 23.9894 8.64891 24.1133C8.77673 24.2383 8.92881 24.3375 9.09637 24.4052C9.26392 24.4729 9.44364 24.5077 9.62516 24.5077C9.80668 24.5077 9.9864 24.4729 10.154 24.4052C10.3215 24.3375 10.4736 24.2383 10.6014 24.1133L22.0002 13.06V20.5C22.0002 20.8536 22.145 21.1928 22.4029 21.4428C22.6607 21.6929 23.0105 21.8333 23.3752 21.8333C23.7398 21.8333 24.0896 21.6929 24.3474 21.4428C24.6053 21.1928 24.7502 20.8536 24.7502 20.5V9.9Z" fill="black" />
                                        </svg>
                                        <div className="font-inter text-[14px] font-[500] xss:pl-2 pl-[17px] min-w-[80px]">${fundraising.amountDonated.toFixed(2).toLocaleString() || 0} </div>
                                    </div>
                                    <div className="flex text-black items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <circle cx="15.9998" cy="16" r="3.2" fill="black" />
                                            <path d="M16.0002 16L28.8002 3.19995M23.6802 16C23.6802 20.2415 20.2417 23.68 16.0002 23.68C11.7586 23.68 8.3202 20.2415 8.3202 16C8.3202 11.7584 11.7586 8.31995 16.0002 8.31995C20.2417 8.31995 23.6802 11.7584 23.6802 16ZM28.8002 16C28.8002 23.0692 23.0694 28.8 16.0002 28.8C8.93095 28.8 3.2002 23.0692 3.2002 16C3.2002 8.93071 8.93095 3.19995 16.0002 3.19995C23.0694 3.19995 28.8002 8.93071 28.8002 16Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <div className="font-inter text-[14px] font-[500] xss:pl-2 pl-[17px] min-w-[80px]">${fundraising.amount.toFixed(2).toLocaleString() || 0} </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <p className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[16px] font-bold text-black'>{(fundraising.amountDonated / fundraising.amount * 100).toFixed(0)}%</p>
                                    <Image className="w-[58px]" src={graph} alt="Graph" />
                                </div>
                            </div>
                            <button disabled={!user.email} onClick={() => setDonateModal(true)} className="bg-gradient-cyan bg-gradient-cyan-hover font-popins text-[16px] p-[10px_14px] rounded-[36px] h-fit md:w-[143px] w-full text-white">Donate</button>

                        </div>

                        <div className="relative z-[2] mx-auto text-white 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] pt-3">

                            <Link href="/" className="flex items-center p-[6px_8px] gap-1 w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12.8002 7.99981L3.2002 7.9998M3.2002 7.9998L6.59431 11.1998M3.2002 7.9998L6.59431 4.7998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Back</span>
                            </Link>

                            <div className="">
                                <div className="flex pt-5 gap-5 pb-[75px]">

                                    <div className="flex flex-col gap-8 2xl:w-[calc(100%_-_407px] w-full">
                                        <h2 className="text-[32px] font-lato font-bold leading-10 text-white">{fundraising.title}</h2>
                                        <div className="flex flex-col gap-7">
                                            <div className="h-[30vw] lg:h-[388px] relative flex justify-center">
                                                <Image src={fundraising.thumbnail} fill layout='cover' className='' alt="Fundraiser Thumbnail" />
                                            </div>
                                            <div className="flex flex-col gap-[31px]">
                                                <div className="flex md:items-center justify-between md:flex-row flex-col">
                                                    <div className="flex gap-[13px] sm:gap-[18px] xss:flex-col flex-row items-center xss:items-start">
                                                        <div className="flex gap-[8px] sm:gap-[17px] items-center text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                                                <path d="M24.7502 9.4C24.7502 9.04638 24.6053 8.70724 24.3474 8.45719C24.0896 8.20714 23.7398 8.06667 23.3752 8.06667L12.3752 8C12.0105 8 11.6608 8.14048 11.4029 8.39052C11.145 8.64057 11.0002 8.97971 11.0002 9.33333C11.0002 9.68696 11.145 10.0261 11.4029 10.2761C11.6608 10.5262 12.0105 10.6667 12.3752 10.6667H20.0202L8.64891 21.72C8.52003 21.844 8.41774 21.9914 8.34793 22.1539C8.27813 22.3164 8.24219 22.4907 8.24219 22.6667C8.24219 22.8427 8.27813 23.017 8.34793 23.1794C8.41774 23.3419 8.52003 23.4894 8.64891 23.6133C8.77673 23.7383 8.92881 23.8375 9.09637 23.9052C9.26392 23.9729 9.44364 24.0077 9.62516 24.0077C9.80668 24.0077 9.9864 23.9729 10.154 23.9052C10.3215 23.8375 10.4736 23.7383 10.6014 23.6133L22.0002 12.56V20C22.0002 20.3536 22.145 20.6928 22.4029 20.9428C22.6607 21.1929 23.0105 21.3333 23.3752 21.3333C23.7398 21.3333 24.0896 21.1929 24.3474 20.9428C24.6053 20.6928 24.7502 20.3536 24.7502 20V9.4Z" fill="white" />
                                                            </svg>
                                                            <div className="font-inter text-[16px] sm:text-[20px] font-[500]">${fundraising.amountDonated.toFixed(2).toLocaleString() || 0} </div>
                                                        </div>
                                                        <div className="flex gap-[8px] sm:gap-[17px] items-center text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                <circle cx="15.9998" cy="16" r="3.2" fill="white" />
                                                                <path d="M16.0002 16L28.8002 3.19995M23.6802 16C23.6802 20.2415 20.2417 23.68 16.0002 23.68C11.7586 23.68 8.3202 20.2415 8.3202 16C8.3202 11.7584 11.7586 8.31995 16.0002 8.31995C20.2417 8.31995 23.6802 11.7584 23.6802 16ZM28.8002 16C28.8002 23.0692 23.0694 28.8 16.0002 28.8C8.93095 28.8 3.2002 23.0692 3.2002 16C3.2002 8.93071 8.93095 3.19995 16.0002 3.19995C23.0694 3.19995 28.8002 8.93071 28.8002 16Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                                            </svg>
                                                            <div className="font-inter text-[16px] sm:text-[20px] font-[500]">${fundraising.amount.toFixed(2).toLocaleString() || 0} </div>
                                                        </div>
                                                        <div className="relative">
                                                            <p className='absolute left-[50%] top-[50%] translate-x-[-45%] translate-y-[-60%] text-[16px] font-bold text-white'>{(fundraising.amountDonated / fundraising.amount * 100).toFixed(0)}%</p>
                                                            <Image className="w-20" src={graph2} alt="Graph" />
                                                        </div>
                                                    </div>
                                                    <div className="font-inter text-[14px] font-[500] h-[42px] flex md:justify-center items-center gap-5">
                                                        <p>Share</p>
                                                        <div className="flex justify-center items-center gap-[13px]">
                                                            <Image src={instagram} alt="Instagram Icon" />
                                                            <Image src={twitter} alt="Twitter Icon" />
                                                            <Image src={facebook} alt="Facebook Icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex p-1 gap-6 items-center rounded-[100px] bg-[#325765]">
                                                    <button className={`${tab == "story" ? "bg-gradient-cyan" : ""} font-popins text-[14px] font-[500] leading-6 p-[6px_8px] rounded-[36px] w-full`} onClick={() => setTab("story")}>Story</button>
                                                    <button className={`${tab == "updates" ? "bg-gradient-cyan" : ""} font-popins text-[14px] font-[500] leading-6 p-[6px_8px] rounded-[36px] w-full`} onClick={() => setTab("updates")}>Updates</button>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <p className="font-inter text-[14px] leading-6 pb-7">{fundraising.story}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex  flex-col gap-[14px]">
                                            <h3 className="font-inter text-[24px] leading-9 font-bold">Supporters</h3>
                                            <div className="flex flex-col gap-[14px] bg-[#325765] p-[10px]">
                                                <div className="bg-white flex items-center p-2.5 gap-[15px]">
                                                    <p className="border-b border-primary-500 text-primary-500 font-inter text-[14px] font-[400] leading-5 w-fit">Click here</p>
                                                    <p className="font-inter text-[14px] font-[400] leading-5 text-black">if you are not able to find your donation listed below.</p>
                                                </div>
                                                <div className="flex flex-col gap-2.5 px-1.5 pb-3">
                                                    {
                                                        fundraising.donors?.map((donor, index: number) => <DonorCard donor={donor} key={index} />)
                                                    }
                                                    <p className="border font-popins border-primary-500 text-primary-500 p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] rounded-[36px] w-fit mx-auto mt-2.5">View All</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-5 flex flex-col gap-[21px] bg-white">
                                            <p className="text-[16px] text-black font-inter leading-6 mx-auto">Know someone in need of funds?</p>
                                            <p className="border font-popins border-primary-500 text-primary-500 p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] rounded-[36px] w-fit mx-auto mt-2.5">Refer to us</p>
                                        </div>
                                    </div>
                                    <div className="2xl:flex flex-col gap-[21px] bg-white w-[387px] h-fit hidden py-5 px-4">
                                        <p className="border-b border-primary-500 text-primary-500 font-inter text-[16px] font-[400] leading-6 w-fit mx-auto">{fundraising.donors?.length} supporters</p>
                                        <div className="relative">
                                            <p className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[32px] font-bold text-black'>{(fundraising.amountDonated / fundraising.amount * 100).toFixed(0)}%</p>
                                            <Image className="w-[158px] mx-auto" src={graph3} alt="Graph" />
                                        </div>
                                        <div className="flex gap-[18px] mx-auto">
                                            <div className="flex text-black">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                                    <path d="M24.7502 9.9C24.7502 9.54638 24.6053 9.20724 24.3474 8.95719C24.0896 8.70714 23.7398 8.56667 23.3752 8.56667L12.3752 8.5C12.0105 8.5 11.6608 8.64048 11.4029 8.89052C11.145 9.14057 11.0002 9.47971 11.0002 9.83333C11.0002 10.187 11.145 10.5261 11.4029 10.7761C11.6608 11.0262 12.0105 11.1667 12.3752 11.1667H20.0202L8.64891 22.22C8.52003 22.344 8.41774 22.4914 8.34793 22.6539C8.27813 22.8164 8.24219 22.9907 8.24219 23.1667C8.24219 23.3427 8.27813 23.517 8.34793 23.6794C8.41774 23.8419 8.52003 23.9894 8.64891 24.1133C8.77673 24.2383 8.92881 24.3375 9.09637 24.4052C9.26392 24.4729 9.44364 24.5077 9.62516 24.5077C9.80668 24.5077 9.9864 24.4729 10.154 24.4052C10.3215 24.3375 10.4736 24.2383 10.6014 24.1133L22.0002 13.06V20.5C22.0002 20.8536 22.145 21.1928 22.4029 21.4428C22.6607 21.6929 23.0105 21.8333 23.3752 21.8333C23.7398 21.8333 24.0896 21.6929 24.3474 21.4428C24.6053 21.1928 24.7502 20.8536 24.7502 20.5V9.9Z" fill="black" />
                                                </svg>
                                                <div className="font-inter text-[20px] font-[500] pl-[17px]">${fundraising.amountDonated.toFixed(2).toLocaleString() || 0} </div>
                                            </div>
                                            <div className="flex text-black">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <circle cx="15.9998" cy="16" r="3.2" fill="black" />
                                                    <path d="M16.0002 16L28.8002 3.19995M23.6802 16C23.6802 20.2415 20.2417 23.68 16.0002 23.68C11.7586 23.68 8.3202 20.2415 8.3202 16C8.3202 11.7584 11.7586 8.31995 16.0002 8.31995C20.2417 8.31995 23.6802 11.7584 23.6802 16ZM28.8002 16C28.8002 23.0692 23.0694 28.8 16.0002 28.8C8.93095 28.8 3.2002 23.0692 3.2002 16C3.2002 8.93071 8.93095 3.19995 16.0002 3.19995C23.0694 3.19995 28.8002 8.93071 28.8002 16Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                <div className="font-inter text-[20px] font-[500] pl-[17px]">${fundraising.amount.toFixed(2).toLocaleString() || 0} </div>
                                            </div>
                                        </div>
                                        <button onClick={() => { if (user.email) setDonateModal(true); else router.push('/login') }} className="bg-gradient-cyan bg-gradient-cyan-hover font-popins text-[16px] p-[10px_14px] rounded-[36px]">Donate</button>
                                        <p className="font-inter text-center text-[14px] leading-5 text-[rgba(93,93,93,1)]">Card, Netbanking, Cheque pickups</p>

                                        <div className="grid grid-cols-4 gap-3 items-center px-5 font-inter text-center text-[14px] leading-5 text-[rgba(93,93,93,1)]">
                                            <div className="h-[1px] bg-[rgba(156,51,83,0.18)]"></div>
                                            <span className="col-span-2">Or Donate using</span>
                                            <div className="h-[1px] bg-[rgba(156,51,83,0.18)]"></div>

                                        </div>
                                        <div className="flex items-center justify-center gap-[21px]">
                                            <span className="w-[34px] h-6 border rounded border-[#F5F5F5] flex justify-center items-center">
                                                <Image className="" src={pay1} alt="Payoneer" />
                                            </span>
                                            <span className="w-[34px] h-6 border rounded border-[#F5F5F5] flex justify-center items-center">
                                                <Image className="" src={pay2} alt="Amazon" />
                                            </span>
                                            <span className="w-[34px] h-6 border rounded border-[#F5F5F5] flex justify-center items-center">
                                                <Image className="" src={pay3} alt="AMEX" />
                                            </span>
                                            <span className="w-[34px] h-6 border rounded border-[#F5F5F5] flex justify-center items-center">
                                                <Image className="" src={pay4} alt="Apple Pay" />
                                            </span>
                                            <span className="w-[34px] h-6 border rounded border-[#F5F5F5] flex justify-center items-center">
                                                <Image className="" src={pay5} alt="G Pay" />
                                            </span>
                                            <span className="w-[34px] h-6 border rounded border-[#F5F5F5] flex justify-center items-center">
                                                <Image className="" src={pay6} alt="Master Card" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
            }


            <div className="bg-[rgba(53,85,92,0.30)]">
                <Footer />
                <div className="px-4 md:px-0 my-3">
                    <div className="h-[1px] w-[100%] bg-[#D9D9D9]"></div>
                </div>
                <FooterBottom />
            </div>
        </div>
    );
}

export default Help;