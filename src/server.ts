import Express from 'express';
import { BuySell } from './strategy/BuySell';  
const PORT = 8000;
const app = Express();

app.get('/', (req, res) => {
    console.log('Gett');
    res.send('Hello');
});

app.post('/buySell', async (req, res) => {
    req.json({ 'Message': 'Created strategy' });
});

app.get('/status', (req, res) => {
    res.json({ "status": "up" });
});

app.listen(PORT, () => {
    console.log(`Listening at port:${PORT}`);
});

