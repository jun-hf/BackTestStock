import { getStockList } from '../lib/getStockList';
import type {
    Stock,
    BuySellRequirement
} from '../models/BuySell'

export class BuySell{
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
        this.sellRate = -sellRate;
        this.sharesList = [0];
    }

    async init(): Promise<void> {
        try {
            this.stockList = await getStockList(this.symbol, this.timeSeries);
            if (this.stockList.length === 0) throw new Error('Cannot build stock');
            this._calculateStrategy();
            console.log(`SUCCESS: in calculating buySellStrategy for ${this.symbol} and ${this.symbol}`);
        } catch (error) {
            console.error(`ERROR: Unable to calculate buySellStrategy`);
            throw error
        };
    };

    _calculateStrategy() {
        let brought = false; 
        for (let stockItem =  this.stockList.length -2; stockItem > 0 ; stockItem--) {
            const currPrice = this.stockList[stockItem]['openPrice'];
            const prevPrice = this.stockList[stockItem + 1]['openPrice']; 
            const rate = this._calculateRate(prevPrice, currPrice); 
            if (rate > this.buyRate) {
                if (brought) {
                    const updatedNetWorth = currPrice*getLastValue(this.sharesList);
                    this.netWorth.push(updatedNetWorth);
                    this.sharesList.push(getLastValue(this.sharesList));
                } else {
                    const shareToBrought = getLastValue(this.netWorth)/ currPrice; 
                    this.netWorth.push(getLastValue(this.netWorth));
                    this.sharesList.push(shareToBrought);
                    brought = true;
                }
            } else if (this.sellRate > rate) {
                if (brought) {
                    const updatedNetWorth = currPrice*getLastValue(this.sharesList);
                    brought = false;
                    this.netWorth.push(updatedNetWorth);
                    this.sharesList.push(0);
                } else {
                    this.netWorth.push(getLastValue(this.netWorth));
                    this.sharesList.push(getLastValue(this.sharesList));
                }
            } else {
                this.netWorth.push(getLastValue(this.netWorth));
                this.sharesList.push(getLastValue(this.sharesList));
            };
        };
    };

    _calculateRate(prevPrice: number, currPrice: number) {
        return (currPrice - prevPrice) / prevPrice;
    };

    getNetWorth(): number[] {
        return this.netWorth;
    };

    getSharesList(): number[] {
        return this.sharesList;
    };
};

export const getLastValue = (arr: number[]): number=> {
    return arr[arr.length - 1];
};
