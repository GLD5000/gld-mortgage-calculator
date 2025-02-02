import React from "react";
import MortgageInputNumerical from "../MortgageInputNumerical";
import MortgageOutput from "../MortgageOutput";

export default function EquityGrowth({
  housePriceInflationRate,
  setHousePriceInflationRate,
  averageMonthlyEquityPayoff,
  totalEquityPayoff,
  housePriceInflation,
  totalEquityYield,
  // resultingEquity,
  equivalentInvestment,
  fixedTerm,
  periodOfInvestment,
  setPeriodOfInvestment,
  // initialEquity,
  equityGrowth,
  apiInflationRate,
  setApiInflationRate,
}: {
  housePriceInflationRate: string;
  setHousePriceInflationRate: (value: string) => void;
  averageMonthlyEquityPayoff: number;
  totalEquityPayoff: number;
  housePriceInflation: number;
  totalEquityYield: number;
  // resultingEquity: number;
  equivalentInvestment: number;
  periodOfInvestment: string;
  fixedTerm: string;
  setPeriodOfInvestment: (value: string) => void;
  // initialEquity: number;
  equityGrowth: number;
  apiInflationRate: string;
  setApiInflationRate: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 w-full bg-black justify-start">
      <h2 className="text-left text-2xl">Equity Growth</h2>
      <div className="grid">
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageInputNumerical
            message="Investment Period"
            unit="yrs"
            value={periodOfInvestment}
            setValue={setPeriodOfInvestment}
          />
          <MortgageInputNumerical
            message="HPI Inflation"
            unit="%"
            value={housePriceInflationRate}
            setValue={setHousePriceInflationRate}
          />
          <MortgageInputNumerical
            message="API Inflation"
            unit="%"
            value={apiInflationRate}
            setValue={setApiInflationRate}
          />
        </div>

        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageOutput
            message={`Monthly Payoff`}
            value={`${averageMonthlyEquityPayoff.toLocaleString()}`}
          />
          <MortgageOutput
            message={`${Number(periodOfInvestment || fixedTerm)} Year Payoff`}
            value={`${totalEquityPayoff.toLocaleString()}`}
          />
          <MortgageOutput
            message={`House Inflation`}
            value={`${housePriceInflation.toLocaleString()}`}
          />
          <MortgageOutput
            message={`Total Yield`}
            value={`${totalEquityYield.toLocaleString()}`}
          />
          {/* <MortgageOutput
            message="Initial Equity"
            value={`${initialEquity.toLocaleString()}`}
          />{" "}
          <MortgageOutput
            message="Final Equity"
            value={`${resultingEquity.toLocaleString()}`}
          /> */}
          <MortgageOutput
            message="Profit"
            value={`${equityGrowth.toLocaleString()}`}
          />
          <MortgageOutput
            message={`Equiv. Investment`}
            value={`${equivalentInvestment.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
}
