import { PMT } from "./mortgageFormulae";
export function calculateTotalBuyingFees(
  stampDuty: number,
  buyingSolicitorFees: number
) {
  return stampDuty + buyingSolicitorFees;
}
export function calculateStampDuty(housePrice: number) {
  if (housePrice <= 250000) return 0;
  const lowerTier = Math.max(0, Math.min(925000, housePrice) - 125000) * 0.05;
  const middleTier = Math.max(0, Math.min(1500000, housePrice) - 925000) * 0.1;
  const upperTier = Math.max(0, housePrice - 1500000) * 0.12;
  const newValue = lowerTier + middleTier + upperTier;
  return newValue;
}
export function calculateTotalCapital(
  proceeds: number,
  additionalCapital: number,
  totalBuyingFees: number
) {
  return proceeds + additionalCapital - totalBuyingFees;
}
export function calculateLTV(housePrice: number, principal: number) {
  return Math.round((100 * principal) / housePrice);
}
export function calculateTotalSellingFees(
  sellingSolicitorFees: number,
  agentFees: number
) {
  return sellingSolicitorFees + agentFees;
}
export function calculateProceeds(
  salePrice: number,
  totalSellingFees: number,
  currentMortgage: number
) {
  return salePrice - totalSellingFees - currentMortgage;
}
export function calculatePrincipal(
  housePrice: number,
  totalBuyingFees: number,
  proceeds: number,
  additionalCapital: number,
  additionalLoan: number
) {
  const newValue =
    housePrice +
    totalBuyingFees +
    additionalLoan -
    proceeds -
    additionalCapital;
  return newValue;
}
export function calculateDeposit(
  currentMortgage: number,
  salePrice: number,
  agentRate: number,
  sellingSolicitorFees: number,
  additionalCapital: number
) {
  const agentFees = salePrice * (agentRate * 0.01);
  const newValue =
    salePrice -
    agentFees -
    currentMortgage -
    sellingSolicitorFees +
    additionalCapital;
  return newValue;
}

export function calculateTotalBorrowing(principal: number, productFee: number) {
  return principal + productFee;
}
export function calculatePayment(
  principal: number,

  mortgageTerm: number,
  mortgageRate: number
) {
  const pmt = PMT(mortgageRate * 0.01, mortgageTerm, principal);
  return pmt;
}
export function calculateTotalCost(
  pmt: number,
  productFee: number,
  fixedTerm: number,
  mortgageTerm: number,
  regularOverpayment: number
) {
  const monthlyProductFee = productFee / (fixedTerm || mortgageTerm) / 12;
  return Math.round(100 * (monthlyProductFee + pmt + regularOverpayment)) / 100;
}
export function calculateAgentFees(salePrice: number, agentRate: number) {
  return Math.round(salePrice * (agentRate * 0.01));
}
export function calculateEquityIncrease(
  principal: number,
  mortgageRate: number,
  termOfInterest: number,
  monthlyPayment: number
) {
  const termOfInterestMonths = termOfInterest * 12;
  const monthlyRate = mortgageRate / 12 / 100;
  let totalEquity = 0;
  let outstandingBalance = principal;
  for (let i = 0; i < termOfInterestMonths; i += 1) {
    const interest = outstandingBalance * monthlyRate;
    const newBalance = outstandingBalance + interest - monthlyPayment;
    const difference = outstandingBalance - newBalance;
    totalEquity += difference;
    outstandingBalance = newBalance;
  }

  return {
    totalEquityPayoff: totalEquity,
    averageMonthlyEquityPayoff: totalEquity / termOfInterestMonths,
  };
}

export function calculateInvestmentReturn(
  equityGrowth: number,
  termOfInterest: number,
  interestRate: number
) {
  if (equityGrowth <= 0) {
    return 0;
  }
  const monthlyRate = interestRate / 12 / 100;
  const periods = termOfInterest * 12;
  const requiredPrincipal =
    equityGrowth / (Math.pow(1 + monthlyRate, periods) - 1);
  return Math.round(requiredPrincipal);
}

export function calculateHousePriceInflation(
  housePrice: number,
  housePriceInflationRate: number,
  termOfInterest: number
) {
  const yearlyRate = housePriceInflationRate / 100;
  const periods = termOfInterest;
  return Math.round(housePrice * yearlyRate * periods);
}

export function calculateTotalEquityYield(
  housePriceInflation: number,
  totalEquityPayoff: number
) {
  return housePriceInflation + totalEquityPayoff;
}

export function calculateInitialEquity(
  totalCapital: number,
  productFee: number
) {
  return totalCapital - productFee;
}

export function calculateResultingEquity(
  totalEquityYield: number,
  initialEquity: number
) {
  return initialEquity + totalEquityYield;
}

export function calculateEquityGrowth(
  resultingEquity: number,
  proceeds: number,
  additionalCapital: number,
  apiInflationRate: number
) {
  const profit = resultingEquity - proceeds - additionalCapital;

  if (apiInflationRate && profit > 0) {
    const inflationDecimal = 1 - apiInflationRate * 0.01;
    return profit * inflationDecimal;
  } else if (apiInflationRate && profit < 0) {
    const inflationDecimal = 1 + apiInflationRate * 0.01;
    return profit * inflationDecimal;
  }

  return resultingEquity - proceeds - additionalCapital;
}
