import axios from 'axios'; 
import type {
    Stock,
    TimeSeries,
    AlphaVantageData,
    AlphaVantageTimeSeriesKey
} from '../models/BuySell'

class BuySell{
    stockList: Stock[];
    netWorth: number[];
    sharesList: number[];
    symbol: string;
    timeSeries: string;
    buyRate: number;
    sellRate: number;

    constructor(symbol: string, timeSeries: string, buyRate: number, sellRate: number, amount: number) {
        this.stockList = [];
        this.netWorth = [amount];
        this.symbol = symbol;
        this.timeSeries = timeSeries;
        this.buyRate = buyRate;
        this.sellRate = sellRate;
        this.sharesList = [0];
    }
    
}