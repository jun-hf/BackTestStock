# BackTestStock
1. You can calculate your p/l for your stocks.

## TODO
1. Create the api for buySell strategy 
    1.2 Write test for it 
2. Write the remaining test for the express route 
3. Get the rest of the strategy class test done

## Goals
1. Create a backend for calculating profit and loss for stock strategy 
2. Fully tested for all features 
3. TypeScript first 

## POST 
```
curl -X POST -d '{"timeSeries": "DAILY", "symbol": "IBM","buyRate": 0.001, "sellRate": 0.0008, "amount": 1000}' -H "Content-Type: application/json" localhost:8000/buySell
```