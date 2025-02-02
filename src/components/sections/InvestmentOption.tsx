import React from "react";
import MortgageInputNumerical from "../MortgageInputNumerical";

export default function InvestmentOption({
  investmentRate,
  setInvestmentRate,
  rent,
  setRent,
}: {
  investmentRate: string;
  setInvestmentRate: (value: string) => void;
  rent: string;
  setRent: (value: string) => void;
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
          {/* <MortgageOutput
              message="Initial Equity"
              value={`${initialEquity.toLocaleString()}`}
            />{" "}
            <MortgageOutput
              message="Final Equity"
              value={`${resultingEquity.toLocaleString()}`}
            /> */}
        </div>
      </div>
    </div>
  );
}
