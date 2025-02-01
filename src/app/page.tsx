"use client";

import Image from "next/image";
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
import MortgageInputNumerical from "../components/MortgageInputNumerical";
import MortgageOutput from "../components/MortgageOutput";
import {
  calculateAgentFees,
  calculateStampDuty,
} from "../utils/mortgageCalculators";

export default function Home() {
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
  const agentFees = `${Math.round(
    calculateAgentFees(Number(salePrice), Number(agentRate))
  )}`;
  const totalSellingFees = `${
    Number(sellingSolicitorFees) + Number(agentFees)
  }`;
  const proceeds = `${
    Number(salePrice) - Number(totalSellingFees) - Number(currentMortgage)
  }`;
  const stampDuty = `${calculateStampDuty(Number(housePrice))}`;
  const totalBuyingFess =`${
    Number(stampDuty) + Number(buyingSolicitorFees)
  }`;
  return (
    <div className="grid grid-rows-[20px_1fr_40px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl text-center mx-auto">
          GLD Mortgage Calculator
        </h1>
        <div className="grid gap-2 max-w-[50rem] w-full bg-black justify-start">
          <h2 className="text-left text-2xl">House Selling</h2>
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
              message="Agent Rate"
              unit="%"
              value={agentRate}
              setValue={setAgentRate}
            />
            <MortgageInputNumerical
              message="Selling Solicitor Fees"
              value={sellingSolicitorFees}
              setValue={setSellingSolicitorFees}
            />
            <MortgageOutput message="Agent Fees" value={agentFees} />
            <MortgageOutput
              message="Total Selling Fees"
              value={totalSellingFees}
            />
            <MortgageOutput message="Proceeds" value={proceeds} />
          </div>
        </div>
        <div className="grid gap-2 max-w-[50rem] w-full bg-black justify-start">
          <h2 className="text-left text-2xl">House Buying</h2>
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
            <MortgageOutput message="Stamp Duty" value={stampDuty} />
            <MortgageOutput
              message="Total Buying Fees"
              value={totalBuyingFess}
            />
            <MortgageOutput message="LTV" value={loanToValue} />
          </div>
        </div>
        <div className="grid gap-2 max-w-[50rem] w-full bg-black justify-start">
          <h2 className="text-left text-2xl">Your Mortgage</h2>
          <div className="flex flex-row flex-wrap gap-2 w-full bg-black">
          <MortgageInputNumerical
              message="Add Loan"
              value={additionalLoan}
              setValue={setAdditionalLoan}
            />
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
              message="Agent Rate"
              unit="%"
              value={agentRate}
              setValue={setAgentRate}
            />
            <MortgageInputNumerical
              message="Selling Solicitor Fees"
              value={sellingSolicitorFees}
              setValue={setSellingSolicitorFees}
            />
            <MortgageOutput message="Agent Fees" value={agentFees} />
            <MortgageOutput
              message="Total Selling Fees"
              value={totalSellingFees}
            />
            <MortgageOutput message="Proceeds" value={proceeds} />
          </div>
        </div>
      </main>
      <footer className="row-start-3 grid gap-2 flex-wrap items-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/GLD5000"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/GLD.svg"
            alt="File icon"
            width={40}
            height={40}
          />
          Portfolio
        </a>
        <p className="text-xs text-center">
          Gareth L Devlin © {`${new Date().getFullYear()}`}
        </p>
      </footer>
    </div>
  );
}
