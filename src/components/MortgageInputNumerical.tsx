"use client";

import { useState } from "react";

export default function MortgageInputNumerical({
  message,
  value,
  setValue,
  unit = "£",
  digits,
}: {
  message: string;
  value: number | string;
  setValue: (value: string) => void;
  unit?: string;
  digits?: number;
}) {
  const [state, setState] = useState(value);

  return (
    <label className={`grid gap-2 items-center p-0 grid-cols-1 w-40`}>
      {`${message}: `}

      <div className="flex gap-[2px] m-0 text-black placeholder:text-black bg-white rounded w-40 p-1 text-center">
        {unit === "£" && unit}
        <input
          className="inline w-full bg-white px-[2px]"
          type="number"
          value={state}
          onFocus={(e) => {
            if (e.currentTarget && e.currentTarget.value) {
              e.currentTarget.select();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onChange={(e) => setState(Number(e.target.value))}
          onBlur={(e) => {
            if (digits) {
              const numberValue = Number(e.target.value) || 0;
              const numberLength = `${numberValue}`.length;
              if (numberValue > 0 && numberLength < digits) {
                const padded = `${numberValue}`.padEnd(digits, "0");
                setValue(padded);
                setState(padded);
              } else {
                setValue(`${numberValue}`);
              }
            } else {
              setValue(`${Number(e.target.value) || ""}`);
            }
          }}
        />
        {unit !== "£" && unit}
      </div>
    </label>
  );
}
