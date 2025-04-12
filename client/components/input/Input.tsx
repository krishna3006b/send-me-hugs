"use client";
import React, { ChangeEvent, useState, FocusEvent } from 'react';

interface inputProps {
    type: string;
    label?: string;
    name: string;
    placeholder?: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    multiple?: boolean;
    required?: boolean;
}

function Input({ type, label, name, placeholder, handleChange, multiple, required }: inputProps) {
    const [isTouched, setIsTouched] = useState(false);
    const [value, setValue] = useState('');

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
    };

    const handleChangeInternal = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        handleChange(e);
    };

    const isError = isTouched && !value;

    return (
        <div className='input-container relative flex flex-col gap-1'>
            <input
                className={`py-2 px-2 bg-transparent outline-none rounded-md border ${isError ? 'border-red-500' : 'border-white'} focus:border-[#02AB9A]`}
                id={label}
                type={type}
                name={name}
                placeholder=" "
                onChange={handleChangeInternal}
                onBlur={handleBlur}
                multiple={multiple}
                required={required}
            />
            {label && (
                <label className={`${isError?'text-red-600':'text-white'} capitalize w-max absolute top-2.5 left-2.5 bg-transparent px-1 transform transition-all duration-200 ease-in ${value ? '-translate-y-6' : 'translate-y-0'}`} htmlFor={label} >
                    {placeholder || `${label}`}
                </label>
            )}
            {/* <span className="text-red-500 mt-1 text-sm h-3">{isError ? 'This field is required' : ' '}</span> */}
        </div>
    );
}

export default Input;