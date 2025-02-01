"use client";

import { ReactNode, useEffect, useState } from "react";

export default function MortgageInputNumerical({
  message,
  value,
  setValue,
  unit = "£",
}: {
  message: string;
  value: number | string;
  setValue: (value: string) => void; //eslint-disable-line
  unit?: string;
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onChange={(e) => setState(Number(e.target.value))}
          onBlur={(e) => setValue(`${e.target.value}`)}
        />
        {unit !== "£" && unit}
      </div>
    </label>
  );
}
