"use client";
import { threeDot } from '@/assets';
import { User } from '@/interfaces';
import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';

const TransactionsTable = ({ donors, withdrawals }: { donors?: User[], withdrawals?: any[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 1;

    const isDonors = !!donors;

    const totalRows = isDonors ? (donors?.length ?? 0) : (withdrawals?.length ?? 0);
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = isDonors ? donors?.slice(startIndex, endIndex) : withdrawals?.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toUTCString()?.split(",")[1]?.split("GMT")[0]}`;
    };

    return (
        <div className="flex flex-col w-full gap-3">
            <div className="w-full max-w-[100%] overflow-auto flex flex-col gap-3">
                <div className="grid grid-cols-4 gap-2.5 min-w-[694px] overflow-auto grid-rows-1 py-3 border-y border-[#BABDC1]">
                    <p className="font-inter text-[14px] font-[600] leading-5 text-[#969696]">Transaction</p>
                    <p className="font-inter text-[14px] font-[600] leading-5 text-[#969696]">Amount</p>
                    <p className="font-inter text-[14px] font-[600] leading-5 text-[#969696]">Status</p>
                    <p className="font-inter text-[14px] font-[600] leading-5 text-[#969696]">Date</p>
                </div>
                <div className="min-w-[694px] flex flex-col gap-1">
                    {currentData && currentData.length > 0 &&
                        currentData.map((item: any,index) => (
                            <div key={index} className="grid gap-2.5 grid-cols-4 grid-rows-1 h-[36px] items-center pb-1.5 border-b border-[#040608]">
                                <p className="font-roboto text-[12px] font-[400] leading-[18px] text-[#393D42]">{item._id}</p>
                                <p className="font-roboto text-[12px] font-[400] leading-[18px] text-[#393D42]">${item.amount}</p>
                                <div>
                                    <p className="font-roboto w-fit text-[12px] font-[500] leading-[18px] text-[#fff] py-0.5 px-1.5 rounded-3xl bg-[#10A363]">{item.status}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="font-roboto max-w-[77.25px] text-[12px] font-[400] leading-[18px] text-[#393D42]">{formatDateTime(isDonors ? (item.donatedAt?.toString() as string) : item.date?.toString() as string)}</p>
                                    <div className="w-5 h-5 relative">
                                        <Image className="rotate-90" src={threeDot} alt="threeDot" />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-2">
                <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
                <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
                <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Last</button>
                <button className="px-3 py-1 border border-gray-300 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TransactionsTable;