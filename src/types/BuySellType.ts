export type TimeSeries = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type AlphaVantageTimeSeriesKey =  "Time Series (Daily)" | "Weekly Time Series" | "Monthly Time Series"

export interface Stock {
    symbol: string;
    timeSeries: TimeSeries;
    date: Date;
    openPrice: number; 
}
export type AlphaVantageRawData = AlphaVantageDailyRawData |  AlphaVantageMonthlyRawData | AlphaVantageWeeklyRawData

interface AlphaVantageDailyRawData  {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": AlphaVantageStockItem
}

interface AlphaVantageWeeklyRawData extends Omit<AlphaVantageDailyRawData, "Time Series (Daily)"> {
  "Weekly Time Series": AlphaVantageStockItem
}

interface AlphaVantageMonthlyRawData extends Omit<AlphaVantageDailyRawData, "Time Series (Daily)"> {
    "Monthly Time Series": AlphaVantageStockItem
}

interface AlphaVantageStockItem {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. adjusted close": string;
    "6. volume": string;
    "7. dividend amount": string;
    "8. split coefficient": string;
  };
};

export interface BuySellRequirement {
    symbol: string
    timeSeries: string
    buyRate: number 
    sellRate: number
    amount: number
}