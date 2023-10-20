'use client'

import formatMoney from "@/utils/formatMoney";
import React, { useState } from "react";

interface TitleValuePairProps {
    title: string;
    value: number;
    textColor?: string;
}

const TitleValuePair: React.FC<TitleValuePairProps> = ({ title, value, textColor = 'text-white' }) => {

    return (
        <div className={`${textColor} w-full flex justify-between items-center gap-2`}>
            <div className="text-sm leading-tight truncate max-w-xs">{title}</div>
            <div className="text-sm font-semibold whitespace-nowrap">{formatMoney(value)}</div>
        </div>
    );
};

export default TitleValuePair;