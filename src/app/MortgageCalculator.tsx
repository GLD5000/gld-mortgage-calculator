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
  useHousePriceInflationRate,
  usePeriodOfInvestment,
  useApiInflationRate,
} from "../hooks/inputHooks";
import {
  calculateAgentFees,
  calculateEquityGrowth,
  calculateEquityIncrease,
  calculateHousePriceInflation,
  calculateInitialEquity,
  calculateInvestmentReturn,
  calculateLTV,
  calculatePayment,
  calculatePrincipal,
  calculateProceeds,
  calculateResultingEquity,
  calculateStampDuty,
  calculateTotalBorrowing,
  calculateTotalBuyingFees,
  calculateTotalCapital,
  calculateTotalCost,
  calculateTotalEquityYield,
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
  const [housePriceInflationRate, setHousePriceInflationRate] =
    useHousePriceInflationRate();
  const [periodOfInvestment, setPeriodOfInvestment] = usePeriodOfInvestment();
  const [apiInflationRate, setApiInflationRate] = useApiInflationRate();

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
  const { totalEquityPayoff, averageMonthlyEquityPayoff } =
    calculateEquityIncrease(
      principal,
      Number(mortgageRate),
      Number(periodOfInvestment || fixedTerm),
      pmt
    );
  const housePriceInflation = calculateHousePriceInflation(
    Number(housePrice),
    Number(housePriceInflationRate),
    Number(periodOfInvestment || fixedTerm)
  );
  const totalEquityYield = calculateTotalEquityYield(
    housePriceInflation,
    totalEquityPayoff
  );
  const initialEquity = calculateInitialEquity(
    totalCapital,
    Number(productFee)
  );
  const resultingEquity = calculateResultingEquity(
    totalEquityYield,
    initialEquity
  );
  const equityGrowth = calculateEquityGrowth(
    resultingEquity,
    proceeds,
    Number(additionalCapital),
    Number(apiInflationRate)
  );
  const equivalentInvestment = calculateInvestmentReturn(
    equityGrowth,
    Number(periodOfInvestment || fixedTerm),
    Number(mortgageRate)
  );
  return (
    <>
      <HouseSelling
        currentMortgage={currentMortgage}
        setCurrentMortgage={setCurrentMortgage}
        salePrice={salePrice}
        setSalePrice={setSalePrice}
        sellingSolicitorFees={sellingSolicitorFees}
        setSellingSolicitorFees={setSellingSolicitorFees}
        agentRate={agentRate}
        setAgentRate={setAgentRate}
        agentFees={agentFees}
        totalSellingFees={totalSellingFees}
        proceeds={proceeds}
      />
      <HouseBuying
        additionalCapital={additionalCapital}
        setAdditionalCapital={setAdditionalCapital}
        housePrice={housePrice}
        setHousePrice={setHousePrice}
        buyingSolicitorFees={buyingSolicitorFees}
        setBuyingSolicitorFees={setBuyingSolicitorFees}
        stampDuty={stampDuty}
        totalBuyingFees={totalBuyingFees}
        totalCapital={totalCapital}
        principal={principal}
        loanToValue={loanToValue}
      />
      <Mortgage
        additionalLoan={additionalLoan}
        setAdditionalLoan={setAdditionalLoan}
        mortgageTerm={mortgageTerm}
        setMortgageTerm={setMortgageTerm}
        mortgageRate={mortgageRate}
        setMortgageRate={setMortgageRate}
        fixedTerm={fixedTerm}
        setFixedTerm={setFixedTerm}
        productFee={productFee}
        setProductFee={setProductFee}
        regularOverpayment={regularOverpayment}
        setRegularOverpayment={setRegularOverpayment}
        totalLoan={totalLoan}
        pmt={pmt}
        totalMonthlyCost={totalMonthlyCost}
      />
      <EquityGrowth
        housePriceInflationRate={housePriceInflationRate}
        setHousePriceInflationRate={setHousePriceInflationRate}
        apiInflationRate={apiInflationRate}
        setApiInflationRate={setApiInflationRate}
        averageMonthlyEquityPayoff={averageMonthlyEquityPayoff}
        fixedTerm={fixedTerm}
        totalEquityPayoff={totalEquityPayoff}
        housePriceInflation={housePriceInflation}
        totalEquityYield={totalEquityYield}
        // resultingEquity={resultingEquity}
        equivalentInvestment={equivalentInvestment}
        periodOfInvestment={periodOfInvestment}
        setPeriodOfInvestment={setPeriodOfInvestment}
        // initialEquity={initialEquity}
        equityGrowth={equityGrowth}
      />
    </>
  );
}
function EquityGrowth({
  housePriceInflationRate,
  setHousePriceInflationRate,
  averageMonthlyEquityPayoff,
  fixedTerm,
  totalEquityPayoff,
  housePriceInflation,
  totalEquityYield,
  // resultingEquity,
  equivalentInvestment,
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
  fixedTerm: string;
  totalEquityPayoff: number;
  housePriceInflation: number;
  totalEquityYield: number;
  // resultingEquity: number;
  equivalentInvestment: number;
  periodOfInvestment: string;
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
            message="Profit after costs"
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

function Mortgage({
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
  );
}

function HouseBuying({
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

function HouseSelling({
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
  );
}
