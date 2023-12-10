import {
    getStock,
    _parseTimeSeriesKey
} from '../../src/lib/getStockList';
import axios from 'axios';
import IBMDaily from '../IBMDaily.json';

import { expect, test, beforeAll, describe, it, vi, afterEach} from 'vitest';

const symbol = 'IBM';
const timeSeries = 'DAILY';

describe('::getStockList', () => {
    let spy;
    beforeAll(() => {
        spy = vi.spyOn(axios, 'get');
        spy.mockImplementation(async () => IBMDaily);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });
    it(':getStock -> request the correct url to AlphaVantage', async () => {
        const expectedUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeries}&symbol=${symbol}&apikey=demo`;
        await getStock(symbol, timeSeries);
        expect(spy).toHaveBeenCalledWith(expectedUrl);
    });
    it(':builStockList', async () => {
        
    });
    it(':_parseTimeSeriesKey', () => {
        const expectedDaily = 'Time Series (Daily)';
        const expectedMonthly = 'Monthly Time Series';
        const daily = _parseTimeSeriesKey('Daily');
        const monthly = _parseTimeSeriesKey('Monthly');

        expect(daily).toBe(expectedDaily);
        expect(monthly).toBe(expectedMonthly);
    })
})