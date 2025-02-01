import { useQueryParams } from "../utils/searchParamsURL";
/**
 * Current mortgage amount in £k
 * @returns {[string,function(string): {void}]}
 */
export function useCurrentMortgage() {
  return useQueryParams("cm", "202");
}
/**
 * Sale price in £k
 * @returns {[string,function(string): {void}]}
 */
export function useSalePrice() {
  return useQueryParams("sp", "415");
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
 * Additional investment in £k
 * functions as Deposit amount in 'Buying' mode
 * @returns {[string,function(string): {void}]}
 */
export function useAdditionalCapital() {
  return useQueryParams("ac");
}
/**
 * Selling Solicitor Fees in £
 * @returns {[string,function(string): {void}]}
 */
export function useBuyingSolicitorFees() {
  return useQueryParams("bsf", "2400");
}
/**
 * House Price in £k
 * @returns {[string,function(string): {void}]}
 */
export function useHousePrice() {
  return useQueryParams("hp", "500");
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
  return useQueryParams("mr", "5");
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
  return useQueryParams("pf", "3");
}
/**
 * Regular Overpayment in years
 * @returns {[string,function(string): {void}]}
 */
export function useRegularOverpayment() {
  return useQueryParams("ro", "3");
}
