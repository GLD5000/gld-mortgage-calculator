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
  mortgageRate: number,
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
  return Math.round(100 *(monthlyProductFee + pmt + regularOverpayment))/100;
}
export function calculateAgentFees(salePrice: number, agentRate: number) {
  return Math.round(salePrice * (agentRate * 0.01));
}
