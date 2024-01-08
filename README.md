<div align="center">
<pre>
    __________                __   ___________              __   _________ __                 __    
\______   \_____    ____ |  | _\__    ___/___   _______/  |_/   _____//  |_  ____   ____ |  | __
 |    |  _/\__  \ _/ ___\|  |/ / |    |_/ __ \ /  ___/\   __\_____  \\   __\/  _ \_/ ___\|  |/ /
 |    |   \ / __ \\  \___|    <  |    |\  ___/ \___ \  |  | /        \|  | (  <_> )  \___|    < 
 |______  /(____  /\___  >__|_ \ |____| \___  >____  > |__|/_______  /|__|  \____/ \___  >__|_ \
        \/      \/     \/     \/            \/     \/              \/                  \/     \/
------------------------------------------------------------------------------------------------
     Back test your stock strategy
 </pre>
</div>
     
## BackTestStock
1. You can calculate your stock profit and loss.

## Getted Started
- Clone this repo
```
npm install
```
- You need to get a api key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- Create a `.env` and insert the following api token
```
API_KEY=<api token from alpha vantage>
```

- Start the server

```
npm start
```

## Run test
```
npm run test
```

## POST 
- Calculate your strategy
```
curl -X POST -d '{"timeSeries": "DAILY", "symbol": "IBM","buyRate": 0.001, "sellRate": 0.0008, "amount": 1000}' -H "Content-Type: application/json" localhost:8000/buySell
```

## Goals
1. Create a backend for calculating profit and loss for stock strategy 
2. Fully tested for all features 
3. TypeScript first 
