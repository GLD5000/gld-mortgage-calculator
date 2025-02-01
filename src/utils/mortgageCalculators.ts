import { PMT } from "./mortgageFormulae";

export function calculateStampDuty(housePrice: number) {
  if (housePrice <= 250000) return 0;
  const lowerTier = Math.max(0, Math.min(925000, housePrice) - 125000) * 0.05;
  const middleTier = Math.max(0, Math.min(1500000, housePrice) - 925000) * 0.1;
  const upperTier = Math.max(0, housePrice - 1500000) * 0.12;
  const newValue = lowerTier + middleTier + upperTier;
  return newValue;
}
export function calculateLTV(housePrice: number, principal: number) {
  return Math.round((100 * principal) / housePrice);
}

export function calculatePrincipal(
    deposit: number,
    stampDuty: number,
    buyingSolicitorFees: number,
    housePrice: number,
    additionalLoan: number
) {
    const newValue =
    housePrice + buyingSolicitorFees + stampDuty + additionalLoan - deposit;
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
export function calculatePayment(
    principal: number,
    
    mortgageTerm: number,
    mortgageRate: number,
    productFee: number,
    fixedTerm: number,
    regularOverpayment: number
) {
    const monthlyProductFee = productFee / fixedTerm / 12;
    const pmt = PMT(mortgageRate * 0.01, mortgageTerm, principal);
    return Math.round(monthlyProductFee + pmt + regularOverpayment);
}
export function calculateAgentFees(salePrice: number, agentRate: number) {
  return salePrice * (agentRate * 0.01);
}