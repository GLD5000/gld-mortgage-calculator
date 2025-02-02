import React from "react";
import MortgageInputNumerical from "../MortgageInputNumerical";
import MortgageOutput from "../MortgageOutput";

export default function HouseBuying({
  additionalCapital,
  setAdditionalCapital,
  housePrice,
  setHousePrice,
  buyingSolicitorFees,
  setBuyingSolicitorFees,
  stampDuty,
  totalBuyingFees,
  totalCapital,
  principal,
  loanToValue,
}: {
  additionalCapital: string;
  setAdditionalCapital: (value: string) => void;
  housePrice: string;
  setHousePrice: (value: string) => void;
  buyingSolicitorFees: string;
  setBuyingSolicitorFees: (value: string) => void;
  stampDuty: number;
  totalBuyingFees: number;
  totalCapital: number;
  principal: number;
  loanToValue: number;
}) {
  return (
    <div className="grid gap-2 w-full bg-black justify-start">
      <h2 className="text-left text-2xl">House Buying</h2>
      <div className="grid">
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageInputNumerical
            message="Add Capital"
            value={additionalCapital}
            setValue={setAdditionalCapital}
          />
          <MortgageInputNumerical
            message="House Price"
            value={housePrice}
            setValue={setHousePrice}
          />
          <MortgageInputNumerical
            message="Buying Solicitor Fees"
            value={buyingSolicitorFees}
            setValue={setBuyingSolicitorFees}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageOutput
            message="Stamp Duty"
            value={`${stampDuty.toLocaleString()}`}
          />
          <MortgageOutput
            message="Total Buying Fees"
            value={totalBuyingFees.toLocaleString()}
          />
          <MortgageOutput
            message="Total Capital"
            value={`${totalCapital.toLocaleString()}`}
          />
          <MortgageOutput
            message="Principal"
            value={`${principal.toLocaleString()}`}
          />
          <MortgageOutput
            unit="%"
            message="LTV"
            value={loanToValue.toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
}
