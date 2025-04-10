import React from 'react';

function BackButton({ swiper, text }: any) {

    const onClick = () => {
        if (text) {
            swiper.current?.swiper.slideTo(0)
        }
        else {
            swiper.current?.swiper.slidePrev()
        }
    }

    return (
        <div>
            <div className="lg:py-2 py-1.5 lg:px-3 px-2 flex justify-center items-center gap-1.5 rounded-[36px] border-[2px_solid_#298D7C] bg-[rgba(229,248,244,0.70)] w-fit cursor-pointer text-[#298D7C] text-center font-popins leading-6 lg:text-[16px] text-[14px] font-[500]" onClick={onClick}>{text ? text : "Back"}</div>
        </div>
    );
}

export default BackButton;