import {
    BuySell
} from '../../src/strategy/BuySell';
import { expect, beforeAll, describe, it, vi, afterEach, afterAll, beforeEach} from 'vitest';
import * as getSharesList from '../../src/lib/getStockList';
import dailyStockList from '../fixture/dailyStockList';

const symbol = 'IBM';
const timeSeries = 'Daily';
const buyRate = 0.001;
const sellRate = 0.001;
const amount = 1000;
const buySellInput = {symbol, timeSeries, buyRate, sellRate, amount};

describe('::BuySell', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });
    it(':constructor -> should correctly create BuySell', () => {
        const buySell = new BuySell(buySellInput);
        expect(buySell.getNetWorth()).toStrictEqual([amount]);
        expect(buySell.getSharesList()).toStrictEqual([0]);
        expect(buySell.sellRate).toBe(-sellRate);
        expect(buySell.buyRate).toBe(buyRate);
    });
    describe(':init', () => {
        let logMock;
        let errorMock;
        beforeEach(() => {
            logMock = vi.spyOn(console, 'log').mockImplementation(() => undefined);
            errorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        });
        afterEach(() => {
            vi.resetAllMocks();
        });
        it('should able to calculate stock', async () => {
            const buySell = new BuySell(buySellInput);
            const spy = vi.spyOn(getSharesList, 'getStockList');
            spy.mockImplementation(vi.fn().mockResolvedValue(dailyStockList));
            await buySell.init();
            expect(logMock).toBeCalledWith('SUCCESS: in calculating buySellStrategy for IBM and Daily');
        });
        it('should throw an error when unable to getStockList', async () => {
            const buySellInvalid = new BuySell({
                symbol: 'Invalid Symbol',
                timeSeries: 'Invalid timeSeries',
                buyRate: 0.001,
                sellRate: 0.001,
                amount: 8000
            });
            const spy = vi.spyOn(getSharesList, 'getStockList');
            spy.mockImplementation(async () => { return []; });
            await expect(buySellInvalid.init()).rejects.toThrow('Cannot build stock');
            expect(errorMock).toBeCalledWith('ERROR: Unable to calculate buySellStrategy');
        });
    });
});
