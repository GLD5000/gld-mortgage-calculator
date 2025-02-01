export default function MortgageOutput({
  message,
  value,
}: {
  message: string;
  value: string;
}) {
  return (
    <label className="grid gap-2 items-center p-0 grid-cols-1 w-40">
      {`${message}: `}
      <div className="flex gap-[2px] m-0 text-[black] placeholder:text-black bg-[#b0b0b0] rounded w-40 p-1 text-center">
        £
        <div className="inline w-full bg-black bg-transparent px-[2px]">
          {value}
        </div>
      </div>
    </label>
  );
}
