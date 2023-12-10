import type {
    Stock,
    TimeSeries,
    AlphaVantageTimeSeriesKey
} from '../models/BuySell'

interface BuySellRequirement {
    symbol: string
    timeSeries: string
    buyRate: number 
    sellRate: number
    amount: number
}

class BuySell{
    stockList: Stock[];
    netWorth: number[];
    sharesList: number[];
    symbol: string;
    timeSeries: string;
    buyRate: number;
    sellRate: number;

    constructor({symbol, timeSeries, buyRate, sellRate, amount}: BuySellRequirement) {
        this.stockList = [];
        this.netWorth = [amount];
        this.symbol = symbol;
        this.timeSeries = timeSeries;
        this.buyRate = buyRate;
        this.sellRate = sellRate;
        this.sharesList = [0];
    }
    
}