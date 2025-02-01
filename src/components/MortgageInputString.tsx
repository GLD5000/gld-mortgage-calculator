"use client";

import { useState } from "react";

export default function MortgageInputString({
  message,
  value,
  setValue,
}: {
  message: string;
  value: number | string;
  setValue: (value: string) => void;
}) {
  const [state, setState] = useState(value);

  return (
    <label
      className={`grid gap-2 items-center p-0 grid-cols-[1fr_auto] w-full bg-black md:w-[min(100%,50rem)]`}
    >
      {`${message}: `}

      <input
        className="block m-0 text-white placeholder:text-white bg-transparent border border-current rounded w-full bg-black p-1 text-center ml-auto"
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setValue(`${e.target.value}`)}
      />
    </label>
  );
}
