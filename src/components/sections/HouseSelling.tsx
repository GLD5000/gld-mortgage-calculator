import React from "react";
import MortgageOutput from "../MortgageOutput";
import MortgageInputNumerical from "../MortgageInputNumerical";

export default function HouseSelling({
  currentMortgage,
  setCurrentMortgage,
  salePrice,
  setSalePrice,
  sellingSolicitorFees,
  setSellingSolicitorFees,
  agentRate,
  setAgentRate,
  agentFees,
  totalSellingFees,
  proceeds,
}: {
  currentMortgage: string;
  setCurrentMortgage: (value: string) => void;
  salePrice: string;
  setSalePrice: (value: string) => void;
  sellingSolicitorFees: string;
  setSellingSolicitorFees: (value: string) => void;
  agentRate: string;
  setAgentRate: (value: string) => void;
  agentFees: number;
  totalSellingFees: number;
  proceeds: number;
}) {
  return (
    <div className="grid gap-2 w-full bg-black justify-start">
      <h2 className="text-left text-2xl">House Selling</h2>
      <div className="grid gap-2">
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageInputNumerical
            message="Current Mortgage"
            value={currentMortgage}
            setValue={setCurrentMortgage}
            digits={6}
          />
          <MortgageInputNumerical
            message="Sale Price"
            value={salePrice}
            setValue={setSalePrice}
            digits={6}
          />
          <MortgageInputNumerical
            message="Selling Solicitor Fees"
            value={sellingSolicitorFees}
            setValue={setSellingSolicitorFees}
            digits={4}
          />
          <MortgageInputNumerical
            message="Agent Rate"
            unit="%"
            value={agentRate}
            setValue={setAgentRate}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageOutput
            message="Agent Fees"
            value={`${agentFees.toLocaleString()}`}
          />
          <MortgageOutput
            message="Total Selling Fees"
            value={`${totalSellingFees.toLocaleString()}`}
          />
          <MortgageOutput
            message="Proceeds"
            value={`${proceeds.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
}
