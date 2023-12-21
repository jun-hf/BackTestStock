import express from 'express';
import { jsonValidator } from './lib/jsonValidator'; 
import type { JsonSchema } from "./types/utilType";
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
        symbol: { type: 'string' }
    },
    required: ['timeSeries']
};

app.post('/buySell', jsonValidator(BuySellSchema), async (req, res) => {
    res.json({ 'Message': 'Created strategy' });
});

app.listen(PORT, () => {
    console.log(`Listening at port:${PORT}`);
});

