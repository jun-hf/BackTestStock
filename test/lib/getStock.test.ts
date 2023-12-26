import {
    getStock,
    _parseTimeSeriesKey,
    buildStockList,
    getStockList
} from '../../src/lib/getStockList';
import axios from 'axios';
import IBMDaily from '../fixture/IBMDaily.json';
import expectedStockList from '../fixture/dailyStockList';

import { expect, beforeAll, describe, it, vi, afterEach} from 'vitest';

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
    describe(':getStockList', () => {
        afterEach(() => {
            vi.spyOn(console, 'error').mockImplementation(() => undefined);
        });
        it('should build correct stock list', async () => {
            const result = await getStockList(symbol, timeSeries);
            expect(result).toStrictEqual(expectedStockList);
        });
        it('should return [], when failed to build stock', async () => {
            const mock = vi.fn().mockImplementation(getStock);
            mock.mockImplementationOnce(() => {throw new Error();});
            const result = await getStockList('INVALID', 'INVALIDSYMBOL');
            expect(result).toStrictEqual([]);
        });
    });
    it(':getStock -> request the correct url to AlphaVantage', async () => {
        process.env.API_KEY = 'TEST';
        const expectedUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=TEST`;
        
        await getStock(symbol, timeSeries);
        expect(spy).toHaveBeenCalledWith(expectedUrl);
    });
    it(':builStockList -> should construct the correct stock list', async () => {
        const result = await buildStockList(IBMDaily.data);
        expect(result).toStrictEqual(expectedStockList);
    });
    it(':_parseTimeSeriesKey', () => {
        const expectedDaily = 'Time Series (Daily)';
        const expectedMonthly = 'Monthly Time Series';
        const daily = _parseTimeSeriesKey('Daily');
        const monthly = _parseTimeSeriesKey('Monthly');

        expect(daily).toBe(expectedDaily);
        expect(monthly).toBe(expectedMonthly);
    });
});