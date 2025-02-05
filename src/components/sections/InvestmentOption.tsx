import React from "react";
import MortgageInputNumerical from "../MortgageInputNumerical";
import MortgageOutput from "../MortgageOutput";

export default function InvestmentOption({
  investmentRate,
  setInvestmentRate,
  rent,
  setRent,
  monthlyCostDiffRent,
  totalCostDiffRent,
  investmentYield,
  investmentProfit,
  optionalInvestmentAmount,
  setOptionalInvestmentAmount,
}: {
  investmentRate: string;
  setInvestmentRate: (value: string) => void;
  rent: string;
  setRent: (value: string) => void;
  monthlyCostDiffRent: number;
  totalCostDiffRent: number;
  investmentYield: number;
  investmentProfit: number;
  optionalInvestmentAmount: number;
  setOptionalInvestmentAmount: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 w-full bg-black justify-start">
      <h2 className="text-left text-2xl">Investment Growth</h2>
      <div className="grid">
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageInputNumerical
            message="Investment Amount"
            value={optionalInvestmentAmount}
            setValue={setOptionalInvestmentAmount}
            digits={4}
          />
          <MortgageInputNumerical
            message="Investment Rate"
            unit="%"
            value={investmentRate}
            setValue={setInvestmentRate}
          />
          <MortgageInputNumerical
            message="Monthly Rent"
            value={rent}
            setValue={setRent}
            digits={4}
          />
        </div>

        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageOutput
            message="Month Cost diff"
            value={`${monthlyCostDiffRent.toLocaleString()}`}
          />
          <MortgageOutput
            message="Total Cost diff"
            value={`${totalCostDiffRent.toLocaleString()}`}
          />
          <MortgageOutput
            message="Investment Yield"
            value={`${investmentYield.toLocaleString()}`}
          />
          <MortgageOutput
            message="Profit"
            value={`${investmentProfit.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
}
