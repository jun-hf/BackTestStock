export type TimeSeries = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type AlphaVantageTimeSeriesKey =  "Time Series (Daily)" | "Weekly Time Series" | "Monthly Time Series"

export interface Stock {
    symbol: string;
    timeSeries: TimeSeries;
    date: Date;
    openPrice: number; 
}

export interface AlphaVantageData {
    "Meta Data": Record<string, string>,
    "Time Series (Daily)": {[key : string] : string},
    "Weekly Time Series": {[key : string] : string},
    "Monthly Time Series": {[key : string] : string}
}