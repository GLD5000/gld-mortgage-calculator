"use client";

import { ReactNode, useState } from "react";

export default function MortgageSelector({
  message,
  defaultValue,
  selection,
  children,
}: {
  message: string;
  title: string;
  defaultValue: number | string;
  isString?: boolean;
  selection: string[];
  unit?: string;
  children?: ReactNode;
}) {
  const [state, setState] = useState(defaultValue);


    return (
      <>
        <label
          className={`grid gap-2 items-center p-0 
              grid-cols-[1fr_auto] w-full bg-black md:w-[min(100%,50rem)]`}
        >
          {`${message}: `}
          <select
            className="block m-0 bg-black text-white border border-white rounded w-fit p-1 text-center ml-auto hover:invert focus:invert"
            onChange={(e) => {
              const current = `${e.target.value}`;
              setState(current);
            }}
            value={state}
          >
            {selection.map((optionName, number) => {
              const key = `option-${number}`;
              return (
                <option key={key} className="text-white">
                  {optionName}
                </option>
              );
            })}
          </select>
        </label>
        {children}
      </>
    );
  }


