import express from 'express';
import { BuySell } from './strategy/BuySell';  
import type { JsonSchema } from "./types/utilType";
import { Validator } from "express-json-validator-middleware";
const validate = new Validator({});
const PORT = 8000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ "status": "up" });
});

const BuySellSchema: JsonSchema = {
    type: 'object',
    properties: {
        timeSeries: { type: 'string' },
        symbol: { type: 'boolean' }
    },
    required: ['timeSeries']
};

app.post('/buySell', validate({ body: BuySellSchema}), async (req, res) => {
    res.json({ 'Message': 'Created strategy' });
});

app.listen(PORT, () => {
    console.log(`Listening at port:${PORT}`);
});

