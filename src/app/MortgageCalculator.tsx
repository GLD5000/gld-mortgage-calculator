"use client";
import React from "react";
import MortgageInputNumerical from "../components/MortgageInputNumerical";
import MortgageOutput from "../components/MortgageOutput";
import {
  useCurrentMortgage,
  useSalePrice,
  useAgentRate,
  useSellingSolicitorFees,
  useAdditionalCapital,
  useBuyingSolicitorFees,
  useHousePrice,
  useAdditionalLoan,
  useMortgageTerm,
  useMortgageRate,
  useProductFee,
  useFixedTerm,
  useRegularOverpayment,
} from "../hooks/inputHooks";
import {
  calculateAgentFees,
  calculateEquityIncrease,
  calculateInvestmentReturn,
  calculateLTV,
  calculatePayment,
  calculatePrincipal,
  calculateProceeds,
  calculateStampDuty,
  calculateTotalBorrowing,
  calculateTotalBuyingFees,
  calculateTotalCapital,
  calculateTotalCost,
  calculateTotalSellingFees,
} from "../utils/mortgageCalculators";

export default function MortgageCalculator() {
  const [currentMortgage, setCurrentMortgage] = useCurrentMortgage();
  const [salePrice, setSalePrice] = useSalePrice();
  const [agentRate, setAgentRate] = useAgentRate();
  const [sellingSolicitorFees, setSellingSolicitorFees] =
    useSellingSolicitorFees();
  const [additionalCapital, setAdditionalCapital] = useAdditionalCapital();
  const [additionalLoan, setAdditionalLoan] = useAdditionalLoan();
  const [housePrice, setHousePrice] = useHousePrice();
  const [buyingSolicitorFees, setBuyingSolicitorFees] =
    useBuyingSolicitorFees();
  const [mortgageTerm, setMortgageTerm] = useMortgageTerm();
  const [mortgageRate, setMortgageRate] = useMortgageRate();
  const [productFee, setProductFee] = useProductFee();
  const [fixedTerm, setFixedTerm] = useFixedTerm();
  const [regularOverpayment, setRegularOverpayment] = useRegularOverpayment();

  const agentFees = calculateAgentFees(Number(salePrice), Number(agentRate));
  const totalSellingFees = calculateTotalSellingFees(
    Number(sellingSolicitorFees),
    agentFees
  );
  const proceeds = calculateProceeds(
    Number(salePrice),
    totalSellingFees,
    Number(currentMortgage)
  );
  const stampDuty = calculateStampDuty(Number(housePrice));
  const totalBuyingFees = calculateTotalBuyingFees(
    stampDuty,
    Number(buyingSolicitorFees)
  );
  const totalCapital = calculateTotalCapital(
    proceeds,
    Number(additionalCapital),
    totalBuyingFees
  );
  const principal = calculatePrincipal(
    Number(housePrice),
    totalBuyingFees,
    proceeds,
    Number(additionalCapital),
    Number(additionalLoan)
  );
  const loanToValue = calculateLTV(Number(housePrice), principal);
  const totalLoan = calculateTotalBorrowing(principal, Number(productFee));
  const pmt = calculatePayment(
    principal,
    Number(mortgageTerm),
    Number(mortgageRate)
  );
  const totalMonthlyCost = calculateTotalCost(
    pmt,
    Number(productFee),
    Number(fixedTerm),
    Number(mortgageTerm),
    Number(regularOverpayment)
  );
  const { totalEquity, averageMonthlyEquity } = calculateEquityIncrease(
    principal,
    Number(mortgageRate),
    Number(fixedTerm || 1),
    pmt
  );
  const equivalentInvestment = calculateInvestmentReturn(
    totalEquity,
    Number(fixedTerm || 1),
    Number(mortgageRate)
  );
  return (
    <>
      <div className="grid gap-2 w-full bg-black justify-start">
        <h2 className="text-left text-2xl">House Selling</h2>
        <div className="grid">
          <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
            <MortgageInputNumerical
              message="Current Mortgage"
              value={currentMortgage}
              setValue={setCurrentMortgage}
            />
            <MortgageInputNumerical
              message="Sale Price"
              value={salePrice}
              setValue={setSalePrice}
            />
            <MortgageInputNumerical
              message="Selling Solicitor Fees"
              value={sellingSolicitorFees}
              setValue={setSellingSolicitorFees}
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
      <div className="grid gap-2 w-full bg-black justify-start">
        <h2 className="text-left text-2xl">Your Mortgage</h2>
        <div className="grid">
          <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
            <MortgageInputNumerical
              message="Add Loan"
              value={additionalLoan}
              setValue={setAdditionalLoan}
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
      <div className="grid gap-2 w-full bg-black justify-start">
        <h2 className="text-left text-2xl">Your Equity Growth</h2>
        <div className="grid">
          <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
            <MortgageOutput
              message={`${Number(fixedTerm || 1)} Year Total`}
              value={`${totalEquity.toLocaleString()}`}
            />
            <MortgageOutput
              message={`Monthly Average`}
              value={`${averageMonthlyEquity.toLocaleString()}`}
            />
            <MortgageOutput
              message={`Equiv. Investment`}
              value={`${equivalentInvestment.toLocaleString()}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
