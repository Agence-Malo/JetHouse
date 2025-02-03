"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { useState } from "react";
import type { Selection } from "@react-types/shared";

const ChevronIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-[1.75rem] h-[1.75rem] fill-blue-950 transition-transform duration-200"
    >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
);

const yearsData = [
    {
        year: 2025,
        months: ["January", "February"],
    },
    {
        year: 2024,
        months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
];

interface NewsAccordionProps {
    onMonthSelect?: (year: number, monthIndex: number) => void;
}

const NewsAccordion: React.FC<NewsAccordionProps> = ({ onMonthSelect }) => {
    const [expandedKeys, setExpandedKeys] = useState<Selection>(new Set());

    const onChange = (keys: Selection) => {
        setExpandedKeys(keys);
    };

    const handleMonthClick = (year: number, monthIndex: number) => {
        if (onMonthSelect) {
            onMonthSelect(year, monthIndex);
        }
    };

    return (
        <aside className="flex flex-col gap-4">
            <Accordion
                variant="light"
                selectedKeys={expandedKeys}
                onSelectionChange={onChange}
            >
                {yearsData.map((item) => {
                    const keyStr = String(item.year);
                    return (
                        <AccordionItem
                            key={keyStr}
                            aria-label={`Year ${item.year}`}
                            className="text-blue-950"
                            indicator={() => <ChevronIcon />}
                            title={
                                <h4 className="font-normal text-blue-950 normal-case">
                                    {item.year}
                                </h4>
                            }
                        >
                            <ul className="pl-2">
                                {item.months.map((month, index) => (
                                    <li
                                        key={month}
                                        className="text-blue-950 text-sm py-1 hover:underline cursor-pointer"
                                        onClick={() => handleMonthClick(item.year, index)}
                                    >
                                        {month}
                                    </li>
                                ))}
                            </ul>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </aside>
    );
};

export default NewsAccordion;