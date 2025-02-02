"use client";
import React from "react";
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
  useInvestmentRate,
  useRent,
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
import EquityGrowth from "../components/sections/EquityGrowth";
import HouseBuying from "../components/sections/HouseBuying";
import HouseSelling from "../components/sections/HouseSelling";
import Mortgage from "../components/sections/Mortgage";
import InvestmentOption from "../components/sections/InvestmentOption";

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
  const [investmentRate, setInvestmentRate] = useInvestmentRate();
  const [rent, setRent] = useRent();

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
  const monthlyCostDiffRent = Number(rent) - totalMonthlyCost;
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
        periodOfInvestment={periodOfInvestment}
        totalEquityPayoff={totalEquityPayoff}
        housePriceInflation={housePriceInflation}
        totalEquityYield={totalEquityYield}
        // resultingEquity={resultingEquity}
        equivalentInvestment={equivalentInvestment}
        setPeriodOfInvestment={setPeriodOfInvestment}
        // initialEquity={initialEquity}
        equityGrowth={equityGrowth}
      />
      <InvestmentOption
        investmentRate={investmentRate}
        setInvestmentRate={setInvestmentRate}
        rent={rent}
        setRent={setRent}
        monthlyCostDiffRent={monthlyCostDiffRent}
        // fixedTerm={fixedTerm}
        // periodOfInvestment={periodOfInvestment}
      />
    </>
  );
}
