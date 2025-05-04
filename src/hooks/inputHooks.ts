import { useQueryParams } from "../utils/searchParamsURL";
/**
 * Current mortgage amount in £
 * @returns {[string,function(string): {void}]}
 */
export function useCurrentMortgage() {
  return useQueryParams("cm", "200000");
}
/**
 * Sale price in £
 * @returns {[string,function(string): {void}]}
 */
export function useSalePrice() {
  return useQueryParams("sp", "450000");
}
/**
 * Selling Agent Rate in %
 * @returns {[string,function(string): {void}]}
 */
export function useAgentRate() {
  return useQueryParams("ar", "1");
}
/**
 * Selling Solicitor Fees in £
 * @returns {[string,function(string): {void}]}
 */
export function useSellingSolicitorFees() {
  return useQueryParams("ssf", "1600");
}
/**
 * Additional investment in £
 * functions as Deposit amount in 'Buying' mode
 * @returns {[string,function(string): {void}]}
 */
export function useAdditionalCapital() {
  return useQueryParams("ac","40000");
}
/**
 * Selling Solicitor Fees in £
 * @returns {[string,function(string): {void}]}
 */
export function useBuyingSolicitorFees() {
  return useQueryParams("bsf", "2400");
}
/**
 * House Price in £
 * @returns {[string,function(string): {void}]}
 */
export function useHousePrice() {
  return useQueryParams("hp", "500000");
}
/**
 * Additional investment in thousands (k)
 * functions as Loan amount in 'Mortgage Only' mode
 * @returns {[string,function(string): {void}]}
 */
export function useAdditionalLoan() {
  return useQueryParams("al");
}
/**
 * Mortgage Term in years
 * @returns {[string,function(string): {void}]}
 */
export function useMortgageTerm() {
  return useQueryParams("mt", "23");
}
/**
 * Mortgage Rate in %
 * @returns {[string,function(string): {void}]}
 */
export function useMortgageRate() {
  return useQueryParams("mr", "4.69");
}
/**
 * Product Fee in £
 * @returns {[string,function(string): {void}]}
 */
export function useProductFee() {
  return useQueryParams("pf", "1000");
}
/**
 * Fixed Term in years
 * @returns {[string,function(string): {void}]}
 */
export function useFixedTerm() {
  return useQueryParams("ft", "3");
}
/**
 * Regular Overpayment in years
 * @returns {[string,function(string): {void}]}
 */
export function useRegularOverpayment() {
  return useQueryParams("ro", "");
}
/**
 * House Price Inflation Rate in %
 * @returns {[string,function(string): {void}]}
 */
export function useHousePriceInflationRate() {
  return useQueryParams("hpi", "2");
}
/**
 * Period of Interest in Years (for investment comparison)
 * @returns {[string,function(string): {void}]}
 */
export function usePeriodOfInvestment() {
  return useQueryParams("poi");
}
/**
 * Adjust profits for API Inflation Rate in %
 * @returns {[string,function(string): {void}]}
 */
export function useApiInflationRate() {
  return useQueryParams("api");
}
/**
 * Alternative Investment Rate in %
 * @returns {[string,function(string): {void}]}
 */
export function useInvestmentRate() {
  return useQueryParams("air", "5");
}
/**
 * Rent in £
 * @returns {[string,function(string): {void}]}
 */
export function useRent() {
  return useQueryParams("r", "2000");
}
/**
 * Investment Amount in £
 * @returns {[string,function(string): {void}]}
 */
export function useOptionalInvestmentAmount() {
  return useQueryParams("ia");
}