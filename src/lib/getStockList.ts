import axios from 'axios'; 
import {
    AlphaVantageRawData, 
    Stock,
    AlphaVantageTimeSeriesKey,
    TimeSeries
} from '../types/BuySellType';

export const getStock = async (symbol: string, timeSeries: string) => {
    const API_KEY = process.env.API_KEY;
    const url =`https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeries}&symbol=${symbol}&apikey=${API_KEY}`;
    return axios.get(url); 
};

export const buildStockList = (rawData: AlphaVantageRawData): Stock[] => {
    const symbol: string = rawData['Meta Data']['2. Symbol'];
    const timeSeries: string = rawData['Meta Data']['1. Information'].split(' ')[0];
    const keyTimeSeries: string = _parseTimeSeriesKey(timeSeries);
    const timeSeriesObj = rawData[keyTimeSeries as AlphaVantageTimeSeriesKey];
    const stockList: Stock[] = [];

    Object.keys(timeSeriesObj).forEach(entry => {
        const openPrice = timeSeriesObj[entry]['1. open' as any];
        const date = new Date(entry);
        const stock: Stock = {
            timeSeries: timeSeries.toUpperCase() as TimeSeries,
            openPrice: Number(openPrice),
            symbol,
            date
        };
        stockList.push(stock);
    }); 
    return stockList;
};

export const getStockList = async (symbol: string = 'IBM', timeSeries: string = 'DAILY'): Promise<Stock[]> => {
    try {
        const stock = await getStock(symbol, timeSeries);
        return buildStockList(stock.data);
    } catch (err) {
        console.error(`Failed at getStockList: Cannot build stock list for ${timeSeries} - ${symbol}`);
    }
    return [];
};

export const _parseTimeSeriesKey = (timeSeries: string): string => {
    if (timeSeries === 'Daily') return `Time Series (${timeSeries})`;
    return `${timeSeries} Time Series`;
};
