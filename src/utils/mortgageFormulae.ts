export function PMT(rate: number, term: number, principal: number) {
  if (
    !rate ||
    rate <= 0 ||
    rate >= 1 ||
    !term ||
    term < 1 ||
    !principal ||
    principal <= 0
  )
    return 0;
  const months = 12;
  const monthlyRate = rate / months;
  const monthlyDecimal = 1 + monthlyRate;
  const termInMonths = -term * months;
  const ratePrincipal = monthlyRate * principal;
  const decimalToTheTerm = 1 - monthlyDecimal ** termInMonths;
  return ratePrincipal / decimalToTheTerm;
}
export function pmtToString(input: number) {
  return input.toFixed(2);
}
export function pmtAsString(rate: number, term: number, principal: number) {
  const monthlyNumber = PMT(rate * 0.01, term, principal);
  return monthlyNumber > 0 ? pmtToString(monthlyNumber) : "---";
}
