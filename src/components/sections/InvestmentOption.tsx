import React from "react";
import MortgageInputNumerical from "../MortgageInputNumerical";
import MortgageOutput from "../MortgageOutput";

export default function InvestmentOption({
  investmentRate,
  setInvestmentRate,
  rent,
  setRent,
  monthlyCostDiffRent,
}: //   fixedTerm,
//   periodOfInvestment,
//   apiInflationRate,

{
  investmentRate: string;
  setInvestmentRate: (value: string) => void;
  rent: string;
  setRent: (value: string) => void;
  monthlyCostDiffRent: number;
  //   periodOfInvestment: string;
  //   fixedTerm: string;
  //   apiInflationRate: string;
}) {
  return (
    <div className="grid gap-2 w-full bg-black justify-start">
      <h2 className="text-left text-2xl">Investment Growth</h2>
      <div className="grid">
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
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
          />
        </div>

        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageOutput
            message="Month Cost diff"
            value={`${monthlyCostDiffRent.toLocaleString()}`}
          />{" "}
          <MortgageOutput
            message="Investment Yield"
            value={`${monthlyCostDiffRent.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
}
