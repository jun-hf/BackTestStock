import {
    BuySell
} from '../../src/strategy/BuySell';
import { expect, beforeAll, describe, it, vi, afterEach, afterAll} from 'vitest';
import * as getSharesList from '../../src/lib/getStockList';
import dailyStockList from '../fixture/dailyStockList';

const symbol = 'IBM';
const timeSeries = 'Daily';
const buyRate = 0.001;
const sellRate = 0.001;
const amount = 1000;
const buySellInput = {symbol, timeSeries, buyRate, sellRate, amount};

describe('::BuySell', () => {
    let buySell;
    beforeAll(() => {
        buySell = new BuySell(buySellInput);
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it(':constructor -> should correctly create BuySell', () => {
        expect(buySell.getNetWorth()).toStrictEqual([amount]);
        expect(buySell.getSharesList()).toStrictEqual([0]);
        expect(buySell.sellRate).toBe(-sellRate);
        expect(buySell.buyRate).toBe(buyRate);
    });
    describe(':init', () => {
        afterEach(() => {
            vi.resetAllMocks();
        });
        it('should able to calculate stock', async () => {
            const spy = vi.spyOn(getSharesList, 'getStockList');
            // @ts-expect-error // returning a test stock
            spy.mockImplementation(async () => { return dailyStockList; });
            await buySell.init();
        });
        it('should throw an error when unable to getStockList', async () => {
            const spy = vi.spyOn(getSharesList, 'getStockList');
            spy.mockImplementation(async () => { return []; });
            const errorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
            await expect(buySell.init()).rejects.toThrow('Cannot build stock');
            expect(errorMock).toBeCalledWith('ERROR: Unable to calculate buySellStrategy');
        });
    });
});
