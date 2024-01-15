import express, { type Request, type Response , type NextFunction} from 'express';
import path from 'node:path';
import { BuySell } from './strategy/BuySell';
import { jsonValidator } from './lib/jsonValidator'; 

import type { JsonSchema } from "./types/utilType";
import * as dotnev from 'dotenv';
dotnev.config();

const PORT = 8000;
const app = express();

app.use(express.static(path.join(process.cwd(), 'frontend', 'dist')));
app.use(express.json());
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send('Server error please open an issues in the repo');
});

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'index.html'));
});

const BuySellSchema: JsonSchema = {
    type: 'object',
    properties: {
        timeSeries: { type: 'string' },
        symbol: { type: 'string' },
        amount: { type: 'number' },
        buyRate: { type: 'number' },
        sellRate: { type: 'number' }
    },
    required: ['timeSeries', 'symbol', 'buyRate', 'sellRate', 'amount']
};

app.post('/buySell', jsonValidator(BuySellSchema), async (req: Request, res: Response) => {
    try {
        const strategy = new BuySell(req.body);
        await strategy.init();
        const result = {
            netWorth: strategy.getNetWorth(),
            sharesBrought: strategy.getSharesList(),
            stockInfo: strategy.getStockList()
        };
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).send('Unable to calculate buy sell stratgy');
    }
});

app.listen(PORT, () => {
    console.log(`Listening at port:${PORT}`);
});

