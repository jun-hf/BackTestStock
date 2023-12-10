export type TimeSeries = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type AlphaVantageTimeSeriesKey =  "Time Series (Daily)" | "Weekly Time Series" | "Monthly Time Series"

export interface Stock {
    symbol: string;
    timeSeries: TimeSeries;
    date: Date;
    openPrice: number; 
}

export interface AlphaVantageRawData {
    "Meta Data": Record<string, string>
    "Time Series (Daily)": AlphaVantageStockItem
    "Weekly Time Series": AlphaVantageStockItem
    "Monthly Time Series": AlphaVantageStockItem
}

interface AlphaVantageStockItem {
    [key : string] : string
    "1. open": string
    "2. high": string
    "3. low": string
    "4. close": string
    "5. volume": string
}