const stockInfo = {
    timeSeries: 'DAILY',
    symbol: 'IBM',
}
module.exports = [
    {
        ...stockInfo,
        date: new Date("2023-12-08"),
        openPrice: Number("160.0")
    },
    {
        ...stockInfo,
        date: new Date("2023-12-07"),
        openPrice: Number("161.0")
    },
    {
        ...stockInfo,
        date: new Date("2023-12-06"),
        openPrice: Number("161.59")
    },
    {
        ...stockInfo,
        date: new Date("2023-12-05"),
        openPrice: Number("160.76")
    },
    {
        ...stockInfo,
        date: new Date("2023-12-04"),
        openPrice: Number("160.29")
    },
    {
        ...stockInfo,
        date: new Date("2023-12-01"),
        openPrice: Number("158.41")
    }
]