/*
"AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL","XPT","XPD","BTC","ETH","BNB","XRP","SOL","DOT","AVAX","MATIC","LTC","ADA","USDT","USDC","DAI","ARB","OP","VES","STN","MRU"
 */
export type CurrencyType = string; // you can improve it to "AED" | "AFN" | "AMD" in future
export type CurrencyRateInfo = {
  code: CurrencyType;
  value: number;
}
export type CurrencyRate = Record<CurrencyType, CurrencyRateInfo>;
export type CurrencyListItem = {
  code: string; // "ADA"
  countries: Array<string>; // []
  decimal_digits: number; // 6
  name: string; // "Cardano"
  name_plural: string; // "Cardanos"
  rounding: number; // 0
  symbol: string; // "ADA"
  symbol_native: string; // "ADA"
  type: string; // "crypto"
};
