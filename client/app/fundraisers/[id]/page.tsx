"use client";

import React, {useState } from 'react';
import DashNav from '@/components/dashboard/DashNav';
import {  DeleteFundraiserPopup, FundraiserItem, SideNav } from '@/components';

function Dashboard() {

  const [deletePopup, setDeletePopup] = useState(false)  

  return (
    <div className="h-[100vh] flex bg-[#f2f2f2]">
      <SideNav />
      <div className="flex h-[100vh]  w-[100%] flex-col">
        <DashNav /> 
        <FundraiserItem setDeletePopup={setDeletePopup} />
      </div>
      {
        deletePopup && <div className="w-[100vw] z-[100] h-[100vh] flex justify-center items-center absolute  bg-black/40 z-99">
          <DeleteFundraiserPopup setDeletePopup={setDeletePopup} />
        </div>
      }
    </div>
  )
}

export default Dashboard
