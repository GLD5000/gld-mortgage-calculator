import React from "react";
import MortgageInputNumerical from "../MortgageInputNumerical";
import MortgageOutput from "../MortgageOutput";

export default function Mortgage({
  additionalLoan,
  setAdditionalLoan,
  mortgageTerm,
  setMortgageTerm,
  mortgageRate,
  setMortgageRate,
  fixedTerm,
  setFixedTerm,
  productFee,
  setProductFee,
  regularOverpayment,
  setRegularOverpayment,
  totalLoan,
  pmt,
  totalMonthlyCost,
}: {
  additionalLoan: string;
  setAdditionalLoan: (value: string) => void;
  mortgageTerm: string;
  setMortgageTerm: (value: string) => void;
  mortgageRate: string;
  setMortgageRate: (value: string) => void;
  fixedTerm: string;
  setFixedTerm: (value: string) => void;
  productFee: string;
  setProductFee: (value: string) => void;
  regularOverpayment: string;
  setRegularOverpayment: (value: string) => void;
  totalLoan: number;
  pmt: number;
  totalMonthlyCost: number;
}) {
  return (
    <div className="grid gap-2 w-full bg-black justify-start">
      <h2 className="text-left text-2xl">Mortgage</h2>
      <div className="grid gap-2">
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageInputNumerical
            message="Add Loan"
            value={additionalLoan}
            setValue={setAdditionalLoan}
            digits={4}
          />
          <MortgageInputNumerical
            message="Mortgage Term"
            unit="yrs"
            value={mortgageTerm}
            setValue={setMortgageTerm}
          />
          <MortgageInputNumerical
            message="Interest Rate"
            unit="%"
            value={mortgageRate}
            setValue={setMortgageRate}
          />
          <MortgageInputNumerical
            message="Fixed Period"
            unit="yrs"
            value={fixedTerm}
            setValue={setFixedTerm}
          />
          <MortgageInputNumerical
            message="Product Fee"
            value={productFee}
            setValue={setProductFee}
            digits={4}
          />
          <MortgageInputNumerical
            message="Overpayment"
            value={regularOverpayment}
            setValue={setRegularOverpayment}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageOutput
            message="Loan + Fee"
            value={`${totalLoan.toLocaleString()}`}
          />
          <MortgageOutput
            message="Mortgage Payment"
            value={`${pmt.toLocaleString()}`}
          />
          <MortgageOutput
            message="Cost inc. Fees"
            value={`${totalMonthlyCost.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
}
