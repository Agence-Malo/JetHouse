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

interface NewsAccordionProps {
  availableMonths: { [year: number]: number[] };
  onMonthSelect?: (year: number, monthIndex: number) => void;
}

const NewsAccordion: React.FC<NewsAccordionProps> = ({
  availableMonths,
  onMonthSelect,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Selection>(new Set());
  const [activeSelection, setActiveSelection] = useState<{
    year: number;
    monthIndex: number;
  } | null>(null);

  const onChange = (keys: Selection) => {
    setExpandedKeys(keys);
  };

  const handleMonthClick = (year: number, monthIndex: number) => {
    setActiveSelection({ year, monthIndex });
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
        {Object.entries(availableMonths).map(([year, months]) => (
          <AccordionItem
            key={year}
            aria-label={`Year ${year}`}
            className="text-blue-950"
            indicator={() => <ChevronIcon />}
            title={
              <h4 className="font-normal text-blue-950 normal-case">{year}</h4>
            }
          >
            <ul className="pl-2">
              {months.map((monthIndex) => {
                const isActive =
                  activeSelection?.year === Number(year) &&
                  activeSelection?.monthIndex === monthIndex;
                return (
                  <li
                    key={monthIndex}
                    className={`text-blue-950 text-sm py-1 cursor-pointer hover:underline ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                    onClick={() => handleMonthClick(Number(year), monthIndex)}
                  >
                    {new Date(2000, monthIndex).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </li>
                );
              })}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default NewsAccordion;
